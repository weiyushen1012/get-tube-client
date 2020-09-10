<template>
  <div id="app" class="container">
    <main>
      <URLInput @videoProcessing="handleVideoProcessing" @videoProcessed="handleVideoProcessed"
                @urlInput="handleUrlInput" />
    </main>

    <br>

    <main v-if="showPreview">
      <VideoPreview v-bind:videoId="videoId" />
    </main>

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
    },
    handleUrlInput: function (value) {
      const delimiter = 'watch?v=';

      if (!value.includes(delimiter) || value.split(delimiter).length < 2 || !value.split(delimiter)[1]) {
        this.showPreview = false;
        return;
      }

      this.showPreview = value.length > 0;
      this.videoId = value.split(delimiter)[1];
    }
  }
};
</script>

<style>
:root {
  overflow: hidden;
}

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
