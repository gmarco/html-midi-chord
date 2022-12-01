 // Enable WEBMIDI.js and trigger the onEnabled() function when ready
 WebMidi
 .enable()
 .then(onEnabled)
 .catch(err => alert(err));

 var ctx = new AudioContext();
 var soundfont=new Soundfont();
 var inst;
 var instrument=Soundfont.instrument(ctx,'acoustic_grand_piano');
 //https://github.com/gleitz/midi-js-soundfonts/tree/gh-pages/FluidR3_GM
 //https://github.com/danigb/soundfont-player/blob/master/INSTRUMENTS.md
 //var instrument=Soundfont.instrument(ctx,'pad_1_new_age');
instruments=[
"accordion",
"acoustic_bass",
"acoustic_grand_piano",
"acoustic_guitar_nylon",
"acoustic_guitar_steel",
"agogo",
"alto_sax",
"applause",
"bagpipe",
"banjo",
"baritone_sax",
"bassoon",
"bird_tweet",
"blown_bottle",
"brass_section",
"breath_noise",
"bright_acoustic_piano",
"celesta",
"cello",
"choir_aahs",
"church_organ",
"clarinet",
"clavinet",
"contrabass",
"distortion_guitar",
"drawbar_organ",
"dulcimer",
"electric_bass_finger",
"electric_bass_pick",
"electric_grand_piano",
"electric_guitar_clean",
"electric_guitar_jazz",
"electric_guitar_muted",
"electric_piano_1",
"electric_piano_2",
"english_horn",
"fiddle",
"flute",
"french_horn",
"fretless_bass",
"fx_1_rain",
"fx_2_soundtrack",
"fx_3_crystal",
"fx_4_atmosphere",
"fx_5_brightness",
"fx_6_goblins",
"fx_7_echoes",
"fx_8_scifi",
"glockenspiel",
"guitar_fret_noise",
"guitar_harmonics",
"gunshot",
"harmonica",
"harpsichord",
"helicopter",
"honkytonk_piano",
"kalimba",
"koto",
"lead_1_square",
"lead_2_sawtooth",
"lead_3_calliope",
"lead_4_chiff",
"lead_5_charang",
"lead_6_voice",
"lead_7_fifths",
"lead_8_bass__lead",
"marimba",
"melodic_tom",
"music_box",
"muted_trumpet",
"oboe",
"ocarina",
"orchestra_hit",
"orchestral_harp",
"overdriven_guitar",
"pad_1_new_age",
"pad_2_warm",
"pad_3_polysynth",
"pad_4_choir",
"pad_5_bowed",
"pad_6_metallic",
"pad_7_halo",
"pad_8_sweep",
"pan_flute",
"percussive_organ",
"piccolo",
"pizzicato_strings",
"recorder",
"reed_organ",
"reverse_cymbal",
"rock_organ",
"seashore",
"shakuhachi",
"shamisen",
"shanai",
"sitar",
"slap_bass_1",
"slap_bass_2",
"soprano_sax",
"steel_drums",
"string_ensemble_1",
"string_ensemble_2",
"synth_bass_1",
"synth_bass_2",
"synth_brass_1",
"synth_brass_2",
"synth_choir",
"synth_drum",
"synth_strings_1",
"synth_strings_2",
"taiko_drum",
"tango_accordion",
"telephone_ring",
"tenor_sax",
"timpani",
"tinkle_bell",
"tremolo_strings",
"trombone",
"trumpet",
"tuba",
"tubular_bells",
"vibraphone",
"viola",
"violin",
"voice_oohs",
"whistle",
"woodblock",
"xylophone",
]
 chords={
  
  /*  "none":[0],
    "d": [0,4,7],
    "7": [0,4,7,10],
    "9": [0,4,7,10,14],
    "#m": [1,4,8], 
    "11": [0,4,7,10,14,17],
    "maj7": [0,4,7,11],
    "maj9": [0,4,7,11,14],
    "maj11": [0,4,7,11,14,17],
    "m9": [0,2,3,7,10],
    "m": [0,3,7],
    "m6": [0,3,7,9],
    "m7": [0,3,7,10],
    "sus": [0,5,7,10],
    "dim": [0,3,6,9],
    "aug": [0,4,8,10],
*/
    "none":[0],
    "5": [0,7],
    "no5": [0,4],
    "omit5": [0,4],
    "m[no5]": [0,3],
    "m[omit5]": [0,3],

    "maj": [0,4,7],
    "m": [0,3,7],
    "min": [0,3,7],
    "-": [0,3,7],
    "dim": [0,3,6],
    "[b5]": [0,4,6],
    "aug": [0,4,8],
    "sus2": [0,2,7],
    "sus4": [0,5,7],
    "sus": [0,5,7],
    "6": [0,4,7,9],
    "7": [0,4,7,10],
    "7-5": [0,4,6,10],
    "7b5": [0,4,6,10],
    "7+5": [0,4,8,10],
    "7#5": [0,4,8,10],
    "7sus4": [0,5,7,10],
    "m6": [0,3,7,9],
    "m7": [0,3,7,10],
    "m7-5": [0,3,6,10],
    "m7b5": [0,3,6,10],
    "m7+5": [0,3,8,10],
    "m7#5": [0,3,8,10],
    "dim6": [0,3,6,8],
    "dim7": [0,3,6,9],
    "M7": [0,4,7,11],
    "maj7": [0,4,7,11],
    "M7+5": [0,4,8,11],
    "mM7": [0,3,7,11],
    "add4": [0,4,5,7],
    "Madd4": [0,4,5,7],
    "madd4": [0,3,5,7],
    "add9": [0,4,7,14],
    "Madd9": [0,4,7,14],
    "madd9": [0,3,7,14],
    "sus4add9": [0,5,7,14],
    "sus4add2": [0,2,5,7],
    "2": [0,4,7,14],
    "add11": [0,4,7,17],
    "4": [0,4,7,17],
    "m69": [0,3,7,9,14],
    "69": [0,4,7,9,14],
    "9": [0,4,7,10,14],
    "m9": [0,3,7,10,14],
    "M9": [0,4,7,11,14],
    "maj9": [0,4,7,11,14],
    "9sus4": [0,5,7,10,14],
    "7-9": [0,4,7,10,13],
    "7b9": [0,4,7,10,13],
    "7+9": [0,4,7,10,15],
    "7#9": [0,4,7,10,15],
    "9-5": [0,4,6,10,14],
    "9b5": [0,4,6,10,14],
    "9+5": [0,4,8,10,14],
    "9#5": [0,4,8,10,14],
    "7#9b5": [0,4,6,10,15],
    "7#9#5": [0,4,8,10,15],
    "m7b9b5": [0,3,6,10,13],
    "7b9b5": [0,4,6,10,13],
    "7b9#5": [0,4,8,10,13],
    "11": [0,7,10,14,17],
    "7+11": [0,4,7,10,18],
    "7#11": [0,4,7,10,18],
    "M7+11": [0,4,7,11,18],
    "M7#11": [0,4,7,11,18],
    "7b9#9": [0,4,7,10,13,15],
    "7b9#11": [0,4,7,10,13,18],
    "7#9#11": [0,4,7,10,15,18],
    "7-13": [0,4,7,10,20],
    "7b13": [0,4,7,10,20],
    "m7add11": [0,3,7,10,17],
    "M7add11": [0,4,7,11,17],
    "mM7add11": [0,3,7,11,17],
    "7b9b13": [0,4,7,10,13,17,20],
    "9+11": [0,4,7,10,14,18],
    "9#11": [0,4,7,10,14,18],
    "13": [0,4,7,10,14,21],
    "13-9": [0,4,7,10,13,21],
    "13b9": [0,4,7,10,13,21],
    "13+9": [0,4,7,10,15,21],
    "13#9": [0,4,7,10,15,21],
    "13+11": [0,4,7,10,18,21],
    "13#11": [0,4,7,10,18,21],
    "M7add13": [0,4,7,9,11,14],
    
    //sus2,sus#4,maj6/9, maj7sus#4,maj#11,maj13
}
chord_progressions=[
    [1,5,6,4],
    [1,6,3,7],
    [1,4,5,1],
    [1,6,4,5],
    [1,4,2,5],
    [1,4,1,5],
    [1,3,4,5],
    [1,2,3,4,5],
    [1,5,1,4],
    [1,6,4,7],
    [1,5,6,3],
    [4,1,2,5],
]

