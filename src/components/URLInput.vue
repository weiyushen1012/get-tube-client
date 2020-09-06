<template>
  <section>
    <b-input placeholder="Youtube Link..."
             type="search"
             icon="magnify"
             v-model="url"
             @input="handleInput"
    >
    </b-input>
    <b-button type="is-primary" class="btn" @click="handleSearch">Search</b-button>
    <a class="button is-success btn download-btn" v-if="showDownloadBtn" v-bind:href="fileLocation">Download</a>
  </section>
</template>

<script>
const endpoint = 'http://localhost:5000';

export default {
  name: 'URLInput',
  data: function () {
    return {
      url: '',
      fileLocation: '',
      showDownloadBtn: false
    };
  },
  methods: {
    handleSearch: async function () {
      this.$emit('videoProcessing');

      const response = await fetch(`${endpoint}/download_from_tube`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: this.url})
      });

      const data = await response.json();
      this.fileLocation = `${endpoint}/send_video_file/${data.filename}`;
      this.showDownloadBtn = true;

      this.$emit('videoProcessed');
    },
    handleInput: function (value) {
      this.$emit('urlInput', value);
    }
  }
};
</script>

<style scoped>
section {
  margin-top: 5vh;
  max-width: 500px;
  flex-grow: 1;
}

.btn {
  margin-top: 0.8em;
  width: 120px;
}

.download-btn {
  margin-left: 0.8em;
}
</style>
