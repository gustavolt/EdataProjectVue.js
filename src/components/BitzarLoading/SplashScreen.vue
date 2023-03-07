<template>
  <div v-if="isLoading" :class="{ loader: true }">
    <img src="../../assets/img/white-logo.png" alt="Logo" />
  </div>
</template>
<script>
export default {
  props: ["isLoading"],
};
</script>
