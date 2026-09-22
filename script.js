const alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";


let rotors=[

"EKMFLGDQVZNTOWYHXUSPAIBRCJ",
"AJDKSIRUXBLHWTMCQGZNPYFVOE",
"BDFHJLCPRTXVZNYEIWGAKMUSQO"

];


let lamps=document.getElementById("lamps");


alphabet.split("").forEach(l=>{

let d=document.createElement("div");

d.className="lamp";

d.id="lamp"+l;

lamps.appendChild(d);

});



function plugboard(c){

let p=document.getElementById("plug").value
.toUpperCase()
.split(" ");


for(let pair of p){

if(pair.length==2){

if(pair[0]==c)return pair[1];

if(pair[1]==c)return pair[0];

}

}

return c;

}



function rotate(){

gearSound();

document.getElementById("r3").value++;

if(document.getElementById("r3").value>25){

document.getElementById("r3").value=0;

document.getElementById("r2").value++;

}

}



function rotor(letter,index,reverse=false){

let r=rotors[index];

let pos=parseInt(document.getElementById("r"+(index+1)).value);


let n=alphabet.indexOf(letter);


if(!reverse){

return r[(n+pos)%26];

}

else{

return alphabet[r.indexOf(letter)];

}

}



function encryptLetter(letter){

rotate();


letter=plugboard(letter);


letter=rotor(letter,2);

letter=rotor(letter,1);

letter=rotor(letter,0);



letter=alphabet[25-alphabet.indexOf(letter)];



letter=rotor(letter,0,true);

letter=rotor(letter,1,true);

letter=rotor(letter,2,true);


letter=plugboard(letter);


return letter;

}



function encrypt(){


let text=document
.getElementById("input")
.value
.toUpperCase();


let result="";


for(let c of text){

if(alphabet.includes(c)){

let e=encryptLetter(c);

result+=e;


document
.getElementById("lamp"+e)
.classList.add("on");

lampSound();


setTimeout(()=>{

document
.getElementById("lamp"+e)
.classList.remove("on");

},300);


}

else{

result+=c;

}

}


document.getElementById("output").value=result;


}



alphabet.split("").forEach(letter=>{


let b=document.createElement("div");

b.className="key";

b.innerHTML=letter;


b.onclick=()=>{

keySound();

document.getElementById("input").value+=letter;

}


document
.getElementById("keyboard")
.appendChild(b);


});

// SISTEMA DE SOM DA MÁQUINA ENIGMA

const audio = new (window.AudioContext || window.webkitAudioContext)();


function gearSound(){

    let oscillator = audio.createOscillator();
    let gain = audio.createGain();

    oscillator.type = "square";

    // som metálico de engrenagem
    oscillator.frequency.value = 120;

    gain.gain.value = 0.05;

    oscillator.connect(gain);
    gain.connect(audio.destination);


    oscillator.start();

    setTimeout(()=>{

        oscillator.frequency.value = 70;

    },80);


    setTimeout(()=>{

        oscillator.stop();

    },180);

}



function keySound(){

    let osc = audio.createOscillator();
    let gain = audio.createGain();


    osc.type="triangle";
    osc.frequency.value=500;

    gain.gain.value=0.08;


    osc.connect(gain);
    gain.connect(audio.destination);


    osc.start();


    setTimeout(()=>{

        osc.stop();

    },100);

}



function lampSound(){

    let osc = audio.createOscillator();
    let gain = audio.createGain();


    osc.type="sine";
    osc.frequency.value=900;


    gain.gain.value=0.04;


    osc.connect(gain);
    gain.connect(audio.destination);


    osc.start();


    setTimeout(()=>{

        osc.stop();

    },150);

}