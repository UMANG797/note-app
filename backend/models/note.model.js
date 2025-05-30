const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const noteSchema=new Schema({
    title:{type:String,required:true},
    content:{type:String,require:true},
    tags:{type:[String],default:[]},
    isPinned:{type:Boolean,default:false},
    userId:{type:String,require:true},
    createdOn:{type:Date,default: Date.now },
})

module.exports=mongoose.model("Note",noteSchema);