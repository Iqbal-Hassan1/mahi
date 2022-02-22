import mongoose, { Schema } from "mongoose";

const Industry = new Schema({

    name: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Industry', Industry);