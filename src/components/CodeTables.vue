<template>
  <section class="section">
    <div class="container">
      <div class="heading">
        <h2 class="title is-2">Table</h1>
        <h2 class="subtitle is-4">
          摩斯電碼對照表
        </h2>
      </div>
      <code-table title="Alphabets" subtitle="英文字母" :codes="alphabets" :Encode="Encode" :Play="Play"></code-table>
      <code-table title="Numbers" subtitle="數字" :codes="numbers" :Encode="Encode" :Play="Play"></code-table>
      <code-table title="Symbols" subtitle="符號" :codes="symbols" :Encode="Encode" :Play="Play"></code-table>
      <codes :Play="Play"></codes>
    </div>
  </section>
</template>

<script>
import Codes from './Codes'
import CodeTable from './CodeTable'
import MorseWave from '../assets/MorseWave'

var morse = require('morse-node').create('ITU')

export default {
  components: {
    Codes,
    CodeTable
  },
  data: function () {
    return {
      alphabets: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      numbers: '1234567890'.split(''),
      symbols: '.:,;?=\'/!-_"()$&@+'.split('')
    }
  },
  methods: {
    Encode: function (text) {
      return morse.encode(text)
    },
    Play: function (morseCode) {
      var wave = new MorseWave(morseCode)
      var audio = document.createElement('audio')
      audio.src = wave.GetDataURI()
      audio.play()
    }
  }
}
</script>

<style>
</style>
