const APP_NAME_VERSION = "SynthCore16 v1.0";

var MIDI_CH          = 1;
const NOTE_OFF       = 0x80;
const NOTE_ON        = 0x90;
const CONTROL_CHANGE = 0xB0;
const PITCH_BEND     = 0xE0;

const MODULATION      = 1;
const SUSTAIN_PEDAL   = 64;
const P_BEND_BY_CC    = 35;

const OSC_1_WAVE      = 24;
const OSC_1_SHAPE     = 102;
const OSC_1_MORPH     = 103;
const MIXER_SUB_OSC   = 26;

const OSC_2_WAVE      = 55;
const OSC_2_COARSE    = 20;
const OSC_2_FINE      = 21;
const MIXER_OSC_MIX   = 25;

const FILTER_CUTOFF   = 16;
const FILTER_RESO     = 17;
const FILTER_EG_AMT   = 18;
const FILTER_KEY_TRK  = 86;

const EG_ATTACK       = 23;
const EG_DECAY        = 19;
const EG_SUSTAIN      = 27;
const EG_RELEASE      = 28;

const EG_OSC_AMT      = 104;
const EG_OSC_DST      = 105;
const VOICE_MODE      = 87;
const PORTAMENTO      = 22;

const LFO_WAVE        = 14;
const LFO_RATE        = 80;
const LFO_DEPTH       = 81;
const LFO_FADE_TIME   = 15;

const LFO_OSC_AMT     = 82;
const LFO_OSC_DST     = 9;
const LFO_FILTER_AMT  = 83;
const AMP_LEVEL       = 110;

const AMP_ATTACK      = 56;
const AMP_DECAY       = 57;
const AMP_SUSTAIN     = 58;
const AMP_RELEASE     = 59;

const CHORUS_MODE     = 63;
const CHORUS_RATE     = 61;
const CHORUS_DEPTH    = 60;
const CHORUS_DLY_TIME = 62;

const P_BEND_RANGE    = 85;
const CHORUS_BYPASS   = 111;

const ALL_SOUND_OFF   = 120;
const RESET_ALL_CTRLS = 121;
const ALL_NOTES_OFF   = 123;
// Special Random Control (for VRA8-U type-16 CTRL)
const SP_RAND_CTRL    = 90;
// Special Program Change (for VRA8-U type-16 CTRL)
const SP_PROG_CHG_8   = 112;
const SP_PROG_CHG_9   = 113;
const SP_PROG_CHG_10  = 114;
const SP_PROG_CHG_11  = 115;
const SP_PROG_CHG_12  = 116;
const SP_PROG_CHG_13  = 117;
const SP_PROG_CHG_14  = 118;
const SP_PROG_CHG_15  = 119;

const PRESET_NUMBER_INITIAL = 7;

var transpose = 0;
var fileReaderImportAll = new FileReader();
var fileReaderImportCurrent = new FileReader();

var midi       = null;
var midiInputs = null;
var midiInput1 = null;
var midiInput2 = null;
var midiInput3 = null;
var midiInput4 = null;
var midiOutputs = null;
var midiOutput = null;
var presetControllers = {};
var specialProgramChangeCCValues = [0, 0, 0, 0, 0, 0, 0, 0];
var specialRandomControlCCValue = 0;

const keyToNoteMap = new Map([
  ["a", 48],
  ["s", 50],
  ["d", 52],
  ["f", 53],
  ["g", 55],
  ["h", 57],
  ["j", 59],
  ["k", 60],
  ["l", 62],
  ["z", 64],
  ["x", 65],
  ["c", 67],
  ["v", 69],
  ["b", 71],
  ["n", 72],
  ["q", 49],
  ["w", 51],
  ["e", 54],
  ["r", 56],
  ["t", 58],
  ["y", 61],
  ["u", 63],
  ["i", 66],
  ["o", 68],
  ["p", 70],

])

