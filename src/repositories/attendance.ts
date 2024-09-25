import { QueryResult } from "pg"
import db from "../config/pg"
import { IAttendance, IAttendanceBody } from "../models/attendance";

export const findAllAttendances = async (): Promise<IAttendance[]> => {
  let query = `SELECT * FROM "attendances" ORDER BY "created_at" DESC`;
  const result: QueryResult<IAttendance> = await db.query(query);
  return result.rows;
};

export const insert = async (data: IAttendanceBody): Promise<IAttendance[]> => {
  const columns: string[] = []
  const values: any[] = []

  for (const [key, value] of Object.entries(data)) {
    values.push(value)
    columns.push(`"${key}"`)
  }

  const insertedValues: string = values.map((_, index) => `$${index + 1}`).join(', ')

  const query = `
    INSERT INTO "attendances"
    (${columns.join(', ')})
    VALUES
    (${insertedValues})
    RETURNING *
  `

  const result: QueryResult<IAttendance> = await db.query(query, values)
  return result.rows
};