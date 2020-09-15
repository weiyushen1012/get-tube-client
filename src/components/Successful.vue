<template>
  <b-notification
      type="is-success"
      has-icon
      :closable="false"
  >
    <p>Video Downloaded Successfully!</p>
    <br>
    <p>
      <b-button type="is-success is-light" @click="handleTryAgain">Download Another Video</b-button>
    </p>

  </b-notification>
</template>

<script>
export default {
  name: 'Successful',
  methods: {
    handleTryAgain() {
      window.location.reload();
    }
  }
};
</script>

<style scoped>

</style>
