import container from '../../container.js';


class RoleManager {
  constructor() {
    this.RoleRepository = container.resolve('RoleRepository');
  };

  async getRoles(limit, page) {
    return this.RoleRepository.getRoles(limit, page);
  };

  async getRole(id) {
    return this.RoleRepository.getRole(id);
  };

  async addRole(data) {
    return await this.RoleRepository.addRole(data);
  };

  async updateRole(id, data) {
    return this.RoleRepository.updateRole(id, data);
  };

  async deleteRole(id) {
    return this.RoleRepository.deleteRole(id);
  };
};

export default RoleManager;