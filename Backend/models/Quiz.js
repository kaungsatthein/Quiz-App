const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    question : {
        type : String,
        required : true
    },
    options : {
        type : Array,
        required : true,
    },
    answer : {
        type : String,
        required : true
    },
}, { timestamps : true });

module.exports = mongoose.model("Quiz", QuizSchema)