"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var IncidentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    context: {
        type: String,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
    Deadline: {
        type: Date,
        required: true,
    },
    PIC: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "New",
    },
});
exports.default = mongoose_1.default.model("Incident", IncidentSchema);
