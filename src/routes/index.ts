import { Router } from "express"

import inviteeRouter from "./invitee"
import attendanceRouter from "./attendance"

const router = Router()

router.use("/guest", inviteeRouter)
router.use("/attendance", attendanceRouter)


export default router