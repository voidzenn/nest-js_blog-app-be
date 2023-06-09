import { v4 as uuidv4 } from 'uuid';
const uuid: string = uuidv4().toString();
const shortUuid: string = uuid.slice(0, 10);

export { uuid, shortUuid };
