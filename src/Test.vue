<script>
import { normalize, schema } from 'normalizr';

export default {
  name: 'Test',
  data() {
    return {
      scene: {
        uuid: 'F6E2-5209FDD0A8FF-5209FDD0A8FF-A3FD',
        geometries: [
          {
            heightSegments: 15,
            radius: 3.5,
            type: 'SphereGeometry',
            uuid: '3C94C1CD-F6E2-4984-A3FD-5209FDD0A8FF',
            widthSegments: 15
          },
          {
            type: 'EdgesGeometry',
            uuid: '35E521F9-4714-43F6-9C0A-67466033961C'
          }
        ],
        materials: [
          {
            color: 13421772,
            depthFunc: 3,
            depthTest: true,
            depthWrite: true,
            emissiveIntensity: undefined,
            linewidth: undefined,
            rotation: undefined,
            side: 2,
            type: 'MeshBasicMaterial',
            uuid: '8491AC86-3E08-445C-9694-30E52DAA067C'
          },
          {
            color: 16777215,
            depthFunc: 3,
            depthTest: true,
            depthWrite: true,
            emissiveIntensity: undefined,
            linewidth: 2,
            rotation: undefined,
            type: 'LineBasicMaterial',
            uuid: '81D73E45-48ED-4667-AB7F-883A7099DB87',
            wireframeLinecap: undefined,
            wireframeLinejoin: undefined
          }
        ],
        object: {
          children: [
            {
              geometry: '35E521F9-4714-43F6-9C0A-67466033961C',
              material: '81D73E45-48ED-4667-AB7F-883A7099DB87',
              matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
              type: 'LineSegments',
              uuid: '4A0EFA38-1FF6-40C6-9FE6-327A25EAAFAB'
            }
          ],
          geometry: '3C94C1CD-F6E2-4984-A3FD-5209FDD0A8FF',
          material: '8491AC86-3E08-445C-9694-30E52DAA067C',
          matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
          type: 'Mesh',
          uuid: '87772536-53AF-455A-958F-E4D03079F222'
        }
      }
    };
  },
  methods: {
  },
  mounted() {
    // Define a materials schema
    const materialsSchema = new schema.Entity('materials', {}, { idAttribute: 'uuid' });
    const materialsListSchema = new schema.Array(materialsSchema);

    // // Define your comments schema
    // const comment = new schema.Entity('comments', {
    //   commenter: materials
    // });

    // // Define your article
    // const article = new schema.Entity('articles', {
    //   author: user,
    //   comments: [comment]
    // });

    const normalizedData = normalize(this.scene.materials, materialsListSchema);
    console.log(normalizedData);
  }
};
</script>

<template>
  <div class='test'>
    <h1>Test</h1>
  </div>
</template>
