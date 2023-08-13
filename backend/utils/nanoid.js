import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet(
  '1234567890abcdefghijklmnoprstuvwyzABCDEFGHIJKLMNOPRSTUVWYZ',
  20
);

export default nanoid;
