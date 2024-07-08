import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import QueryBuilder from "../builder/QueryBuilder";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import Customer from "../models/customer.model";
import Product from "../models/product.model";
import Sell from "../models/sell.model";
import sendResponse from "../utils/sendResponse";

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

    try {
      const newSell = await Sell.create({});

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

      const sells = await queryBuilder.modelQuery
        .populate("customer")
        .populate("productId");

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

export const getCustomerBasedSellsController = catchAsyncError(
  async (req, res) => {
    const userAuth = req.user;
    console.log("fasdfasd");
    if (!userAuth) return res.status(204).send({});

    const isCustomerExist = await Customer.findOne({ email: userAuth.email });
    if (!isCustomerExist) {
      return sendResponse(res, {
        data: null,
        message: "Customer not found",
        success: false,
        statusCode: 404,
      });
    }

    const filterQuery = { customer: isCustomerExist._id };
    const query = Sell.find(filterQuery)
      .populate("customer")
      .populate("productId");
    const totalDoc = await Sell.countDocuments(filterQuery);
    const resultQuery = new QueryBuilder(query, req.query).paginate();
    const result = await resultQuery.modelQuery;
    res.json({
      success: true,
      data: result || [],
      message: "Successfully retrive sells data",
      totalDoc,
    });
  }
);

export const trackCustomerOrder = catchAsyncError(async (req, res) => {
  const { orderId } = req.params;
  const user = req.user;
  if (!user) return res.status(204).send({});

  const isExistOrder = await Sell.findById(orderId)
    .populate("customer")
    .populate("productId");
  if (!isExistOrder) {
    return sendResponse(res, {
      success: false,
      message: "Order not found",
      data: null,
    });
  }

  const orderObject: Record<string, any> = isExistOrder.toObject();
  if (orderObject.customer.email !== user.email) {
    return sendResponse(res, {
      success: false,
      message: "Order email didn't matched",
      data: null,
      statusCode: 403,
    });
  }

  sendResponse(res, {
    success: true,
    message: "Order track retraive successfully",
    data: orderObject,
  });
});
