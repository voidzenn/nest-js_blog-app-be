import { shortUuid } from './getUuid';

const getRandomEmail = () => {
  const uuid = shortUuid();
  return `${uuid}@user.com`;
};

export { getRandomEmail };
