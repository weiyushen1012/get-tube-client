<template>
  <youtube v-bind:video-id="videoId" v-if="showPreview"/>
</template>

<script>
export default {
  name: "VideoPreview",
  props: ['showPreview', 'videoId']
}
</script>

<style scoped>
</style>