const controlNumberToStringMap = new Map([
  [OSC_1_WAVE, "OSC_1_WAVE" ],
  [OSC_1_SHAPE, "OSC_1_SHAPE" ],
  [OSC_1_MORPH, "OSC_1_MORPH" ],
  [MIXER_SUB_OSC, "MIXER_SUB_OSC"],

  [OSC_2_WAVE, "OSC_2_WAVE" ],
  [OSC_2_COARSE, "OSC_2_COARSE"],
  [OSC_2_FINE, "OSC_2_FINE" ],
  [MIXER_OSC_MIX, "MIXER_OSC_MIX"],

  [FILTER_CUTOFF, "FILTER_CUTOFF"],
  [FILTER_RESO, "FILTER_RESO" ],
  [FILTER_EG_AMT, "FILTER_EG_AMT"],
  [FILTER_KEY_TRK, "FILTER_KEY_TRK"],

  [EG_ATTACK, "EG_ATTACK"],
  [EG_DECAY, "EG_DECAY"],
  [EG_SUSTAIN, "EG_SUSTAIN"],
  [EG_RELEASE, "EG_RELEASE"],

  [EG_OSC_AMT, "EG_OSC_AMT"],
  [EG_OSC_DST, "EG_OSC_DST"],
  [VOICE_MODE, "VOICE_MODE"],
  [PORTAMENTO, "PORTAMENTO"],

  [LFO_WAVE, "LFO_WAVE"],
  [LFO_RATE, "LFO_RATE"],
  [LFO_DEPTH, "LFO_DEPTH"],
  [LFO_FADE_TIME, "LFO_FADE_TIME"],

  [LFO_OSC_AMT, "LFO_OSC_AMT"],
  [LFO_OSC_DST, "LFO_OSC_DST"],
  [LFO_FILTER_AMT, "LFO_FILTER_AMT"],
  [AMP_LEVEL, "AMP_LEVEL"],

  [AMP_ATTACK, "AMP_ATTACK"],
  [AMP_DECAY, "AMP_DECAY"],
  [AMP_SUSTAIN, "AMP_SUSTAIN"],
  [AMP_RELEASE, "AMP_RELEASE"],

  [CHORUS_MODE, "CHORUS_MODE"],
  [CHORUS_RATE, "CHORUS_RATE"],
  [CHORUS_DEPTH, "CHORUS_DEPTH"],
  [CHORUS_DLY_TIME, "CHORUS_DLY_TIME"],

  [P_BEND_RANGE, "P_BEND_RANGE"],
  [CHORUS_BYPASS, "CHORUS_BYPASS"],
]);

const controllersInLocalStorage = [
  OSC_1_WAVE,
  OSC_1_SHAPE,
  OSC_1_MORPH,
  MIXER_SUB_OSC,

  OSC_2_WAVE,
  OSC_2_COARSE,
  OSC_2_FINE,
  MIXER_OSC_MIX,

  FILTER_CUTOFF,
  FILTER_RESO,
  FILTER_EG_AMT,
  FILTER_KEY_TRK,

  EG_ATTACK,
  EG_DECAY,
  EG_SUSTAIN,
  EG_RELEASE,

  EG_OSC_AMT,
  EG_OSC_DST,
  VOICE_MODE,
  PORTAMENTO,

  LFO_WAVE,
  LFO_RATE,
  LFO_DEPTH,
  LFO_FADE_TIME,

  LFO_OSC_AMT,
  LFO_OSC_DST,
  LFO_FILTER_AMT,
  AMP_LEVEL,

  AMP_ATTACK,
  AMP_DECAY,
  AMP_SUSTAIN,
  AMP_RELEASE,

  CHORUS_MODE,
  CHORUS_RATE,
  CHORUS_DEPTH,
  CHORUS_DLY_TIME,

  P_BEND_RANGE,
  CHORUS_BYPASS,
];

// PRESET                       #0 #1 #2 #3  #4  #5 #6  #7   
presetControllers[OSC_1_WAVE] = [0, 0, 0, 0, 0, 96, 0, 0];
presetControllers[OSC_1_SHAPE] = [0, 0, 0, 0, 0, 0, 0, 0];
presetControllers[OSC_1_MORPH] = [0, 0, 0, 0, 0, 0, 0, 0];
presetControllers[MIXER_SUB_OSC] = [127, 127, 127, 127, 127, 0, 0, 0 ];

