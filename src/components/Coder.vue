<template>
  <section id="coder" class="section is-medium">
    <div class="container">
      <div class="heading">
        <h1 class="title is-2">Coder</h1>
        <h2 class="subtitle is-4">編碼器</h2>
      </div>
      <section>
        <p class="control">
          <textarea id="input" class="textarea is-medium"
            v-bind:class="{ 'is-danger': !isInputValid }"
            v-model="input" v-on:keyup="JudgeInput"
            placeholder="{{placeholder}}"></textarea>
          <span class="help is-danger" v-show="!isInputValid">欄位不得為空</span>
        </p>

        <div class="control">
          <button class="button is-primary" @click="Encode" v-bind:class="{ 'is-disabled': !isInputChars}">編碼 / Encode</button>
          <button class="button is-primary" @click="Decode" v-bind:class="{ 'is-disabled': !isInputMorse}">解碼 / Decode</button>
          <button class="button" @click="Reset">清除 / Clear</button>
        </div>
      </section>
      <section>
        <h1 class="title">Records</h1>
        <h2 class="subtitle">
          本次編解碼的紀錄
        </h2>
        <article class="message is-info" v-for="record in records">
          <div class="message-header">
            # {{records.length - $index}}
          </div>
          <div class="message-body">
            <div class="columns">
              <div class="column is-half">
                <div class="notification is-code">
                  <a class="copy button is-small is-outlined" data-clipboard-target="#record-{{$index}}-text">
                    <span>Copy</span>
                    <span class="icon is-small">
                      <i class="fa fa-copy"></i>
                    </span>
                  </a>
                  <span id="record-{{$index}}-text">
                    {{record.text}}
                  </span>
                </div>
              </div>
              <div class="column is-half">
                <p class="notification is-code
                ">
                  <a class="copy button is-small is-outlined" data-clipboard-target="#record-{{$index}}-code">
                    <span>Copy</span>
                    <span class="icon is-small">
                      <i class="fa fa-copy"></i>
                    </span>
                  </a>
                  <code id="record-{{$index}}-code" class="morse-code">{{record.code}}</code>
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-new */
// import Morse from '../assets/Morse'
import MorseWave from '../assets/MorseWave'

var morse = require('morse-node').create('ITU')
var Clipboard = require('clipboard')

new Clipboard('.copy.button')

export default {
  data: function () {
    return {
      placeholder: '明文只限定摩斯電碼支援字元。若輸入電碼，字元電碼之間記得要有一格空白。',
      input: '',
      output: '',
      isInputValid: true,
      isInputMorse: false,
      isInputChars: false,
      records: []
    }
  },
  methods: {
    Encode: function () {
      if (morse.isValid(this.input, 'chars')) {
        this.isInputValid = true
        this.output = morse.encode(this.input)
        this.records.unshift({
          text: this.input,
          code: this.output
        })
        this.Play(this.input)
        return
      }

      this.isInputValid = false
      this.output = 'Error! Invalid text.'
    },
    Decode: function () {
      if (morse.isValid(this.input, 'morse')) {
        this.isInputValid = true
        this.output = morse.decode(this.input)
        this.records.unshift({
          text: this.output,
          code: this.input
        })
        return
      }

      this.isInputValid = false
      this.output = 'Error! Invalid morse code.'
    },
    Reset: function () {
      this.input = ''
    },
    JudgeInput: function () {
      this.isInputChars = morse.isValid(this.input, 'chars')
      this.isInputMorse = morse.isValid(this.input, 'morse')
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
  .notification .copy {
    border-radius: 0 3px;
    float: right;
    margin: -16px -20px 0 20px;
  }

  .notification.is-code, code.morse-code {
    background: transparent;
  }

  .notification.is-code {
    color: black;
  }

  #input {
    font-family: monospace;
    font-size: 1rem;
    line-height: 1.5rem;
  }
</style>
