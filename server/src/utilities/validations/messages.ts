const required = (field: string) => `${field} is required`;
const minLength = (field: string, length: number) =>
  `${field} must be at least ${length} symbols long`;
const maxLength = (field: string, length: number) =>
  `${field} can't be more than ${length} symbols long`;
const unique = (field: string) => `${field} already exists`;
const invalidValue = (field: string) => `The value is not a valid value for ${field}`;

export { required, minLength, maxLength, unique, invalidValue };