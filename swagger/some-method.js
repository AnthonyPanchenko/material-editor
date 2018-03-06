module.exports = {
  '/path/to/method/{someVariable}': {
    'delete': {
      tags: ['Tag1'],
      description: 'Deletes a something',
      operationId: 'delete',
      produces: ['application/json'],
      parameters: [
        {
          name: 'someVariable',
          in: 'path',
          description: 'ID to delete',
          required: true,
          type: 'string'
        }
      ],
      responses: {
        200: {
          description: 'delete response',
          schema: {
            $ref: '#/definitions/deleteRes'
          }
        }
      }
    },

    get: {
      tags: ['Tag1'],
      description: 'Returns the status of something',
      operationId: 'findById',
      produces: ['application/json'],
      parameters: [
        {
          name: 'ID',
          in: 'path',
          description: 'ID to fetch',
          required: true,
          type: 'string'
        }
      ],
      responses: {
        200: {
          description: 'response',
          schema: {
            $ref: '#/definitions/response1'
          }
        }
      }
    }
  }
};
