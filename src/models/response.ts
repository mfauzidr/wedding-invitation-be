import { IAttendance } from "./attendance";
import { IInvitee } from "./invitee";

interface IPaginationMeta {
  totalData?: number
  currentPage?: number
  totalPage?: number
  nextPage?: string | null
  prevPage?: string | null
}

interface IBasicResponse {
  success?: boolean
  message: string
  err?: string
  meta?: IPaginationMeta
}

export interface IInviteeResponse extends IBasicResponse {
  results?: IInvitee[]
}

export interface IAttendanceResponse extends IBasicResponse {
  results?: IAttendance[];
  attendanceSummary?: { hadir: number, tidakHadir: number, masihRagu: number }; // New field for summary
}


export interface IErrResponse {
  code?: string
  column?: string
  detail?: string
  message?: string
}