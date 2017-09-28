import config from '../../../app.config';

export const API_PATH = `http://${config.serverHost}:${config.serverPort}${config.apiUrl}`;

export const MATERIAL_EDITOR_URL_PART = '/material-editor';
export const SHADER_EDITOR_URL_PART = '/shader-editor';

export const ITEM_OBJ_LIST_URL_SUFIX = '/item-obj-list';

export const GET_MATERIAL_EDITOR_ITEM_OBJ_LIST = `${API_PATH}${MATERIAL_EDITOR_URL_PART}${ITEM_OBJ_LIST_URL_SUFIX}`;
export const GET_SHADER_EDITOR_ITEM_OBJ_LIST = `${API_PATH}${SHADER_EDITOR_URL_PART}${ITEM_OBJ_LIST_URL_SUFIX}`;
