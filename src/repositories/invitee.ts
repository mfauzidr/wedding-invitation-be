import { QueryResult } from "pg"
import db from "../config/pg"
import { IInvitee, IInviteeBody } from "../models/invitee"


export const findDetails = async (username: string): Promise<IInvitee[]> => {
  const query = `
    SELECT
      "name"
    FROM "invitee" 
    WHERE "username" = $1`
  const values: string[] = [username]
  console.log(username);
  const result: QueryResult<IInvitee> = await db.query(query, values);
  return result.rows
}