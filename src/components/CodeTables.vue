<template>
  <section class="section">
    <div class="container">
      <div class="heading">
        <h2 class="title is-2">Table</h2>
        <h2 class="subtitle is-4">
          摩斯電碼對照表
        </h2>
        <p class="subtitle is-6">點擊字母或符號，會播放對應的摩斯電碼音效。</p>
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
  .code {
    flex: none;
    margin: 0 0 1rem ;
    padding: 0;
    display: block;
    font-family: monospace;
    cursor: pointer;
  }

  .code .heading {
    display: block;
    font-size: 11px;
    letter-spacing: 1px;
    margin-bottom: 5px;
    text-transform: uppercase;
    color: #ff3860;
  }

  .code .title {
    color: #363636;
    font-size: 28px;
    line-height: 1;
    font-weight: 300;
    word-wrap: break-word;
  }

  @media screen and (max-width: 320px) {
    .code {
      width: 50%;
    }
  }

  @media screen and (min-width: 321px) and (max-width: 512px) {
    .code {
      width: 25%;
    }
  }

  @media screen and (min-width: 513px)  and (max-width: 1024px) {
    .code {
      width: 16.66667%;
    }
  }

  @media screen and (min-width: 1025px) {
    .code {
      width: 12.5%;
    }
  }
</style>
