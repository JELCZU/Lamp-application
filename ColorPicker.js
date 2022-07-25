const modesUL = document.querySelector("#modes");
const modes = modesUL.getElementsByTagName('li');
const sliderLightLevel = document.querySelector("#sliderLightLevel");
const sliderLightTemp = document.querySelector("#sliderLightTemp");
const buttonOn= document.querySelector("#ButtonOn");
let modesKids;
let actualModeVal;
let actualMode;
let actualLampStatus;
actualLampStatus=document.getElementById('lampStatus');

// Load all event listeners
loadEventListeners();
function loadEventListeners() {
  modesUL.addEventListener('click', modeSelect);
  modesUL.addEventListener('click', lightLevelSlider);
  // modes.addEventListener('click', tempLevelSlider);
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
}
function lampStatus(actualModeVal)
{
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

function{lampLight}

disableAllModes(modes,modesKids);
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
lampStatus(actualModeVal);
  
function lightLevelSlider(e) {
  if((e.target.classList.contains('sliderLightLevel')==true)&&(e.target.parentElement.parentElement.value==actualModeVal)){
    conole.log("Actual mode+ slider value: "+actualModeVal+" "+e.target.value);
  }
  }
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
pickr.on('change', (...args) => {
  let color=args[0].toRGBA();//rgb representation
  console.log(color);
});
