import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { httpStatus } from "../config/http.config";
import { getCurrentUserService } from "../services/user.service";

export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { user } = await getCurrentUserService(userId);

    return res.status(httpStatus.OK).json({
      message: "User fetch successfully",
      user,
    });
  }
);