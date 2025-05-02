require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities"); // ✅ Correct import

const User = require("./models/user.model");
const Note = require("./models/note.model");

const app = express();

// Connect to MongoDB
mongoose.connect(config.connectionString)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error("Connection error:", err));

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) return res.status(400).json({ error: true, message: "FullName is required" });
  if (!email) return res.status(400).json({ error: true, message: "Email is required" });
  if (!password) return res.status(400).json({ error: true, message: "Password is required" });

  const isUser = await User.findOne({ email });
  if (isUser) return res.json({ error: true, message: "User already exists" });

  const user = new User({ fullName, email, password });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
  return res.json({ error: false, user, accessToken, message: "Registration successful" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ error: true, message: "Email is required" });
  if (!password) return res.status(400).json({ error: true, message: "Password is required" });

  const userInfo = await User.findOne({ email });
  if (!userInfo) return res.status(401).json({ error: true, message: "User not found" });

  if (userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3600m" });
    return res.json({ error: false, message: "Login successful", email, accessToken });
  } else {
    return res.status(400).json({ error: true, message: "Invalid credentials" });
  }
});

app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;
  
    console.log("Received Note Data:", req.body);  // Log the incoming data
    console.log("User ID from token:", user._id);  // Log the user ID from the JWT token
  
    if (!user) {
      return res.status(400).json({ error: true, message: "User not found" });
    }
    if (!title) {
      return res.status(400).json({ error: true, message: "Title is missing" });
    }
    if (!content) {
      return res.status(400).json({ error: true, message: "Content is missing" });
    }
  
    try {
      const note = new Note({
        title,
        content,
        tags: tags || [],
        userId: user._id // Ensure the correct user ID is assigned here
      });
      await note.save();
      return res.status(200).json({ error: false, note, message: "Note added successfully" });
    } catch (err) {
      console.error("Error adding note:", err);
      return res.status(500).json({ error: true, message: "Failed to add note" });
    }
  });
  
  app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const {user} = req.user;

    if (!user || !user._id) {
        return res.status(400).json({ error: true, message: "Invalid token, user not found" });
    }

    console.log("User Info: ", user); // Ensure user is correctly added to req.user
    console.log("Note ID:", noteId);  // Log noteId for debugging

    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }

    // Validate if the noteId is a valid ObjectId
    const { ObjectId } = require("mongoose").Types;
    if (!ObjectId.isValid(noteId)) {
        return res.status(400).json({ error: true, message: "Invalid noteId" });
    }

    try {
        // Convert user._id to a string for matching the userId in the note
        const note = await Note.findOne({ _id: noteId, userId: user._id.toString() });

        if (!note) {
            return res.status(400).json({ error: true, message: "Note not found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned !== undefined) note.isPinned = isPinned;

        await note.save();
        return res.json({ error: false, note, message: "Note updated successfully" });
    } catch (error) {
        console.error("Error updating note: ", error);
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
});

app.get("/get-all-notes",authenticateToken,async(req,res)=>{
    const {user}=req.user;

    try{
        const notes=await Note.find({userId:user._id}).sort({isPinned:-1});
        return res.json({error:false,notes,message:"all notes fetch successfully"});
    }
    catch(err)
    {
        return res.json(500).json({error:true,mesage:"Internal server error"});
    }
})

app.delete("/delete-note/:noteId",authenticateToken,async(req,res)=>{
    const noteId=req.params.noteId;
    const {user}=req.user;
    console.log(user);
    try{
        const note=await Note.findOne({_id:noteId,userId:user._id});

        if(!note)
        {
            return res.json(404).json({error:true,message:"Note not found"});
        }
        await Note.deleteOne({_id:noteId,userId:user._id});
        return res.json({error:false,message:"Note data deleted successfully"});
    }
    catch(error)
    {
        return res.status(400).json({error:true,message:"Internal server error"});
    }
});

app.put("/update-note-pinned/:noteId",authenticateToken,async(req,res)=>{
  const noteId=req.params.noteId;
  const {isPinned}=req.body;
  const {user}=req.user;

  if(!isPinned)
  {
    return res.status(400).json({error:true,message:"No changes provided"});
  }
  try
  {
    const note=await Note.findOne({_id:noteId,userId:user._id});

    if(!note)
    {
      return res.status(404).json({error:true,message:"Note not found"});
    }
  if(isPinned) note.isPinned=isPinned || false;

  await note.save();

  return res.json({error:false,note,message:"Note updated successfully"});
  }
  catch(err)
  {
    return res.status(500).json({error:true,message:"Internal server error "+err});
  }
})

app.get("/get-user",authenticateToken,async(req,res)=>{
  const {user}=req.user;

  const isUser=await User.findOne({_id:user._id});
  if(!isUser)
  {
    return res.sendStatus(401);
  }
  return res.json({fullName:isUser.fullName,email:isUser.email,"_id":isUser._id,createdOn:isUser.createdOn})
})
app.listen(8000, () => {
  console.log("Server running on port 8000");
});

module.exports = app;
