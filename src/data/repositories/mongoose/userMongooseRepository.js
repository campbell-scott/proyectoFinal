import UserModel from '../../models/mongoose/userSchema.js';
import User from '../../../domain/entities/user.js'
import Role from '../../../domain/entities/role.js'

class UserMongooseRepository {
  async getUsers( limit, page, filter) {

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    };

    const userDocuments = await UserModel.paginate( filter, options );
    const { docs, ...pagination } = userDocuments;

    const users = docs.map(document => new User({
      id: document._id,
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
      age: document.age,
      isAdmin: document.isAdmin,
      role: document?.role ? new Role(
        document.role.id,
        document.role.name,
        document.role.permissions
      ):null,
      lastLogin: document.lastLogin,
      isActive: document.isActive
    }));

    return { users, pagination };
  }

  async getUser(id) {
    const user = await UserModel.findOne({ _id: id });

    if(!user){
      throw new Error('User dont exist.');
    };

    return new User({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        isAdmin: user.isAdmin,
        password: user.password,
        role: user.role ?? null,
        lastLogin: user.lastLogin,
        isActive: user.isActive
    });
  }

  async getUserByEmail(email) {
    const user = await UserModel.findOne({ email });

    if(!user) {
      throw new Error('User dont exist.');
    }

    return new User ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      isAdmin: user.isAdmin,
      password: user.password,
      role: user.role ?? null,
      lastLogin: user.lastLogin,
      isActive: user.isActive
    })
  }

  async addUser(data) {
    const user = await UserModel.create(data);

    return new User ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      role: user.role ?? null,
    });
  };

  async updateUser(id, data) {
    const user = await UserModel.findOneAndUpdate({ _id: id }, data, { new: true});
    
    if(!user) {
      throw new Error('User dont exist.');
    }

    return new User ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      isAdmin: user.isAdmin,
      role: user.role ?? null,
      lastLogin: user.lastLogin,
      isActive: user.isActive
    })
  }

  async deleteUser(id) {
    return await UserModel.deleteOne({ _id: id });
  }

  async performDeletion(date) {
    return await UserModel.updateMany({ lastLogin: { $lt: date } },{ $set: { isActive: false } });
  }
}

export default UserMongooseRepository;