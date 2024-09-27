import { QueryResult } from "pg"
import db from "../config/pg"
import { IAttendance, IAttendanceBody } from "../models/attendance";

export const findAllAttendances = async (): Promise<{
  allAttendances: IAttendance[],
  attendanceCount: { hadir: number, tidakHadir: number, masihRagu: number }
}> => {
  // Get all attendance records
  let query = `SELECT * FROM "attendances" ORDER BY "created_at" DESC`;
  const result: QueryResult<IAttendance> = await db.query(query);

  // Get the counts for each type of attendance
  const countQuery = `
    SELECT
      SUM(CASE WHEN attendance = 'Hadir' THEN 1 ELSE 0 END) as hadir,
      SUM(CASE WHEN attendance = 'Tidak Hadir' THEN 1 ELSE 0 END) as tidakHadir,
      SUM(CASE WHEN attendance = 'Masih Ragu' THEN 1 ELSE 0 END) as masihRagu
    FROM "attendances"
  `;
  const countResult: QueryResult = await db.query(countQuery);

  const attendanceCount = countResult.rows[0];

  return {
    allAttendances: result.rows,
    attendanceCount: {
      hadir: attendanceCount.hadir || 0,
      tidakHadir: attendanceCount.tidakhadir || 0,
      masihRagu: attendanceCount.masihragu || 0
    }
  };
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