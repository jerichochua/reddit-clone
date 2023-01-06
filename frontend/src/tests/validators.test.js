import {
  validateUsername,
  validatePassword,
  validateTitle,
  validateContent,
} from '../util/validators';

it('correctly validates valid username', () => {
  expect(validateUsername('test')).toEqual([]);
});

it('correctly validates invalid username', () => {
  expect(validateUsername('te')).toEqual([
    'Username must be greater than 3 characters',
  ]);
  expect(validateUsername('testtesttesttesttesttesttesttesttesttest')).toEqual([
    'Username must be less than 32 characters',
  ]);
  expect(validateUsername('test!')).toEqual([
    'Username can only contain alphanumeric characters',
  ]);
  expect(validateUsername(' test')).toEqual([
    'Username can only contain alphanumeric characters',
    'Username cannot start or end with whitespaces',
  ]);
  expect(validateUsername('test ')).toEqual([
    'Username can only contain alphanumeric characters',
    'Username cannot start or end with whitespaces',
  ]);
});

it('correctly validates valid password', () => {
  expect(validatePassword('testTest1')).toEqual([]);
});

it('correctly validates invalid password', () => {
  expect(validatePassword('test')).toEqual([
    'Password must be greater than 8 characters',
    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  ]);
  expect(
    validatePassword(
      'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest'
    )
  ).toEqual([
    'Password must be less than 64 characters',
    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  ]);
  expect(validatePassword('testtest')).toEqual([
    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  ]);
  expect(validatePassword('TESTTEST')).toEqual([
    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  ]);
  expect(validatePassword('TESTTEST1')).toEqual([
    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  ]);
  expect(validatePassword('testtest1')).toEqual([
    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  ]);
});

it('correctly validates valid title', () => {
  expect(validateTitle('test')).toEqual([]);
});

it('correctly validates invalid title', () => {
  expect(validateTitle('te')).toEqual([
    'Title must have at least 3 characters',
  ]);
  expect(
    validateTitle(
      'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestte'
    )
  ).toEqual(['Title must have at most 128 characters']);
});

it('correctly validates valid content', () => {
  expect(validateContent('test')).toEqual([]);
});

it('correctly validates invalid content', () => {
  expect(validateContent('te')).toEqual([
    'Content must have at least 3 characters',
  ]);
});
