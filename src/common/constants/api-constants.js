import config from '../../../config';

export const API_PATH = `http://${config.serverHost}:${config.serverPort}${config.apiUrl}`;

const apiConstants = {
  GET_USERS_LIST: `${API_PATH}/users`,
};

export default apiConstants;
