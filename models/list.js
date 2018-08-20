var mongoose = require("mongoose");

// SCHEMA setup

var listSchema = new mongoose.Schema({
    item: String,
    isToggled: {type: Boolean, default: false}
},{
    timestamps: true
}
);
module.exports = mongoose.model("List", listSchema);