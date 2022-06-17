const mongoose = require("mongoose");

const Book = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    productionYear: String,
    author: String,
    description: String,
    active: Boolean,
    amount: {
        type: Number,
        default: 1,
        required: true
    }
});

module.exports = mongoose.model("books", Book);