/* eslint-disable */
if (typeof(String.prototype.trim) === "undefined") {
  String.prototype.trim = function () {
    return String(this).replace(/^\s+|\s+$/g, '');
  };
}
function log(message) {
  if (typeof console == "object") {
    console.log(message);
  }
}
var Morse = {
  text2morseH: {
    'A': ".-",
    'B': "-...",
    'C': "-.-.",
    'D': "-..",
    'E': ".",
    'F': "..-.",
    'G': "--.",
    'H': "....",
    'I': "..",
    'J': ".---",
    'K': "-.-",
    'L': ".-..",
    'M': "--",
    'N': "-.",
    'O': "---",
    'P': ".--.",
    'Q': "--.-",
    'R': ".-.",
    'S': "...",
    'T': "-",
    'U': "..-",
    'V': "...-",
    'W': ".--",
    'X': "-..-",
    'Y': "-.--",
    'Z': "--..",
    '1': ".----",
    '2': "..---",
    '3': "...--",
    '4': "....-",
    '5': ".....",
    '6': "-....",
    '7': "--...",
    '8': "---..",
    '9': "----.",
    '0': "-----",
    '.': ".-.-.-",
    ',': "--..--",
    ':': "---...",
    '?': "..--..",
    '\'': ".----.",
    '-': "-....-",
    '/': "-..-.",
    '(': "-.--.-",
    ')': "-.--.-",
    '"': ".-..-.",
    '@': ".--.-.",
    '=': "-...-",
    ' ': "/"
  },
  morse2textH: {},
  prosign2morseH: {
    '<AA>': '.-.-',
    '<AR>': '.-.-.',
    '<AS>': '.-...',
    '<BK>': '-...-.-',
    '<BT>': '-...-',
    '<CL>': '-.-..-..',
    '<CT>': '-.-.-',
    '<DO>': '-..---',
    '<KN>': '-.--.',
    '<SK>': '...-.-',
    '<VA>': '...-.-',
    '<SN>': '...-.',
    '<VE>': '...-.',
    '<SOS>': '...---...'
  },
  morsepro2textH: {},
  text2morseproH: {},
  tidyText: function (text) {
    text = text.toUpperCase();
    text = text.trim();
    text = text.replace(/\s+/g, ' ');
    return text;
  },
  text2morse: function (text, useProsigns) {
    if (typeof useProsigns === "undefined") {
      useProsigns = true;
    }
    text = Morse.tidyText(text);
    var ret = {morse: "", message: "", hasError: false};
    if (text == "") {
      return ret;
    }
    var tokens = [];
    var prosign;
    var token_length;
    while (text.length > 0) {
      token_length = 1;
      if (useProsigns) {
        prosign = text.match(/^<...?>/);
        if (prosign) {
          token_length = prosign[0].length;
        }
      }
      tokens.push(text.slice(0, token_length));
      text = text.slice(token_length, text.length);
    }
    var dict;
    if (useProsigns) {
      dict = Morse.text2morseproH;
    } else {
      dict = Morse.text2morseH;
    }
    var i, c, t;
    for (i = 0; i < tokens.length; i++) {
      t = tokens[i];
      c = dict[t];
      if (c === undefined) {
        ret.message += "#" + t + "#";
        ret.morse += "# ";
        ret.hasError = true;
      } else {
        ret.message += t;
        ret.morse += c + " ";
      }
    }
    ret.morse = ret.morse.slice(0, ret.morse.length - 1);
    return ret;
  },
  tidyMorse: function (morse) {
    morse = morse.trim();
    morse = morse.replace(/\|/g, "/");
    morse = morse.replace(/\//g, " / ");
    morse = morse.replace(/\s+/g, " ");
    morse = morse.replace(/(\/ )+\//g, "/");
    morse = morse.replace(/^\s+/, "");
    morse = morse.replace(/\s+$/, "");
    morse = morse.replace(/_/g, "-");
    return morse;
  },
  morse2text: function (morse, useProsigns) {
    if (typeof useProsigns === "undefined") {
      useProsigns = true;
    }
    morse = Morse.tidyMorse(morse);
    var ret = {morse: "", message: "", hasError: false};
    if (morse == "") {
      return ret;
    }
    var tokens = morse.split(" ");
    var dict;
    if (useProsigns) {
      dict = Morse.morsepro2textH;
    } else {
      dict = Morse.morse2textH;
    }
    var c, t;
    for (var i = 0; i < tokens.length; i++) {
      t = tokens[i];
      c = dict[t];
      if (c == undefined) {
        ret.morse += "#" + t + "# ";
        ret.message += "#";
        ret.hasError = true;
      } else {
        ret.morse += t + " ";
        ret.message += c;
      }
    }
    ret.morse = ret.morse.slice(0, ret.morse.length - 1);
    return ret;
  },
  isMorse: function (input) {
    input = Morse.tidyMorse(input);
    if (input.match(/^[ /.-]*$/)) {
      return true;
    } else {
      return false;
    }
  },
  DITS_PER_WORD: 50,
  init: function () {
    for (var text in Morse.text2morseH) {
      Morse.text2morseproH[text] = Morse.text2morseH[text];
      Morse.morse2textH[Morse.text2morseH[text]] = text;
      Morse.morsepro2textH[Morse.text2morseH[text]] = text;
    }
    for (var sign in Morse.prosign2morseH) {
      Morse.text2morseproH[sign] = Morse.prosign2morseH[sign];
      Morse.morsepro2textH[Morse.prosign2morseH[sign]] = sign;
    }
  }
};
Morse.init();
Morse.Util = {};
Morse.Util.FastBase64 = {
  chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encLookup: [],
  init: function () {
    for (var i = 0; i < 4096; i++) {
      this.encLookup[i] = this.chars[i >> 6] + this.chars[i & 0x3F];
    }
  },
  encode: function (src) {
    var len = src.length;
    var dst = '';
    var i = 0;
    while (len > 2) {
      n = (src[i] << 16) | (src[i + 1] << 8) | src[i + 2];
      dst += this.encLookup[n >> 12] + this.encLookup[n & 0xFFF];
      len -= 3;
      i += 3;
    }
    if (len > 0) {
      var n1 = (src[i] & 0xFC) >> 2;
      var n2 = (src[i] & 0x03) << 4;
      if (len > 1)n2 |= (src[++i] & 0xF0) >> 4;
      dst += this.chars[n1];
      dst += this.chars[n2];
      if (len == 2) {
        var n3 = (src[i++] & 0x0F) << 2;
        n3 |= (src[i] & 0xC0) >> 6;
        dst += this.chars[n3];
      }
      if (len == 1)dst += '=';
      dst += '=';
    }
    return dst;
  }
};
Morse.Util.FastBase64.init();
Morse.Util.getDataURI = function (data, type) {
  return 'data:' + type + ';base64,' + Morse.Util.FastBase64.encode(data);
};
Morse.Message = function () {
  this.input = "";
  this.output = "";
  this.morse = "";
  this.message = "";
  this.useProsigns = true;
  this.inputWasMorse;
  this.hasError;
};
Morse.Message.prototype = {
  constructor: Morse.Message,
  translate: function (input, isMorse) {
    var translation;
    this.input = input;
    if (typeof isMorse === "undefined") {
      isMorse = Morse.isMorse(input);
    }
    if (isMorse) {
      this.inputWasMorse = true;
      translation = Morse.morse2text(input, this.useProsigns);
    } else {
      this.inputWasMorse = false;
      translation = Morse.text2morse(input, this.useProsigns);
    }
    this.morse = translation.morse;
    this.message = translation.message;
    if (this.inputWasMorse) {
      this.input = this.morse;
      this.output = this.message;
    } else {
      this.input = this.message;
      this.output = this.morse;
    }
    this.hasError = translation.hasError;
    if (this.hasError) {
      throw new Error("Error in input");
    }
    return this.output;
  }, clearError: function () {
    if (this.inputWasMorse) {
      this.morse = this.morse.replace(/#/g, "");
    } else {
      this.message = this.message.replace(/#[^#]*?#/g, "");
      this.morse = this.morse.replace(/#/g, "");
    }
    this.hasError = false;
  }
};
Morse.CW = function (message) {
  this.message = message;
  this.wpm = 20;
  this.fwpm = 20;
};
Morse.CW.prototype = {
  constructor: Morse.CW,
  setWPM: function (wpm) {
    this.wpm = wpm;
    if (wpm < this.fwpm) {
      this.fwpm = wpm;
    }
    return this.fwpm;
  },
  setFWPM: function (fwpm) {
    this.fwpm = fwpm;
    if (fwpm > this.wpm) {
      this.wpm = fwpm;
    }
    return this.wpm;
  },
  getTimings: function () {
    var dit = 60000 / (Morse.DITS_PER_WORD * this.wpm);
    var r = this.wpm / this.fwpm;
    return this.getTimingsGeneral(dit, 3 * dit, dit, 3 * dit * r, 7 * dit * r);
  },
  getTimingsGeneral: function (dit, dah, ditSpace, charSpace, wordSpace) {
    log("Morse: " + this.message.morse);
    if (this.message.hasError) {
      log("Error in message: cannot compute timings");
      return [];
    }
    var morse = this.message.morse.replace(/ \/ /g, '/');
    var times = [];
    var c;
    for (var i = 0; i < morse.length; i++) {
      c = morse[i];
      if (c == "." || c == '-') {
        if (c == '.') {
          times.push(dit);
        } else {
          times.push(dah);
        }
        times.push(-ditSpace);
      } else if (c == " ") {
        times.pop();
        times.push(-charSpace);
      } else if (c == "/") {
        times.pop();
        times.push(-wordSpace);
      }
    }
    if (times[times.length - 1] == -ditSpace) {
      times.pop();
    }
    log("Timings: " + times);
    return times;
  }
};
Morse.CWWave = function (cw) {
  this.cw = cw;
  this.sampleRate = 8000;
  this.frequency = 550;
};
Morse.CWWave.prototype = {
  constructor: Morse.CWWave,
  getSample: function () {
    var sample = [];
    var timings = this.cw.getTimings();
    if (timings.length == 0) {
      return [];
    }
    var counterIncrementAmount = Math.PI * 2 * this.frequency / this.sampleRate;
    var on = timings[0] > 0 ? 1 : 0;
    for (var t = 0; t < timings.length; t += 1) {
      var duration = this.sampleRate * Math.abs(timings[t]) / 1000;
      for (var i = 0; i < duration; i += 1) {
        sample.push(on * Math.sin(i * counterIncrementAmount));
        log('C:' + on * Math.sin(i * counterIncrementAmount))
      }
      on = 1 - on;
    }
    log("Sample length: " + sample.length);
    return sample;
  },
  getPCMSample: function () {
    var pcmSample = [];
    var sample = this.getSample();
    for (var i = 0; i < sample.length; i += 1) {
      log('A:' + smaple[i])
      log('B:' + 128 + Math.round(127 * sample[i]))

      pcmSample.push(128 + Math.round(127 * sample[i]));
    }
    return pcmSample;
  },
  getWAV: function () {
    var wav = new RIFFWAVE();
    wav.header.sampleRate = this.sampleRate;
    log('getWav')
    return wav.getWAV(this.getPCMSample());
  },
  getDataURI: function () {
    return Morse.Util.getDataURI(this.getWAV(), "audio/wav");
  }
};
var RIFFWAVE = function (data) {
  this.header = {
    chunkId: [0x52, 0x49, 0x46, 0x46],
    chunkSize: 0,
    format: [0x57, 0x41, 0x56, 0x45],
    subChunk1Id: [0x66, 0x6d, 0x74, 0x20],
    subChunk1Size: 16,
    audioFormat: 1,
    numChannels: 1,
    sampleRate: 8000,
    byteRate: 0,
    blockAlign: 0,
    bitsPerSample: 8,
    subChunk2Id: [0x64, 0x61, 0x74, 0x61],
    subChunk2Size: 0
  };
  this.data = [];
  if (data instanceof Array) {
    return this.getWAV(data);
  }
};
RIFFWAVE.prototype = {
  constructor: RIFFWAVE, u32ToArray: function (i) {
    return [i & 0xFF, (i >> 8) & 0xFF, (i >> 16) & 0xFF, (i >> 24) & 0xFF];
  }, u16ToArray: function (i) {
    return [i & 0xFF, (i >> 8) & 0xFF];
  },
  split16bitArray: function (data) {
    var r = [];
    var j = 0;
    var len = data.length;
    for (var i = 0; i < len; i++) {
      r[j++] = data[i] & 0xFF;
      r[j++] = (data[i] >> 8) & 0xFF;
    }
    return r;
  }, getWAV: function (data) {
    if (data instanceof Array) {
      this.data = data;
    }
    this.header.blockAlign = (this.header.numChannels * this.header.bitsPerSample) >> 3;
    this.header.byteRate = this.header.blockAlign * this.header.sampleRate;
    this.header.subChunk2Size = this.data.length * (this.header.bitsPerSample >> 3);
    this.header.chunkSize = 36 + this.header.subChunk2Size;
    return this.header.chunkId.concat(
      this.u32ToArray(this.header.chunkSize),
      this.header.format,
      this.header.subChunk1Id,
      this.u32ToArray(this.header.subChunk1Size),
      this.u16ToArray(this.header.audioFormat),
      this.u16ToArray(this.header.numChannels),
      this.u32ToArray(this.header.sampleRate),
      this.u32ToArray(this.header.byteRate),
      this.u16ToArray(this.header.blockAlign),
      this.u16ToArray(this.header.bitsPerSample),
      this.header.subChunk2Id,
      this.u32ToArray(this.header.subChunk2Size),
      (this.header.bitsPerSample == 16) ? split16bitArray(this.data) : this.data);
  }
};
Morse.XASPlayer = function (wave) {
  this.wave = wave;
  this.isPlayingB = false;
  this.sample = [];
  this.volume = 1;
  this.samplePos;
  this.noAudio = false;
  this.audioServer;
  this.sampleRate = wave.sampleRate || 8000;
  for (var i = 0; i < this.sampleRate; i += 1) {
    this.silence.push(0.0);
  }
  var that = this;

  function audioGenerator(samplesToGenerate) {
    if (samplesToGenerate == 0) {
      return [];
    }
    var ret;
    samplesToGenerate = Math.min(samplesToGenerate, that.sample.length - that.samplePos);
    if (samplesToGenerate > 0) {
      ret = that.sample.slice(that.samplePos, that.samplePos + samplesToGenerate);
      that.samplePos += samplesToGenerate;
      return ret;
    } else {
      that.isPlayingB = false;
      return [];
    }
  }

  function failureCallback() {
    that.noAudio = true;
  }

  log("Trying XAudioServer");
  this.audioServer = new XAudioServer(1, this.sampleRate, this.sampleRate >> 2, this.sampleRate << 1, audioGenerator, this.volume, failureCallback);
  setInterval(function () {
    if (that.isPlayingB) {
      that.audioServer.executeCallback();
    }
  }, 20);
};
Morse.XASPlayer.prototype = {
  constructor: Morse.XASPlayer, silence: [], stop: function () {
    this.isPlayingB = false;
    this.audioServer.changeVolume(0);
    this.sample = [];
  }, play: function (message) {
    this.stop();
    this.sample = this.wave.getSample().concat(this.silence);
    this.isPlayingB = true;
    this.samplePos = 0;
    this.audioServer.changeVolume(this.volume);
  }, hasError: function () {
    return this.noAudio;
  }, isPlaying: function () {
    return this.isPlayingB;
  }, getAudioType: function () {
    return this.audioServer.audioType;
  }
};
Morse.AudioContext = window.AudioContext || window.webkitAudioContext;
Morse.WAAPlayer = function (wave) {
  log(wave)
  this.wave = wave;
  this.isPlayingB = false;
  this.volume = 1;
  this.noAudio = false;
  log("Trying Web Audio API");
  if (Morse.AudioContext === undefined) {
    this.noAudio = true;
  } else {
    this.audioCtx = new Morse.AudioContext();
  }
};
Morse.WAAPlayer.prototype = {
  constructor: Morse.WAAPlayer, stop: function () {
    this.isPlayingB = false;
    this.audioCtx.close();
    this.audioCtx = new Morse.AudioContext();
  },
  play: function (message) {
    if (this.noAudio) {
      return;
    }
    this.stop();
    var timings = this.wave.cw.getTimings();

    if (timings.length === 0) {
      return [];
    }

    this.isPlayingB = true;
    var cumT = this.audioCtx.currentTime;
    for (var t = 0; t < timings.length; t += 1) {
      var duration = timings[t] / 1000;
      if (duration > 0) {
        var oscillator = this.audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = this.wave.frequency;
        oscillator.connect(this.audioCtx.destination);
        oscillator.start(cumT);
        oscillator.stop(cumT + duration);
        cumT += duration;
      } else {
        cumT += -duration;
      }
    }
  }, hasError: function () {
    return this.noAudio;
  }, isPlaying: function () {
    return this.isPlayingB;
  }, getAudioType: function () {
    return 4;
  }
};
Morse.Player = function (wave) {
  var p = new Morse.WAAPlayer(wave);
  console.log('WAAPlayer')

  if (p.hasError()) {
    p = new Morse.XASPlayer(wave);
    console.log('XASPlayer')
  }
  return p;
};
Morse.Decoder = function (timeStep, wpm) {
  this.timeStep = timeStep;
  this.wpm;
  this.timings = [];
  this.unusedTimes = [];
  this.ditDahThreshold;
  this.dahSpaceThreshold;
  this.morse = "";
  this.message = "";
  this.dits = [];
  this.dahs = [];
  this.ditSpaces = [];
  this.dahSpaces = [];
  this.spaces = [];
  if (typeof wpm !== "undefined") {
    this.setWPM(wpm);
  }
};
Morse.Decoder.prototype = {
  constructor: Morse.Decoder, setWPM: function (wpm) {
    this.wpm = wpm;
    this.ditDahThreshold = 2 * (60000 / Morse.DITS_PER_WORD) / (wpm * timeStep);
    this.dahSpaceThreshold = 5 * (60000 / Morse.DITS_PER_WORD) / (wpm * timeStep);
    console.log("Decoder WPM: " + wpm);
    console.log("Decoder ditDahThreshold (ticks): " + this.ditDahThreshold);
    console.log("Decoder dahSpaceThreshold (ticks): " + this.dahSpaceThreshold);
  }, addTiming: function (duration) {
    if (Math.abs(duration) == 1) {
      if (this.unusedTimes.length > 0) {
        var last = this.unusedTimes.pop();
        duration = last - duration;
      }
    }
    this.unusedTimes.push(duration);
    if (-duration > this.ditDahThreshold) {
      this.flush();
    }
  }, messageCallback: function (data) {
    console.log("Decoded: {\n  timings: " + data.timings + "\n  morse: " + data.morse + "\n  message: " + data.message + "\n}");
  }, flush: function () {
    if (this.unusedTimes.length > 0) {
      var u = this.unusedTimes;
      var m = this.timings2morse(this.unusedTimes);
      var t = Morse.morse2text(m).message;
      this.timings = this.timings.concat(this.unusedTimes);
      this.morse += m;
      this.message += t;
      this.unusedTimes = [];
      this.messageCallback({timings: u, morse: m, message: t});
    }
  }, timings2morse: function (times) {
    var ditdah = "";
    var c;
    var d;
    for (var i = 0; i < times.length; i++) {
      d = times[i];
      if (d > 0) {
        if (d < this.ditDahThreshold) {
          c = ".";
          this.dits.push(d);
        } else {
          c = "-";
          this.dahs.push(d);
        }
      } else {
        d = -d;
        if (d < this.ditDahThreshold) {
          c = "";
          this.ditSpaces.push(d);
        } else if (d < this.dahSpaceThreshold) {
          c = " ";
          this.dahSpaces.push(d);
        } else {
          c = "/";
          this.spaces.push(d);
        }
      }
      ditdah = ditdah + c;
    }
    return ditdah;
  }
};

export default Morse;
