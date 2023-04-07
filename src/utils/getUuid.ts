import { v4 as uuidv4 } from 'uuid';
const uuid = () => {
  return uuidv4().toString();
};
const shortUuid = () => {
  return uuid().slice(0, 10);
};

export { uuid, shortUuid };
