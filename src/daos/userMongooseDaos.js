import UserModel from "../models/userSchema.js";

class UserDao {
  async getUsers(criteria) {
    const { limit, page } = criteria;
  
    if (!limit) {
      const limit = 10
    }

    const users = await UserModel.find(/*{}, { limit, page }*/);

    /*users.docs = users.docs.map(document => ({
      id: document._id,
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
      age: document.age
    }));*/

    return users.map(
    ({ _id, firstName, lastName, email, age }) => ({
      id: _id,
      firstName,
      lastName,
      email,
      age
    })
  )
  }

  async getUser(id) {
    const user = await UserModel.findOne({ _id: id });

    if(!user){
      throw new Error('El usuario no existe.');
    }

    return {
        id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        age: user?.age,
        password: user?.password
    }
  }

  async getUserByEmail(email) {
    const user = await UserModel.findOne({ email });

    // if(!userDocument)
    // {
    //   throw new Error('User dont exist.');
    // }

    return {
        id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        age: user?.age,
        password: user?.password
    }
  }

  async addUser(data) {
    const user = await UserModel.create(data);

    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        password: user.password,
    }
  }

  async updateUser(id, data) {
    const user = await UserModel.findOneAndUpdate({ _id: id }, data, { new: true});

    if(!user) {
      throw new Error('User dont exist.');
    }

    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age
    }
  }

  async deleteUser(id) {
    return UserModel.deleteOne({ _id: id });
  }
}

export default UserDao;