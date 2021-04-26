
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 21,
    "mouthColor" : 39,
    "eyesColor" : 16,
    "earsColor" : 42,
    //Cattributes
    "eyesShape" : 7,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
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
    $('#bodycolor').val(dna.headcolor)

    mouthColor(colors[dna.mouthColor],dna.mouthColor)
    $('#bodycolor').val(dna.mouthColor)

    eyeColor(colors[dna.eyesColor],dna.eyesColor)
    $('#eyescolor').val(dna.eyesColor)

    earColor(colors[dna.earsColor],dna.earsColor)
    $('#earscolor').val(dna.earsColor)

    eyeVariation(shape, dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)
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

$('#eyeshape').change( () => {
  var shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})
