<template id="code-table-template">
  <section>
    <h3 class="title">{{ title }}</h3>
    <h3 class="subtitle">{{ subtitle }}</h3>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="code" v-for="code in codes" @click="Play(Encode(code))">
        <p class="heading">{{Encode(code)}}</p>
        <p class="title">{{code}}</p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['title', 'subtitle', 'codes', 'Encode', 'Play']
  }
</script>

<style>
</style>
