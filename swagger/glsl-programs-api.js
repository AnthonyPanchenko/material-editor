const withoutProps = require('./utils/withoutProps');
const api = require('../common/api');

const controlSchema = {
  type: 'array',
  items: {
    type: 'object',
    required: ['_id', 'value', 'mode', 'name', 'dataType'],
    properties: {
      _id: {
        type: 'string',
        example: '76df9a5ss17f34a107873hj3'
      },
      value: {
        oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'array' }],
        example: [0.23, -0.5]
      },
      mode: { type: 'string', example: 'vector' },
      name: { type: 'string', example: 'positionVector' },
      dataType: { type: 'string', example: 'vec2' }
    }
  }
};

const controlsfv = {
  type: 'object',
  required: ['attributes', 'uniforms', 'textures'],
  properties: {
    attributes: controlSchema,
    uniforms: controlSchema,
    textures: controlSchema
  }
};

const fullModelSchema = {
  type: 'object',
  required: ['_id', 'name', 'shaders', 'controls'],
  properties: {
    _id: {
      type: 'string',
      example: '5a989a50017fada107a73823'
    },
    previewBgUlr: {
      type: 'string',
      example: 'http://localhost:3000/image/Om6gkrqOR2K7cSvsGDO.jpg'
    },
    name: {
      type: 'string',
      example: 'Lava shader'
    },
    shaders: {
      type: 'object',
      required: ['fragmentShader', 'vertexShader'],
      properties: {
        fragmentShader: { type: 'string', example: 'shader code' },
        vertexShader: { type: 'string', example: 'shader code' }
      }
    },
    controls: {
      type: 'object',
      required: ['fragmentShader', 'vertexShader'],
      properties: {
        fragmentShader: controlsfv,
        vertexShader: controlsfv
      }
    }
  }
};

const getFullOrPartOfGLSLProgramById = {
  tags: ['GLSL programs'],
  summary: 'Get one/part GLSL program by ID',
  description: 'Get one or part GLSL program by ID',
  produces: ['application/json'],
  parameters: [
    {
      in: 'path',
      name: 'id',
      description: 'GLSL program ID',
      required: true,
      type: 'string'
    },
    {
      in: 'query',
      name: 'fieldName',
      description: 'fieldName should be equal either "shaders" or "controls"',
      type: 'string'
    }
  ],
  responses: {
    200: {
      description: 'Response',
      schema: {
        oneOf: [fullModelSchema, fullModelSchema.shaders, fullModelSchema.controls]
      }
    }
  }
};

const get = {
  tags: ['GLSL programs'],
  summary: 'Get all GLSL programs',
  description: 'Get all GLSL programs',
  produces: ['application/json'],
  responses: {
    200: {
      description: 'Response',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          required: ['_id', 'name'],
          properties: {
            _id: {
              type: 'string',
              example: '5a989a50017fada107a73823'
            },
            previewBgUlr: {
              type: 'string',
              example: 'http://localhost:3000/image/Om6gkrqOR2K7cSvsGDO.jpg'
            },
            name: {
              type: 'string',
              example: 'Lava shader'
            }
          }
        }
      }
    }
  }
};

const post = {
  tags: ['GLSL programs'],
  summary: 'Create GLSL program',
  description: 'Create GLSL program',
  produces: ['application/json'],
  consumes: ['application/json'],
  parameters: [
    {
      in: 'body',
      name: 'name',
      description: '',
      required: true,
      schema: withoutProps(fullModelSchema, ['_id', 'required'])
    }
  ],
  responses: {
    201: {
      description: 'Created',
      schema: fullModelSchema
    }
  }
};

const put = {
  tags: ['GLSL programs'],
  summary: 'Update GLSL program',
  description: 'Update GLSL program',
  produces: ['application/json'],
  consumes: ['application/json'],
  parameters: [
    {
      in: 'path',
      name: 'id',
      description: 'GLSL program ID that need to be updated',
      required: true,
      type: 'string'
    },
    {
      in: 'body',
      name: 'name',
      description: 'Updated GLSL program name',
      required: true,
      schema: withoutProps(fullModelSchema, ['_id', 'required'])
    }
  ],
  responses: {
    200: {
      description: 'Updated',
      schema: fullModelSchema
    }
  }
};

const remove = {
  tags: ['GLSL programs'],
  summary: 'Remove GLSL program',
  description: 'Remove GLSL program',
  produces: ['application/json'],
  parameters: [
    {
      in: 'path',
      name: 'id',
      description: 'Glsl program ID to delete',
      required: true,
      type: 'string'
    }
  ],
  responses: {
    200: {
      description: 'Glsl program has removed'
    },
    422: {
      description: 'Error to remove GLSL program',
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Cannot remove glsl program by id'
          }
        }
      }
    }
  }
};

module.exports = {
  [api.GLSL_PROGRAMS_URL_PART]: {
    get,
    post
  },
  [`${api.GLSL_PROGRAMS_URL_PART}/{id}`]: {
    get: getFullOrPartOfGLSLProgramById,
    put,
    delete: remove
  }
};
