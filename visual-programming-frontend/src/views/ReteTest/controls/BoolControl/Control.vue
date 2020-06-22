<template>
    <input
  :type="'checkbox'"
  :readonly="readonly"
  @input="onChange($event)"
  @mousedown.stop
  />
</template>

<script>
export default {
  props: ['initial', 'readonly', 'emitter', 'ikey', 'type', 'change', 'getData', 'putData'],
  data() {
    return {
      value: false,
    }
  },
  methods: {
    parse(value) {
      return Boolean(value);
    },
    onChange(e){
        this.value = e.target.checked
        this.update();
    },
    update() {
      if (this.ikey) {
        this.putData(this.ikey, this.value)
        this.change(this.value);
      }
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}
</script>


<style lang="sass" scoped>
input
  width: 100%
  border-radius: 30px
  background-color: white
  padding: 2px 6px
  border: 1px solid #999
  font-size: 110%
  width: 170px
</style>
