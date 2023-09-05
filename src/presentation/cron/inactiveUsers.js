import logger from '../../utils/pino.js'
import UserManager from '../../domain/managers/userManager.js'

export async function deleteInactiveUsers() {
  try {
    const manager = new UserManager()
    const inactiveUsers = await manager.performDeletion()
   
    logger.info(`Deleted ${inactiveUsers.modifiedCount} inactive users in past 7 days`)
  } catch (error) {
    logger.error(`Delete inactive users error : ${error.message}`)
  }
}