<template>
  <div id="app" class="container">
    <br>
    <StepsContainer @videoProcessing="handleVideoProcessing" @videoProcessed="handleVideoProcessed"
                    @urlInput="handleUrlInput" v-bind:filename="filename" />

    <main v-if="showPreview">
      <VideoPreview v-bind:videoId="videoId" />
    </main>

    <b-loading :is-full-page="true" :can-cancel="false" :active="loading"></b-loading>
  </div>
</template>

<script>
import StepsContainer from '@/components/StepsContainer';
import VideoPreview from '@/components/VideoPreview';

export default {
  name: 'App',
  data: function () {
    return {
      showPreview: false,
      videoId: '',
      loading: false,
      steps: 1,
      filename: '',
    };
  },
  components: {
    VideoPreview,
    StepsContainer
  },
  methods: {
    handleVideoProcessed: function (filename) {
      this.loading = false;
      this.filename = filename;
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
  overflow: auto;
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
