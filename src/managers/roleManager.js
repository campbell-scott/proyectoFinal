import RoleDao from "../daos/roleMongooseDao.js";

class RoleManager {
  constructor() {
     this.RoleDao = new RoleDao();
  }

  async getRoles(limit, page) {
    return this.RoleDao.getRoles(limit, page);
  }

  async getRole(id) {
    return this.RoleDao.getRole(id);
  }

  async addRole(data) {
    return await this.RoleDao.addRole(data);
  }

  async updateRole(id, data) {
    return this.RoleDao.updateRole(id, data);
  }

  async deleteRole(id) {
    return this.RoleDao.deleteRole(id);
  }
}

export default RoleManager;