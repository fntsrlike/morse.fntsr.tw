<template id="code-table-template">
  <section>
    <h3 class="title">{{ title }}</h3>
    <h3 class="subtitle">{{ subtitle }}</h3>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="code" v-for="code in codes" @click="Play(code)">
        <p class="heading">{{Encode(code)}}</p>
        <p class="title">{{code}}</p>
      </div>
    </div>
  </section>
</template>

<script>
  var morse = require('morse-node').create('ITU')
  import MorseWave from '../assets/MorseWave'

  export default {
    props: ['title', 'subtitle', 'codes'],
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
