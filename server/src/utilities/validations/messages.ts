const notExist = (object: string, field: string, fieldValue: string) =>
  `${object} with ${field} '${fieldValue}' does not exist!`;

const alreadyExist = (object: string, field: string, fieldValue: string) =>
  `The provided ${object} with ${field} '${fieldValue}' already exists!`;

const successByCreating = (object: string) => `${object} added successfully!`;

const errorByCreating = (object: string) => `Error while creating ${object}!`;

const successByUpdating = (object: string) => `${object} updated successfully!`;

const errorByUpdating = (object: string) => `Error while updating ${object}!`;

const successByDeleting = (object: string) => `${object} deleted successfully!`;

const errorByDeleting = (object: string) => `Error while deleting ${object}!`;

const required = (field: string) => `${field} is required`;

const minLength = (field: string, length: number) =>
  `${field} must be at least ${length} symbols long`;

const maxLength = (field: string, length: number) =>
  `${field} can't be more than ${length} symbols long`;

const unique = (field: string) => `${field} already exists`;

const invalidValue = (field: string) => `The value is not a valid value for ${field}`;

export { required,
  minLength,
  maxLength,
  unique,
  invalidValue,
  notExist,
  alreadyExist,
  successByCreating,
  errorByCreating,
  successByUpdating,
  errorByUpdating,
  successByDeleting,
  errorByDeleting,
 };
