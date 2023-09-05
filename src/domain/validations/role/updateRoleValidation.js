import z from 'zod';

const allowedPermissions = [
  'addProduct', 'updateProduct', 'deleteProduct', 'getRole', 'getRoles', 'addRole', 'updateRole', 'deleteRole', 'getUsers', 'getUser', 'addUsers', 'updateUser', 'deleteUser', 'getTickets', 'getTicket',
];

export function permissionValidation(roles) {
  for (const permission of roles) {
    if (!allowedPermissions.includes(permission)) {
      throw new Error(`Invalid permission. You can only enter these permissions: ${allowedPermissions}.`);
    }
}}

const updateRoleValidation = z.object({
  name: z
    .string()
    .min(3)
    .max(15)
    .optional(),
  permissions: z
    .string()
    .array()
    .refine(async (permission) => await permissionValidation(permission), {
        message: 'Invalid permission.',
        path: ['permissions'],
    })
    .optional()
});

export default updateRoleValidation;