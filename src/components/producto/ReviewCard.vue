<template>
  <div class="flex flex-col rounded-lg p-4 mx-5 bg-[#eddaab] w-full lg:w-[300px] h-[175px]">
    <h4>{{ username }}</h4>
    <hr style="border-color: #b66141" />
    <div
      class="m-1 overflow-auto text-balance text-sm  h-[90px] w-[250px]"
      style="scrollbar-width: thin"
    >
      <p>{{ reviewContent }}</p>
    </div>
    <p style="font-weight: bold; font-size: small">{{ reviewDate }}</p>
  </div>
</template>


<script lang="ts">
export default {
  name: 'ReviewCard',
  props: {
    username: String,
    reviewContent: String,
    reviewDate: String
  }
}
</script>


<style scoped>
h4 {
  font-family: 'El Messiri', sans-serif;
  color: #cb8844;
}

p {
  color: #662f25;
}
</style>
