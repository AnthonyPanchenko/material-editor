const mockData = {
  meGeoObjects: [
    { id: 'qwwe1e234', title: 'Plane' },
    { id: 're24w4wer', title: 'Sphere' },
    { id: 'ewr3t4rdg', title: 'Torus' },
    { id: 'dfg536733', title: 'Cylinder' }
  ],

  seGeoObjects: [
    { id: 'qwwe1e234', title: 'Robot' },
    { id: 're24w4wer', title: 'Sphere' }
  ],

  glslPrograms: [
    {
      _id: '937cbab7-1d7b-4595-83df-a8a922e4ea1c',
      name: 'Lava shader',
      previewBgUlr: 'https://image.prntscr.com/image/Om6gkrqOR2K7cSvsGDO_Hg.png'
    },
    {
      _id: '99aab20e-38ea-4cd3-9bad-62ba5d90ee80',
      name: 'Sun and sky shader',
      previewBgUlr: 'https://image.prntscr.com/image/PZn_2UP7QfuKwV5uC-i0Dg.png'
    },
    {
      _id: 'b2e0adc5-adb8-4bfc-883a-0e8de8933449',
      name: 'Water shader',
      previewBgUlr: 'https://image.prntscr.com/image/QtNVooDGTb6gwD_ywLlJyA.png'
    },
    {
      _id: '044ea043-1cfd-4e27-8be8-937bae42655c',
      name: 'Some shader',
      previewBgUlr: ''
    }
  ],

  fullGlslProgram: {
    _id: '937cbab7-1d7b-4595-83df-a8a922e4ea1c',
    name: 'Lava shader',
    previewBgUlr: 'https://image.prntscr.com/image/Om6gkrqOR2K7cSvsGDO_Hg.png',

    shaders: {
      fragmentShader: 'uniform float u_time;',
      vertexShader: 'uniform vec2 u_resolution;'
    },

    controls: {
      fragmentShader: {
        attributes: [
          {
            _id: 'b49197bd-e97b-4567-b7d9-b852930722f2',
            value: [0.43, -0.23, 0.56, 0.23, 1, -0.67, 0.2, 0.6, -1],
            name: 'matrix3x3',
            mode: 'matrix',
            dataType: 'mat3'
          },
          {
            _id: 'ba431408-b660-46b6-b0c0-2245ceac0b55',
            value: 0.16,
            name: 'numberValue',
            mode: 'number',
            dataType: 'float'
          }
        ],
        uniforms: [
          {
            _id: '643ec621-9587-4c66-8f9c-b77cec0eb37b',
            value: [0.25, 0.78, -0.4],
            name: 'pointVector',
            mode: 'vector',
            dataType: 'vec3'
          },
          {
            _id: 'e7182e28-10cf-45fe-8b14-da7579a22c14',
            value: [70, 70, 220, 1],
            name: 'bgColor',
            mode: 'color',
            dataType: 'vec4'
          },
          {
            _id: 'ac67ef7c-2486-4dd2-ae57-4cec4d06719f',
            value: [0.35, -0.53],
            mode: 'vector',
            name: 'positionVector',
            dataType: 'vec2'
          }
        ],
        textures: [
          {
            _id: '112c2b71-d8d0-408c-9036-efe0f1549700',
            value: 'https://image.prntscr.com/image/lAsuUdTFQ6uf8YCr3edGTQ.png',
            mode: 'vector',
            name: 'texture_stones',
            dataType: 'sampler2D'
          },
          {
            _id: '87baca02-2aa3-4c40-b315-7f91b678c4cc',
            value: 'https://image.prntscr.com/image/9bbPbzteR0yUzDm4QzldQw.png',
            mode: 'texture',
            name: 'texture_wall',
            dataType: 'sampler2D'
          }
        ]
      },
      vertexShader: {
        attributes: [
          {
            _id: 'ba431408-b660-46b6-b0c0-2245ceac0b55',
            value: 0.16,
            name: 'numberValue',
            mode: 'number',
            dataType: 'float'
          }
        ],
        uniforms: [
          {
            _id: 'e7182e28-10cf-45fe-8b14-da7579a22c14',
            value: [70, 70, 220, 1],
            name: 'bgColor',
            mode: 'color',
            dataType: 'vec4'
          },
          {
            _id: 'ac67ef7c-2486-4dd2-ae57-4cec4d06719f',
            value: [0.35, -0.53],
            mode: 'vector',
            name: 'positionVector',
            dataType: 'vec2'
          }
        ],
        textures: [
          {
            _id: '87baca02-2aa3-4c40-b315-7f91b678c4cc',
            value: 'https://image.prntscr.com/image/9bbPbzteR0yUzDm4QzldQw.png',
            mode: 'texture',
            name: 'texture_wall',
            dataType: 'sampler2D'
          }
        ]
      }
    }
  },

  getNotifications: [
    {
      id: 'wte235tet',
      status: 'success',
      title: 'This is SUCCESS',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
    },
    {
      id: 'sf76567sgtet',
      status: 'warning',
      title: 'This is WARNING',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
    },
    {
      id: 'df34589g66sujrt',
      status: 'info',
      title: 'This is INFO',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
    },
    {
      id: 'qwt67457uirtyi',
      status: 'danger',
      title: 'This is DANGER',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!'
    }
  ]

};

module.exports = mockData;
