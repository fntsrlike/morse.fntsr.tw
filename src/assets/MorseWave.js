import RifeWave from './rifewave'
import MorseNode from 'morse-node'

const DITS_PER_WORD = 50

var MorseWave = class {
  constructor (message) {
    this.message = message
    this._wpm = 20
    this._fwpm = 20
  }

  get Wpm () {
    return this._wpm
  }

  set Wpm (wpm) {
    this._wpm = wpm
    if (wpm < this._fwpm) {
      this._fwpm = wpm
    }
  }

  get Fwpm () {
    return this._fwpm
  }

  set Fwpm (fwpm) {
    this._fwpm = fwpm
    if (fwpm > this._wpm) {
      this._wpm = fwpm
    }
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
    var coder = MorseNode.create('ITU')
    if (!coder.isValid(this.message, 'morse')) {
      console.log('Warnning: cannot compute timings')
      return []
    }

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
    console.log(code2TimeHash)
    for (let i = 0; i < codes.length; i++) {
      let previousCode = codes[i - 1]
      let code = codes[i]

      if (i > 0 && [dit, dah].includes(code) && [dit, dah].includes(previousCode)) {
        times.push(-signalSpaceTime)
      }

      if ([dit, dah, charSpace, wordSpace].includes(code)) {
        times.push(code2TimeHash[code])
        console.log(code === ' ')
      }
    }
    return times
  }
}

var CWWave = class {
  constructor (message) {
    this.cw = new MorseWave(message)
    this.sampleRate = 8000 // How many signals per second. Value higher, sound quality better. Phone usually use 8000Hz
    this.frequency = 550   // Pitch, influence high or low of sound level

    var data = this.GetPCMData()
    this.wave = new RifeWave(data)
  }

  GetPCMData () {
    let timings = this.cw.GetTimings()
    if (timings.length === 0) {
      return []
    }

    console.log(timings.join(',\n'))

    let signals = []
    let counterIncrementAmount = Math.PI * 2 * this.frequency / this.sampleRate

    for (let i = 0; i < timings.length; i++) {
      let time = Math.abs(timings[i]) / 1000
      var duration = this.sampleRate * time

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

export default CWWave
