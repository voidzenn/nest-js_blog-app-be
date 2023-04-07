import { v4 as uuidv4 } from 'uuid';
const uuid = async () => {
  const getUuid = await uuidv4();
  return getUuid;
};
const shortUuid = async () => {
  return await uuid().then((res) => res.slice(0, 10));
};

export { uuid, shortUuid };
