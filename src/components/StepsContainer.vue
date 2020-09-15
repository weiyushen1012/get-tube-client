<template>
  <b-steps class="step-container" v-model="activeStep" :has-navigation="false" size="is-small" :destroy-on-hide="true">
    <b-step-item
        step="1"
        class="step-content"
        label="Get Link"
        :clickable="false"
    >
      <URLInput @videoProcessing="handleVideoProcessing" @videoProcessed="handleVideoProcessed"
                @urlInput="handleUrlInput" />
    </b-step-item>

    <b-step-item
        step="2"
        class="step-content"
        label="Download Video"
        :clickable="false"
    >
      <DownloadFile v-bind:filename="filename" @downloadSuccessful="handleDownloadSuccessful" />
    </b-step-item>

    <b-step-item
        step="3"
        class="step-content"
        label="Done!"
        :clickable="false"
    >
      <Successful />
    </b-step-item>
  </b-steps>
</template>

<script>
import URLInput from '@/components/URLInput';
import DownloadFile from '@/components/DownloadFile';
import Successful from '@/components/Successful';

export default {
  name: 'StepsContainer',
  props: ['filename'],
  components: {
    URLInput,
    DownloadFile,
    Successful
  },
  methods: {
    handleUrlInput(value) {
      this.$emit('urlInput', value);
    },
    handleVideoProcessing() {
      this.$emit('videoProcessing');
    },
    handleVideoProcessed(filename) {
      this.$emit('videoProcessed', filename);
      this.activeStep = 1;
    },
    handleDownloadSuccessful() {
      this.activeStep = 2;
    }
  },
  data() {
    return {
      activeStep: 0,
    };
  },
};
</script>

<style scoped>
.step-content {
  margin-top: 1em;
  display: flex;
  justify-content: center;
  text-align: center;
}

.step-container {
  margin: 1em;
}
</style>
