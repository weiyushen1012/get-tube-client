<template>
  <youtube v-bind:video-id="videoId" />
</template>

<script>
export default {
  name: "VideoPreview",
  props: ['videoId']
}
</script>

<style scoped>
</style>
