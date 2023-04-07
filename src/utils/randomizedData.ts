import { shortUuid } from './getUuid';

const getRandomEmail = () => {
  return `${shortUuid()}@user.com`;
};

export { getRandomEmail };
