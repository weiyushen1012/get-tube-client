<template>
  <section>
    <b-notification type="is-info is-light" aria-close-label="Close notification" :closable="false" v-if="!isExpired">
      <p>Generated download link for this Video</p>
      <p>This link will expire in {{ expiration }} seconds</p>
      <br>
      <b-progress :type="isAlmostExpired ? 'is-danger' : 'is-info'" :value="expiration / 300 * 100"
                  size="is-small"></b-progress>
    </b-notification>

    <b-notification type="is-danger is-light" :closable="false" v-if="isExpired">
      <p>Download link is expired!</p>
      <br>
      <b-button @click="handleTryAgain">Try Again</b-button>
    </b-notification>
    <b-button type="is-success" class="btn" @click="handleDownloadLink" v-if="!isExpired">
      Download as .mp4
    </b-button>
  </section>
</template>

<script>
import { getEndpoint } from '@/services/util';

const endpoint = getEndpoint();

let timer;

export default {
  name: 'DownloadFile',
  data() {
    return {
      expiration: 300,
      isExpired: false,
      isAlmostExpired: false,
    };
  },
  props: ['filename'],
  created() {
    timer = setInterval(() => {
      if (this.expiration <= 0) {
        clearInterval(timer);
        this.expiration = 0;
        this.isExpired = true;
      } else {
        if (this.expiration <= 100) {
          this.isAlmostExpired = true;
        }
        this.expiration -= 1;
      }
    }, 1000);
  },
  methods: {
    async handleDownloadLink() {
      try {
        const response = await fetch(`${endpoint}/is_temp_file_exists/${this.filename}`);
        if (response.status === 200) {
          this.$emit('downloadSuccessful');
          window.location.href = `${endpoint}/send_video_file/${this.filename}`;
        } else {
          console.error('Error: Download link is no longer valid.');
          this.isExpired = true;
        }
      } catch (e) {
        console.error(e);
      }
    },
    handleTryAgain() {
      window.location.reload();
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
  width: 350px;
}

</style>
