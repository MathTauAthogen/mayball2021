$(window).load(function () {
    $("#preloader").fadeOut("slow");
});

$(document).ready(function () {


    new WOW().init();


    $('#top-nav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 0
    });

    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll > 20) {
        //console.log('a');
        $(".navigation").addClass("animated");
        $(".navbar-brand").addClass("animated");
    } else {
        //console.log('a');
        $(".navigation").removeClass("animated");
        $(".navbar-brand").removeClass("animated");
    }

    //animated header class
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //console.log(scroll);
        if (scroll > 20) {
            //console.log('a');
            $(".navigation").addClass("animated");
            $(".navbar-brand").addClass("animated");
        } else {
            //console.log('a');
            $(".navigation").removeClass("animated");
            $(".navbar-brand").removeClass("animated");
        }
    });

    $('.hmbgrbtn').click(function(){
        if ($('.menu-list').css('display') == 'none'){
            $('.menu-list').css('display', 'block');
        }
        else if ($('.menu-list').css('display') == 'block'){
            $('.menu-list').css('display', 'none');
        }
    });

        var scroll = document.body.clientWidth;
        //console.log(scroll);
        console.log(scroll)
        if (scroll < 990) {
            //console.log('a');
            $(".normal-nav").css("display","none");
            $(".mobile-nav").css("display","block");
            $(".countdownWidget").css("width","80vw");
            $(".digit").css("font-size","45px");
            $(".dash_title").css("font-size","4vw");
            $(".dash_move_3").css("left","-10px");
            $(".dash_move_2").css("left","-20px");
            $(".dash_move_1").css("left","-25px");
        } else {
            $(".normal-nav").css("display","block");
            $(".mobile-nav").css("display","none");
            $(".countdownWidget").css("width","60vw");
            $(".digit").css("font-size","4vw");
            $(".dash_title").css("font-size","3vw");
            $(".dash_move_3").css("left","0");
            $(".dash_move_2").css("left","0px");
            $(".dash_move_1").css("left","-20px");
        }

    $(window).resize(function () {
        var scroll = document.body.clientWidth;
        //console.log(scroll);
        if (scroll < 990) {
            //console.log('a');
            $(".normal-nav").css("display","none");
            $(".mobile-nav").css("display","block");
            $(".countdownWidget").css("width","80vw");
            $(".digit").css("font-size","45px");
            $(".dash_title").css("font-size","4vw");
            $(".dash_move_3").css("left","-10px");
            $(".dash_move_2").css("left","-20px");
            $(".dash_move_1").css("left","-25px");
        } else {
            $(".normal-nav").css("display","block");
            $(".mobile-nav").css("display","none");
            $(".countdownWidget").css("width","60vw");
            $(".digit").css("font-size","4vw");
            $(".dash_title").css("font-size","3vw");
            $(".dash_move_3").css("left","0");
            $(".dash_move_2").css("left","0px");
            $(".dash_move_1").css("left","-20px");
        }
    });
    

    $(".about-slider").owlCarousel({
        singleItem: true,
        pagination: true,
        autoPlay: 5000,
    });

    $year = $('#countdown_dashboard').data('year');
    $month = $('#countdown_dashboard').data('month');
    $day = $('#countdown_dashboard').data('day');
    $('#countdown_dashboard').countDown({
        targetDate: {
            'day': $day,
            'month': $month,
            'year': $year,
            'hour': 23,
            'min': 59,
            'sec': 59,
        },
        omitWeeks: true
    });

});