presetControllers[OSC_2_WAVE] = [0, 0, 0, 0, 0, 0, 0, 0  ];
presetControllers[OSC_2_COARSE] = [71, 71, 64, 76, 64, 64, 64, 64];
presetControllers[OSC_2_FINE] = [72, 72, 72, 72, 72, 72, 72, 64 ];
presetControllers[MIXER_OSC_MIX] = [64, 64, 64, 64, 64, 64, 64, 0];

presetControllers[FILTER_CUTOFF] = [112, 112, 4, 124, 4, 112, 127, 127];
presetControllers[FILTER_RESO] = [64, 64, 32, 32, 32, 64, 0, 0];
presetControllers[FILTER_EG_AMT] = [64, 64, 124, 4, 124, 64, 64, 64];
presetControllers[FILTER_KEY_TRK] = [127, 127, 127, 127, 127, 127, 127, 127];

presetControllers[EG_ATTACK] = [0, 0, 64, 96, 0, 0, 0, 0];
presetControllers[EG_DECAY] = [127, 127, 96, 96, 96, 127, 127, 127];
presetControllers[EG_SUSTAIN] = [0, 0, 0, 0, 0, 0, 0, 0];
presetControllers[EG_RELEASE] = [0, 0, 0, 0, 96, 0, 0, 0];

presetControllers[EG_OSC_AMT] = [64, 64, 64, 64, 64, 64, 64, 6];
presetControllers[EG_OSC_DST] = [0, 0, 0, 0, 0, 0, 0, 0];
presetControllers[VOICE_MODE] = [127, 0, 0, 0, 64, 127, 0, 127];
presetControllers[PORTAMENTO] = [0, 0, 0, 0, 0, 0, 0, 0];

presetControllers[LFO_WAVE] = [0, 0, 0, 0, 0, 0, 0, 0];
presetControllers[LFO_RATE] = [96, 96, 96, 96, 96, 96, 96, 96];
presetControllers[LFO_DEPTH] = [8, 64, 64, 64, 8, 64, 64, 0];
presetControllers[LFO_FADE_TIME] = [0, 64, 64, 64, 0, 0, 64, 0];

presetControllers[LFO_OSC_AMT] = [80, 80, 80, 80, 80, 127, 80, 64];
presetControllers[LFO_OSC_DST] = [0, 0, 0, 0, 0, 127, 0, 0];
presetControllers[LFO_FILTER_AMT] = [64, 64, 64, 64, 64, 64, 64, 64 ];
presetControllers[AMP_LEVEL] = [127, 127, 127, 127, 127, 127, 127, 127];

presetControllers[AMP_ATTACK] = [0, 0, 0, 0, 0, 0, 0, 0];
presetControllers[AMP_DECAY] = [127, 127, 127, 127, 96, 127, 127, 127];
presetControllers[AMP_SUSTAIN] = [0, 0, 0, 0, 0, 0, 0, 0];
presetControllers[AMP_RELEASE] = [0, 0, 0, 0, 96, 0, 0, 0];

presetControllers[CHORUS_MODE] = [127, 127, 127, 127, 127, 127, 127, 0];
presetControllers[CHORUS_RATE] = [32, 32, 32, 32, 32, 32, 32, 32 ];
presetControllers[CHORUS_DEPTH] = [64, 64, 64, 64, 64, 64, 64, 64 ];
presetControllers[CHORUS_DLY_TIME] = [64, 64, 64, 64, 64, 64, 64, 64];

presetControllers[P_BEND_RANGE] = [2, 2, 2, 2, 2, 2, 2, 2];
presetControllers[CHORUS_BYPASS] = [0, 0, 0, 0, 0, 0, 0, 0];

document.addEventListener("touchstart", function(event) {
  if (event.target.tagName.toUpperCase() != "INPUT" &&
      event.target.tagName.toUpperCase() != "SELECT") {
    event.preventDefault();
  }
})

