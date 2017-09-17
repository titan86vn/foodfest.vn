/*---------------------------------------------------- 
Theme Name: ergo7
Version:    1.1
 
| ----------------------------------------------------------------------------------
| TABLE OF CONTENT
| ----------------------------------------------------------------------------------
-Fullpage js  
-Home  
-Timeline
-Artist Lineup
-Sponsors
-Gallery
-Ask Us
-Loader
-Menu
-Window Resize

*/
// Dom Ready Function
    $(function() {
    'use strict';
    var windowWidth; 
    var windowHeight;
    /* Fullpage js initialise
    /*---------------------------------------------------- */
    var scrollingSpeed = 700;
    var logoBackground = $('#top-logo');
    var artistBack = $('#artist_back'); //artist artist back button
    var videoHome = $('#ergo_video_bg'); 
    var parallaxHome = $('#parallax-home'); 
            
    function createFullpage(Overflow) {
        $('#fullpage').fullpage({
            anchors: ['home-section', 'timeline-section', 'artist-section', 'agenda-section', 'ticket-section', 'sponsor-section', 'gallery-section', 'askus-section', 'contact-section'],
            scrollingSpeed: scrollingSpeed,
            'navigation': true,
            sectionSelector: '.l-screen',
            slideSelector: '.l-slide',
            css3: true,
            responsiveWidth: 1200,
            scrollOverflow: Overflow,
			afterRender: function(){
				if (videoHome.length) {
                //$('#bgvid')[0].play(); //Play home page background video
				}				
             },
            controlArrows: false,
            'afterLoad': function(anchorLink, index) {
                logoBackground.addClass("menu_color_" + index); //Hide logo on artist click event
				windowWidth=$(window).width();
				windowHeight = $(window).height();
				if ( index === 1) {
					if (videoHome.length) {
				        //$('#bgvid')[0].play(); //Play home page background video      
					}
				}
				
            },
            'onLeave': function(index, nextIndex, direction) {
                logoBackground.removeClass(function(index, css) {
                    return (css.match(/(^|\s)menu_color_\S+/g) || []).join(' ');
                });
                if (index === 4 && direction === 'down' || index === 6 && direction === 'up') {
                    var sectionElement = $('.section').eq(5);
                    $(sectionElement).next("section").removeAttr("anm-info");
                    if ($(sectionElement).attr('anm-info') === undefined) {
                        if (windowWidth > 1200)
                            galleryReset(); //Animate gallery on page scroll for desktop
                    }
                    $(sectionElement).attr('anm-info', 'animated');
                }
            },

            onSlideLeave: function(anchorLink, index, slideIndex, direction) {
                barStart(direction); //Start artist line-up bars animation on slide leave 
                $.fn.fullpage.setScrollingSpeed(0);
                if (artistBack.hasClass('active')) {
                    artistBack.removeClass('active'); //hide artist artist close button 
                }
            },
            // Display the slides container by fading it in after the next slide has been loaded.
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
                $.fn.fullpage.setScrollingSpeed(scrollingSpeed);
                if (anchorLink === "artist-section") {
                    if (slideIndex !== 0) {
                        setTimeout(function() {
                            artistBack.addClass('active'); //show artist close button 
                        }, 1500);
                    } else {
                        if (artistBack.hasClass('active')) {
                            artistBack.removeClass('active'); //hide artist close button 
                        }
                        if (logoBackground.hasClass('hide_logo')) {
                            setTimeout(function() {
                                logoBackground.removeClass("hide_logo"); //show right logo
                            }, 1500);
                        }

                    }

                }
            },
        });

    }
    if (document.documentElement.clientWidth > 1200) {
        var Overflow = true; //Enable each section overflow for desktop
    } else {
        var Overflow = false;
    }
    //Fullpage js initialising
    createFullpage(Overflow);
    if (!Overflow)
        $.fn.fullpage.setAllowScrolling(false);
    // HOME  
    /*----------------------------------------------------*/
    //Animate background color for home
    (function($, window, document, undefined) {

        $.fn.animatedBG = function(options) {
            var defaults = {
                    colorSet: ['#ef008c', '#00be59', '#654b9e', '#ff5432', '#00d8e6'],  //background colours for home
                    speed: 3000
                },
                settings = $.extend({}, defaults, options);

            return this.each(function() {
                var $this = $(this);
                $this.each(function() {
                    var $el = $(this),
                        colors = settings.colorSet;

                    function shiftColor() {
                        var color = colors.shift();
                        colors.push(color);
                        return color;
                    }
                    // initial color
                    var initColor = shiftColor();
                    $el.css('backgroundColor', initColor);
                    setInterval(function() {
                        var color = shiftColor();
                        $el.animate({
                            backgroundColor: color
                        }, 3000);
                    }, settings.speed);
                });
            });
        };


    }(jQuery, window, document));
    

    // jQuery Selections
    var $html = $('html'),
        $container = $('#container'),
        $prompt = $('#prompt'),
        $toggle = $('#toggle'),
        $about = $('#about'),
        $scene = $('#scene');

    // Resize handler.
    function homeResize() {
        $scene[0].style.height = window.innerHeight + 'px';
        if (!$prompt.hasClass('hide')) {
            if (window.innerWidth < 600) {
                $toggle.addClass('hide');
            } else {
                $toggle.removeClass('hide');
            }
        }
    };

    
    if (parallaxHome.length) {
	 $('#background').animatedBG({}); //Initialize home background colour animation for home
    var scene = document.getElementById('scene');
    var parallax = new Parallax(scene);
    homeResize();
	}

    /* timeline
    /*---------------------------------------------------- */
    var timeline = $('#timeline-wrap');
    if (timeline.length) {
        var numItems = timeline.find('.time-wrap ').length; //count circle
    }
    if (numItems < 5) {
        var ll = $('#column-one').css("left").replace(/[^-\d\.]/g, '');
        ll = ll / 2;
        $('#timeline-wrap  .wrap-container').css("right", ll + "px"); //Adjust timeline with window size
        if (numItems < 4) $('#timeline-wrap  .wrap-container').css("top", ll + "px");
    }

    /* Artist lineup
    /*---------------------------------------------------- */
    /* artist bar animation */
    var barStart = function(direction) {
        $('#artist-description').addClass("active");
        setTimeout(
            function() {
                $('#artist-description').removeClass('active');
            }, 2000);
        logoBackground.addClass("hide_logo"); //hide logo on artist click

    };

    /* Sponsors
    /*---------------------------------------------------- */
    var contentHeight = $("#sponsors_details").height();
    var windowHeight = $(window).height();
    if (contentHeight > windowHeight) {
        $(".sponsor-section .vertical-center").css("height", "auto");
    }

    /* Gallery
    /*---------------------------------------------------- */
    galleryReset();
    if ($('.gallery-section').length) {
        var galleryHolder = $('#galleryHolder');
        (function() {
            /* initialize prettyPhoto */
            $("area[data-gal^='prettyPhoto']").prettyPhoto();
            $(".gallery:first a[data-gal^='prettyPhoto']").prettyPhoto({
                animation_speed: 'normal',
                theme: 'light_square',
                slideshow: 3000,
                autoplay_slideshow: false
            });
        })();
        $("#filterOptions li a").on("click", function() {
            // fetch the class of the clicked item
            var galleryClass = $(this).attr('class');
            // remove the active class from all gallery filter buttons
            $('#filterOptions li .hi-icon').removeClass('active');
            // update the active state on our clicked button
            $(this).children("#filterOptions .hi-icon").addClass('active');
            if (galleryClass === 'all') {
                // animate all gallery items
                galleryHolder.children('div').removeClass("animate");
                galleryHolder.children('div.item').fadeIn(500, 'swing', function() {
                    galleryHolder.children('div').addClass("animate");
                });;

            } else {
                var cnt = 0;
                var tot = galleryHolder.children('div:not(.' + galleryClass + ')').length;
                // hide all elements that don't share galleryClass
                galleryHolder.children('div:not(.' + galleryClass + ')').fadeOut(0, 'swing', function() {
                    galleryHolder.children('div.' + galleryClass).removeClass("animate");
                    //callback function after animation finished
                    cnt++;
                    if (cnt >= tot) {
                        galleryHolder.children('div.' + galleryClass).fadeIn(500);
                        galleryHolder.children('div.' + galleryClass).addClass("animate");
                    }
                });
            }
            return false;
        });
    }

    function galleryReset() {
        var galleryHolder = $('#galleryHolder');
        galleryHolder.children('div').removeClass("animate");
        // show all our items
        galleryHolder.children('div.item').fadeIn(500, '', function() {
            galleryHolder.children('div').addClass("animate");
            //Reset gallery filterOptions 
            $('#filterOptions li .hi-icon').removeClass('active').first().addClass('active');

        });
    }

    /* Ask Us
    /*----------------------------------------------------  */
    //Replace answer on ask us bar click
    var replaceAnswer = function(text, title) {
        $('#askus-answers-inner').removeClass('active');
        setTimeout(function() {
            $('#askus-answers .askus-show-answer').html(text);
            $('#askus-answers #askus-answers-inner h3').html(title);
            $('#askus-answers-inner').addClass('active');
        }, 650);
    };
    var questionNumber = 1;
    var questionCount = $('.askusbar', '#askus-container').length;
    //Ask us bar click event
    var askusbarClick = function(el) {
        $('.askusbar', '#askus-container').off('click');
        $('#askus .fp-scroller').addClass("show-answer");
        $('#askus-container').addClass("noScroll");
        if (Overflow)
            $.fn.fullpage.reBuild();


        setTimeout(function() {
            $('#askus').toggleClass('showing-answer');
            $('#askus-answers').addClass('active');
        }, 0);
        questionNumber = $(el).data('askus-number');
        replaceAnswer($(el).find('.askus-questions__answer-text').html(), $(el).find('h3').html());
        questionNumber = $(el).attr('data-askus-number');
        questionNumber = parseInt(questionNumber);
    };
    $('.askusbar', '#askus-container').on('click', function() {
        askusbarClick(this);
    });
    //Ask us bar close button event
    $('#askus_close').on('click', function() {
        $('#askus-container').removeClass("noScroll");
        $('.askusbar', '#askus-container').on("click", function() {
            askusbarClick(this);
        });
        $('#askus .fp-scroller').removeClass("show-answer");
        $.fn.fullpage.reBuild();
        $('#askus').toggleClass('showing-answer');
        $('.askus-show-answer', '#askus-answers').removeClass('active');
        $('#askus-answers').removeClass('active');
    });
    //Ask us previous click event
    $('a.askus-prev-button').on('click', function() {
        if (questionNumber !== 1) {
            questionNumber = parseInt(questionNumber, 10) - 1;
        } else {
            questionNumber = questionCount;
        }
        replaceAnswer($('.askus_content_bar').find('[data-answer-number="' + (questionNumber) + '"]').html(), $('.askus_content_bar').find('[data-askus-number="' + (questionNumber) + '"] h3').html());
    });
    //Ask us next click event
    $('a.askus-next-button').on('click', function() {
        if (questionNumber !== questionCount) {
            questionNumber = parseInt(questionNumber, 10) + 1;
        } else {
            questionNumber = 1;
        }
        replaceAnswer($('.askus_content_bar').find('[data-answer-number="' + (questionNumber) + '"]').html(), $('.askus_content_bar').find('[data-askus-number="' + (questionNumber) + '"] h3').html());
    });
    jQuery('.control-bar').children().hide();



    /* Menu
    /*---------------------------------------------------- */
    (function() {
        function init() {
            var eventType = 'click';
            if ('ontouchstart' in window) {
                //iOS & android
                eventType = 'touchstart';
            } else if (window.navigator.msPointerEnabled) {
                //Win8
                eventType = 'click';
            }
            var menu = document.getElementById('bt-menu'),
                trigger = menu.querySelector('a.bt-menu-trigger'),
                trigger_link = menu.querySelectorAll('ul.menu-options li a'),
                resetMenu = function() {
                    classie.remove(menu, 'bt-menu-open');
                    classie.add(menu, 'bt-menu-close');
                },
                closeClickFn = function(ev) {
                    resetMenu();
                    overlay.removeEventListener(eventType, closeClickFn);
                };
            var overlay = document.createElement('div');
            overlay.className = 'bt-overlay';
            menu.appendChild(overlay);
            trigger.addEventListener(eventType, function(ev) {
                ev.stopPropagation();
                ev.preventDefault();
                if (classie.has(menu, 'bt-menu-open')) {
                    resetMenu();
                } else {
                    classie.remove(menu, 'bt-menu-close');
                    classie.add(menu, 'bt-menu-open');
                    overlay.addEventListener(eventType, closeClickFn);
                }
            });
            $('#bt-menu ul.menu-options li a').each(function(index) {
                $(this).on("click", function(ev) {
                    setTimeout(function() {
                        if (classie.has(menu, 'bt-menu-open')) {
                            resetMenu();
                        } else {
                            classie.remove(menu, 'bt-menu-close');
                            classie.add(menu, 'bt-menu-open');
                            overlay.addEventListener(eventType, closeClickFn);
                        }
                    }, 500);
                });
            });
        }
        init();
    })();

    /* Window Resize
    /*---------------------------------------------------- */
    var waitForFinalEvent = (function() {
        var timers = {};
        return function(callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "uniqueId";
            }
            if (timers[uniqueId]) {
                clearTimeout(timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();
    $(window).resize(function() { 
        // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
        if ($(window).width() !== windowWidth || $(window).height() !== windowHeight) {  
            // Update the window width for next resize
            windowWidth = $(window).width();
            windowHeight = $(window).height();
            waitForFinalEvent(function() {
                var contentHeight = $("#sponsors_details").height();

                if (contentHeight > windowHeight)
                    $(".sponsor-section .vertical-center").css("height", "auto"); //Reset sponsors 

                var resetOverflow = Overflow;
                if (document.documentElement.clientWidth > 1200) {
                    Overflow = true;
                } else {
                    Overflow = false;
                }
                if (resetOverflow !== Overflow) {
                    $.fn.fullpage.destroy('all');
                    createFullpage(Overflow);
                } else
                    $.fn.fullpage.reBuild();
                if (!Overflow)
                    $.fn.fullpage.setAllowScrolling(false);

            }, 1000, "some unique string");
			if (parallaxHome.length) {
            homeResize();
			}

        }
    });

    /*Home slider
    /*---------------------------------------------------- */
    if ($('#home-slides').length){
        var showSliderByWidth = function(){
            var device = $(window).innerWidth() > 515 ? 'data-desktop' : 'data-mobile';
            $('#home-slides .slides-container img').each(function() {
                $(this).attr("src", $(this).attr(device));
            });
        };
        var initSlider = function(){
            $('#home-slides').superslides({
                play: 5000,
                pagination: false
            })
        }
        showSliderByWidth();
        initSlider();

        $(window).resize(function(){
            showSliderByWidth();
        });
    }

    // $('.contact .submit input[type="submit"], .btn-ticket').click(function(){
    //     window.open('http://foodfest.foodizzi.com','_blank');
    // });

    if ($(window).width() < 1200){
        $(".lazyload").lazyload({
          effect : "fadeIn"
        });
    }
      
});

$(window).on('load', function(e) {
    //initialise artist artist previous click event
    $(".artist-slide-prev", '#artist_all_container').on("click", function() {
        $.fn.fullpage.moveSlideLeft();
    });
    //initialise artist artist next click event
    $(".artist-slide-next", '#artist_all_container').on("click", function() {
        $.fn.fullpage.moveSlideRight();
    });
    //Remove loader
    $('body').addClass('loaded');

    setTimeout(function() {

        $("#loader-wrapper").remove("#loader-wrapper");
    }, 1500);
});


function getParameterByName( name ){
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// work with auto change language dropdown direction
// also take url query to make target url
function miscResize() {
    var width = window.innerWidth;
    if (width < 600) {
        $("div.btn-language").removeClass("dropdown").addClass("dropup");
    } else {
        $("div.btn-language").removeClass("dropup").addClass("dropdown");
    }

    var utmParam = getParameterByName("utm");

    if (utmParam) {
        $("a").each(function() {
            var href = $(this).attr("href");

            if (href && href.indexOf("foodfest.foodizzi.com") > -1) {
                $(this).attr("href", "http://foodfest.foodizzi.com/?ref=" + utmParam);
            }
        });
    }
};
 
$(function() {
    miscResize();
});

$(window).resize(function() {
    miscResize();
}); 

particlesJS("particles-js", {"particles":{"number":{"value":100,"density":{"enable":true,"value_area":600}},"color":{"value":"#ffffff"},"shape":{"type":"star","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.15,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":false,"anim":{"enable":false,"speed":28.716606973349382,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":false,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":200,"size":20,"duration":1.457926666288686,"opacity":0.5426727035630109,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;