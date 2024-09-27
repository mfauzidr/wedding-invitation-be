import { Request, Response } from 'express';
import { findAllAttendances, insert } from "../repositories/attendance";
import { IAttendanceBody } from '../models/attendance';
import { IAttendanceResponse, IErrResponse } from '../models/response';

export const getAllAttendances = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { allAttendances, attendanceCount } = await findAllAttendances();
    return res.json({
      success: true,
      message: 'List all attendances',
      results: allAttendances,
      attendanceSummary: attendanceCount  // Include the summary counts
    });
  } catch (error) {
    console.error("Error fetching attendances:", error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const createAttendance = async (req: Request<{}, {}, IAttendanceBody>, res: Response<IAttendanceResponse>): Promise<Response> => {
  try {
    const promo = await insert(req.body);
    return res.json({
      success: true,
      message: 'Create Attendance successfully',
      results: promo
    });
  } catch (error) {
    const err = error as IErrResponse
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};