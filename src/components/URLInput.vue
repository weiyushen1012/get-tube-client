<template>
  <section>
    <b-input placeholder="Youtube Link..."
             type="search"
             icon="magnify"
    >
    </b-input>
    <b-button type="is-primary" class="search-btn">Search</b-button>
  </section>
</template>

<script>
export default {
  name: 'URLInput'
};
</script>

<style scoped>
section {
  margin-top: 5vh;
  max-width: 500px;
  flex-grow: 1;
}

.search-btn {
  margin-top: 1em;
  width: 200px;
}
</style>
