import container from '../../container.js';
import singUpValidation from '../validations/user/singupValidation.js'
import updateUserValidation from '../validations/user/updateUserValidation.js'
import { forgetPasswordMail } from './mailManager.js'
import { generatePasswordToken } from '../../shared/index.js';

class UserManager {
  constructor() {
    this.UserRepository = container.resolve('UserRepository');
  };

  async getUsers(limit, page, filter) {
    return this.UserRepository.getUsers(limit, page, filter);
  };

  async getUser(id) {
    return this.UserRepository.getUser(id);
  };

  async getUserByEmail(email) {
    return this.UserRepository.getUserByEmail(email);
  };

  async addUser(data) {
    await singUpValidation.parseAsync(data);

    const user = await this.UserRepository.addUser(data);
    
    return user;
  };

  async updateUser(id, data) {
    await updateUserValidation.parseAsync(data);

    return this.UserRepository.updateUser(id, data);
  };

  async deleteUser(id) {
    return this.UserRepository.deleteUser(id);
  };

  async renderResetPasswordPage(url, token, email) {
    const user = await this.UserRepository.getUserByEmail(email);
    
    const templateData = {
      username: user.firstName,
      resetLink: `${url}/api/sessions/reset-password?token=${token}`
    };
    
    return templateData
  };

  async resetPassword(email, newPassword) {
    const user = await this.UserRepository.getUserByEmail(email);
    user.password = newPassword;

    this.UserRepository.updateUser(user.id, user);
  };

  async requestReset(email, url) {
    const user = await this.UserRepository.getUserByEmail(email);
    
    if (!user) {
      return new Error(`Invalid email.`);
    }
    
    const token = await generatePasswordToken(user)

    await forgetPasswordMail(email, user.firstName, token, url)

    return user.email
  };

  async performDeletion() {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 7);

    const result = await this.UserRepository.performDeletion(twoDaysAgo);

    return result
  }
}

export default UserManager;