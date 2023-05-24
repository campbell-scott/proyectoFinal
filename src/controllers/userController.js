import UserManager from "../managers/userManager.js";

export const getUsers = async  (req, res) =>
{
    const { limit, page } = req.query;
    const manager = new UserManager();

    const users = await manager.getUsers({ limit, page });

    res.send({ status: 'success', users: users.docs, ...users, docs: undefined });
};

export const getUser = async (req, res) =>
{
    const { id } = req.params;

    const manager = new UserManager();
    const user = await manager.getUser(id);

    res.send({ status: 'success', user });
};

export const addUser = async (req, res) =>
{
  const manager = new UserManager();
  const user = await manager.addUser(req.body);

  res.send({ status: 'success', user, message: 'User created.' })
};

export const updateUser = async (req, res) =>
{
  const { id } = req.params;

  const manager = new UserManager();
  const result = await manager.updateUser(id, req.body);

  res.send({ status: 'success', result, message: 'User updated.' })
};

export const deleteUser = async (req, res) =>
{
  const { id } = req.params;

  const manager = new UserManager();
  await manager.deleteUser(id);

  res.send({ status: 'success', message: 'User deleted.' })
};