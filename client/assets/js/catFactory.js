
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

function middleHairColor(color,code) {
    $('.cat__head-dots').css('background', '#' + color) 
    $('#middleHair').html('code: '+code) 
    $('#dnadecorationMid').html(code) 
}

function sidesHairColor(color,code) {
    $('.cat__head-dots_first, .cat__head-dots_second').css('background', '#' + color) 
    $('#sidesHair').html('code: '+code) 
    $('#dnadecorationSides').html(code) 
}

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
        case 3:
            normalEyes()
            $('#eyeName').html('Look Right')
            return eyesType2()
        case 4:
            normalEyes()
            $('#eyeName').html('Look Left')
            return eyesType3()
        case 5:
            normalEyes()
            $('#eyeName').html('Scary')
            return eyesType4()
        case 6:
            normalEyes()
            $('#eyeName').html('Cute1')
            return eyesType5()
        case 7:
            normalEyes()
            $('#eyeName').html('Cute2')
            return eyesType6()
        default:
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

function hairStyle(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#hairName').html('Basic')
            style1()
            break
        case 2:
            $('#hairName').html('Inverted')
            style2()
            break
        case 3:
            $('#hairName').html('Brush Up')
            style3()
            break
        case 4:
            $('#hairName').html('Mowhawk')
            style4()
            break
        case 5:
            $('#hairName').html('Long sides')
            style5()
            break
        case 6:
            $('#hairName').html('Side outs')
            style6()
            break
        case 7:
            $('#hairName').html('Long Middle')
            style7()
        default:
            break
    }
}

    function style1() {
        //Remove all style from other decorations
        //In this way we can also use style1() to reset the decoration style
        $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
        $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
        $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
    }

    function style2() {
        $('.cat__head-dots').css({ "transform": "rotate(180deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
        $('.cat__head-dots_first').css({ "transform": "rotate(180deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
        $('.cat__head-dots_second').css({ "transform": "rotate(180deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
    }

    function style3() {
        $('.cat__head-dots').css({ "transform": "rotate(180deg)", "height": "48px", "width": "14px", "top": "-37px", "border-radius": "0 0 50% 50%" })
        $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
        $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
    }

    function style4() {
        $('.cat__head-dots').css({ "transform": "rotate(180deg)", "height": "48px", "width": "14px", "top": "-30px", "border-radius": "0 0 50% 50%" })
        $('.cat__head-dots_first').css({ "transform": "rotate(-15deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
        $('.cat__head-dots_second').css({ "transform": "rotate(15deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
    }

    function style5() {
        $('.cat__head-dots').css({ "transform": "rotate(180deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
        $('.cat__head-dots_first').css({ "transform": "rotate(10deg)", "height": "70px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
        $('.cat__head-dots_second').css({ "transform": "rotate(-10deg)", "height": "70px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
    }

    function style6() {
        $('.cat__head-dots').css({ "transform": "rotate(0)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
        $('.cat__head-dots_first').css({ "transform": "rotate(12deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
        $('.cat__head-dots_second').css({ "transform": "rotate(-12deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
    }

    function style7() {
        $('.cat__head-dots').css({ "transform": "rotate(180deg)", "height": "70px", "width": "14px", "top": "-50px", "border-radius": "0 0 50% 50%" })
        $('.cat__head-dots_first').css({ "transform": "rotate(12deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
        $('.cat__head-dots_second').css({ "transform": "rotate(-12deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
    }

function animationVariation(num) {
    $('#dnaanimation').html(num);
    switch (num) {
        case 1:
            $('#animationName').html('Moving Head')
            animation1();
            break;
        case 2:
            $('#animationName').html('Moving Ears')
            animation2();
            break;
        case 3:
            $('#animationName').html('Moving Tail')
            animation3();
            break;
        case 4:
            $('#animationName').html('Head Bop')
            animation4();
            break;
        case 5:
            $('#animationName').html('Zoom Face')
            animation5();
            break;
        case 6:
            $('#animationName').html('Wacky')
            animation6();
            break;
        default:
            break;
    }
}
    function resetAnimation() {
        $("#head").removeClass("movingHead");
        $("#leftEar").removeClass("leftEarwithHead");
        $("#rightEar").removeClass("movingHead");

        $("#leftEar").removeClass("leftEarFast");
        $("#rightEar").removeClass("rightEarFast");

        $("#tail").removeClass("movingTail");

        $("#head").removeClass("headBop");

        $("#head").removeClass("faceZoom");

        $("#left-eye").removeClass("leftEyeGoofy");
        $("#right-eye").removeClass("rightEyeGoofy");
        $("#head").removeClass("headTilt");
        $("#leftEar").removeClass("leftEarTilt");
        $("#rightEar").removeClass("headTilt");

    }

    function animation1() {
        //Reset animation here
        resetAnimation();
        $("#head").addClass("movingHead");
        $("#leftEar").addClass("leftEarwithHead");
        $("#rightEar").addClass("movingHead");
    }

    function animation2() {
        resetAnimation();
        $("#leftEar").addClass("leftEarFast");
        $("#rightEar").addClass("rightEarFast");
    }

    function animation3() {
        resetAnimation();
        $("#tail").addClass("movingTail");
    }

    function animation4() {
        resetAnimation();
        $("#head").addClass("headBop");
    }

    function animation5() {
        resetAnimation();
        $("#head").addClass("faceZoom");
    }

    function animation6() {
        resetAnimation();
        $("#left-eye").addClass("leftEyeGoofy");
        $("#right-eye").addClass("rightEyeGoofy");
        $("#head").addClass("headTilt");
        $("#leftEar").addClass("leftEarTilt");
        $("#rightEar").addClass("headTilt");
    }


