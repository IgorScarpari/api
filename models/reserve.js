const mongoose = require("mongoose");

const ReserveSchema = new mongoose.Schema({
    scheduledDate: {
        type: Date,
        allowNull: false
    },
    returnDate: {
        typeof: Date,
    },
    books: [{type: mongoose.Schema.Types.ObjectId, ref:'books'}],
    userId: Number,

});

module.exports = mongoose.model("reserves", ReserveSchema);