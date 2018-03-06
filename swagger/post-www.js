module.exports = {
  '/path/to/method': {
    post: {
      tags: [
        'Tag1'
      ],
      description: 'what this API doeswwwwwww',
      operationId: 'for the URL',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Job Parameters',
          in: 'body',
          description: 'Job to add to the database',
          required: true,
          schema: {
            $ref: '#/definitions/create'
          }
        }
      ],
      responses: {
        200: {
          description: 'create response',
          schema: {
            $ref: '#/definitions/response'
          }
        }
      }
    }
  }
};