var sustained = false;

document.addEventListener("keypress", (e) => {
  if (e.repeat) return;
  onKeyPress(e.key);
});

document.addEventListener("keyup", (e) => {
  if (e.repeat) return;
  onKeyUp(e.key);
})

window.onload = function() {
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({sysex: false}).then(onMIDISuccess, onMIDIFailure);
  } else {
    console.log("No MIDI support present in your browser.");
  }

  var result = restoreControllers();
  if (!result) {
    onChangeTranspose(0);
    preset(7);
  }

  document.getElementById("fileImportAll").addEventListener("change", fileImportAllChange, false);
  fileReaderImportAll.addEventListener("load", fileReaderImportAllLoad, false);
}

function sleep(msec) {
  var t1 = new Date().getTime();
  var t2;
  do {
    t2 = new Date().getTime();
  } while (t2 < t1 + msec);
}

function panic() {
  sustained = false;
  if (midiOutput) {
    midiOutput.send([(CONTROL_CHANGE | MIDI_CH), ALL_NOTES_OFF, 0]);
    sleep(10);
    midiOutput.send([(CONTROL_CHANGE | MIDI_CH), ALL_SOUND_OFF, 0]);
    sleep(10);
    midiOutput.send([(CONTROL_CHANGE | MIDI_CH), RESET_ALL_CTRLS, 0]);
    sleep(10);
  }

  document.getElementById("spanPB").innerHTML = "+0";
  document.getElementById("spanMODULATION").innerHTML = "0";
  //document.getElementById("spanEXPRESSION").innerHTML = "127";
  document.getElementById("spanVelocity").innerHTML = "0";
  document.getElementById("spanSUSTAIN_PEDAL").innerHTML = "0";
  console.log("Stop All")
}

function restoreControllers() {
  var value;
  controllersInLocalStorage.forEach(function(i) {
    value = localStorage.getItem("key" + controlNumberToStringMap.get(i));
    if (!value) {
      value = presetControllers[i][PRESET_NUMBER_INITIAL];
    }
    onChangeControlChange(i, value);
  });

  return true;
}

function onPresetChange(event){
  var selectElement = event.target;
  var value = selectElement.value;
  preset(value)
}

function afterChangeOsc1WaveOrVoiceMode() {
  var targetCCNumbers = [OSC_1_SHAPE, OSC_1_MORPH, MIXER_SUB_OSC, OSC_2_WAVE, OSC_2_COARSE, OSC_2_FINE, MIXER_OSC_MIX, FILTER_KEY_TRK];

  var valueVoiceMode = localStorage.getItem("keyVOICE_MODE");
  if (valueVoiceMode < 32) {
    targetCCNumbers.forEach(function(i) {
      document.getElementById("input" + controlNumberToStringMap.get(i)).disabled = true;
    });
  } else {
    targetCCNumbers.forEach(function(i) {
      document.getElementById("input" + controlNumberToStringMap.get(i)).disabled = false;
    });

    var valueOsc1Wave = localStorage.getItem("keyOSC_1_WAVE");
    if ((valueOsc1Wave >= 80) && (valueOsc1Wave < 112)) {
      document.getElementById("inputMIXER_SUB_OSC").disabled = true;
    } else {
      document.getElementById("inputOSC_1_SHAPE").disabled = true;
      document.getElementById("inputOSC_1_MORPH").disabled = true;
    }
  }
}

function setMidiChannel(event){
  var selectElement = event.target;
  MIDI_CH = parseInt(selectElement.value);
}

