//const { Pickr } = require("./ColorPicker");

const modesUL = document.querySelector("#modes");
const modes = modesUL.getElementsByTagName('li');
const sliderLightLevel = document.querySelector("#sliderLightLevel");
const sliderLightTemp = document.querySelector("#sliderLightTemp");
const buttonOn= document.querySelector("#ButtonOn");
let modesKids;
let actualModeVal;
let actualMode;
let actualLampStatus=document.getElementById('lampStatus');
let flashSpeed;
let lampSegments=32;
// Load all event listeners
loadEventListeners();
function loadEventListeners() {
  modesUL.addEventListener('click', modeSelect);
  modesUL.addEventListener('click', lightLevelSlider);
  // modesUL.addEventListener('mousemove', lightLevelSlider);
  modesUL.addEventListener('mousedown', lightTempSlider);
  // modesUL.addEventListener('mousemove', lightTempSlider);
  modesUL.addEventListener('click', lightFlashSlider);
  // modesUL.addEventListener('mousemove', lightFlashSlider);
}
function disableAllModes(modes,modesKids)
{
  for(let i=0; i<=modes.length-1;i++){
    modes[i].style.filter="grayscale(100%) brightness(70%)";
    modesKids= modes[i].getElementsByTagName('*');
    for(let i=0; i<=modesKids.length-1;i++){
    modesKids[i].disabled = true;
    if(modesKids[i].classList.contains('btn')==true)
    modesKids[i].disabled = false;
}
  }
  resetBlinkInterval();
}
function modeSelect(e) {
  if(e.target.classList.contains('btn')==true){
    actualModeVal=e.target.parentElement.value;
    disableAllModes(modes,modesKids);
  
    e.target.parentElement.style.filter="grayscale(0%) brightness(100%)";
    modesKids=e.target.parentElement.getElementsByTagName('*');
    for(let i=0; i<=modesKids.length-1;i++){
      modesKids[i].disabled = false;
      }
  }
  lampStatus(actualModeVal);
}
function lightLevelSlider(e) {
  if((e.target.classList.contains('sliderLightLevel')==true)&&(e.target.parentElement.parentElement.value==actualModeVal)){
    lampLightLevelControl(lampSegments,e.target.value);
  }
}
function lightFlashSlider(e) {

  if((e.target.classList.contains('sliderFlashSpeed')==true)&&(e.target.parentElement.parentElement.value==actualModeVal)){
    flashSpeed=e.target.value;
    let lightLevel=e.target.parentElement.parentElement.getElementsByClassName("sliderLightLevel")[0].value;
    // console.log(e.target.parentElement.parentElement.);
    lampFlashControl(lampSegments,flashSpeed,lightLevel);
  }
}
function lightTempSlider(e) {
  if((e.target.classList.contains('sliderLightTemp')==true)&&(e.target.parentElement.parentElement.value==actualModeVal)){
    lampLightTempControl(lampSegments,e.target.value);
  }
}
function lampStatus(actualModeVal){
if(actualModeVal==null){
  actualLampStatus.innerHTML="No lamp mode selected";
  actualLampStatus.style.color="black";
  document.getElementById('lampLed').style.backgroundColor="red";
}
else{
actualLampStatus.innerHTML="Lamp mode: "+document.getElementById("mode"+actualModeVal).querySelector('input[type=submit]').value;
actualLampStatus.style.color="green";
document.getElementById('lampLed').style.backgroundColor="rgb(102, 255, 51)";
}
}
function createLamp(numbOfSegments){
  for(let i=1; i<=numbOfSegments;i++){
  let lampSegment = document.createElement("div");
  lampSegment.setAttribute("id","lampSegment"+(numbOfSegments-i+1));
  lampSegment.setAttribute("class", "square");
  lampSegment.style.backgroundColor="#ffff99";
  lampSegment.style.filter="brightness(0%)"
  document.body.appendChild(lampSegment);
  }
  let lampSegment = document.createElement("div");
  lampSegment.setAttribute("id","lampBot");
  lampSegment.setAttribute("class", "square");
  document.body.appendChild(lampSegment);
  lampSegment.style.backgroundColor="silver";
  lampSegment.style.width="70px";
  lampSegment.style.height="70px";
  lampSegment.style.marginTop="32px";

  lampSegment = document.createElement("div");
  lampSegment.setAttribute("id","lampLed");
  lampSegment.setAttribute("class", "circle");
  document.body.appendChild(lampSegment);
  lampSegment.style.marginTop="-70px";
}
function lampLightLevelControl(numbOfSegments,lightLevel){
  for(let i=1; i<=numbOfSegments;i++){
    document.getElementById("lampSegment"+i).style.filter="brightness("+lightLevel+"%)";
  }
}
function lampLightTempControl(numbOfSegments,lightTemp){
  let colorColdR=221;
  let colorColdG=227;
  let colorColdB=230;
  let colorWarmR=255;
  let colorWarmG=165;
  let colorWarmB=0;
  let newColor="rgb("+((colorColdR*(1-lightTemp/100))+(colorWarmR*(lightTemp/100)))+","+((colorColdG*(1-lightTemp/100))+(colorWarmG*(lightTemp/100)))+","+((colorColdB*(1-lightTemp/100))+(colorWarmB*(lightTemp/100)))+")";
  for(let i=1; i<=numbOfSegments;i++){
    document.getElementById("lampSegment"+i).style.backgroundColor=newColor;
  }
}
function lampFlashControl(numbOfSegments,blinkSpeed,maxBrightness){
  resetBlinkInterval();
  let blinkInterval;
  let i =setInterval(function() {
  for(let i=1; i<=numbOfSegments;i++){
    let element=document.getElementById("lampSegment"+i);
   // console.log(element.style.filter);
      element.style.filter ="brightness("+ (element.style.filter== "brightness(0%)" ? (maxBrightness+"%)") : "0%");
}
    }, (1+10*blinkSpeed)); 
    // console.log(1+30*blinkSpeed);
  }
