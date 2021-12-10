import bcrypt from 'bcryptjs';

const validatePassword = (pass: string, hash: string) => {
  bcrypt.compare(pass, hash);
};

const hashPassword = async (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject("Error generating salt");
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return reject("Error hashing password");
        }
        resolve(hash);
      });
    });
  });
};

export { hashPassword, validatePassword };