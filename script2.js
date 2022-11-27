 // Enable WEBMIDI.js and trigger the onEnabled() function when ready
 WebMidi
 .enable()
 .then(onEnabled)
 .catch(err => alert(err));

 var ctx = new AudioContext();
 var soundfont=new Soundfont();
 var inst;
 var instrument=Soundfont.instrument(ctx,'acoustic_grand_piano');

 chords={
    "none":[0],
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
    "dur"  : [2,2,1,2,2,2,1],
    "moll" : [2,1,2,2,1,2,2],
}

progressions={
    "dur":["d","m","m","d","d","m","dim"],
    "moll":["m","dim","d","m","m","d","d"],
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
$(document).ready(function() {    
    $.each(scales, function (name, value) {
        console.log("adding");
        //console.log(i);
        $('#scale').append($('<option>', { 
            value: value,
            text : name 
        }));
    });
    
    $.each(progressions, function (name, value) {
        console.log("adding");
        //console.log(i);
        $('#tone').append($('<option>', { 
            value: name,
            text : name 
        }));
    });

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
    if (chord_name=="d"){
        num_ch=num_ch.toUpperCase();
    }

    var it=$("<div></div>")
    .addClass("chord")
    .addClass("ch_num"+(chord_num+1))
    .attr("chord_name",chord_name)
    .attr("base_diff",base_diff)
    .attr("base",base)
    .text(num_ch)
    
    return it;
}


function fill_chords(){
    console.log("filling");
    base=60+parseInt($("#scale").val());
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
        $("#chords").append(it);
        $("#chords").append(i1);
        
        actual_chords[i]={diff: diff,chord: notes}
        diff+=parseInt(key_diff[tone][i]);
    } 
    fill_progressions()
}


function fill_progressions(){
    tone=$("#tone").val();
    chrd=progressions[tone]
    console.log(chrd);
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
            pro.append(note);
        })
        $("#progressions")
        .append(pro)

    })
}
      
// click event
document.addEventListener('click', function (e) {
    if (e.target.closest('.play')) {
       ctx.resume().then(() => {
            //source.start(0);
       });
    }
    if (e.target.closest('.play1')) {
        ctx.resume().then(() => {
            kkk();
             //source.start(0);
        });
     }
})
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function play_progression(e){
    console.log(e)
    _progressions=$(e.target).parent(".progression").attr("progressions");
    //console.log(_progressions)
    scale_diff=parseInt($("#scale").val());
    diff=parseInt($(e.target).attr("diff"))
    prog=[]
    $.each(_progressions.split(","),function(i,e){
        //console.log(actual_chords[e])
        prog.push({chord: actual_chords[e-1].chord.join(","), base: 60+scale_diff+actual_chords[e-1].diff})
    })
   play_chord(prog)
}


function play_chord(chord){
    instrument.then(function(a){
        $.each(chord,function(ind,chor){
            base_note=chor.base;
            console.log(chor);
            $.each(chor.chord.split(","),function(i,e){
                //console.log(i);
                //console.log(e);
                d_tone=parseInt(e)
                //a.play(base_note+d_tone);
                
                a.schedule(ctx.currentTime, [
                    {note: base_note+d_tone,time:ind*1}
                    /*{ note: 'c2', time: 0, gain: 0.9 },
                    { note: 'e2', time: 0., gain: 0.7 },
                    { note: 'g2', time: 0.5, gain: 0.5 },
                    { note: 'c3', time: 0.75, gain: 0.3 }*/
                ])
            });
        })
        
    });
}

function play_chord_clicked(e){
    console.log($(e.target).attr("notes"));
    chord=$(e.target).attr("notes")
    scale_diff=parseInt($("#scale").val());
    diff=parseInt($(e.target).attr("diff"))
    play_chord([{chord:chord,base: 60+scale_diff+diff}]);
}


function kkk(event){
    var value = parseInt(document.getElementById("scale").value);
//var value = parseInt(e.options[e.selectedIndex].value);
console.log("value:"+value);
    note=event.note.number+value;
    console.log(note);
    console.log(note+3);
    console.log(note+5);
    instrument.then(function(a){
        a.play(note);
        a.play(note+3);
        a.play(note+5);
        //a.play("E4");
        //a.play("G4");
    /*a.schedule(ctx.currentTime, [
    { note: 'c2', time: 0, gain: 0.9 },
    { note: 'e2', time: 0., gain: 0.7 },
    { note: 'g2', time: 0.5, gain: 0.5 },
    { note: 'c3', time: 0.75, gain: 0.3 }
    ])*/
  }
  )
}

function listen(input,options){

    console.log("listen");
}

// Function triggered when WEBMIDI.js is ready
function onEnabled() {
out1=new Output(WebMidi.outputs);
 // Display available MIDI input devices
 if (WebMidi.inputs.length < 1) {
   document.body.innerHTML+= "No device detected.";
 } else {
   WebMidi.inputs.forEach((device, index) => {
     //document.body.innerHTML+= `${index}: ${device.name} <br>`;
     Soundfont.instrument(ctx, 'acoustic_grand_piano').then(function (piano) {
        //piano.play('C4');
/*
          instrument.then(function(a){
                a.play("C4");
                        a.schedule(ctx.currentTime, [
            { note: 'c2', time: 0, gain: 0.9 },
            { note: 'e2', time: 0.25, gain: 0.7 },
            { note: 'g2', time: 0.5, gain: 0.5 },
            { note: 'c3', time: 0.75, gain: 0.3 }
          ])
          }
          )*/

     });
     device.addListener("noteon", e => {
        //document.body.innerHTML+= `${e.note.name} <br>`;
        kkk(e);
      });
   });
   WebMidi.outputs.forEach((device, index) => {
    //document.body.innerHTML+= `${index}: ${device.name} <br>`;
    Soundfont.instrument(ctx, 'acoustic_grand_piano').then(function (piano) {
        //piano.play('C5');
        piano.listenToMidi(new Input(device))
     });
  });
 }

}