import mongoose, { Schema } from "mongoose";

const Orgnaization = new Schema({

    name: {
        type: String,
        required: true
    },
    orgnaizationId: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    mainAddress: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    status: {
        type: Number,
        default: 0
    },
    payments: {
        type: [
            {
                invoiceNumber: {
                    type: String,
                    required: true
                },
                invoiceDate: {
                    type: Date,
                    default: new Date()
                },
                billedAmount: {
                    type: String,
                    required: true
                }
            }
        ],
        required: false
    }

}, { timestamps: true });


Orgnaization.index({ orgnaizationId: 'text', name: 'text' });

module.exports = mongoose.model('Orgnaization', Orgnaization);