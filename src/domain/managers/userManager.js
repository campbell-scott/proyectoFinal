import container from '../../container.js';
import { createHash } from '../../shared/index.js'

class UserManager {
  constructor() {
    this.UserRepository = container.resolve('UserRepository');
  };

  async getUsers(limit, page) {
    return this.UserRepository.getUsers(limit, page);
  };

  async getUser(id) {
    return this.UserRepository.getUser(id);
  };

  async getUserByEmail(email) {
    return this.UserRepository.getUserByEmail(email);
  };

  async addUser(data) {
    data.password = await createHash(data.password, 10)
    const user = await this.UserRepository.addUser(data);
    
    console.log(user)
    return user;
  };

  async updateUser(id, data) {
    return this.UserRepository.updateUser(id, data);
  };

  async deleteUser(id) {
    return this.UserRepository.deleteUser(id);
  };

  async forgetPassword(dto) {
    const user = await this.UserRepository.getUserByEmail(dto.email);
    user.password = dto.password;

    return this.UserRepository.updateUser(user.id, user);
  };
}

export default UserManager;