import { Router } from "express"
import { getInviteeName } from "../handlers/invitee"

const inviteeRouter = Router()

inviteeRouter.get('/:username', getInviteeName)

export default inviteeRouter