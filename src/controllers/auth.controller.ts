import catchAsyncError from "../middlewares/catchAsyncErrors";
import Authentication from "../models/auth.model";
import Customer from "../models/customer.model";
import Owner from "../models/owner.model";
import Staff from "../models/staff.model";
import { createAcessToken } from "../utils/jwtToken";
import sendResponse from "../utils/sendResponse";

export const createCustomerController = catchAsyncError(async (req, res) => {
  const { body } = req;
  const auth = await Authentication.create(body);
  const customer = Customer.create({ ...body, auth: auth._id });

  const token = createAcessToken(
    {
      email: auth.email,
      userId: auth._id,
      role: auth.role,
    },
    "1h"
  );
  res.json({
    data: customer,
    message: "staff created successfully",
    success: true,
    accessToken: token,
  });
});
export const createStaffController = catchAsyncError(async (req, res) => {
  const { body } = req;
  const auth = await Authentication.create({...body,role:"staff"});
  const customer = Staff.create({ ...body, auth: auth._id });
  const token = createAcessToken(
    {
      email: auth.email,
      userId: auth._id,
      role: auth.role,
    },
    "1h"
  );
  res.json({
    data: customer,
    message: "staff created successfully",
    success: true,
    accessToken: token,
  });
});
export const loginController = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;
  const isExistUser = await Authentication.findOne({ email });
  if (!isExistUser) {
    return sendResponse(res, {
      success: false,
      data: null,
      message: "No account found on this email",
      statusCode: 404,
    });
  }

  let user = undefined;
  const role = isExistUser.role;
  if (role === "customer") {
    user = await Customer.findOne({ email });
  }
  if (role === "owner") {
    user = await Owner.findOne({ email });
  }
  if (role === "staff") {
    user = await Staff.findOne({ email });
  }

  const token = createAcessToken(
    {
      email: isExistUser.email,
      userId: isExistUser._id,
      role: isExistUser.role,
    },
    "1h"
  );
  res.json({
    data: user,
    message: "staff created successfully",
    success: true,
    accessToken: token,
  });
});
