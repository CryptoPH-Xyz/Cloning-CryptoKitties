
var colors = Object.values(allColors())

var defaultDNA = {
  "headcolor" : 21,
  "mouthColor" : 39,
  "eyesColor" : 65,
  "earsColor" : 42,
  //Cattributes
  "eyesShape" : 6,
  "decorationPattern" : 3,
  "decorationMidcolor" : 37,
  "decorationSidescolor" : 37,
  "animation" :  6,
  "lastNum" :  1
}

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
  var dna = ''
  dna += $('#dnabody').html()
  dna += $('#dnamouth').html()
  dna += $('#dnaeyes').html()
  dna += $('#dnaears').html()
  dna += $('#dnashape').html()
  dna += $('#dnadecoration').html()
  dna += $('#dnadecorationMid').html()
  dna += $('#dnadecorationSides').html()
  dna += $('#dnaanimation').html()
  dna += $('#dnaspecial').html()

  return parseInt(dna)
}

function renderCat(dna){
  headColor(colors[dna.headcolor],dna.headcolor)
  $('#bodycolor').val(dna.headcolor) //sets slider value

  mouthColor(colors[dna.mouthColor],dna.mouthColor)
  $('#bodycolor').val(dna.mouthColor)

  eyeColor(colors[dna.eyesColor],dna.eyesColor)
  $('#eyescolor').val(dna.eyesColor)

  earColor(colors[dna.earsColor],dna.earsColor)
  $('#earscolor').val(dna.earsColor)

  eyeVariation(dna.eyesShape)
  $('#eyeshape').val(dna.eyesShape)

  hairStyle(dna.decorationPattern)
  $('#hairstyle').val(dna.decorationPattern)

  middleHairColor(colors[dna.decorationMidcolor],dna.decorationMidcolor)
  $('#hairColor1').val(dna.decorationMidcolor)

  sidesHairColor(colors[dna.decorationSidescolor],dna.decorationSidescolor)
  $('#hairColor2').val(dna.decorationSidescolor)

  animationVariation(dna.animation)
  $('#animation').val(dna.animation)
}

// Changing cat colors
$('#bodycolor').change(()=>{
  var colorVal = $('#bodycolor').val()
  headColor(colors[colorVal],colorVal)
})

$('#mouthcolor').change( () => {
  var colorVal = $('#mouthcolor').val()
  mouthColor(colors[colorVal], colorVal)
})

$('#eyescolor').change( () => {
  var colorVal = $('#eyescolor').val()
  eyeColor(colors[colorVal], colorVal)
})

$('#earscolor').change( () => {
  var colorVal = $('#earscolor').val()
  earColor(colors[colorVal], colorVal)
})

$('#hairColor1').change( () => {
  var colorVal = $('#hairColor1').val()
  middleHairColor(colors[colorVal], colorVal)
})

$('#hairColor2').change( () => {
  var colorVal = $('#hairColor2').val()
  sidesHairColor(colors[colorVal], colorVal)
})

//Changing cat designs
$('#eyeshape').change( () => {
  var shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})

$('#hairstyle').change( () => {
  var style = parseInt($('#hairstyle').val())
  hairStyle(style)
})

//Changing animation
$('#animation').change( () => {
  var animationVal = parseInt($('#animation').val())
  animationVariation(animationVal)
})

//Random Kitty
$('#random').click(() => {
  var bodyColorRandom = Math.floor(Math.random() * (88 - 10) + 10);
  headColor(colors[bodyColorRandom],bodyColorRandom)
  $("#bodycolor").val(bodyColorRandom)

  var mouthColorRandom = Math.floor(Math.random() * (88 - 10) + 10);
  mouthColor(colors[mouthColorRandom],mouthColorRandom)
  $("#mouthcolor").val(mouthColorRandom)

  var eyesColorRandom = Math.floor(Math.random() * (88 - 10) + 10);
  eyeColor(colors[eyesColorRandom],eyesColorRandom)
  $("#eyescolor").val(eyesColorRandom)

  var earsColorRandom = Math.floor(Math.random() * (88 - 10) + 10);
  earColor(colors[earsColorRandom],earsColorRandom)
  $("#earscolor").val(earsColorRandom)

  var eyeShapeRandom = Math.floor(Math.random() * 7) + 1;
  eyeVariation(eyeShapeRandom)
  $("#eyeshape").val(eyeShapeRandom)

  var hairStyleRandom = Math.floor(Math.random() * 7) + 1;
  hairStyle(hairStyleRandom)
  $("#hairstyle").val(hairStyleRandom)

  var hairMidColor = Math.floor(Math.random() * (88 - 10) + 10);
  middleHairColor(colors[hairMidColor],hairMidColor)
  $("#hairColor1").val(hairMidColor)

  var hairSideColor = Math.floor(Math.random() * (88 - 10) + 10);
  sidesHairColor(colors[hairSideColor],hairSideColor)
  $("#hairColor2").val(hairSideColor)

  var randomAnimation = Math.floor(Math.random() * 6) + 1;
  animationVariation(randomAnimation)
  $("#animation").val(randomAnimation)
})

//Default Kitty
$('#default').click(() => {
  renderCat(defaultDNA)  
})