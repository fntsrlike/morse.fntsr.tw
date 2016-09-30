<template>
  <section class="section is-medium">
    <div class="container">
      <div class="heading">
        <h2 class="title is-2">Table</h1>
        <h2 class="subtitle is-4">
          摩斯電碼對照表
        </h2>
      </div>
      <code-table title="Alphabets" subtitle="英文字母" :codes="alphabets"></code-table>
      <code-table title="Numbers" subtitle="數字" :codes="numbers"></code-table>
      <code-table title="Symbols" subtitle="符號" :codes="symbols"></code-table>
    </div>
  </section>
</template>

<script>
import CodeTable from './CodeTable'

export default {
  components: {
    CodeTable
  },
  data: function () {
    return {
      alphabets: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      numbers: '1234567890'.split(''),
      symbols: '.:,;?=\'/!-_"()$&@+'.split('')
    }
  }
}
</script>

<style>
</style>
