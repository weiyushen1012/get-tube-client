<template>
  <div id="app" class="container">
    <main>
      <URLInput />
    </main>
    <VideoPreview v-bind:show-preview="showPreview" />
  </div>
</template>

<script>
import URLInput from '@/components/URLInput';
import VideoPreview from '@/components/VideoPreview';

export default {
  name: 'App',
  data: function () {
    return {
      showPreview: false
    };
  },
  components: {
    URLInput,
    VideoPreview,
  }
};
</script>

<style>
body {
  height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
}

main {
  display: flex;
  justify-content: center;
}
</style>
