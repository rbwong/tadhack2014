function runSlide(elem, args) {
    var orig = parseInt($(args['sliderNavId']+" li a.selected").text())-1;
    $(args['sliderNavId']+" li a.selected").removeClass("selected");
    $(elem).addClass("selected");
    var selected = parseInt($(elem).text())-1;
    $(args['sliderId']+" "+args['slideClass']).eq(selected);
    $(args['scrollerId']).find(".review").eq(orig).fadeOut(500, function() {
        $(args['scrollerId']).find(".review").eq(selected).fadeIn(500);
    });
}

function initSlider(sliderId, slideClass, scrollerId, sliderNavId) {

    var orig = parseInt($(sliderNavId+" li a.selected").text())-1;
    $(sliderId+" "+slideClass).each(function(i, val) {
        if(i != orig) {
            $(this).css("display", "none");
        }
    });

    var slider = null;

    args = {
            'sliderId': sliderId,
            'slideClass': slideClass,
            'scrollerId': scrollerId,
            'sliderNavId': sliderNavId
        };

    $(sliderNavId+" li a").click(function(e) {
        e.preventDefault();

        runSlide(this, args)

        clearInterval(slider);

        slider = setInterval(function() {
                                if($(sliderNavId+" li a.selected").parent().next('li').length > 0) {
                                    //$(sliderNavId+" li a.selected").parent().next('li').find('a').click();
                                    runSlide($(sliderNavId+" li a.selected").parent().next('li').find('a'), args);
                                } else {
                                    //$(sliderNavId).find('li').eq(0).find('a').click();
                                    runSlide($(sliderNavId).find('li').eq(0).find('a'), args);
                                }
                            }, 30000);
    });

    slider = setInterval(function() {
                                if($(sliderNavId+" li a.selected").parent().next('li').length > 0) {
                                    //$(sliderNavId+" li a.selected").parent().next('li').find('a').click();
                                    runSlide($(sliderNavId+" li a.selected").parent().next('li').find('a'), args);
                                } else {
                                    //$(sliderNavId).find('li').eq(0).find('a').click();
                                    runSlide($(sliderNavId).find('li').eq(0).find('a'), args);
                                }
                            }, 30000);
}


