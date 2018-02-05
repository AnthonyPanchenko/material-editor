import api from './api-url-parts';

export const API_SERVER = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3000' : 'https://material-editor.herokuapp.com';

export const API_PREFIX = `${API_SERVER}${api.API_PATH}`;

export const MATERIAL_EDITOR_MESHES = `${API_PREFIX}${api.MATERIAL_EDITOR_URL_PART}${api.MESHES_URL_SUFIX}`;
export const SHADER_EDITOR_MESHES = `${API_PREFIX}${api.SHADER_EDITOR_URL_PART}${api.MESHES_URL_SUFIX}`;
export const SHADER_EDITOR_GLSL_PROGRAMS = `${API_PREFIX}${api.SHADER_EDITOR_URL_PART}${api.GLSL_PROGRAMS_URL_SUFIX}`;
