let midi = null;  // global MIDIAccess object
//https://www.smashingmagazine.com/2018/03/web-midi-api/
//https://github.com/danigb/soundfont-player
//https://github.com/cifkao/html-midi-player
//https://www.toptal.com/web/creating-browser-based-audio-applications-controlled-by-midi-hardware

var ctx = new AudioContext();
var soundfont=new Soundfont();
var instrument=Soundfont.instrument('acoustic_grand_piano');

$( document ).ready(function() {
    console.log( "ready!" );
    $( "#target" ).click(function(event) {
        console.log( "Handler for .click() called." );

        Soundfont.instrument(ctx, 'acoustic_grand_piano').then(function (piano) {
            piano.play('C4');
            
            window.navigator.requestMIDIAccess().then(function (midiAccess) {
                midiAccess.
                midiAccess.inputs.forEach(function (midiInput) {
                  //piano.listenToMidi(midiInput)
                })
              })
            var instrument= Soundfont.instrument("acoustic_grand_piano");
                   navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
          })

           
          
      
          
      });
 

});



//var soundfont = Soundfont(ctx);

function noteOn(midiNote) {
    //instrument.play("C4")
    instrument.play("C4");
}

function noteOff() {

}

function onMIDISuccess(midiAccess) {
  console.log("MIDI ready!");
  midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)
  console.log(midiAccess.inputs);
  midi.onstatechange = (event) => {
    console.log("changed");
  }
//   for (var input of midiAccess.inputs.values()){
//     input.onmidimessage = getMIDIMessage;
// }
//   input.onmidimessage = getMIDIMessage;

midi.inputs.forEach(function (port, channelKey) {
    var instrument= Soundfont.instrument("acoustic_grand_piano");
    port.onmidimessage = instrument.processMidiMessage
    console.log('You can play MIDI events on your input %j', port)
  })

    // midiAccess.inputs.forEach(function (midiInput) {
    //     instrument.listenToMidi(midiInput)
    //   })
    //instrument1.play('C4', ctx.currentTime,{duration: 0.5});
    //instrument=instrument1



  listInputsAndOutputs(midi);
  startLoggingMIDIInput(midi);
}

function onMIDIFailure(msg) {
  console.error(`Failed to get MIDI access - ${msg}`);
}


function change(){
    console.log("change");
}

function listInputsAndOutputs(midiAccess) {
    for (const entry of midiAccess.inputs) {
      const input = entry[1];
      console.log(`Input port [type:'${input.type}']` +
        ` id:'${input.id}'` +
        ` manufacturer:'${input.manufacturer}'` +
        ` name:'${input.name}'` +
        ` version:'${input.version}'`);
    }
  
    for (const entry of midiAccess.outputs) {
      const output = entry[1];
      console.log(`Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`);
    }
  }


  function onMIDIMessage(event) {
    let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
    for (const character of event.data) {
      str += `0x${character.toString(16)} `;
    }
    console.log(str);
    var command = event.data[0] & 0xf0;
    var note = event.data[1];
    var velocity = (event.data.length > 2) ? event.data[2] : 0; // a velocity value might not be included with a noteOff command
    console.log(command );
    switch (command) {
        case 144: // note on
            if (velocity > 0) {
                noteOn(note);
            } else {
                noteOff(note);
            }
            break;
        case 128: // note off
            //noteOffCallback(note);
            noteOff();
            break;
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }

  }
  
  function startLoggingMIDIInput(midiAccess, indexOfPort) {
    midiAccess.inputs.forEach((entry) => {entry.onmidimessage = onMIDIMessage;});
  }