function resetBlinkInterval(){
  for (var i = 1; i < 99; i++)
  window.clearInterval(i);
};
function lampLightColorControl(){
}

createLamp(lampSegments);
disableAllModes(modes,modesKids);
lampStatus(actualModeVal);


const pickr = Pickr.create({
  el: '.color-picker',
  theme: 'classic', // or 'monolith', or 'nano'
  position: 'bottom-middle',
  swatches: [
      'rgba(244, 67, 54, 1)',
      'rgba(233, 30, 99, 0.95)',
      'rgba(156, 39, 176, 0.9)',
      'rgba(103, 58, 183, 0.85)',
      'rgba(63, 81, 181, 0.8)',
      'rgba(33, 150, 243, 0.75)',
      'rgba(3, 169, 244, 0.7)',
      'rgba(0, 188, 212, 0.7)',
      'rgba(0, 150, 136, 0.75)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(139, 195, 74, 0.85)',
      'rgba(205, 220, 57, 0.9)',
      'rgba(255, 235, 59, 0.95)',
      'rgba(255, 193, 7, 1)'
  ],

  components: {

      // Main components
      preview: true,
      opacity: true,
      hue: true,

      // Input / output Options
      interaction: {
          hex: false,
          rgba: true,
          hsla: false,
          hsva: false,
          cmyk: false,
          input: true,
          clear: true,
          save: true
      }
  }
});
document.getElementsByClassName("pcr-button")[0].style="margin-left: 50%;transform: translate(-50%, -50%);"
pickr.on('change', (...args) => {
  let color=args[0].toRGBA();//rgb representation
  console.log(color[0]);
  console.log(document.getElementsByClassName("pcr-button"));
  for(let i=1; i<=32;i++){
    document.getElementById("lampSegment"+i).style.backgroundColor="rgb("+color[0]+","+color[1]+","+color[2]+")";
  }
});