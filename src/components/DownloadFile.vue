<template>
  <section>
    <b-button type="is-success" class="btn" @click="handleDownloadLink">
      Download as .mp4
    </b-button>
  </section>
</template>

<script>
import { getEndpoint } from '@/services/util';

const endpoint = getEndpoint();

export default {
  name: 'DownloadFile',
  props: ['filename'],
  methods: {
    handleDownloadLink: async function () {
      try {
        const response = await fetch(`${endpoint}/is_temp_file_exists/${this.filename}`);
        if (response.status === 200) {
          this.$emit('downloadSuccessful');
          window.location.href = `${endpoint}/send_video_file/${this.filename}`;
        } else {
          console.error('Error: Download link is no longer valid.');
          this.showErrorDialog();
        }
      } catch (e) {
        console.error(e);
      }
    },
    showErrorDialog() {
      this.$buefy.dialog.alert({
        title: 'Error',
        message: 'Download link is no longer valid.',
        type: 'is-danger',
        hasIcon: true,
        ariaRole: 'alertdialog',
        ariaModal: true,
        onConfirm: () => {
          window.location.reload();
        }
      });
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
  width: 350px;
}

</style>
