import RifeWave from './rifewave'
import MorseNode from 'morse-node'

const DITS_PER_WORD = 50

var MorseWave = class {
  constructor (message) {
    if (!MorseNode.create('ITU').isValid(message, 'morse')) {
      throw new Error('Error: MorseWave constructor\'s argument must be morse code')
    }

    this.message = message
    this._wpm = 20
    this._fwpm = 20
    this._sampleRate = 8000 // How many signals per second. Value higher, sound quality better. Phone usually use 8000Hz
    this._frequency = 550   // Pitch, influence high or low of sound level

    var data = this.GetPCMData()
    this.wave = new RifeWave(data)
  }

  get Wpm () {
    return this._wpm
  }

  get Fwpm () {
    return this._fwpm
  }

  get SampleRate () {
    return this._sampleRate
  }

  get Frequency () {
    return this._frequency
  }

  set Wpm (wpm) {
    this._wpm = wpm
    if (wpm < this._fwpm) {
      this._fwpm = wpm
    }
  }

  set Fwpm (fwpm) {
    this._fwpm = fwpm
    if (fwpm > this._wpm) {
      this._wpm = fwpm
    }
  }

  set SampleRate (sampleRate) {
    if (sampleRate === this._sampleRate) return
    this._sampleRate = sampleRate
  }

  set Frequency (frequency) {
    if (frequency === this._frequency) return
    this._frequency = frequency
  }

  GetTimings () {
    let r = this.Wpm / this.Fwpm
    let dit = 50000 / (DITS_PER_WORD * this.Wpm)
    let dah = dit * 3
    let signalSpace = dit
    let charSpace = dit * 3 * r
    let wordSpace = dit * 7 * r
    return this.GetTimingsGeneral(dit, dah, signalSpace, charSpace, wordSpace)
  }

  GetTimingsGeneral (ditTime, dahTime, signalSpaceTime, charSpaceTime, wordSpaceTime) {
    let dit = '.'
    let dah = '-'
    let charSpace = ' '
    let wordSpace = '/'

    let codes = this.message.trim()
    let times = []
    let code2TimeHash = {
      [dit]: ditTime,
      [dah]: dahTime,
      [charSpace]: -charSpaceTime,
      [wordSpace]: -wordSpaceTime
    }

    for (let i = 0; i < codes.length; i++) {
      let previousCode = codes[i - 1]
      let code = codes[i]

      if (i > 0 && [dit, dah].includes(code) && [dit, dah].includes(previousCode)) {
        times.push(-signalSpaceTime)
      }

      if ([dit, dah, charSpace, wordSpace].includes(code)) {
        times.push(code2TimeHash[code])
      }
    }
    return times
  }

  GetPCMData () {
    let timings = this.GetTimings()
    if (timings.length === 0) {
      return []
    }

    let signals = []
    let counterIncrementAmount = Math.PI * 2 * this.Frequency / this.SampleRate

    for (let i = 0; i < timings.length; i++) {
      let time = Math.abs(timings[i]) / 1000
      var duration = this.SampleRate * time

      if (timings[i] < 0) {
        var silenceData = new Array(duration).fill(0)
        signals = signals.concat(silenceData)
        continue
      }

      for (var j = 0; j < duration; j += 1) {
        // The Math.sin() method returns a numeric value between -1 and 1,
        // which represents the sine of the angle given in radians.
        //
        // Math.sin(0) = 0
        // Math.sin(Math.PI/2) = 1
        // Math.round(Math.sin(Math.PI)) = 0
        var rawData = Math.sin(j * counterIncrementAmount)
        var pcmData = 128 + Math.round(127 * rawData) // PCM: Pulse-code modulation
        signals.push(pcmData)
      }
    }
    return signals
  }

  GetWav () {
    return this.wave.wav
  }

  GetDataURI () {
    return this.wave.dataURI
  }
}

export default MorseWave
