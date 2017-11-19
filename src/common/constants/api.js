import api from './api-url-parts';

export const API_SERVER = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3000' : 'https://material-editor.herokuapp.com';

export const API_PREFIX = `${API_SERVER}${api.API_PATH}`;

export const GET_MATERIAL_EDITOR_3D_MODELS_LIST = `${API_PREFIX}${api.MATERIAL_EDITOR_URL_PART}${api.GET_3D_MODELS_LIST_URL_SUFIX}`;
export const GET_SHADER_EDITOR_3D_MODELS_LIST = `${API_PREFIX}${api.SHADER_EDITOR_URL_PART}${api.GET_3D_MODELS_LIST_URL_SUFIX}`;
