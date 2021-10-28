(function ($) {
    "use strict";

    var $event = $.event,
        $special, resizeTimeout;
    $special = $event.special.debouncedresize = {
        setup: function () {
            $(this).on("resize", $special.handler);
        },
        teardown: function () {
            $(this).off("resize", $special.handler);
        },
        handler: function (event, execAsap) {
            var context = this,
                args = arguments,
                dispatch = function () {
                    event.type = "debouncedresize";
                    $event.dispatch.apply(context, args);
                };

            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }

            execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
        },
        threshold: 150
    };

    //------- OWL carousle init  ---------------
    jQuery(document).ready(function () {
        function init_carousel_owl() {
            $('.init-carousel-owl').each(function () {
                var items = $(this).data('items') ? $(this).data('items') : 5;
                var items_lg = $(this).data('items_lg') ? $(this).data('items_lg') : 4;
                var items_md = $(this).data('items_md') ? $(this).data('items_md') : 3;
                var items_sm = $(this).data('items_sm') ? $(this).data('items_sm') : 2;
                var items_xs = $(this).data('items_xs') ? $(this).data('items_xs') : 1;
                var loop = $(this).data('loop') ? $(this).data('loop') : false;
                var speed = $(this).data('speed') ? $(this).data('speed') : 200;
                var auto_play = $(this).data('auto_play') ? $(this).data('auto_play') : false;
                var auto_play_speed = $(this).data('auto_play_speed') ? $(this).data('auto_play_speed') : false;
                var auto_play_timeout = $(this).data('auto_play_timeout') ? $(this).data('auto_play_timeout') : 6000;
                var auto_play_hover = $(this).data('auto_play_hover') ? $(this).data('auto_play_hover') : true;
                var navigation = $(this).data('navigation') ? $(this).data('navigation') : false;
                var rewind_nav = $(this).data('rewind_nav') ? $(this).data('rewind_nav') : true;
                var pagination = $(this).data('pagination') ? $(this).data('pagination') : false;
                var mouse_drag = $(this).data('mouse_drag') ? $(this).data('mouse_drag') : false;
                var touch_drag = $(this).data('touch_drag') ? $(this).data('touch_drag') : false;
                var fade = $(this).data('fade') ? $(this).data('fade') : false;
                $(this).owlCarousel({
                    nav: navigation,
                    autoplay: auto_play,
                    autoplayTimeout: auto_play_timeout,
                    autoplaySpeed: auto_play_speed,
                    autoplayHoverPause: auto_play_hover,
                    navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
                    autoHeight: false,
                    loop: loop,
                    dots: pagination,
                    rewind: rewind_nav,
                    smartSpeed: speed,
                    mouseDrag: mouse_drag,
                    touchDrag: touch_drag,
                    responsive: {
                        0: {
                            items: 1,
                            nav: false
                        },
                        600: {
                            items: items_xs,
                            nav: false
                        },
                        768: {
                            items: items_sm,
                            nav: false
                        },
                        992: {
                            items: items_md
                        },
                        1200: {
                            items: items_lg
                        },
                        1400: {
                            items: items
                        }
                    }
                });

                $(this).on('translated.owl.carousel', function (event) {
                    toggleArrows($(this));
                });

                $(this).find('.owl-item.active').eq(1).addClass('center');
                $(this).on('translated.owl.carousel', function (e) {
                    $(this).find('.owl-item.center').removeClass('center');
                    $(this).find('.owl-stage .active').eq(1).addClass('center');
                });
            });
        }

        function toggleArrows(elm) {
            elm.find(".owl-item").removeClass('active-effect');
            elm.find(".owl-item.active").addClass('active-effect');
        }
        init_carousel_owl();

        $(document).scroll(function () {
            var scroll = $(this).scrollTop();
            $('.init-carousel-owl').each(function () {
                var top = $(this).offset().top;
                if (scroll >= top - 300) {
                    $(this).find(".owl-item.active").addClass('active-effect');
                }
            });
        });

        /*-----------------------------
              Back-to-top
          -------------------------------*/
        $(window).on('scroll', function (e) {
            e.preventDefault();
            if ($(this).scrollTop() > 500) $('#back-to-top').fadeIn();
            else $('#back-to-top').fadeOut();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('body,html').animate({
                scrollTop: 0
            }, 'slow');
        });
        /*-----------------------------
          Back-to-top
      -------------------------------*/

        $('.header-infos-carousel').owlCarousel({
            items: 3,
            loop: true,
            margin: 20,
            smartSpeed: 1000,
            autoplayTimeout: 6000,
            autoplaySpeed: 1000,
            autoplay: true,
            autoplayHoverPause: true,
            nav: false,
            dots: false,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 3
                },
                1400: {
                    items: 3
                }
            }
        });
        
        
        var owlslider = $('.slider-owl.slidervideo');


        $('.slider-owl').owlCarousel({
            items: 2,
            loop: true,
            animateOut: 'slideOutUp ',
            animateIn: 'slideInDown',
            margin: 0,
            smartSpeed: 8000,
            autoplayTimeout:9000,
            autoplaySpeed: 8000,
            autoplay: true,
            autoplayHoverPause: true,
            touchDrag: false,
            mouseDrag: false,
            nav: false,
            dots: true,
            responsive: {
                0: {
                    items: 1,
                    touchDrag: true,
                    mouseDrag: true,
                },
                600: {
                    items: 1,
                    touchDrag: true,
                    mouseDrag: true,
                },
                768: {
                    items: 1,
                    touchDrag: true,
                    mouseDrag: true,
                },
                992: {
                    items: 1
                },
                1200: {
                    items: 1
                },
                1400: {
                    items: 1
                }
            }

        });
        
        owlslider.on('changed.owl.carousel', function (event) {
            window.setTimeout(function () {

                if ($(".item-video1").parent().hasClass("active")) {
                     $('.videoSlider').get(0).currentTime = 0;
                     $('.videoSlider1').get(0).play();
                }
                else if ($(".item-video2").parent().hasClass("active")){
                     $('.videoSlider').get(0).currentTime = 0;
                    $('.videoSlider2').trigger('play');
                }
                else {
                    $('.videoSlider').trigger('pause');
                    $('.videoSlider').get(0).currentTime = 0;
                    
                    //alert("elsee");
                }
            }, 300);
        });



        $('.twitterSlider').owlCarousel({
            items: 2,
            loop: false,
            margin: 20,
            smartSpeed: 500,
            autoplayTimeout: 6000,
            autoplaySpeed: 1000,
            autoplay: true,
            autoplayHoverPause: true,
            touchDrag: true,
            mouseDrag: true,
            nav: false,
            dots: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 3
                },
                1400: {
                    items: 3
                }
            }
        });

        $('.serv-owl').owlCarousel({
            items: 5,
            loop: false,
            margin: 0,
            smartSpeed: 1000,
            autoplayTimeout: 6000,
            autoplaySpeed: 6000,
            autoplay: true,
            autoplayHoverPause: true,
            nav: false,
            dots: false,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 4
                },
                1200: {
                    items: 5
                },
                1400: {
                    items: 5
                }
            }
        });
        $('.adv-owl').owlCarousel({
            items: 2,
            loop: true,
            margin: 20,
            smartSpeed: 1000,
            autoplayTimeout: 6000,
            autoplaySpeed: 1000,
            autoplay: true,
            autoplayHoverPause: true,
            nav: false,
            dots: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 2
                },
                1400: {
                    items: 2
                }
            }
        });


        //===== Gallery ============
        $("a[data-rel^='prettyPhoto[g_gal]']").prettyPhoto({
            animation_speed: 'normal',
            social_tools: false,
        });

        //===== Popup video ============


        $(".popup").colorbox({
            iframe: true,
            innerWidth: 600,
            innerHeight: 400
        });



        $('.gallery-popup').each(function () {
            $(this).magnificPopup({
                delegate: 'a.image-popup',
                type: 'image',
                gallery: {
                    enabled: true
                },
            });
        });

    });

    //===== AOS ============
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: false,
    });
    wow.init();

    $(document).ready(function () {
        if ($(window).width() > 780) {
            if ($.fn.jpreLoader) {
                var $preloader = $('.js-preloader');
                $preloader.jpreLoader({
                    autoClose: true,
                }, function () {
                    $preloader.addClass('preloader-done');
                    $('body').trigger('preloader-done');
                    $(window).trigger('resize');
                });
            }
        } else {
            $('body').removeClass('js-preloader');
        };

        var $container = $('.post-masonry-style');
        $container.imagesLoaded(function () {
            $container.masonry({
                itemSelector: '.item-masory',
                gutterWidth: 0,
                columnWidth: 1,
            });
        });

        $('.gva-search-region .icon').on('click', function (e) {
            if ($(this).parent().hasClass('show')) {
                $(this).parent().removeClass('show');
            } else {
                $(this).parent().addClass('show');
            }
            e.stopPropagation();
        })

        /*======Offcavas===============*/
        $('#menu-bar').on('click', function (e) {
            if ($('.gva-offcanvas-mobile').hasClass('show-view')) {
                $(this).removeClass('show-view');
                $('.gva-offcanvas-mobile').removeClass('show-view');
            } else {
                $(this).addClass('show-view');
                $('.gva-offcanvas-mobile').addClass('show-view');
            }
            e.stopPropagation();
        })

        $('.close-offcanvas').on('click', function (e) {
            $('.gva-offcanvas-mobile').removeClass('show-view');
            $('#menu-bar').removeClass('show-view');
        });

        /*========== Click Show Sub Menu ==========*/
        $('.gva-navigation a').on('click', '.nav-plus', function () {
            if ($(this).hasClass('nav-minus') == false) {
                $(this).parent('a').parent('li').find('> ul').slideDown();
                $(this).addClass('nav-minus');
            } else {
                $(this).parent('a').parent('li').find('> ul').slideUp();
                $(this).removeClass('nav-minus');
            }
            return false;
        });

        /* ============ Isotope ==============*/
        if ($.fn.isotope) {
            $('.isotope-items').each(function () {
                var _pid = $(this).data('pid');
                var $el = $(this),
                    $filter = $('.portfolio-filter a.' + _pid),
                    $loop = $(this);

                $loop.isotope();

                $loop.imagesLoaded(function () {
                    $loop.isotope('layout');
                });

                if ($filter.length > 0) {

                    $filter.on('click', function (e) {
                        e.preventDefault();
                        var $a = $(this);
                        $filter.removeClass('active');
                        $a.addClass('active');
                        $loop.isotope({
                            filter: $a.data('filter')
                        });
                    });
                };
            });
        };

        //==== Customize =====
        $('.gavias-skins-panel .control-panel').click(function () {
            if ($(this).parents('.gavias-skins-panel').hasClass('active')) {
                $(this).parents('.gavias-skins-panel').removeClass('active');
            } else $(this).parents('.gavias-skins-panel').addClass('active');
        });

        $('.gavias-skins-panel .layout').click(function () {
            $('body').removeClass('wide-layout').removeClass('boxed');
            $('body').addClass($(this).data('layout'));
            $('.gavias-skins-panel .layout').removeClass('active');
            $(this).addClass('active');
            var $container = $('.post-masonry-style');
            $container.imagesLoaded(function () {
                $container.masonry({
                    itemSelector: '.item-masory',
                    gutterWidth: 0,
                    columnWidth: 1,
                });
            });
        });

        /*-------------Milestone Counter----------*/
        jQuery('.milestone-block').each(function () {
            jQuery(this).appear(function () {
                var $endNum = parseInt(jQuery(this).find('.milestone-number').text());
                jQuery(this).find('.milestone-number').countTo({
                    from: 0,
                    to: $endNum,
                    speed: 4000,
                    refreshInterval: 60,
                    formatter: function (value, options) {
                        value = value.toFixed(options.decimals);
                        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        return value;
                    }
                });
            }, {
                accX: 0,
                accY: 0
            });
        });

        /*----------- Animation Progress Bars --------------------*/
        $("[data-progress-animation]").each(function () {
            var $this = $(this);
            $this.appear(function () {
                var delay = ($this.attr("data-appear-animation-delay") ? $this.attr("data-appear-animation-delay") : 1);
                if (delay > 1) $this.css("animation-delay", delay + "ms");
                setTimeout(function () {
                    $this.animate({
                        width: $this.attr("data-progress-animation")
                    }, 800);
                }, delay);
            }, {
                accX: 0,
                accY: -50
            });
        });

        /*------------Pie Charts---------------------------*/
        var pieChartClass = 'pieChart',
            pieChartLoadedClass = 'pie-chart-loaded';

        function initPieCharts() {
            var chart = $('.' + pieChartClass);
            chart.each(function () {
                $(this).appear(function () {
                    var $this = $(this),
                        chartBarColor = ($this.data('bar-color')) ? $this.data('bar-color') : "#3B7EFF",
                        chartBarWidth = ($this.data('bar-width')) ? ($this.data('bar-width')) : 150
                    if (!$this.hasClass(pieChartLoadedClass)) {
                        $this.easyPieChart({
                            animate: 2000,
                            size: chartBarWidth,
                            lineWidth: 5,
                            scaleColor: false,
                            trackColor: "#DCDEE0",
                            barColor: chartBarColor,
                            lineCap: 'square',
                        }).addClass(pieChartLoadedClass);
                    }
                });
            });
        }
        initPieCharts();

        // ====== mb_YTPlayer video background ==============================
        if (!jQuery.browser.mobile) {
            $(".youtube-bg").mb_YTPlayer();
        }

        //======Fixed top Menu Bar==========================================
        if ($('.gv-sticky-menu').length > 0) {
            $('.gv-sticky-menu').each(function () {
                var sticky = new Waypoint.Sticky({
                    element: $(this)[0]
                });
            })
        }

        // ======Text Typer=================================================
        $("[data-typer-targets]", ".rotate-text").typer();
    });

    var animationDimensions = function () {
        var gavias_height = $(window).height();
        $('.bb-container.full-screen').each(function () {
            $(this).css('height', gavias_height);
        });
    }

    $(document).ready(function () {
        if ($('.full-screen').length > 0) {
            animationDimensions();
        }
    })

    $(window).load(function () {
        $('#gva-preloader').remove();
        if ($('.full-screen').length > 0) {
            animationDimensions();
        }
    });

    $(window).on("debouncedresize", function (event) {
        if ($('.full-screen').length > 0) {
            setTimeout(function () {
                animationDimensions();
            }, 50);
        }
    });

    $(document).ready(function () {


        $('.colorSwitch').click(function () {
            $('body').toggleClass("grayscale");
            $(this).find("i").toggleClass("fa-eye-slash fa-eye");
        });
        $('.voteItem').click(function () {
            $(".voteItem").removeClass("chosed");
            $(this).addClass("chosed");
        });


        $('.quick-side-icon a').click(function (e) {
            e.preventDefault();
            if ($(this).parents('.quick-side-icon').hasClass('open')) {
                $(this).parents('.quick-side-icon').removeClass('open');
            } else {
                $(this).parents('.quick-side-icon').addClass('open');
            }
            if ($('.gva-quick-side').hasClass('open')) {
                $('.gva-quick-side').removeClass('open');
            } else {
                $('.gva-quick-side').addClass('open');
            }
            if ($('.gva-body-wrapper').hasClass('blur')) {
                $('.gva-body-wrapper').removeClass('blur');
            } else {
                $('.gva-body-wrapper').addClass('blur');
            }
        });

        $('a.quick-side-close').click(function (e) {
            e.preventDefault();
            $('.quick-side-icon').removeClass('open');
            $('.gva-quick-side').removeClass('open');
            $('.gva-body-wrapper').removeClass('blur');
        });

        $('.cbp-qtrotator').each(function () {
            $(this).cbpQTRotator();
        })

        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        if (isMobile.any()) {
            $(".gva-navigation ul.gva_menu_main li.menu-item--expanded > a, .gva-navigation ul.gva_menu_main li.gva-mega-menu > a").on('click', function (e) {
                e.preventDefault();
                if ($(this).parent().children('.sub-menu').css('opacity') == 0) {
                    $(this).hover();
                } else {
                    window.location.href = $(this).attr('href');
                }
            });
        }


        //increases font size  "
        var resize = new Array('a', '.resizable');
        resize = resize.join(',');
        var resizP = new Array('p', '.resizable');
        resizP = resizP.join(',');

        //resets the font size when "reset" is clicked
        var resetFont = $(resize).css('font-size');
        var resetFontP = $(resizP).css('font-size');
        $(".resetFont").click(function () {
            $(resize).css('font-size', resetFont);
            $(resizP).css('font-size', resetFontP);
        });

        //increases font size when "+" is clicked
        $(".incFont").click(function () {
            var originalFontSize = $(resize).css('font-size');
            var originalFontSize = $(resizP).css('font-size');
            var originalFontNumber = parseFloat(originalFontSize, 10);
            var newFontSize = originalFontNumber * 1.2;
            $(resize).css('font-size', newFontSize);
            $(resizP).css('font-size', newFontSize);
            return false;
        });

        //decrease font size when "-" is clicked
        $(".decFont").click(function () {
            var originalFontSize = $(resize).css('font-size');
            var originalFontSize = $(resizP).css('font-size');
            var originalFontNumber = parseFloat(originalFontSize, 10);
            var newFontSize = originalFontNumber * 0.8;
            $(resize).css('font-size', newFontSize);
            $(resizP).css('font-size', newFontSize);
            return false;
        });
        $("header.header-default .navigation .gva_menu > li > a").click(function () {
            $("header.header-default .navigation .gva_menu > li > a").not(this).parent().removeClass("opened");
            $(this).parent().toggleClass("opened");
        });


        $(".preloader").fadeOut();

        //$('[data-toggle="tooltip"]').tooltip();


    });

    // WOW ANIMATION 
    wow = new WOW({
        animateClass: 'animated',
        offset: 0
    });
    wow.init();

    $(window).load(function () {
        if ($('.block-gavias-sliderlayer, .before-help-region, .block-gavias-slider').length > 0) {
            var html_help = $('.gav-help-region').html();
            $('.gav-help-region').remove();
            html_help = '<div class="help gav-help-region">' + html_help + '</div>';
            if ($('.before-help-region').length > 0) {
                $('.before-help-region').first().append(html_help);
            } else if ($('.block-gavias-sliderlayer').length > 0) {
                $('.block-gavias-sliderlayer').first().after(html_help);
            } else if ($('.block-gavias-slider').length > 0) {
                $('.block-gavias-slider').first().after(html_help);
            }
            $('.gav-help-region').show();
        } else {
            var html_help = $('.gav-help-region').html();
            $('.gav-help-region').remove();
            html_help = '<div class="help gav-help-region">' + html_help + '</div>';
            $('#page-main-content').first().before(html_help);
            $('.gav-help-region').show();
        }
    });

})(jQuery);
