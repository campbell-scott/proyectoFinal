import UserDao from "../daos/userMongooseDaos.js";

class UserManager {
  constructor() {
    this.UserDao = new UserDao();
  }

  async getUsers(limit, page) {
    return this.UserDao.getUsers(limit, page);
  }

  async getUser(id) {
    return this.UserDao.getUser(id);
  }

  async getUserByEmail(email) {
    return this.UserDao.getUserByEmail(email);
  }

  async addUser(data) {
    const user = await this.UserDao.addUser(data);

    return { ...user, password: undefined };
  }

  async updateUser(id, data) {
    return this.UserDao.updateUser(id, data);
  }

  async deleteUser(id) {
    return this.UserDao.deleteUser(id);
  }

  async forgetPassword(dto) {
    const user = await this.UserDao.getUserByEmail(dto.email);
    user.password = dto.password;

    return this.UserDao.updateUser(user.id, user);
  }
}

export default UserManager;