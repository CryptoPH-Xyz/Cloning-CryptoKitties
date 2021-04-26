
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
    $('.cat__head, .cat__chest').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color,code) {
    $('.cat__mouth-contour, .cat__chest_inner, .cat__ear--left-inside, .cat__ear--right-inside, .cat__tail').css('background', '#' + color) 
    $('#mouthcode').html('code: '+code) 
    $('#dnamouth').html(code) 
}

function eyeColor(color,code) {
    $('.cat__eye span, .cat__tail-end').css('background', '#' + color) 
    $('#eyecode').html('code: '+code) 
    $('#dnaeyes').html(code) 
}

function earColor(color,code) {
    $('.cat__ear--left, .cat__ear--right, .cat__paw-left, .cat__paw-right, .cat__paw-left_inner, .cat__paw-right_inner').css('background', '#' + color) 
    $('#earcode').html('code: '+code) 
    $('#dnaears').html(code) 
}

//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
        case 2:
            normalEyes()
            $('#eyeName').html('Chill')
            return eyesType1()
            break
        case 3:
            normalEyes()
            $('#eyeName').html('Look Right')
            return eyesType2()
            break
        case 4:
            normalEyes()
            $('#eyeName').html('Look Left')
            return eyesType3()
            break
        case 5:
            normalEyes()
            $('#eyeName').html('Scary')
            return eyesType4()
            break
        case 6:
            normalEyes()
            $('#eyeName').html('Cute1')
            return eyesType5()
            break
        case 7:
            normalEyes()
            $('#eyeName').html('Cute2')
            return eyesType6()
            break
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break
    }
}

async function normalEyes() {
    await $('.cat__eye').find('span').css('border', 'none')
}

async function eyesType1() {
    await $('.cat__eye').find('span').css('border-top', '15px solid')
}

async function eyesType2() {
    await $('.cat__eye').find('span').css('border-left', '15px solid')
}

async function eyesType3() {
    await $('.cat__eye').find('span').css('border-right', '15px solid')
}

async function eyesType4() {
    await $('.cat__eye').find('span').css('border-right', '10px solid')
    await $('.cat__eye').find('span').css('border-left', '10px solid')
    await $('.cat__eye').find('span').css('border-top', '10px solid')
    await $('.cat__eye').find('span').css('border-bottom', '10px solid')
}

async function eyesType5() {
    await $('.cat__eye').find('span').css('border-bottom', '33px dashed white')
    await $('.cat__eye').find('span').css('border-top', '3px dotted white')
}

async function eyesType6() {
    await $('.cat__eye').find('span').css('border-left', '10px dashed white')
    await $('.cat__eye').find('span').css('border-right', '10px dotted white')
}

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
