<template lang="html">
  <div class="image-container">
    <img :src="image.asset.metadata.lqip" :data-srcset="srcset" class='lazyload' data-sizes="auto">
  </div>
</template>

<script>
const widths = [500, 1000, 1500, 2000]

export default {
  data () {
    return {
      width: null
    }
  },
  props: {
    image: Object
  },
  computed: {
    srcset: function () {
      return widths.map(width => `${this.image.asset.url}?w=${width} ${width}w`).join(', ')
    }
  }
}
</script>

<style lang="css">
</style>
