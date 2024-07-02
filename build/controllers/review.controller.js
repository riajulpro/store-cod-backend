"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleReview = exports.updateSingleReview = exports.getSingleReview = exports.getAllReviews = exports.publishReview = void 0;
const review_model_1 = __importDefault(require("../models/review.model"));
const publishReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, customerId, text, rating } = req.body;
        const newReview = new review_model_1.default({ productId, customerId, text, rating });
        yield newReview.save();
        res.status(201).json(newReview);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.publishReview = publishReview;
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_model_1.default.find();
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllReviews = getAllReviews;
const getSingleReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const review = yield review_model_1.default.findById(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getSingleReview = getSingleReview;
const updateSingleReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { text, rating } = req.body;
        const updatedReview = yield review_model_1.default.findByIdAndUpdate(id, { text, rating }, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(updatedReview);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateSingleReview = updateSingleReview;
const deleteSingleReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedReview = yield review_model_1.default.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteSingleReview = deleteSingleReview;
