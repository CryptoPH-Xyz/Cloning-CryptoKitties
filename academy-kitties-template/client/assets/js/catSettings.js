
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 21,
    "mouthColor" : 39,
    "eyesColor" : 83,
    "pawsColor" : 84,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 69,
    "decorationSidescolor" : 10,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnapaws').html(defaultDNA.pawsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape);
  $('#dnadecoration').html(defaultDNA.decorationPattern);
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor);
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor);
  $('#dnaanimation').html(defaultDNA.animation);
  $('#dnaspecial').html(defaultDNA.lastNum);

  renderCat(defaultDNA);
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnapaws').html()
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

    mouthTummyColor(colors[dna.mouthColor], dna.mouthColor)
    $('#mouthcolor').val(dna.mouthColor)

    eyesEarsColor(colors[dna.eyesColor], dna.eyesColor)
    $('#eyescolor').val(dna.eyesColor)

    tailPawsColor(colors[dna.pawsColor], dna.pawsColor)
    $('#pawscolor').val(dna.pawsColor)



    decorationMidColor(colors[dna.decorationMidcolor], dna.decorationMidcolor)
    $('#decorationmid').val(dna.decorationMidcolor)

    decorationSidesColor(colors[dna.decorationSidescolor], dna.decorationSidescolor)
    $('#decorationside').val(dna.decorationSidescolor)
}

//Listeners for each slider
// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})

$('#mouthcolor').change(()=>{
  var colorVal = $('#mouthcolor').val()
  mouthTummyColor(colors[colorVal],colorVal)
})

$('#eyescolor').change(()=>{
  var colorVal = $('#eyescolor').val()
  eyesEarsColor(colors[colorVal],colorVal)
})

$('#pawscolor').change(()=>{
  var colorVal = $('#pawscolor').val()
  tailPawsColor(colors[colorVal],colorVal)
})

//cattributes
$('eyeshape').change(() => {
  var shape = parseInt($('eyeshape').val()) //input from slider 1 to 7
  eyeVariation(shape)
})

$('#decorationpattern').change(()=>{
  var pattern = parseInt($('#decorationpattern').val())
  decorationVariation(pattern)

})

$('#decorationmid').change(()=>{
  var colorVal = $('#decorationmid').val()
  decorationMidColor(colors[colorVal],colorVal)
})

$('#decorationside').change(()=>{
  var colorVal = $('#decorationside').val()
  decorationSidesColor(colors[colorVal],colorVal)
})