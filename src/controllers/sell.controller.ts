import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import Sell from "../models/sell.model";
import Product from "../models/product.model";
import Customer from "../models/customer.model";
import sendResponse from "../utils/sendResponse";
import { validationResult } from "express-validator";
import QueryBuilder from "../builder/QueryBuilder";

export const createSellController = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return sendResponse(res, {
          statusCode: 422,
          success: false,
          message: firstError,
          data: null,
        });
      }
  
      const { productId, quantity, date, customer } = req.body;
  
      try {
        const product = await Product.findById(productId);
        const customerExists = await Customer.findById(customer);
  
        if (!product) {
          return sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "Product not found",
            data: null,
          });
        }
  
        if (!customerExists) {
          return sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "Customer not found",
            data: null,
          });
        }
  
        const quantityNumber = parseInt(quantity, 10);
        if (isNaN(quantityNumber) || quantityNumber <= 0) {
          return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Invalid quantity",
            data: null,
          });
        }
  
        if (product.stock < quantityNumber) {
          return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Insufficient stock",
            data: null,
          });
        }
  
        product.stock -= quantityNumber;
        await product.save();
  
        const newSell = await Sell.create({
          productId,
          quantity: quantityNumber,
          date,
          customer,
        });
  
        sendResponse(res, {
          statusCode: 201,
          success: true,
          message: "Sell created successfully",
          data: newSell,
        });
      } catch (error) {
        sendResponse(res, {
          statusCode: 500,
          success: false,
          message: "Error creating sell",
          data: null,
          error: error,
        });
      }
    }
  );

export const getAllSellsController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryBuilder = new QueryBuilder(Sell.find(), req.query)
        .filter()
        .sort()
        .paginate()
        .fields();

      const sells = await queryBuilder.modelQuery;

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Sells fetched successfully",
        data: sells,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error fetching sells",
        data: null,
        error: error,
      });
    }
  }
);

export const getSellByIdController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const sell = await Sell.findById(id)
        .populate("productId")
        .populate("customer");

      if (!sell) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Sell not found",
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Sell fetched successfully",
        data: sell,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error fetching sell",
        data: null,
        error: error,
      });
    }
  }
);

export const updateSellController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedSell = await Sell.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedSell) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Sell not found",
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Sell updated successfully",
        data: updatedSell,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error updating sell",
        data: null,
        error: error,
      });
    }
  }
);

export const deleteSellController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedSell = await Sell.findByIdAndDelete(id);

      if (!deletedSell) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Sell not found",
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Sell deleted successfully",
        data: deletedSell,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error deleting sell",
        data: null,
        error: error,
      });
    }
  }
);
