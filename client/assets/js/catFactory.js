
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.cat__head, .cat__body').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthTummyColor(color, code) {
    $('.cat__mouth-contour, .tummy, .cat__ear--left-inside, .cat__ear--right-inside').css('background', '#' + color)
    $('#mouthcode').html('code: '+code)
    $('#dnamouth').html(code)
}

function eyesEarsColor(color, code) {
    $('.cat__ear--left, .cat__ear--right, .cat__eye span').css('background', '#' + color)
    $('#eyescode').html('code: '+code)
    $('#dnaeyes').html(code)
}

function tailPawsColor(color, code) {
    $('.left_paw, .right_paw, .side_arm, .tail-ball').css('background', '#' + color)
    $('#pawscode').html('code: '+code)
    $('#dnapaws').html(code)
}

function decorationMidColor(color, code) {
    $('.cat__head-dots, .frame').css('background', '#' + color)
    $('#middlecolorcode').html('code: '+code)
    $('#dnadecorationMid').html(code)
}

function decorationSidesColor(color, code) {
    $('.watch, .cat__head-dots_first, .cat__head-dots_second').css('background', '#' + color)
    $('#sidecolorcode').html('code: '+code)
    $('#dnadecorationSides').html(code)
}



//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic') //Set the badge to 'Basic'
            break
        case 2:
            normalEyes() //reset
            $('#eyeName').html('Chill') // Set the badge to 'Chill'
            eyesType1() //Set border to change shape of the eye
            break
        case 3:
            normalEyes()
            $('#eyeName').html('Cute')
            eyesType2()
            break
        default:
            console.log("Eyeshape not found: " + num)  
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break
        case 2:
            $('#decorationName').html('Hair Up')
            decoration1()
            break
    }
}

var innerSmallLeft = document.getElementsByClassName('inner-eyes-small-left' )
var innerBigLeft = document.getElementsByClassName('inner-eyes-big-left')
var innerSmallRight = document.getElementsByClassName('inner-eyes-small-right')
var innerBigRight = document.getElementsByClassName('inner-eyes-big-right')
var leftPupil = document.getElementsByClassName('cat__eye span.pupil-leftt')
var rightPupil = document.getElementsByClassName('cat__eye span')

async function normalEyes() {
    await $('.cat__eye').find('span').css('border', 'none')
}

async function eyesType1() {
    await $('.cat__eye').find('leftPupil').css('border-top', '15px solid')
    await $('.cat__eye').find('rightPupil').css('border-top', '15px solid')
}

async function eyesType2() {
    await $('.cat__eye').find('span').css('border-top', '15px solid')
}

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration1() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(1800deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
