<script>
import ModalWindow from './common/components/modal-window/ModalWindow.vue';

export default {
  name: 'Test',
  components: {
    ModalWindow
  },
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
      },

      isOpen: false
    };
  },
  methods: {
    normalize(data, idKey) {
      const ids = [];
      const entities = {};

      for (let i = 0; i < data.length; i++) {
        ids.push(data[i][idKey]);
        entities[data[i][idKey]] = data[i];
      }

      return { ids, entities };
    },
    onToggleModalWindow() {
      this.isOpen = !this.isOpen;
    },
    onOverlayClose() {
      this.isOpen = false;
    }
  },
  mounted() {
    // const materialsSchema = new schema.Entity('materials', {}, { idAttribute: 'uuid' });
    // const materialsListSchema = new schema.Array(materialsSchema); // [materialsSchema]

    // const responseSchema = new schema.Object({ materials: new schema.Array(materialsSchema) }); // {materials: [materialsSchema]}

    // const normalizedScene = normalize(this.scene, responseSchema);
    // console.log(normalizedScene);

    // const normalizedMaterials = normalize(this.scene.materials, materialsListSchema);
    // console.log(normalizedMaterials);
  }
};
</script>

<template>
  <div class='test'>
    <button type="button" @click="onToggleModalWindow">Btn</button>

  <modal-window сloseByOverlayClick v-if="isOpen" isDraggable isResizable :onOverlayClose="onOverlayClose">
    modalwindow test
  </modal-window>

  </div>
</template>