$(document).ready(function() {
    function isiPhone(){
        return (
            //Detect iPhone
            (navigator.platform.indexOf("iPhone") != -1) ||
            //Detect iPod
            (navigator.platform.indexOf("iPod") != -1) ||
            //Detect iPod
            (navigator.platform.indexOf("iPad") != -1)
        );
    }

    if($('body.home').length > 0) {

        //icannhas underline hover
        $("#title-container h1").hover(function() {
            if($("#title-container").width() >= 147)
                $("#title-container h1").css("text-decoration", "underline");
        }, function() {
                $("#title-container h1").css("text-decoration", "none");
        });

        //set header height
        var header = (($(document).width()*479)/1366)-1;
        var footer = (($(document).width()*399)/1366)-121;
        var dynamicHeader = 1.00;
        $("#header").css("height", header+"px");
        $("#latest-tweets-section").css("height", footer+"px");
        //$("#main-content").css("padding-top", header+"px");
        $(window).resize(function() {
            header = (($(document).width()*479)/1366)-1;
            footer = (($(document).width()*399)/1366)-121;
            $("#header").css("height", (header*dynamicHeader)+"px");
            $("#latest-tweets-section").css("height", footer+"px");
            //$("#main-content").css("padding-top", (header*dynamicHeader)+"px");
        });

        var sloganMarginLeft = ($(window).width()/2)-($("#slogan").width()/2);
        $("#slogan").css("left", sloganMarginLeft+"px");

        var sloganMarginTop = $("#slogan").offset().top;

    /**
        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
        $(window).bind(mousewheelevt, function(e){
        //$(window).scroll(function(e) {


            var evt = window.event || e //equalize event object
            evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
            var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

            if(delta > 0 && (dynamicHeader<1.00)) {
                //scroll up

                var change = $(window).scrollTop();
                dynamicHeader = (header-change)/header;
                $("#header").css("height", (header*dynamicHeader)+"px");
                //$("#slogan").css("top", (change*-1)+"px");

                $("#title-container").css("width", Math.min((change*0.7), 155)+"px");
                $("#nav").css("margin-left", Math.min(change*0.95, 195)+"px");
                $("#logo").css("background-size", Math.max((100 - change*0.17), 80)+"%");
            }
            else if(delta < 0 && $("#header").height() > 65){
                //scroll down

                var change = $(window).scrollTop();
                dynamicHeader = (header-change)/header;
                $("#header").css("height", (header*dynamicHeader)+"px");
                //$("#slogan").css("top", (change*-1)+"px");

                $("#title-container").css("width", Math.min((change*0.7), 155)+"px");
                $("#nav").css("margin-left", Math.min(change*0.95, 195)+"px");
                $("#logo").css("background-size", Math.max((100 - change*0.17), 80)+"%");
            }


            if($(window).scrollTop() > 50) {
                $("#slogan").css("display", "none");
            } else if($(window).scrollTop() <= 50) {
                $("#slogan").css("display", "block");
            }

        });

        $(window).keydown(function(evt) {
            if(evt.which == 40) {
                var change = $(window).scrollTop();
                dynamicHeader = (header-change)/header;
                $("#title-container").css("width", Math.min((change*0.7), 155)+"px");
                $("#nav").css("margin-left", Math.min(change*0.95, 195)+"px");
                $("#logo").css("background-size", Math.max((100 - change*0.17), 80)+"%");
            } else if(evt.which == 38) {
                var change = $(window).scrollTop();
                dynamicHeader = (header-change)/header;
                $("#title-container").css("width", Math.min((change*0.7), 155)+"px");
                $("#nav").css("margin-left", Math.min(change*0.95, 195)+"px");
                $("#logo").css("background-size", Math.max((100 - change*0.17), 80)+"%");
            }

            if(evt.which == 40 || evt.which == 38) {
                if($(window).scrollTop() > 10) {
                    $("#slogan").css("opacity", (100-(change-10*1.85))/100);
                } else if($(window).scrollTop() <= 10) {
                    $("#slogan").css("opacity", (100-(change-10*1.85))/100);
                }
            }
        });
    **/
        var lastPosition = 0;
        if(!isiPhone()) {
            $(window).scroll(function() {
                var yScrollPos = window.pageYOffset;
                if(yScrollPos > lastPosition) {
                    //scroll down

                    var change = $(window).scrollTop();
                    dynamicHeader = (header-change)/header;
                    $("#header").css("height", (header*dynamicHeader)+"px");
                    $("#title-container").css("width", Math.min((change*0.7), 155)+"px");
                    $("#nav").css("margin-left", Math.min(change*0.95, 185)+"px");
                    $("#logo").css("background-size", Math.max((100 - change*0.17), 80)+"%");

                } else {
                    //scroll up

                    var change = $(window).scrollTop();
                    dynamicHeader = (header-change)/header;
                    $("#header").css("height", (header*dynamicHeader)+"px");
                    $("#title-container").css("width", Math.min((change*0.7), 155)+"px");
                    $("#nav").css("margin-left", Math.min(change*0.95, 185)+"px");
                    $("#logo").css("background-size", Math.max((100 - change*0.17), 80)+"%");
                }

                if($(window).scrollTop() > 50) {
                    $("#slogan").css("display", "none");
                } else if($(window).scrollTop() <= 50) {
                    $("#slogan").css("display", "block");
                }
            });
        }
        else{
            $("#slogan").css("position", "absolute");
            $("#slogan").css("margin-top", "130px");
            $("#title-container").css("width", "155px");
            $("#nav").css("margin-left", "185px");
            $("#logo").css("background-size", "80%");
        }

        initSlider("#reviews", ".review", "#scroller", "#reviews-nav")
    }
});
