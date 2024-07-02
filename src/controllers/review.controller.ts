import { Request, Response } from "express";
import Review from "../models/review.model";

export const publishReview = async (req: Request, res: Response) => {
  try {
    const { productId, customerId, text, rating } = req.body;
    const newReview = new Review({ productId, customerId, text, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const getSingleReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const updateSingleReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text, rating } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { text, rating },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const deleteSingleReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
