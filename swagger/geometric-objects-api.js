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
            properties: {
              jobID: {
                required: true,
                type: 'string',
                example: '23423456543'
              },
              request: {
                required: true,
                type: 'schema',
                example: {
                  eventId: 'mathmaticial',
                  numberRequired: 500
                }
              }
            }
          }
        }
      }
    }
  }
};
