!function (e, t) {
    if ("function" == typeof define && define.amd) define(["exports", "module"], t);
    else if ("undefined" != typeof exports && "undefined" != typeof module) t(exports, module);
    else {
        var n = {exports: {}};
        t(n.exports, n), e.autosize = n.exports
    }
}(this, function (e, t) {
    "use strict";

    function n(e) {
        function t() {
            var t = window.getComputedStyle(e, null);
            "vertical" === t.resize ? e.style.resize = "none" : "both" === t.resize && (e.style.resize = "horizontal"), s = "content-box" === t.boxSizing ? -(parseFloat(t.paddingTop) + parseFloat(t.paddingBottom)) : parseFloat(t.borderTopWidth) + parseFloat(t.borderBottomWidth), isNaN(s) && (s = 0), l()
        }

        function n(t) {
            var n = e.style.width;
            e.style.width = "0px", e.offsetWidth, e.style.width = n, e.style.overflowY = t
        }

        function o(e) {
            for (var t = []; e && e.parentNode && e.parentNode instanceof Element;) e.parentNode.scrollTop && t.push({
                node: e.parentNode,
                scrollTop: e.parentNode.scrollTop
            }), e = e.parentNode;
            return t
        }

        function r() {
            var t = e.style.height,
                n = o(e),
                r = document.documentElement && document.documentElement.scrollTop;
            e.style.height = "";
            var i = e.scrollHeight + s;
            return 0 === e.scrollHeight ? void (e.style.height = t) : (e.style.height = i + "px", u = e.clientWidth, n.forEach(function (e) {
                e.node.scrollTop = e.scrollTop
            }), void (r && (document.documentElement.scrollTop = r)))
        }

        function l() {
            r();
            var t = Math.round(parseFloat(e.style.height)),
                o = window.getComputedStyle(e, null),
                i = "content-box" === o.boxSizing ? Math.round(parseFloat(o.height)) : e.offsetHeight;
            if (i !== t ? "hidden" === o.overflowY && (n("scroll"), r(), i = "content-box" === o.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight) : "hidden" !== o.overflowY && (n("hidden"), r(), i = "content-box" === o.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight), a !== i) {
                a = i;
                var l = d("autosize:resized");
                try {
                    e.dispatchEvent(l)
                } catch (e) {
                }
            }
        }

        if (e && e.nodeName && "TEXTAREA" === e.nodeName && !i.has(e)) {
            var s = null,
                u = e.clientWidth,
                a = null,
                c = function () {
                    e.clientWidth !== u && l()
                },
                p = function (t) {
                    window.removeEventListener("resize", c, !1), e.removeEventListener("input", l, !1), e.removeEventListener("keyup", l, !1), e.removeEventListener("autosize:destroy", p, !1), e.removeEventListener("autosize:update", l, !1), Object.keys(t).forEach(function (n) {
                        e.style[n] = t[n]
                    }), i.delete(e)
                }.bind(e, {
                    height: e.style.height,
                    resize: e.style.resize,
                    overflowY: e.style.overflowY,
                    overflowX: e.style.overflowX,
                    wordWrap: e.style.wordWrap
                });
            e.addEventListener("autosize:destroy", p, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", l, !1), window.addEventListener("resize", c, !1), e.addEventListener("input", l, !1), e.addEventListener("autosize:update", l, !1), e.style.overflowX = "hidden", e.style.wordWrap = "break-word", i.set(e, {
                destroy: p,
                update: l
            }), t()
        }
    }

    function o(e) {
        var t = i.get(e);
        t && t.destroy()
    }

    function r(e) {
        var t = i.get(e);
        t && t.update()
    }

    var i = "function" == typeof Map ? new Map : function () {
            var e = [],
                t = [];
            return {
                has: function (t) {
                    return e.indexOf(t) > -1
                },
                get: function (n) {
                    return t[e.indexOf(n)]
                },
                set: function (n, o) {
                    e.indexOf(n) === -1 && (e.push(n), t.push(o))
                },
                delete: function (n) {
                    var o = e.indexOf(n);
                    o > -1 && (e.splice(o, 1), t.splice(o, 1))
                }
            }
        }(),
        d = function (e) {
            return new Event(e, {bubbles: !0})
        };
    try {
        new Event("test")
    } catch (e) {
        d = function (e) {
            var t = document.createEvent("Event");
            return t.initEvent(e, !0, !1), t
        }
    }
    var l = null;
    "undefined" == typeof window || "function" != typeof window.getComputedStyle ? (l = function (e) {
        return e
    }, l.destroy = function (e) {
        return e
    }, l.update = function (e) {
        return e
    }) : (l = function (e, t) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], function (e) {
            return n(e, t)
        }), e
    }, l.destroy = function (e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], o), e
    }, l.update = function (e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], r), e
    }), t.exports = l
});

