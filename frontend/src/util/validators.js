export const validateUsername = (username) => {
  const errors = [];
  if (username.length < 3) {
    errors.push('Username must be greater than 3 characters');
  }
  if (username.length > 32) {
    errors.push('Username must be less than 32 characters');
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain alphanumeric characters');
  }
  if (username.trim() !== username) {
    errors.push('Username cannot start or end with whitespaces');
  }
  return errors;
};

export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) {
    errors.push('Password must be greater than 8 characters');
  }
  if (password.length > 64) {
    errors.push('Password must be less than 64 characters');
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
    errors.push(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    );
  }
  return errors;
};
