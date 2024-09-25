import { Request, Response } from 'express'
import { findDetails } from "../repositories/invitee"
import { IInviteeParams } from '../models/invitee'
import { IErrResponse, IInviteeResponse } from '../models/response'


export const getInviteeName = async (req: Request<IInviteeParams>, res: Response<IInviteeResponse>): Promise<Response> => {
  const { username } = req.params;
  console.log(username);
  try {
    const user = await findDetails(username as string);
    if (user.length === 0) {
      throw new Error("Not Found")
    }
    return res.json({
      success: true,
      message: 'OK',
      results: user
    });
  } catch (error) {
    const err = error as IErrResponse
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};