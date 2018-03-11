const api = require('../common/api');

const get = {
  tags: ['GLSL programs'],
  description: 'Returns GLSL programs list',
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
            bgUlr: {
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
  summary: '',
  description: 'Create GLSL program',
  produces: ['application/json'],
  parameters: [
    {
      in: 'body',
      name: 'body',
      description: '',
      required: true,
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Glsl program'
          }
        }
      }
    }
  ],
  responses: {
    201: {
      description: 'Created',
      required: ['_id', 'name'],
      schema: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '5a989a50017fada107a73823'
          },
          name: {
            type: 'string',
            example: 'Glsl program'
          }
        }
      }
    }
  }
};

const put = {
  tags: ['GLSL programs'],
  summary: '',
  description: '',
  produces: ['application/json'],
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
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'New GLSL name'
          }
        }
      }
    }
  ],
  responses: {
    200: {
      description: 'Updated'
    }
  }
};

const remove = {
  tags: ['GLSL programs'],
  summary: '',
  description: '',
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
    put,
    delete: remove
  }
};