function onMIDIMessage(event) {
  //console.log(event.data);
  // CAUTION: Running Status and System Exclusive are not taken into account
  if (event.data[0] == (CONTROL_CHANGE | MIDI_CH)) {
    var number = event.data[1];
    var value = event.data[2];
    if (controllersInLocalStorage.indexOf(number) >= 0) {
      updateDisplayOfControl(number, value);
      if ((number == OSC_1_WAVE) || (number == VOICE_MODE)) {
        afterChangeOsc1WaveOrVoiceMode();
      }
    } else if (number == MODULATION     ) {
      document.getElementById("spanMODULATION").innerHTML = value;
    } else if (number == SUSTAIN_PEDAL   ) {
      document.getElementById("spanSUSTAIN_PEDAL").innerHTML = value;
    } else if (number == RESET_ALL_CTRLS) {
      document.getElementById("spanPB").innerHTML = "+0";
      document.getElementById("spanMODULATION").innerHTML = "0";
      //document.getElementById("spanEXPRESSION").innerHTML = "127";
      document.getElementById("spanSUSTAIN_PEDAL").innerHTML = "0";
    } else if (number == P_BEND_BY_CC) {
      var pb = (value - 64) * 128;
      if (pb == 8064) {
        pb = 8191;
      }
      document.getElementById("spanPB").innerHTML = value;
      if (pb >= 0) {
        document.getElementById("spanPB").innerHTML = "+" + String(pb);
      } else {
        document.getElementById("spanPB").innerHTML = pb;
      }
    } else if (number >= SP_PROG_CHG_8 && number <= SP_PROG_CHG_15) {
      // Special Program Change (only for VRA8-U type-16 CTRL)
      var programIndex = number - SP_PROG_CHG_8;
      var oldValue = specialProgramChangeCCValues[programIndex];
      specialProgramChangeCCValues[programIndex] = value;
      if (oldValue <= 63 && value >= 64) {
        loadControllers(programIndex + 8);
        return;
      }
    } else if (number == SP_RAND_CTRL   ) {
      // Special Random Control (only for VRA8-U type-16 CTRL)
      var oldValue = specialRandomControlCCValue;
      specialRandomControlCCValue = value;
      if (oldValue <= 63 && value >= 64) {
        setAllRandom();
        return;
      }
    }
  } else if (event.data[0] == (PITCH_BEND | MIDI_CH)) {
    var value = event.data[1] + (event.data[2] * 128) - 8192;
    document.getElementById("spanPB").innerHTML = value;
    if (value >= 0) {
      document.getElementById("spanPB").innerHTML = "+" + String(value);
    } else {
      document.getElementById("spanPB").innerHTML = value;
    }
  } else if (event.data[0] == (NOTE_ON | MIDI_CH)) {
    var velocity = event.data[2];
    if (velocity > 0) {
      document.getElementById("spanVelocity").innerHTML = velocity;
    }
  }

  const PROGRAM_CHANGE = 0xC0;
  if (event.data[0] == (PROGRAM_CHANGE | MIDI_CH)) {
    var number = event.data[1];
    if (number >= 0 && number <= 7) {
      preset(number);
      return;
    } else if (number >= 8 && number <= 15) {
      loadControllers(number);
      return;
    } else if (number == 127) {
      // Program #127: Random Control
      setAllRandom();
      return;
    }
  }

  if (midiOutput) {
    midiOutput.send(event.data);
  }
}

function onMIDISuccess(midiAccess) {
  console.log("MIDI ready!");
  midi = midiAccess;

  var inputIterator = midi.inputs.values();
  midiInputs = [];
  for (var o = inputIterator.next(); !o.done; o = inputIterator.next()) {
    midiInputs.push(o.value)
  }
  var outputIterator = midi.outputs.values();
  midiOutputs = [];
  for (var o = outputIterator.next(); !o.done; o = outputIterator.next()) {
    midiOutputs.push(o.value)
  }

  var selectInputPort = document.getElementById("selectInputPort");
  for (var i = 0; i < midiInputs.length; i++) {
    selectInputPort.appendChild(new Option(midiInputs[i].name))
  }
  onChangeInputPort();

  var selectOutputPort = document.getElementById("selectOutputPort");
  for (var i = 0; i < midiOutputs.length; i++) {
    selectOutputPort.appendChild(new Option(midiOutputs[i].name))
  }
  onChangeOutputPort();
}

function onMIDIFailure(msg) {
  console.log("Failed to get MIDI access - " + msg);
}

