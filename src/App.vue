<template>
  <div id="app" class="container">
    <main>
      <URLInput @videoProcessing="handleVideoProcessing" @videoProcessed="handleVideoProcessed" />
    </main>
    <VideoPreview v-bind:show-preview="showPreview" v-bind:videoId="videoId" />
    <b-loading :is-full-page="true" :can-cancel="false" :active="loading"></b-loading>
  </div>
</template>

<script>
import URLInput from '@/components/URLInput';
import VideoPreview from '@/components/VideoPreview';

export default {
  name: 'App',
  data: function () {
    return {
      showPreview: false,
      videoId: '',
      loading: false
    };
  },
  components: {
    URLInput,
    VideoPreview,
  },
  methods: {
    handleVideoProcessed: function () {
      this.loading = false;
    },
    handleVideoProcessing: function () {
      this.loading = true;
    }
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
