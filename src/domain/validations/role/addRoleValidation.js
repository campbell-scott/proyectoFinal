import z from 'zod';

const allowedPermissions = [
  "addProduct", "updateProduct", "deleteProduct", "getRole", "getRoles", "addRole", "updateRole", "deleteRole", "getUsers", "getUser", "addUsers", "updateUser", "deleteUser", "getTickets", "getTicket"
];

function permissionValidation(permissions) {
  const isValid = permissions.every(permission => allowedPermissions.includes(permission));

  if (!isValid) {
    throw new Error(`Invalid permissions found. Allowed permissions are: ${allowedPermissions.join(', ')}.`);
  }

  return true
}

const roleCreateValidation = z.object({
  name: z
    .string()
    .nonempty({ message: "Permission name is required." })
    .min(3)
    .max(15),
  permissions: z
    .string()
    .array()
    .refine(async (permissions) => await permissionValidation(permissions), {
      message: 'Invalid permission.',
      path: ['permissions'],
    }),
});

export default roleCreateValidation;