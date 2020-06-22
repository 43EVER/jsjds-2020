<template>
<textarea
  :value="value"
  rows="5" 
  cols="5"
  @input="onChange($event)"
  @mousedown.stop
  />
</template>

<script>
export default {
  props: ['initial', 'readonly', 'emitter', 'ikey', 'type', 'change', 'getData', 'putData'],
  data() {
    return {
      value: this.initial || 0,
    }
  },
  methods: {
    parse(value) {
      return this.type === 'number' ? +value : value;
    },
    onChange(e){
      this.value = this.parse(e.target.value);
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
textarea
  background-color: white
  padding: 2px 6px
  width: 200px
  height: 200px
</style>
