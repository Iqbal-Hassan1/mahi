import mongoose, { Schema } from "mongoose";

const Module = new Schema({

    fileName: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    moduleId: {
        type: String,
        required: true,
    },
    moduleType: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    youTubeLink: {
        type: String,
        required: false,
    },
    moreInfoLink: {
        type: String,
        required: false,
    },
    industries: {
        type: Array,
        required: true
    },
    pricing: {
        type: [{
            region: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            }
        }],
        required: false
    },
    visibility: {
        type: [{
            name: {
                type: String,
                required: true,
            },
            isregion: {
                type: Boolean,
                required: true,
                default: true
            }
        }],
        required: false
    }
});

Module.index({ moduleId: "text", displayName: "text" });

module.exports = mongoose.model('module', Module);