function onChangeInputPort(){
  var selectInputPort = document.getElementById("selectInputPort");
  for (var i = 0; i < midiInputs.length; i++) {
    
    if (i == selectInputPort.selectedIndex) { continue; }
      midiInputs[i].onmidimessage = null;
  }

 
  midiInput1 = midiInputs[selectInputPort.selectedIndex];
  if (midiInput1) {
    midiInput1.onmidimessage = onMIDIMessage;
  }
}

function onChangeOutputPort() {
  var selectOutputPort = document.getElementById("selectOutputPort");
  midiOutput = midiOutputs[selectOutputPort.selectedIndex];
  if (midiOutput) {
    panic();
    var result = restoreControllers();
    if (!result) {
      onChangeTranspose(0);
      preset(7);
    }
  }
}

function updateDisplayOfControl(number, value) {
  document.getElementById("input" + controlNumberToStringMap.get(number)).value = parseInt(value);

  switch (number) {
  case OSC_2_COARSE    :
  case OSC_2_FINE      :
  case FILTER_EG_AMT   :
  case EG_OSC_AMT      :
  case LFO_OSC_AMT     :
  case LFO_FILTER_AMT  :
    if (value >= 64) {
      document.getElementById("span" + controlNumberToStringMap.get(number)).innerHTML = "+" + String(value - 64);
    } else {
      document.getElementById("span" + controlNumberToStringMap.get(number)).innerHTML = value - 64;
    }
    break;
  default:
    document.getElementById("span" + controlNumberToStringMap.get(number)).innerHTML = value;
    break;
  }

  localStorage.setItem("key" + controlNumberToStringMap.get(number), value);
}

function onChangeControlChange(number, value) {
  updateDisplayOfControl(number, value);
  if ((number == OSC_1_WAVE) || (number == VOICE_MODE)) {
    afterChangeOsc1WaveOrVoiceMode();
  }
  if (midiOutput) {
    midiOutput.send([(CONTROL_CHANGE | MIDI_CH), number, parseInt(value)]);
    sleep(10);
  }
}

function preset(number) {
  controllersInLocalStorage.forEach(function(i) {
    onChangeControlChange(i, presetControllers[i][number]);
  });
}

function setAllRandom(){
  controllersInLocalStorage.forEach(function(i) {
    if((i != CHORUS_DEPTH   ) &&
       (i != CHORUS_RATE    ) &&
       (i != CHORUS_DLY_TIME) &&
       (i != CHORUS_MODE    ) &&
       (i != CHORUS_BYPASS  ) &&
       (i != AMP_LEVEL      ) &&
       (i != VOICE_MODE     )) {
      onChangeControlChange(i, rand(128));
    }
  });

  controllersInLocalStorage.forEach(function(i) {
    if((i == CHORUS_DEPTH   ) ||
       (i == CHORUS_RATE    ) ||
       (i == CHORUS_DLY_TIME) ||
       (i == CHORUS_MODE    )) {
      onChangeControlChange(i, rand(128));
    }
  });
  console.log("Randomized")
}

function rand(n) {
  return Math.floor(Math.random() * n);
}

function onChangeTranspose(value) {
  document.getElementById("inputTranspose").value = parseInt(value);
  if (value > 0) {
    document.getElementById("spanTranspose").innerHTML = "+" + String(value);
  } else if (value == 0){
    document.getElementById("spanTranspose").innerHTML = String(value);
  } else {
    document.getElementById("spanTranspose").innerHTML = String(value);
  }

  localStorage.setItem("keyTranspose", value);
  transpose = parseInt(value);
}

function loadControllers(number) {
  var value;
  controllersInLocalStorage.forEach(function(i) {
    value = localStorage.getItem("keyMemory" + String(number) + controlNumberToStringMap.get(i));
    if (!value) {
      value = presetControllers[i][PRESET_NUMBER_INITIAL];
    }
    onChangeControlChange(i, value);
  })
}

function saveControllers(number) {
  var r = confirm("Store the current control values?");
  if (r == false) {
    return;
  }

  controllersInLocalStorage.forEach(function(i) {
    var value = document.getElementById("input" + controlNumberToStringMap.get(i)).value;
    localStorage.setItem("keyMemory" + String(number) + controlNumberToStringMap.get(i), value);
  });
}