$(document).ready(function () {
    // Common
    autosize($('textarea'));
    if ($(window).width() <= 1300) {
        var loaderActionTransform = 280;
    } else {
        var loaderActionTransform = 350;
    }
    let windowChecker = 0;

    if ($(window).width() <= 1000) {
        $('header > .container .header_top_box .discord_promo').detach().prependTo('.main_page_header_row');
    } else {
        $('.main_page_header_row .discord_promo').detach().appendTo('header > .container .header_top_box');
    }

    $('html, body').animate({scrollTop: '0px'}, 500);
    $('select').niceSelect();
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });
    var currentWidth = $('header .container').offset().left;

    //
    function murders() {
        scroller.on('scroll', (args) => {
            if (typeof args.currentElements['murder_front'] === 'object') {
                let progress = args.currentElements['murder_front'].progress;
                $('.murder.front').css({
                    "opacity": progress * 1.8
                });
            }
            if (typeof args.currentElements['murder_back'] === 'object') {
                let progress = args.currentElements['murder_back'].progress;
                $('.murder.back').css({
                    "opacity": progress * 1.8
                });
            }
        });
    }

    //
    function circle() {
        $('.window_circle').circleProgress({
            startAngle: Math.PI / 4 * 2,
            size: 30,
            thickness: 2,

            fill: {
                color: "#06ccefa6"
            },
            emptyFill: "rgba(38, 33, 25, .6)"
        });
        $('.turkey_server').circleProgress({
            startAngle: Math.PI / 4 * 2,
            size: 100,
            thickness: 1,
            fill: {color: "#DC3D47"},
            emptyFill: "rgba(41, 40, 36, .6)"
        });
        $('.eu_server').circleProgress({
            startAngle: Math.PI / 4 * 2,
            size: 100,
            thickness: 1,
            fill: {color: "#5F6DB4"},
            emptyFill: "rgba(41, 40, 36, .6)"
        });
        $('.brazil_server').circleProgress({
            startAngle: Math.PI / 4 * 2,
            size: 100,
            thickness: 1,
            fill: {color: "#32ff93"},
            emptyFill: "rgba(41, 40, 36, .6)"
        });
    }

    function online(time) {
        $.ajax({
            type: 'GET',
            url: '/request/get_servers',
            dataType: 'JSON',
            data: {_token: $('meta[name="csrf-token"]').attr('content')},
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data);
                let all_online = 0;
                for (let i = 0; i < data.callback.length; i++) {
                    let server = data.callback[i];
                    // if(server.online == 0) {
                    //     $('.server_'+i).html('Soon');
                    // }
                    // else {
                    $('.server_' + i).html(server.online);
                    all_online += server.online;
                    setTimeout(function () {
                        $('.circle_' + i).circleProgress({
                            value: .0
                        });
                        setTimeout(() => $('.circle_' + i).circleProgress('value', `${server.online * 0.001}`), 500);
                    }, time);
                    // }

                }

                $('.server_all').html(all_online);


            }
        });

    }

    function initMob() {
        $('body.main_page').addClass('without_loader');
        $('body.main_page').addClass('loaded');
        $('body .loader').addClass('finished');
        $('.main_page header').addClass('primary');
        $('.online, .promo, .discord_promo').addClass('moving');
        $(".action").css({
            "z-index": "6",
            "transform": "translateX(" + loaderActionTransform + "px)"
        });
        $('.loader i').css({
            "left": "auto",
            "right": currentWidth
        });
        circle();
        murders();
        online(3000);
    }

    // загрузочное окно
    var date = new Date();
    date.setTime(date.getTime() + (180 * 60 * 1000)); // спустя столько времени загрузочное окно покажется вновь
    if (!$.cookie('loaderViewer')) {

        if ($("body").hasClass("main_page")) {
            scroller.stop();
            circle();
            // Server

            online(6500);

            //
            setTimeout(function () {
                $('.loader').addClass('half');
            }, 4000);
            setTimeout(function () {
                $(".action").css({
                    "z-index": "6",
                    "transform": "translateX(" + loaderActionTransform + "px)"
                });
            }, 4500);
            setTimeout(function () {
                $('.loader i').css({
                    "left": "auto",
                    "right": currentWidth
                });
            }, 4500);
            setTimeout(function () {
                $('.loader').addClass('finished');
            }, 4500);
            setTimeout(function () {
                $('.main_page header').addClass('primary');
                $('.online, .promo, .discord_promo').addClass('moving');
            }, 4500);
            setTimeout(function () {
                scroller.start();
                $('body').addClass('loaded');
                $('.main_page .loader').attr('style', 'transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);');
                murders();
            }, 6500);

            setTimeout(function () {
                $('body').addClass('promo_windowed');
            }, 7000);
            setTimeout(function () {
                $('body').addClass('windowed_animated');
            }, 7300);
            setTimeout(function () {
                $('.promo_window').addClass('opened');
                windowChecker = 1;
            }, 7500);
        }

        $.cookie('loaderViewer', true, {
            expires: date,
            path: '/'
        });
    } else {
        initMob();
    }
    // если разрешение меньше 1000
    if ($(window).width() <= 1000) {
        initMob();
    }

    // Shop page
    var currency
    if (document.getElementById('currency-exchange') !== null) {
        currency = document.getElementById('currency-exchange').innerText;
    }
    $('input[name="sum"]').val(0);

    // Cart button calculating function
    function calculationTotalButton() {

        if ($('.purchase_total span i').html() == 0) {
            setTimeout(function () {
                var mainSum = $('.purchase_total span i').attr('data-count');
                var sumPull = parseInt(String(mainSum).replace(/ /g, ''));
                $('input[name="sum"]').val(0);
            }, 600);
            // Проверяем, видит ли пользователь, что корзина пустая
            if ($(".purchase button").hasClass("empty_cart")) {
                // Если нужны какие-то манипуляции в будущем
            } else { // Если нет класса, то назначаем его и пишем, что корзина пустая
                $('.purchase button').addClass("empty_cart");
                if ($('html').attr('lang') == "tr") $('.purchase button span').html("Sepet boş");
                else $('.purchase button span').html("Basket is empty");
            }
        } else { // Считаем сумму покупки и переводим в валюту
            $('.purchase button').removeClass("empty_cart");
            var totalSumCurrency = $('.purchase_total span i').attr('data-count') / currency;
            str = '' + totalSumCurrency;
            // results = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") / 2;
            results = str.replace(/ /g, '');
            postResults = parseInt(results);
            if ($('html').attr('lang') == "tr") $('.game_shop .purchase button span').html("Öde $" + postResults);
            else $('.game_shop .purchase button span').html("Pay $" + postResults);
            setTimeout(function () {
                var mainSum = $('.purchase_total span i').attr('data-count');
                var sumPull = parseInt(String(mainSum).replace(/ /g, ''));
                // $('input[name="sum"]').val((sumPull / currency)/2);
                $('input[name="sum"]').val(sumPull / currency);
                calculationTotalButton();
            }, 600);
        }
    }

    $(document).on("click", ".selectable:not('.selected')", function () {
        $(this).parents('.vipstatuses').find('li.selected').toggleClass('selected');
        $(this).toggleClass('selected');
        var gettingSum = $(this).find('span i').html();
        var itemSum = parseInt(String(gettingSum).replace(/ /g, ''));
        var currentCartSum = parseInt($('.purchase_total i').attr('data-count'));
        var newCartSum = itemSum + currentCartSum;
        $('.purchase_total i').attr('data-count', newCartSum);
        $('.purchase_total i').each(function () {
            var $this = $(this),
                countTo = $this.attr('data-count');
            $('.purchase_total i').countimator({
                value: countTo
            });
            calculationTotalButton();
        });
        recalculation();
        setTimeout(function () {
            var mainSum = $('.purchase_total span i').attr('data-count');
            var sumPull = parseInt(String(mainSum).replace(/ /g, ''));
            $('input[name="sum"]').val(sumPull / currency);
            calculationTotalButton();
        }, 600);
    });
    $(document).on("click", ".shop_panel li.selected", function () {
        $(this).toggleClass('selected');
        recalculation();
    });

    calculationTotalButton();
    $('.shop_panel').click(function () {
        calculationTotalButton();
    });

    //
    function recalculation() {
        var totalRecalculatedSum = 0;
        // var gamecoinsAmount = $("input[name='gamecoins']").val() * 2;
        var gamecoinsAmount = $("input[name='gamecoins']").val();
        if (gamecoinsAmount == 0) {
            gamecoinsAmount = 0;
        } else {
            gamecoinsAmount = parseInt(String(gamecoinsAmount).replace(/ /g, ''));
        }
        $('.shop_panel .selected').each(function () {
            var gettingAmount = $(this).find('span i').html();
            var geetingIntAmount = parseInt(String(gettingAmount).replace(/ /g, ''));
            totalRecalculatedSum += geetingIntAmount;
        });
        $('.purchase_total i').attr('data-count', totalRecalculatedSum + gamecoinsAmount);
        $('.purchase_total i').each(function () {
            var $this = $(this),
                countTo = $this.attr('data-count');
            $('.purchase_total i').countimator({
                value: countTo
            });
            calculationTotalButton();
        });
    }

    //
    $('.gamecoins').click(function () {
        $(this).addClass('focused');
        $('.gamecoins_row input').focus();
        $('.coins_switcher_unit_usd').bind("change keyup input click", function () {
            this.value = this.value.replace(/[^\d]/g, "");
            calculationTotalButton();
            recalculation();
            if (this.value > 0) {
                $('.coins_switcher_unit').addClass('edited');
            } else {
                $('.coins_switcher_unit').removeClass('edited');
            }
        });
    });
    $(document).mouseup(function (e) {
        var div = $("div.gamecoins_block");
        if (!div.is(e.target) &&
            div.has(e.target).length === 0) {
            div.removeClass('focused')
            calculationTotalButton();
            recalculation();
        }
        setTimeout(function () {
            calculationTotalButton();
            recalculation();
        }, 500);
    });

    // $('.step:last-of-type .step_description a').click(function(event) {
    //     event.preventDefault();
    //     $(this).html('kopyalandı');
    //     let str = $(this).data('copy');
    //     setTimeout(() => {
    //         $(this).html('kopyala');
    //     }, 1500);
    //     var area = document.createElement('textarea');

    //     document.body.appendChild(area);
    //     area.value = str;
    //     area.select();
    //     document.execCommand("copy");
    //     document.body.removeChild(area);
    // });
    //
    $('.panel header .settings').click(function () {
        $('.window.settings_window').addClass('opened');
        $('body').addClass('windowed');
    });
    $('.session_title a').click(function () {
        $('.window.settings_window').addClass('opened');
        $('body').addClass('windowed');
        $('body').addClass('recovery');
    })
    $('.window_close_button').click(function () {
        $(this).closest('.window').removeClass('opened');
        $('body').removeClass('windowed');
        $('body').removeClass('recovery');
    });
    //
    $('.panel_history_top').click(function () {
        $(this).closest('.panel_history').toggleClass('opened');
    });

    // slider panel
    $('.heroes_controller_next').click(function () {
        var currentSlide = $('.heroes_slider_slide.current');
        if (currentSlide.next('.heroes_slider_slide').length > 0) {
            currentSlide.next('.heroes_slider_slide').addClass('current');
            currentSlide.removeClass('current');
        } else {
            currentSlide.parent('.heroes_slider').find('.heroes_slider_slide:first-of-type').addClass('current');
            currentSlide.removeClass('current');
        }
    });
    $('.heroes_controller_prev').click(function () {
        var currentSlide = $('.heroes_slider_slide.current');
        if (currentSlide.prev('.heroes_slider_slide').length > 0) {
            currentSlide.prev('.heroes_slider_slide').addClass('current');
            currentSlide.removeClass('current');
        } else {
            currentSlide.parent('.heroes_slider').find('.heroes_slider_slide:last-of-type').addClass('current');
            currentSlide.removeClass('current');
        }
    });

    //
    $('form').submit(function (event) {
        event.preventDefault();
        var form = event.target;
        let div = $(form).find(`div.is-invalid`);
        div.removeClass('is-invalid');
        div.find('input').removeClass('is-invalid');
        div.find('div.error-message').remove();

        $.ajax({
            type: $(form).attr('method'),
            url: $(form).attr('action'),
            data: new FormData(form),
            contentType: false,
            cache: false,
            processData: false,
            success: function (result) {
                let profile_link
                if ($('html').attr('lang') == 'en') {
                    profile_link = "/profile"
                } else {
                    profile_link = $('html').attr('lang') + "/profile"
                }
                json = jQuery.parseJSON(result);
                if (json.success) {
                    if ($(form).hasClass('login')) {
                        $('.userpanel').html(`
                    <a href=${profile_link} class="login logined">
                    <img src="images/userpic_02.png" alt="${Object.values(json.callback)}">
                    ${Object.values(json.callback)}
                </a>
                    `);
                        $('body').removeClass('session_started');
                        $('.cover').remove();
                    } else {
                        if ($('html').attr('lang') == "tr") swal({
                            title: "başarı",
                            text: json.success,
                            icon: "success",
                            button: "Kapat"
                        });
                        else swal({
                            title: "Success",
                            text: json.success,
                            icon: "success",
                            button: "Close"
                        });
                        // alert(json);
                    }
                } else if (json.error) {
                    if (json.callback) {
                        let data = Object.values(json.callback);
                        let tags = Object.keys(json.callback);
                        console.log(data[0]);
                        console.log(tags);
                        for (let i = 0; i < data.length; i++) {
                            let div = $(form).find(`div.${tags[i]}`);
                            div.addClass('is-invalid');
                            div.find('input').addClass('is-invalid');
                            div.append(`<div class="error-message" data-validation-error-message="${tags[i]}">${data[i]}</div>`)
                        }
                    } else {
                        if ($('html').attr('lang') == "tr") swal({
                            title: "Hata",
                            text: json.error,
                            icon: "error",
                            button: "Kapat"
                        });
                        else swal({
                            title: "",
                            text: json.error,
                            icon: "error",
                            button: "Close"
                        });
                    }
                }
                if (json.url) document.location.href = json.url;
            },
            error: function (result) {
                console.log(result.responseJSON.error)
                if (result.responseJSON.error) {
                    if ($('html').attr('lang') == "tr") swal({
                        title: "Hata",
                        text: result.responseJSON.error,
                        icon: "error",
                        button: "Kapat"
                    });
                    else swal({
                        title: "",
                        text: result.responseJSON.error,
                        icon: "error",
                        button: "Close"
                    });
                }
            }
        });
    });
    //
    $("body").css("display", "none");
    $("body").fadeIn(500);
    $("a.linkout").click(function (event) {
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(500);
        setTimeout(function () {
            redirectPage();
        }, 500);
    });

    function redirectPage() {
        window.location = linkLocation;
    }

    //
    $('a.login:not(.logined)').click(function () {
        $('body').addClass('session_started');
        $('.page').append('<div class="cover"></div>');
    });
    $(document).on("click", ".session_close", function () {
        $('body').removeClass('session_started');
        $('.cover').remove();
    });

    //
    function changeTitle() {
        var currentWindowWidth = $(window).width();
        if (currentWindowWidth <= 600) {
            if ($('html').attr('lang') == "tr") {
                $('.news_row > h3').html('Haberleri');
            } else {
                $('.news_row > h3').html('news');
            }
        } else {
            if ($('html').attr('lang') == "tr") {
                $('.news_row > h3').html('Project News');
            } else {
                $('.news_row > h3').html('Server News');
            }
        }
    }

    //
    function mobileMenu() {
        var currentWindowWidth = $(window).width();
        if (currentWindowWidth <= 1000) {
            $('header nav ul li:first').addClass('hamburger');
        } else {
            $('header nav ul li:first').removeClass('hamburger');
        }
    }

    mobileMenu();
    //
    $(window).resize(function () {
        var currentWidth = $('header .container').offset().left;
        $('.loader i').css({
            "left": "auto",
            "right": currentWidth
        });
        var currentWindowWidth = $(window).width();
        changeTitle();
        mobileMenu();
        if (currentWindowWidth <= 1000) {
            $('header > .container .header_top_box .discord_promo').detach().prependTo('.main_page_header_row');
        } else {
            $('.main_page_header_row .discord_promo').detach().appendTo('header > .container .header_top_box');
        }
    });
    changeTitle();

    //


    //
    $(document).on("click", ".hamburger", function () {
        $('.navigation_window').addClass('opened');
    });
    //
    $(document).on("click", ".navigation_window_close", function () {
        $('.navigation_window').removeClass('opened');
    });

    //
    $('.news_container_unit > a').each(function (i, elem) {
        var size = 40,
            newsContent = $(this).find('h3'),
            newsText = newsContent.text();

        if (newsText.length > size) {
            newsContent.text(newsText.slice(0, size) + ' ...');
        }
    });

    //
    setTimeout(() => {
        scroller.update();
    }, 1000);

    //
    setTimeout(function () {
        $('.inner_page_loader').addClass('pooled');
    }, 2000);

    //
    $(document).on("click", ".videotoggle", function () {
        let videoEmbed = $(this).attr('data-video-embed');
        $('body').append(
            `  <div class="videoplayer">
            <div class="videoplayer_close"></div>
            <iframe allowfullscreen="" frameborder="0" height="600" src="`
            + videoEmbed +
            `" width="1000"></iframe>
          </div>
          <!-- /.videoplayer -->
        `
        );
        $('body').toggleClass('windowed');
        $('body').toggleClass('playered');
        $('.videoplayer').toggleClass('opened');
    });
    $(document).on("click", ".videoplayer_close", function () {
        $(this).parent('.videoplayer').remove();
        $('body').toggleClass('windowed');
        $('body').toggleClass('playered');
        $('.videoplayer').toggleClass('opened');
    });

    $('.promo_window_close').click(function () {
        $('.promo_window').removeClass('opened');
        setTimeout(function () {
            $('body').removeClass('windowed_animated');
        }, 300);
        setTimeout(function () {
            $('body').removeClass('promo_windowed');
        }, 500);
        windowChecker = 0;
    });
    $('.promo_window_trigger').click(function () {
        $('body').addClass('promo_windowed');
        setTimeout(function () {
            $('body').addClass('windowed_animated');
        }, 100);
        setTimeout(function () {
            $('.promo_window').addClass('opened');
        }, 500);
        windowChecker = 1;
    });
    $('.copy-toggler').click(function () {
        var thisContext = $(this);
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(this).parent('.copy-block').find('.copy-trigger').text()).select();
        document.execCommand("copy");
        $temp.remove();
        $(this).addClass('copy_copied');
        setTimeout(function () {
            thisContext.removeClass('copy_copied');
        }, 100);
    });
    $(document).mouseup(function (e) {
        if (windowChecker === 1) {
            var div = $("div.promo_window");
            if (!div.is(e.target) &&
                div.has(e.target).length === 0) {
                div.removeClass('opened')
                setTimeout(function () {
                    $('body').removeClass('windowed_animated');
                }, 300);
                setTimeout(function () {
                    $('body').removeClass('promo_windowed');
                }, 500);
            }
            windowChecker = 0;
        }
    });

    let launcherChecker = 0;
    $('.promo_user_select').click(function () {
        if (launcherChecker === 0) {
            $(this).addClass('active');
            launcherChecker = 1;
            $('.promo_window_button').removeClass('launcher_button');
            if ($('html').attr('lang') == "tr") {
                $(".promo_window_button").attr("href", "fivelive://server=turk");
                $('.promo_window_button').text('Bonus Alın');
            } else {
                $(".promo_window_button").attr("href", "fivelive://server=english");
                $('.promo_window_button').text('Get Bonus');
            }

            $('.promo_window_button').addClass('bonus_button');
            $('.promo_window_button').addClass('changing');
            setTimeout(function () {
                $('.promo_window_button').removeClass('changing');
            }, 300);
        } else {
            $(this).removeClass('active');
            $('.promo_window_button').removeClass('bonus_button');
            if ($('html').attr('lang') == "tr") {
                $(".promo_window_button").attr("href", "/download_launcher?v=tr");
            } else {
                $(".promo_window_button").attr("href", "/download_launcher?v=eng");
            }
            if ($('html').attr('lang') == "tr") {
                $('.promo_window_button').text('Başlatıcıyı indir');
            } else {
                $('.promo_window_button').text('Download launcher');
            }
            $('.promo_window_button').addClass('launcher_button');
            $('.promo_window_button').addClass('changing');
            setTimeout(function () {
                $('.promo_window_button').removeClass('changing');
            }, 300);
            launcherChecker = 0;
        }
    });
    $('.language > span').click(function () {
        $(this).parent('.language').toggleClass('opened');
    });

    //
    let crs
    if (document.getElementById('currency-exchange') !== null) {
        crs = document.getElementById('currency-exchange').innerText;
    }
    $('.coins_switcher_unit:first-of-type').click(function () {
        $(this).find('input').focus();
    });
    $('.coins_switcher_unit input').on('input', function () {
        $(this).parent('.coins_switcher_unit').find('.coins_buffer').text($(this).val());
        $(this).width($(this).parent('.coins_switcher_unit').find('.coins_buffer').width());
    });
    $('.coins_switcher_unit_usd').on('input', function () {
        $('.coins_switcher_unit_flc').val($(this).val() * crs);
        $('.coins_switcher_unit_flc').parent('.coins_switcher_unit').find('.coins_buffer').html($(this).val() * crs);
        $('.coins_switcher_unit_flc').width($('.coins_switcher_unit_flc').parent('.coins_switcher_unit').find('.coins_buffer').width());
    });
    document.addEventListener("wheel", function (event) {
        if (document.activeElement.type === "number") {
            document.activeElement.blur();
        }
    });

    //
    let liftoffTime = new Date(2022, 2, 26, 00, 00);
    let liftoffTimeTip = 'Days';
    $('.server_description_countdown').countdown({
        until: liftoffTime, timezone: +3, layout:
            '<span>' +
            '{d10}{d1} ' + liftoffTimeTip + ' {h10}{h1}:{m10}{m1}:{s10}{s1}' +
            '</span>'
    });
});
