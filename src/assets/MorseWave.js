import RifeWave from './rifewave'
import MorseNode from 'morse-node'
import _ from 'lodash'

var MorseWave = class {
  constructor (morseCodes) {
    if (!MorseNode.create('ITU').isValid(morseCodes, 'morse')) {
      throw new Error('Error: MorseWave constructor\'s argument must be morse code')
    }

    this._morseCodes = morseCodes.trim()
    this._wpm = 20 // the words per minute.
    this._fwpm = 20 // the Farnsworth words per minute. [^1][^2]
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
    if (sampleRate * 0.5 <= this.Frequency) {
      this.Frequency = sampleRate * 0.5
    }
    this._sampleRate = sampleRate
  }

  set Frequency (frequency) {
    if (frequency === this._frequency) return
    if (this.SampleRate * 0.5 <= frequency) {
      this.SampleRate = frequency * 2
    }
    this._frequency = frequency
  }

  GetTimings () {
    const dit = '.'
    const dah = '-'
    const signalSpace = 'signalSpace'
    const charSpace = ' '
    const wordSpace = '/'
    const r = this.Wpm / this.Fwpm
    const ditPerWord = 50
    const ditTime = 50000 / (ditPerWord * this.Wpm)
    const dahTime = ditTime * 3
    const signalSpaceTime = ditTime
    const charSpaceTime = ditTime * 3 * r
    const wordSpaceTime = ditTime * 7 * r

    let codes = this._morseCodes
    let times = []
    let code2TimeHash = {
      [dit]: ditTime,
      [dah]: dahTime,
      [signalSpace]: -signalSpaceTime,
      [charSpace]: -charSpaceTime,
      [wordSpace]: -wordSpaceTime
    }

    for (let i = 0; i < codes.length; i++) {
      let previousCode = codes[i - 1]
      let code = codes[i]

      if (i > 0 && [dit, dah].includes(code) && [dit, dah].includes(previousCode)) {
        times.push(code2TimeHash[signalSpace])
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

    let data = []
    let samples = {}

    for (let i = 0; i < timings.length; i++) {
      let key = timings[i]
      let isSpace = timings[i] < 1
      let seconds = Math.abs(timings[i] * 0.001)
      let sampleNumber = Math.round(this.SampleRate * seconds)

      if (_.has(samples, key)) {
        data.push.apply(data, samples[key])
        continue
      }

      let sample = []
      if (isSpace) {
        sample = this.GenerateEmptySignal(sampleNumber)
        data = data.concat(sample)
        samples[key] = sample
        continue
      }

      sample = this.GenerateSignal(sampleNumber)
      samples[key] = sample
      data.push.apply(data, sample)
    }

    return data
  }

  GetWav () {
    return this.wave.wav
  }

  /**
   * @return {string}
   */
  GetDataURI () {
    return this.wave.dataURI
  }

  GenerateSignal (sampleNumber) {
    const counterIncrementAmount = Math.PI * 2 * this.Frequency / this.SampleRate
    let signal = []

    for (var j = 0; j < sampleNumber; j += 1) {
      // The Math.sin() method returns a numeric value between -1 and 1,
      // which represents the sine of the angle given in radians.
      //
      // Math.sin(0) = 0
      // Math.sin(Math.PI/2) = 1
      // Math.round(Math.sin(Math.PI)) = 0
      var rawData = Math.sin(j * counterIncrementAmount)
      var pcmData = 128 + Math.round(127 * rawData) // PCM: Pulse-code modulation

      signal.push(pcmData)
    }

    return signal
  }

  GenerateEmptySignal (sampleNumber) {
    return new Array(sampleNumber).fill(128)
  }
}

export default MorseWave

// [^1]: http://www.arrl.org/files/file/Technology/x9004008.pdf
// [^2]: http://www.mechanicalpuzzles.org/codepractice/learning.html
