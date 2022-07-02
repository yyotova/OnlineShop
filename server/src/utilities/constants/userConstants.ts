export const userConstants = {
  email: {
    minLength: 8,
    maxLength: 30,
  },
  password: {
    minLength: 8,
    maxLength: 30,
    matchError:
      "Password must contain 1 uppercase, 1 lowercase, 1 number and one special case character.",
  },
};
