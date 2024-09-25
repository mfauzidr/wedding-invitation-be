import { Router } from "express"
import { createAttendance, getAllAttendances } from "../handlers/attendance"


const attendanceRouter = Router()

attendanceRouter.get('/', getAllAttendances)
attendanceRouter.post('/', createAttendance)

export default attendanceRouter