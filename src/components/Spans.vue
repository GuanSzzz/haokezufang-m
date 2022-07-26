<template>
  <span
    class="hxSel"
    @click="clickFn(value)"
    :class="{ activeSpan: isActive }"
    >{{ value.label }}</span
  >
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    clickFn(val) {
      this.isActive = !this.isActive
      if (this.isActive) {
        console.log(val)
      }
    }
  }
}
</script>

<style scoped lang="less">
.hxSel {
  display: inline-block;
  height: 33px;
  width: 69px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 3px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  color: #888;
}
.activeSpan {
  border: 1px solid #21b97a;
  color: #21b97a;
  background-color: #defaef;
}
</style>
