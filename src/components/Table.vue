<template>
  <section class="section is-medium">
    <div class="container">
      <div class="heading">
        <h2 class="title is-2">Table</h1>
        <h2 class="subtitle is-4">
          摩斯電碼對照表
        </h2>
      </div>
      <section>
        <h3 class="title">Alphabets</h3>
        <h3 class="subtitle">英文字母</h3>
        <div class="columns is-gapless is-multiline is-mobile">
          <div class="code" v-for="code in alphabets" @click="Play(code)">
            <p class="heading">{{Encode(code)}}</p>
            <p class="title">{{code}}</p>
          </div>
        </div>
      </section>
      <section class="code-table">
        <h3 class="title">Numbers</h3>
        <h3 class="subtitle">數字</h3>
        <div class="columns is-gapless is-multiline is-mobile">
          <div class="code" v-for="code in numbers">
            <p class="heading">{{Encode(code)}}</p>
            <p class="title">{{code}}</p>
          </div>
        </div>
      </section>
      <section class="code-table">
        <h3 class="title">Symbols</h3>
        <h3 class="subtitle">符號</h3>
        <div class="columns is-gapless is-multiline is-mobile">
          <div class="code" v-for="code in symbols">
            <p class="heading">{{Encode(code)}}</p>
            <p class="title">{{code}}</p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
var morse = require('morse-node').create('ITU')
import Morse from '../assets/Morse'

export default {
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
    Play: function (text) {
      var morseCode = morse.encode(text)
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
    word-break: break-word;
  }

  @media screen and (max-width: 512px) {
    .code {
      width: 25%;
    }
  }

  @media screen and (min-width: 512px) {
    .code {
      width: 16.66667%;
    }
  }

  @media screen and (min-width: 1024px) {
    .code {
      width: 12.5%;
    }
  }
</style>