key_diff={
    //"dur"  : [2,2,1,2,2,2,1],
    //"moll" : [2,1,2,2,1,2,2],

    "maj" :[2,2,1,2,2,2,1],
    "Dor" :[2,1,2,2,2,1,2],
    "Phr" :[1,2,2,2,1,2,2],
    "Lyd" :[2,2,2,1,2,2,1],
    "Mix" :[2,2,1,2,2,1,2],
    "min" :[2,1,2,2,1,2,2],
    "Loc" :[1,2,2,1,2,2,2]

    /*
    'maj': [0, 2, 4, 5, 7, 9, 11, 12],
    'Dor': [0, 2, 3, 5, 7, 9, 10, 12],
    'Phr': [0, 1, 3, 5, 7, 8, 10, 12],
    'Lyd': [0, 2, 4, 6, 7, 9, 11, 12],
    'Mix': [0, 2, 4, 5, 7, 9, 10, 12],
    'min': [0, 2, 3, 5, 7, 8, 10, 12],
    'Loc': [0, 1, 3, 5, 6, 8, 10, 12],
    */
}

progressions={
    "maj":["maj","min","min","maj","maj","min","dim"],
    "min":["min","dim","maj","min","min","maj","maj"],
}
scales={
    "C":0,
    "C#":1,
    "D":2,
    "D#":3,
    "E":4,
    "F":5,
    "F#":6,
    "G":7,
    "G#":8,
    "A":9,
    "A#":10,
    "H":11,
    
}

