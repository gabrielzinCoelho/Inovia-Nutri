import { ClientSession, Connection } from 'mongoose'

export async function transaction<T>(
  connection: Connection,
  callback: (session: ClientSession) => Promise<T>,
): Promise<T> {
  const session = await connection.startSession()

  try {
    session.startTransaction()
    const resultTransaction = await callback(session)
    await session.commitTransaction()
    return resultTransaction
  } catch (err) {
    await session.abortTransaction()
    throw err
  } finally {
    await session.endSession()
  }
}
