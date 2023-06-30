import UserManager from '../../domain/managers/userManager.js';

export const getUsers = async  (req, res) => {
  try {
    const { limit, page } = req.query;
    const manager = new UserManager();

    const users = await manager.getUsers( limit, page );

    res.send({ status: 'success', users: users.docs, ...users, docs: undefined });
  } catch (e) {
    next(e);
  };
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const manager = new UserManager();
    const user = await manager.getUser(id);

    res.send({ status: 'success', user });
  } catch (e) {
    next(e);
  };
};

export const addUser = async (req, res) => {
  try {
    const manager = new UserManager();
    const user = await manager.addUser(req.body);
    
    res.send({ status: 'success', user, message: 'User created.' });
  } catch (e) {
    next(e);
  };
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const manager = new UserManager();
    const result = await manager.updateUser(id, req.body);
  
    res.send({ status: 'success', result, message: 'User updated.' });
  } catch (e) {
    next(e);
  };
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const manager = new UserManager();
    await manager.deleteUser(id);
  
    res.send({ status: 'success', message: 'User deleted.' });
  } catch (e) {
    next(e);
  };
};