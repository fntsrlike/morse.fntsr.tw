<template>
  <the-head></the-head>
  <coder></coder>
  <introduction></introduction>
  <code-tables></code-tables>
  <the-foot></the-foot>
</template>

<script>
import TheHead from './components/Header'
import Coder from './components/Coder'
import Introduction from './components/Introduction'
import CodeTables from './components/CodeTables'
import TheFoot from './components/Footer'

export default {
  components: {
    TheHead,
    Introduction,
    CodeTables,
    Coder,
    TheFoot
  }
}
</script>

<style>
  .section section {
    margin-top: 2rem;
  }
</style>
