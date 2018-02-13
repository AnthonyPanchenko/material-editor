import api from '../../../common/api';

export const API_SERVER = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3000' : 'https://material-editor.herokuapp.com';

export const API_PREFIX = `${API_SERVER}${api.API_PATH}`;

export const MATERIAL_EDITOR_GEOMETRIC_OBJECTS = `${API_PREFIX}${api.MATERIAL_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}`;
export const SHADER_EDITOR_GEOMETRIC_OBJECTS = `${API_PREFIX}${api.SHADER_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}`;
export const GLSL_PROGRAMS = `${API_PREFIX}${api.GLSL_PROGRAMS_URL_PART}`;
