import container from '../../container.js';
import roleCreateValidation from '../validations/role/addRoleValidation.js';
import updateRoleValidation from '../validations/role/updateRoleValidation.js';

class RoleManager {
  constructor() {
    this.RoleRepository = container.resolve('RoleRepository');
  };

  async getRoles(limit, page, filters) {
    return this.RoleRepository.getRoles(limit, page, filters);
  };

  async getRole(id) {
    return this.RoleRepository.getRole(id);
  };

  async addRole(data) {
    await roleCreateValidation.parseAsync(data);

    return await this.RoleRepository.addRole(data);
  };

  async updateRole(id, data) {
    await updateRoleValidation.parseAsync(data);

    return this.RoleRepository.updateRole(id, data);
  };

  async deleteRole(id) {
    return this.RoleRepository.deleteRole(id);
  };
};

export default RoleManager;