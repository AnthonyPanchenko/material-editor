const api = require('../common/api');

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

const remove = {
  tags: ['GLSL programs'],
  summary: '',
  description: '',
  produces: ['application/json'],
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Glsl program "id" to delete',
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
    post
  },
  [`${api.GLSL_PROGRAMS_URL_PART}/{id}`]: {
    delete: remove
  }
};
