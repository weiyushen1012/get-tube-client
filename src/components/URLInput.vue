<template>
  <section>
    <b-input placeholder="Youtube Link..."
             type="search"
             icon="magnify"
             v-model="url"
             @input="handleInput"
    />
    <b-tooltip label="Copy URL from clipboard" position="is-bottom" v-if="isShowingFromClipboard">
      <b-button class="sm-btn" icon-left="clipboard-file" @click="handleUrlFromClipboard"></b-button>
    </b-tooltip>
    <b-button type="is-primary" class="btn" @click="handleSearch" v-bind:disabled="url.length === 0">
      Get Download Link
    </b-button>
    <a class="button is-success btn" v-if="showDownloadBtn" v-bind:href="fileLocation">Download as .mp4</a>
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
      showDownloadBtn: false,
      isShowingFromClipboard: false
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
    },
    handleUrlFromClipboard: async function () {
      try {
        const result = await navigator.permissions.query({name: 'clipboard-read'});

        if (result.state === 'granted' || result.state === 'prompt') {
          this.url = await navigator.clipboard.readText();
          this.$emit('urlInput', this.url);
        }
      } catch (e) {
        console.error(e);
      }
    }
  },
  created: async function () {
    try {
      const result = await navigator.permissions.query({name: 'clipboard-read'});

      if (result.state === 'granted' || result.state === 'prompt') {
        this.isShowingFromClipboard = true;
      }
    } catch (e) {
      console.error(e);
      this.isShowingFromClipboard = false;
    }
  }
};
</script>

<style scoped>
section {
  max-width: 500px;
  flex-grow: 1;
}

.btn {
  margin-top: 0.8em;
  margin-right: 0.8em;
  width: 180px;
}

.sm-btn {
  margin-top: 0.8em;
  margin-right: 0.8em;
}

</style>
