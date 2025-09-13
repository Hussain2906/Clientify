const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    // Basic Information
    name: { type: String, required: true, trim: true },
    domain: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    industry: { type: String, default: "general" },
    size: { type: Number, default: 0 }, // employees count
    address: { type: String },
    phone: { type: String },
    website: { type: String },

    // Relations
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
    deals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deal" }],

    // Extra Features
    tags: [{ type: String }],
    description: { type: String },
    status: {
        type: String,
        enum: ["prospect", "customer", "churned"],
        default: "prospect"
    },
    customFields: { type: Map, of: String },
    source: { type: String, default: "manual" },
    lastActivityAt: { type: Date },

    // Meta Data
    isActive: { type: Boolean, default: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
    { timestamps: true } // auto adds createdAt, updatedAt
);