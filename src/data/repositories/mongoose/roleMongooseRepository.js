import RoleModel from '../../models/mongoose/roleSchema.js'

class RoleMongooseRepository {
  async getRoles(limit, page, filters) {

    const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
    };

    const roleDocuments = await RoleModel.paginate(filters, options);
    const { docs, ...pagination } = roleDocuments;

    const roles = docs.map(document => ({
      id: document._id,
      name: document.name,
      permissions: document.permissions
    }));

    return { roles, pagination }
  }

  async getRole(id) {
    const role = await RoleModel.findOne({ _id: id });

    if(!role) {
      throw new Error('Role dont exist.');
    }

    return {
        id: role?._id,
        name: role?.name,
        permissions: role?.permissions
    }
  }

  async addRole(newRole) {
    const role = await RoleModel.create(newRole);

    return {
        id: role._id,
        name: role.name,
        permissions: role.permissions
    }
  }

  async updateRole(id, updates) {
    const role = await RoleModel.findOneAndUpdate({ _id: id }, updates, { new: true});

    if(!role) {
      throw new Error('Role dont exist.');
    }

    return {
        id: role._id,
        name: role.name,
        permissions: role.permissions
    }
  }

  async deleteRole(id) {
    return RoleModel.deleteOne({ _id: id });
  }
}

export default RoleMongooseRepository;