TWINKLE_TWINKLE = {
    notes: [
      {pitch: 60, startTime: 0.0, endTime: 0.5},
      {pitch: 60, startTime: 0.5, endTime: 1.0},
      {pitch: 67, startTime: 1.0, endTime: 1.5},
      {pitch: 67, startTime: 1.5, endTime: 2.0},
      {pitch: 69, startTime: 2.0, endTime: 2.5},
      {pitch: 69, startTime: 2.5, endTime: 3.0},
      {pitch: 67, startTime: 3.0, endTime: 4.0},
      {pitch: 65, startTime: 4.0, endTime: 4.5},
      {pitch: 65, startTime: 4.5, endTime: 5.0},
      {pitch: 64, startTime: 5.0, endTime: 5.5},
      {pitch: 64, startTime: 5.5, endTime: 6.0},
      {pitch: 62, startTime: 6.0, endTime: 6.5},
      {pitch: 62, startTime: 6.5, endTime: 7.0},
      {pitch: 60, startTime: 7.0, endTime: 8.0},  
    ],
    totalTime: 8
  };



function note_from_keydiff(diff){
    //find  out key in scale with diff of notes in c scale
    ret=-1
    s=0
    key_diff["maj"].forEach((d,i)=>{
        
        if (s==diff){
            ret=i
        }
        
        //console.log("d="+d+ " i="+i +" s="+s+" diff= "+ diff)
        s+=d;
    })
    return ret;
}

function key_diff_from_note(tone,note){
    ret=-1
    s=0
    key_diff[tone].forEach((d,i)=>{
        
        if (i==note){
            ret=s
        }
        
        //console.log("d="+d+ " i="+i +" s="+s+" diff= "+ diff)
        s+=d;
    })
    return ret;
}

$(document).ready(function() {    
    $.each(scales, function (name, value) {
        //console.log("adding");
        //console.log(i);
        $('#scale').append($('<option>', { 
            value: value,
            text : name 
        }));
    });
    
    $.each(progressions, function (name, value) {
        //console.log("adding");
        //console.log(i);
        $('#tone').append($('<option>', { 
            value: name,
            text : name 
        }));
    });
    $.each(instruments,function(ind,name){
        $('#instrument').append($('<option>', { 
            value: name,
            text : name 
        }));
    })
    modes={
        "plain_note":"Plain Note",
        "named_chord":"Named Chord from this Note",
        "single_scale":"Single Note from selected Scale",
        "named_chord_scale":"Named Chord from selected Scale",
        "scale_chord":"I-VII Chord from scale"
    }

    $.each(modes,function(key,value){
        $("#inputmode").append($("<option>",{
            value: key,
            text: value
        }))
    })

    $.each(chords,function(key ,values){
        $("#singlechord").append($("<option>",{
            value: key,
            text: key
        }))
    })
    

    $("#instrument").change(function(e){
        console.log(e);
        $(e.target).find("option:selected").each(function() {
            console.log($(this).text())
            instrument=Soundfont.instrument(ctx,$(this).text());
            //str += $( this ).text() + " ";
          });
        //
    })
    $("#scale").change(function(){
        fill_chords();
    })
    $("#tone").change(function(){
        fill_chords();
    })
    fill_chords();

});  

function num_to_roman(num){
    return ["i","ii","iii","iv","v","vi","vii","viii"][num];
}

actual_chords=[]

function create_chord_item(chord_num,chord_name,base,base_diff){
    
    
    //console.log(chords[name_chord]);
    num_ch=num_to_roman(chord_num);
    if (chord_name=="maj"){
        num_ch=num_ch.toUpperCase();
    }
    extra=""
    if (chord_name!="maj" && chord_name!="min"){
        extra="<sup>"+chord_name+"</sup>"
    }
    var it=$("<div></div>")
    .addClass("chord")
    .addClass("ch_num"+(chord_num+1))
    .attr("chord_name",chord_name)
    .attr("base_diff",base_diff)
    .attr("base",base)
    .html(num_ch+ extra)
    
    return it;
}


