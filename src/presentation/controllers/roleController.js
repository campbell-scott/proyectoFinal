import RoleManager from '../../domain/managers/roleManager.js';


export const getRoles = async  (req, res, next) => {
  try {
    const { limit, page } = req.query;

    const manager = new RoleManager();
    const roles = await manager.getRoles( limit, page );

    res.send({ status: 'success', roles: roles.docs, ...roles, docs: undefined });
  } catch (e) {
		next(e);
	}
};

export const getRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const manager = new RoleManager();
    const role = await manager.getRole(id);

    res.send({ status: 'success', role });
  } catch (e) {
		next(e);
	}
};

export const addRole = async (req, res, next) => {
  try {
    const manager = new RoleManager();
    const role = await manager.addRole(req.body);

    res.send({ status: 'success', role, message: 'Role added.' });
  } catch (e) {
		next(e);
	}
};

export const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const manager = new RoleManager();
    const result = await manager.updateRole(id, req.body);

    res.send({ status: 'success', result, message: 'Role updated.' });
  } catch (e) {
		next(e);
	}
};

export const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const manager = new RoleManager();
    await manager.deleteRole(id);

    res.send({ status: 'success', message: 'Role deleted.' });
  } catch (e) {
		next(e);
	}
};