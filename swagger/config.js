
module.exports = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Sample spec',
    description: 'Sample spec for Swagger',
    termsOfService: 'http://swagger.io/terms/'
  },
  basePath: '/swagger/config',
  tags: [
    {
      name: 'Tag1',
      description: 'API for something'
    }
  ],
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],

  paths: {},

  definitions: {
    create: {
      properties: {
        eventId: {
          required: true,
          type: 'string',
          example: 'mathmaticial'
        },
        numberRequired: {
          required: true,
          type: 'integer',
          format: 'int64',
          example: 500
        }
      }
    },
    response1: {
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
    },
    response: {
      properties: {
        jobID: {
          required: true,
          type: 'string',
          example: '12321432423'
        }
      }
    },
    'delete': {
      properties: {
        jobID: {
          required: true,
          type: 'string',
          example: '234344234234'
        },
        status: {
          required: true,
          type: 'string',
          example: 'deleted'
        }
      }
    },
    '400error': {
      properties: {
        message: {
          type: 'string',
          example: '400 Bad Request'
        }
      }
    }
  }
};
