const notExist = (object: string, field: string, fieldValue: string) =>
  `${object} with ${field} '${fieldValue}' does not exist!`;

const alreadyExist = (object: string, field: string, fieldValue: string) =>
  "The provided ${object} with ${field} '${fieldValue}' already exists!";

const successByCreating = (object: string) => `${object} added successfully!`;

const errorByCreating = (object: string) => `Error while creating ${object}!`;

const successByUpdating = (object: string) => `${object} updated successfully!`;

const errorByUpdating = (object: string) => `Error while updating ${object}!`;

const successByDeleting = (object: string) => `${object} deleted successfully!`;

const errorByDeleting = (object: string) => `Error while deleting ${object}!`;

export {
  notExist,
  alreadyExist,
  successByCreating,
  errorByCreating,
  successByUpdating,
  errorByUpdating,
  successByDeleting,
  errorByDeleting,
};
