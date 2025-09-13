const mongoose = require("mongoose");

const contactSchema = new momgoose.Schema({
    // Basic Info
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true, unique: true, sparse: true },
    phone: { type: String, trim: true },
    title: { type: String, trim: true }, // e.g. Manager, CEO
    department: { type: String, trim: true },

    // Relations
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // assigned salesperson
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deal" }],
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],

    // Extra Features
    tags: [{ type: String }], // e.g. "VIP", "Decision Maker"
    status: {
        type: String,
        enum: ["lead", "active", "inactive"],
        default: "lead"
    },
    source: { type: String, default: "manual" }, // manual, import, campaign, referral
    leadScore: { type: Number, default: 0 }, // scoring for qualification
    preferredChannel: {
        type: String,
        enum: ["email", "phone", "whatsapp", "linkedin"],
        default: "email"
    },
    customFields: { type: Map, of: String },

    // Meta Data

    lastContactedAt: { type: Date },
    isActive: { type: Boolean, default: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
    { timestamps: true }
)

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;