function noteOn(noteNumber) {
  if (midiOutput) {
    midiOutput.send([(NOTE_ON | MIDI_CH), noteNumber + transpose, 100]);
    document.getElementById("spanVelocity").innerHTML = 100;
    sleep(50);
  }
}

function noteOff(noteNumber) {
  if (midiOutput) {
    midiOutput.send([(NOTE_OFF | MIDI_CH), noteNumber + transpose, 64]);
    sleep(50);
  }
}

function fileImportAll() {
  document.getElementById("fileImportAll").click();
}

function fileImportCurrent() {
  document.getElementById("fileImportCurrent").click();
}

function fileImportCurrentChange(event) {
  fileReaderImportCurrent.readAsText(event.target.files[0]);
}

function fileImportAllChange(event) {
  fileReaderImportAll.readAsText(event.target.files[0]);
}

function fileReaderImportAllLoad(event) {
  var r = confirm("Import the current control values and the stored programs?");
  if (r == false) {
    document.getElementById("fileImportAll").value = "";
    return;
  }

  var obj = JSON.parse(event.target.result);

  for (var number = 8; number < 16; number++) {
    controllersInLocalStorage.forEach(function(i) {
      var line = obj[controlNumberToStringMap.get(i)];
      if (line != null) {
        var value = line[1][number - 8];
        if (value != null) {
          localStorage.setItem("keyMemory" + String(number) + controlNumberToStringMap.get(i), value);
        }
      }
    });
  }

  controllersInLocalStorage.forEach(function(i) {
    var line = obj[controlNumberToStringMap.get(i)];
    if (line != null) {
      var value = line[0];
      if (value != null) {
        localStorage.setItem("key" + controlNumberToStringMap.get(i), value);
      }
    }
  });

  var result = restoreControllers();
  if (!result) {
    onChangeTranspose(0);
    preset(7);
  }

  document.getElementById("fileImportAll").value = "";
}

function fileReaderImportCurrentLoad(event) {
  var r = confirm("Import the current control values?");
  if (r == false) {
    document.getElementById("fileImportCurrent").value = "";
    return;
  }

  var obj = JSON.parse(event.target.result);

  controllersInLocalStorage.forEach(function(i) {
    var line = obj[controlNumberToStringMap.get(i)];
    if (line != null) {
      var value = line[0];
      if (value != null) {
        localStorage.setItem("key" + controlNumberToStringMap.get(i), value);
      }
    }
  });

  var result = restoreControllers();
  if (!result) {
    onChangeTranspose(0);
    preset(7);
  }

  document.getElementById("fileImportCurrent").value = "";
}

