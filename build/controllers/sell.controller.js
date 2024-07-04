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
exports.deleteSellController = exports.updateSellController = exports.getSellByIdController = exports.getAllSellsController = exports.createSellController = void 0;
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const sell_model_1 = __importDefault(require("../models/sell.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const customer_model_1 = __importDefault(require("../models/customer.model"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const express_validator_1 = require("express-validator");
const QueryBuilder_1 = __importDefault(require("../builder/QueryBuilder"));
exports.createSellController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return (0, sendResponse_1.default)(res, {
            statusCode: 422,
            success: false,
            message: firstError,
            data: null,
        });
    }
    const { productId, quantity, date, customer } = req.body;
    try {
        const product = yield product_model_1.default.findById(productId);
        const customerExists = yield customer_model_1.default.findById(customer);
        if (!product) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 404,
                success: false,
                message: "Product not found",
                data: null,
            });
        }
        if (!customerExists) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 404,
                success: false,
                message: "Customer not found",
                data: null,
            });
        }
        const quantityNumber = parseInt(quantity, 10);
        if (isNaN(quantityNumber) || quantityNumber <= 0) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 400,
                success: false,
                message: "Invalid quantity",
                data: null,
            });
        }
        if (product.stock < quantityNumber) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 400,
                success: false,
                message: "Insufficient stock",
                data: null,
            });
        }
        product.stock -= quantityNumber;
        yield product.save();
        const newSell = yield sell_model_1.default.create({
            productId,
            quantity: quantityNumber,
            date,
            customer,
        });
        (0, sendResponse_1.default)(res, {
            statusCode: 201,
            success: true,
            message: "Sell created successfully",
            data: newSell,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: "Error creating sell",
            data: null,
            error: error,
        });
    }
}));
exports.getAllSellsController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryBuilder = new QueryBuilder_1.default(sell_model_1.default.find(), req.query)
            .filter()
            .sort()
            .paginate()
            .fields();
        const sells = yield queryBuilder.modelQuery.populate("customer").populate("productId");
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Sells fetched successfully",
            data: sells,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: "Error fetching sells",
            data: null,
            error: error,
        });
    }
}));
exports.getSellByIdController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const sell = yield sell_model_1.default.findById(id)
            .populate("productId")
            .populate("customer");
        if (!sell) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 404,
                success: false,
                message: "Sell not found",
                data: null,
            });
        }
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Sell fetched successfully",
            data: sell,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: "Error fetching sell",
            data: null,
            error: error,
        });
    }
}));
exports.updateSellController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedSell = yield sell_model_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updatedSell) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 404,
                success: false,
                message: "Sell not found",
                data: null,
            });
        }
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Sell updated successfully",
            data: updatedSell,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: "Error updating sell",
            data: null,
            error: error,
        });
    }
}));
exports.deleteSellController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedSell = yield sell_model_1.default.findByIdAndDelete(id);
        if (!deletedSell) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 404,
                success: false,
                message: "Sell not found",
                data: null,
            });
        }
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Sell deleted successfully",
            data: deletedSell,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: "Error deleting sell",
            data: null,
            error: error,
        });
    }
}));