function fill_chords(){
    //console.log("filling");
    base=60-12+parseInt($("#scale").val());
    $("#chords").empty();
    tone=$("#tone").val();
    chrd=progressions[tone]
    //console.log("chrd="+chrd)
    //console.log("tone="+tone)
    diff=0;
    for (i = 0; i < 8; i++) {
        name_chord=chrd[i];
        notes=chords[name_chord];
        //console.log(chords[name_chord]);
        num_ch=num_to_roman(i);
        if (name_chord=="d"){
            num_ch=num_ch.toUpperCase();
        }
        var it=$("<div></div>")
            .addClass("chord")
            .addClass("ch_num"+(i+1))
            .text(num_ch)
            .on("click",play_chord_clicked)
            .attr("notes",notes)
            .attr("diff",diff)
        var i1=create_chord_item(i,name_chord,base,diff)
            .on("click",play_chord_clicked)
        //$("#chords").append(it);
        $("#chords").append(i1);
        
        actual_chords[i]={diff: diff,chord: notes}
        diff+=parseInt(key_diff[tone][i]);
    } 
    fill_progressions()
}


function fill_progressions(){
    base=60-12+parseInt($("#scale").val());
    tone=$("#tone").val();

    $("#progressions").empty();

    chrd=progressions[tone]
    //console.log(chrd);
    $.each(chord_progressions,function(i,e){
        //console.log(e)
        var pro=$("<div></div>")
            .addClass("progression")
            .attr("progressions",e)
            .on("click",play_progression)
        $.each(e,function(i,chord_number){
            //name_chord=;
            //console.log(chord_number);
            name_chord=chrd[chord_number-1];

            //console.log(name_chord);
            num_ch=num_to_roman(chord_number-1);
            if (name_chord=="d"){
                num_ch=num_ch.toUpperCase();
            }
            var note=$("<div></div>")
                .addClass("chord")
                .addClass("ch_num"+(chord_number))
                .text(num_ch)
            var i1=create_chord_item(chord_number-1,name_chord,base,actual_chords[chord_number-1].diff)
                .on("click",play_progression)
            //pro.append(note);
            pro.append(i1);
        })
       
        $("#progressions")
        .append(pro)

    })
}
      

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function play_progression(e){
    //console.log(e)
    _progressions=$(e.target).parent(".progression").attr("progressions");
    p1=[]
    $(e.target).parent(".progression").children("div[chord_name]").each(function(ind,i){
        io=$(i)
        //console.log(io)
        p1.push({chord: io.attr("chord_name"),base: io.attr("base"), diff: io.attr("base_diff")})
    });
    play_chord2(p1);

}


function play_chord2(chord,options){

    //array of {chord: 'm',base: 60,diff:5}
    //console.log(chord)
    instrument.then(function(a){
        out=[]
        $.each(chord,function(ind,chor){
            
            //out.push("chord_num="+chord)
            
            base=parseInt(chor.base)
            diff=parseInt(chor.diff)
            chord_name=chor.chord 
            out.push("chord_name="+diff)
            
            $.each(chords[chord_name],function (i,o){
                n=new Note(base+diff+o,options)
                out.push(n.identifier)
                //extern midi only selected sound
                if(midiOut!=null){
                    midiOut.playNote(n,{duration: 500,time: WebMidi.time+(ind*1000)})
                }
                //local sound with ocatves
                gain = options !=undefined ? options._attack : 1.0
                t=ind*1
                pattern=0
                switch (pattern){
                    case 0:
                        t=ind*1
                        break;
                    case 1:
                        t=ind*2+i*0.5
                        break;
                    case 2:
                        t=ind*1.3+i%2*0.6
                        break;
                    case 3:
                        t=ind*1.3+ ( (i==0)?0.5 : i==1? 0.0 : i==2 ? 1.0 :1.3 )
                        break;
                    case 4:
                        t=ind*0.8+ ( (i==0)?0.2 : i==1? 0.4 : i==2 ? 0.6 : 0.8)
                        break;
                }
                a.schedule(ctx.currentTime, [
                    {note:n.number,time:t ,gain: gain},
                   /* {note:n.number+12,time:t ,gain:gain},
                    {note:n.number-12,time:t ,gain:gain}*/
                    
                ])
            })
            
        })
        //console.log(out.join(" "))
    })
}



