import apiUrlParts from './api-url-parts';
import config from '../../../app.config';

export const API_PATH = `http://${config.serverHost}:${config.serverPort}${config.apiUrl}`;

export const GET_MATERIAL_EDITOR_3D_MODELS_LIST = `${API_PATH}${apiUrlParts.MATERIAL_EDITOR_URL_PART}${apiUrlParts.GET_3D_MODELS_LIST_URL_SUFIX}`;
export const GET_SHADER_EDITOR_3D_MODELS_LIST = `${API_PATH}${apiUrlParts.SHADER_EDITOR_URL_PART}${apiUrlParts.GET_3D_MODELS_LIST_URL_SUFIX}`;