function fileExport() {
  var str = "{\n";
  str += "  \"_version     \" : \"" + APP_NAME_VERSION + "\",\n";
  str += fileExportOneLine(OSC_1_WAVE     );
  str += fileExportOneLine(OSC_1_SHAPE    );
  str += fileExportOneLine(OSC_1_MORPH    );
  str += fileExportOneLine(MIXER_SUB_OSC  );
  str += "\n";
  str += fileExportOneLine(OSC_2_WAVE     );
  str += fileExportOneLine(OSC_2_COARSE   );
  str += fileExportOneLine(OSC_2_FINE     );
  str += fileExportOneLine(MIXER_OSC_MIX  );
  str += "\n";
  str += fileExportOneLine(FILTER_CUTOFF  );
  str += fileExportOneLine(FILTER_RESO    );
  str += fileExportOneLine(FILTER_EG_AMT  );
  str += fileExportOneLine(FILTER_KEY_TRK );
  str += "\n";
  str += fileExportOneLine(EG_ATTACK      );
  str += fileExportOneLine(EG_DECAY       );
  str += fileExportOneLine(EG_SUSTAIN     );
  str += fileExportOneLine(EG_RELEASE     );
  str += "\n";
  str += fileExportOneLine(EG_OSC_AMT     );
  str += fileExportOneLine(EG_OSC_DST     );
  str += fileExportOneLine(VOICE_MODE     );
  str += fileExportOneLine(PORTAMENTO     );
  str += "\n";
  str += fileExportOneLine(LFO_WAVE       );
  str += fileExportOneLine(LFO_RATE       );
  str += fileExportOneLine(LFO_DEPTH      );
  str += fileExportOneLine(LFO_FADE_TIME  );
  str += "\n";
  str += fileExportOneLine(LFO_OSC_AMT    );
  str += fileExportOneLine(LFO_OSC_DST    );
  str += fileExportOneLine(LFO_FILTER_AMT );
  str += fileExportOneLine(AMP_LEVEL      );
  str += "\n";
  str += fileExportOneLine(AMP_ATTACK     );
  str += fileExportOneLine(AMP_DECAY      );
  str += fileExportOneLine(AMP_SUSTAIN    );
  str += fileExportOneLine(AMP_RELEASE    );
  str += "\n";
  str += fileExportOneLine(CHORUS_MODE    );
  str += fileExportOneLine(CHORUS_RATE    );
  str += fileExportOneLine(CHORUS_DEPTH   );
  str += fileExportOneLine(CHORUS_DLY_TIME);
  str += "\n";
  str += fileExportOneLine(P_BEND_RANGE   );
  str += fileExportOneLine(CHORUS_BYPASS  );
  str += "\n";
  str += "  \"_end         \" : \"\"\n";
  str += "}\n";

  var blob = new Blob([str]);
  const a = document.createElement('a');
  a.download = 'synthcore16-program.json';
  document.body.appendChild(a);
  a.href = URL.createObjectURL(blob);
  a.click();
  document.body.removeChild(a);
}

function fileExportOneLine(number) {
  var str = "  \"" + controlNumberToStringMap.get(number) + "\" : [ [" + getCCValueString(number) + "], [";
  str += getStoredCCValueString(8, number) + ", ";
  str += getStoredCCValueString(9, number) + ", ";
  str += getStoredCCValueString(10, number) + ", ";
  str += getStoredCCValueString(11, number) + ", ";
  str += getStoredCCValueString(12, number) + ", ";
  str += getStoredCCValueString(13, number) + ", ";
  str += getStoredCCValueString(14, number) + ", ";
  str += getStoredCCValueString(15, number) + "] ],\n";
  return str;
}

function getCCValueString(number) {
  var value = document.getElementById("input" + controlNumberToStringMap.get(number)).value;
  var str = (value + "   ").slice(0, 3);
  return str;
}

function getStoredCCValueString(index, number) {
  var value = localStorage.getItem("keyMemory" + String(index) + controlNumberToStringMap.get(number));
  if (!value) {
    value = presetControllers[number][PRESET_NUMBER_INITIAL];
  }
  var str = (value + "   ").slice(0, 3);
  return str;
}

function sustain(){
  if(sustained){
    panic()
    document.querySelector(".random-button-sustain").style = "background-color: #282828 !important";
  } else {
    sustained = true;
    document.querySelector(".random-button-sustain").style = "background-color: grey !important";
  }
  console.log("Sustained: " + sustained)
}

function onKeyPress(keypress) {
  if(keypress == "m" || keypress == "M"){
    sustain()
    return;
  }

  if(keypress == "."){
    panic()
    setAllRandom()
    return;
  }

  if(keypress == ","){
    panic()
    return;
  }

  if(keypress == "-"){
    onChangeTranspose(transpose-2);
    console.log("Transpose: " + transpose)
    return;
  }
  if(keypress == "="){
    onChangeTranspose(transpose+2);
    console.log("Transpose: " + transpose)
    return;
  }
  //note on
  for (let [key, value] of keyToNoteMap.entries()) {
    if (key == String(keypress).toLowerCase()){
      noteOn(value)
      return
    }
  }

}

function onKeyUp(keypress) {
  if (!sustained){
    //note off
    for (let [key, value] of keyToNoteMap.entries()) {
      if (key === String(keypress).toLowerCase()){
        noteOff(value)
        return
      }
    }
  }
}