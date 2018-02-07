<script>

export default {
  name: 'ShadersModal',
  components: {
    CustomBtn,
  },
  data() {
    return {
      title: 'ItemObjList',
    };
  },
  beforeMount() {
    this.get3dModelsList();
  },
  methods: {
    ...mapActions(['onRemoveItemObjById', 'onSuccessLoadObjects']),
    onSetVisibleObjById(objId) {
      console.log(objId);
    },
    onSelectObjById(objId) {
      console.log(objId);
    },
    get3dModelsList() {
      this.$http({
        url: api.MATERIAL_EDITOR_GEOMETRIC_OBJECTS,
        method: 'GET',
        // credentials: true,
        before: () => {
          console.log('start to run spinner');
        },
      }).then(res => {
        this.onSuccessLoadObjects(res.body);
      }, res => {
        console.log('error', res);
      });
    }
  }
}
</script>

<template>
  <transition name="fade">

  </transition>
</template>
