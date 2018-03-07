const api = require('../common/api');

module.exports = {
  [`${api.MATERIAL_EDITOR_URL_PART}${api.GEOMETRIC_OBJECTS_URL_SUFIX}`]: {
    get: {
      tags: ['MaterialEditor > geometric objects'],
      description: 'Returns geometric objects list',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'response',
          schema: {
            type: 'array',
            items: {
              type: 'object',
              required: ['_id', 'title'],
              properties: {
                _id: {
                  type: 'string',
                  example: '5a989a50017fada107a73823'
                },
                title: {
                  type: 'string',
                  example: 'Sphere'
                }
              }
            }
          }
        }
      }
    }
  }
};
