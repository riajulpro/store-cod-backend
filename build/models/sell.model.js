"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SellSchema = new mongoose_1.default.Schema({
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    quantity: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    customer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Customer"
    },
});
const Sell = mongoose_1.default.model("Sell", SellSchema);
exports.default = Sell;
