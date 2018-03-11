const api = require('../common/api');

const get = {
  tags: ['Geometric objects'],
  description: 'Returns geometric objects list',
  produces: ['application/json'],
  responses: {
    200: {
      description: 'response',
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
            name: {
              type: 'string',
              example: 'Sphere'
            }
          }
        }
      }
    }
  }
};

module.exports = {
  [`${api.MATERIAL_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}`]: {
    get
  }
};
