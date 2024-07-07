import catchAsyncError from "../middlewares/catchAsyncErrors";
import Customer from "../models/customer.model";
import sendResponse from "../utils/sendResponse";

export const updateCustomerDetails = catchAsyncError(async (req, res) => {
  const { body } = req.body;
  const user = req.user;
  if (!user) return res.status(204).json({});
  console.log({ user });

  const isExistCustomer = await Customer.findById(user._id);
  if (!isExistCustomer) {
    return sendResponse(res, {
      success: false,
      message: "customer does't exist",
      data: null,
    });
  }

  const result = await Customer.findByIdAndUpdate(isExistCustomer._id, body, {
    new: true,
    runValidators: true,
  });
  sendResponse(res, {
    success: false,
    message: "User details update successfull",
    data: result,
  });
});