function play_chord_clicked(e){

    i=$(e.target)
    //console.log(i)
    play_chord2([{chord: i.attr("chord_name"),base: i.attr("base"), diff: i.attr("base_diff")}])
    
}
function process_input(event){
    
    var value = parseInt(document.getElementById("scale").value); // note shift from select
    note=event.note.number
    original_note=event.note
    on_json=JSON.parse(JSON.stringify(original_note))
    
    note_played=note //note played
    note_diff_base=note_played%12 // note number in c scale
    //note_wanted=note_played+value
    note_from_scale=note_from_keydiff(note_diff_base)
    //console.log("note from scale="+note_from_scale)

    
    tone=$("#tone").val();
    key_diff_in_tone=key_diff_from_note(tone,note_from_scale)
    chrd=progressions[tone]
    console.log(note_from_scale+"-"+key_diff_in_tone)

    switch($("#inputmode").val()) {
        case "named_chord":
            chord={chord: $("#singlechord").val(), base: note_played-note_diff_base + value, diff: key_diff_in_tone}
          break;
        case "single_scale":
            if (note_from_scale===-1){
                return;
            }
            chord={chord: ["none"], base: note_played - note_diff_base + value, diff: key_diff_in_tone}
          break;
        case "scale_chord":
            if (note_from_scale===-1){
                return;
            }
            chord={chord: chrd[note_from_scale], base: note_played-note_diff_base + value, diff: key_diff_in_tone}
            break;
        case "named_chord_scale":
            if (note_from_scale===-1){
                return;
            }
            chord={chord: $("#singlechord").val(), base: note_played-note_diff_base + value, diff: key_diff_in_tone}
            break;
        default:
            chord={chord: ["none"], base: note_played, diff: 0}
            
      }
      //console.log(original_note.options)
      play_chord2([chord],on_json)
}

function listen(input,options){

    console.log("listen");
}

// Function triggered when WEBMIDI.js is ready
var midiOut=null;
var midiIn=null;
function midiOut_Changed(e){
    //console.log(e.target);
    $(e.target).find("option:selected").each(function() {
        //console.log($(this).text())
        midiOut=WebMidi.getOutputByName($(this).text());
    })
    
}
function midiIn_Changed(e){
    //console.log(e.target);
    $(e.target).find("option:selected").each(function() {
        //console.log($(this).text())
        midiIn=WebMidi.getInputByName($(this).text());
    })
    if (midiIn!=null){
        //console.log("in found")
/*        Soundfont.instrument(ctx, 'acoustic_grand_piano').then(function (piano) {
                console.log("piano on")
                //piano.listenToMidi(new Input(midiIn))
        });*/
        midiIn.addListener("noteon", e => {
           //document.body.innerHTML+= `${e.note.name} <br>`;
           //play_chord_shifted_from_c(e);
           process_input(e)
         });
    }   
}


function fill_input_output(){
    console.log("reload")
    var in_dev=$( "#input_device" ).val()
    var out_dev=$( "#output_device" ).val()
    $("#input_device").empty();
    $("#output_device").empty();
    $('#input_device').append($('<option>', { 
        value: "",
        text : "-"
        }));
    $('#output_device').append($('<option>', { 
        value: "",
        text : "-"
        }));
    WebMidi.inputs.forEach((device, index) => {
        //console.log(device.id + ".."+device.name)
        if (!/Midi Through.*/.test(device.name) ){
         
        
           $('#input_device').append($('<option>', { 
               value: device.name,
               text : device.name 
           }));
        }
        /*device.addListener("noteon", e => {
           //document.body.innerHTML+= `${e.note.name} <br>`;
           kkk(e);
         });*/

      });
      $("#input_device").on("change",midiIn_Changed);
       WebMidi.outputs.forEach((device, index) => {
        
        //console.log(device.id + ".."+device.name)
        
        if (!/Midi Through.*/.test(device.name) ){
            $('#output_device').append($('<option>', { 
                value: device.name,
                text : device.name 
            }));
        }
        /*Soundfont.instrument(ctx, 'acoustic_grand_piano').then(function (piano) {
    
            piano.listenToMidi(new Input(device))
         });*/
    });
    $("#output_device").on("change",midiOut_Changed);
    $("#input_device").val(in_dev);
    $("#output_device").val(out_dev
        );
}

function onEnabled() {

 // Display available MIDI input devices
 if (WebMidi.inputs.length < 1) {
   document.body.innerHTML+= "No device detected.";
 } else {

    fill_input_output();



 }
    WebMidi.addListener("portschanged",fill_input_output)

}