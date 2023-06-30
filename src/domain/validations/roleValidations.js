import { body } from 'express-validator'

const allowedPermissions = [
    'addProduct',
    'updateProduct',
    'deleteProduct',
    'getRole',
    'getRoles',
    'addRole',
    'updateRole',
    'deleteRole',
    'getUsers',
    'getUser',
    'addUsers',
    'updateUser',
    'deleteUser',
    'getTickets',
    'getTicket',
  ];

export const roleValidation = [
    body('name', 'Role name is required.')
        .trim()
        .notEmpty()
        .isAlphanumeric()
        .escape(),
    body('permissions')
        .trim()
        .custom((value) => {
            for (const permission of value) {
              if (!allowedPermissions.includes(permission)) {
                throw new Error(`Invalid permission. You can only enter these permissions: ${allowedPermissions}.`);
              }
            }
            return true;
          }),
];