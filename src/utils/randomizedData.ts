import { shortUuid } from './getUuid';

const getRandomEmail = async () => {
  const uuid = await shortUuid();
  return `${uuid}@user.com`;
};

export { getRandomEmail };
