$(document).ready(function () {
    //dev
    //
    // $('.content_body').hide()
    // $('.content_body_third').show()
    axios.defaults.headers.post['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content')
    console.log($('.input_login .custom_input_login').val())

    if ($('.input_login .custom_input_login').val() == null) {
        console.log("NULL")
    }


    let changeLang = $('.header_additional--shop .language')
    changeLang.click(function (){
        changeLang.toggleClass('opened')
    })

    if (promo){
        console.log('PROMO')
        $('#main-title').hide()
        $('#kinguin-title').show()

        $('.content_body').hide()
        $('.content_kinguin').show()

        $('.page_number').hide()

        $('.content_kinguin .custom_btn_next.btn_apply_code').click(function (){
            console.log('click-promo')
            let username = $('.custom_input_login').val()
            let promoCode = $('.custom_input_promo_code').val()

            console.log(username)
            console.log(promoCode)
            axios.post("/request/donate_new",{
                server : 1,
                account: username,
                code: promoCode
            })
                .then((response)=>{
                    if (response.data.error != undefined){
                        swal({
                            title: "oke",
                            text: response.data.error,
                            icon: "error",
                            button: "Close"
                        });
                    } else {
                        swal({
                            title: "Success",
                            text: response.data.success,
                            icon: "success",
                            button: "Close"
                        });
                    }
                })

                
                })
        })


    }

    let backBtn = $('.page_turning')
    backBtn.click(function () {
        let stage = parseInt($('.page_number').text().split('/')[0])
        switch (stage) {
            case 1:
                window.location.href = '/'
                break
            case 2:
                $('.content_body_second').hide()
                $('.content_body_third').hide()
                $('.content_body_fourth').hide()
                $('.page_number').text("1/3")
                $('.content_body').show()
                break
            case 3:
                $('.content_body_third').hide()
                $('.content_body_fourth').hide()
                $('.page_number').text("2/3")
                $('.content_body_second').show()
        }
    })

    // $.ajaxSetup({
    //     headers: {
    //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //     }
    // });
    let username
    $('.content_body .custom_btn_next').click(function () {
        username = $('.content_body .custom_input_login').val()
        if (!$('.content_body #checkbox-rect1').prop('checked')) {
            swal({
                title: "oke",
                text: "You have not accepted the agreement",
                icon: "error",
                button: "Close"
            });
            return
        }
        axios.get('/request/check_username?username=' + username)
            .then((response) => {
                $('.content_body').hide()
                $('.content_body_second').show()
                $('.page_number').text("2/3")
            })
            .catch((reject) => {
                swal({
                    title: "oke",
                    text: "Invalid username",
                    icon: "error",
                    button: "Close"
                });
            })
    })

    $('.content_body_second .custom_btn_next').click(function () {

        if (!$('.content_body_second input[name="radio_card"]:checked').prop('checked')) {
            swal({
                title: "oke",
                text: "Choose a payment method",
                icon: "error",
                button: "Close"
            });
            return
        }

        if ($('.content_body_second input[name="radio_card"]:checked').val() == 1) {
            $('.content_body_second').hide()
            $('.content_body_third').show()
            $('.page_number').text("3/3")
        } else {
            $('.content_body_second').hide()
            $('.content_body_fourth').show()
            $('.page_number').text("3/3")
        }
    })

    let usdInput = $('.currency_transfer_body .input_left')
    let flcInput = $('.currency_transfer_body .input_right')
    usdInput.bind('change keyup input click', function () {
        let extraSum = 0
        for (let usd in bonuses) {
            $('.currency_transfer_footer #'+usd+"_id").prop("checked", false);
            if (parseInt(usdInput.val()) >= parseInt(usd)) {
                extraSum = bonuses[usd]
                $('.currency_transfer_footer #'+usd+"_id").prop("checked", true);

            }
        }

        console.log("+"+extraSum)
        flcInput.val(usdInput.val() * currency * multiplier + extraSum)
    })

    let thirdBtn = $('.content_body_third .custom_btn_next').click(function () {
        let params = {
            username: username,
            server: 1,
            price: usdInput.val()
        }
        axios.get("/request/paypalych_create/", {params})
            .then((response) => {
                console.log(response.data.url)
                window.location.href = response.data.url
            })
            .catch((reject) => {
                swal({
                    title: "oke",
                    text: "Something went wrong",
                    icon: "error",
                    button: "Close"
                });
            })
    })

    $('.content_body_fourth .custom_btn_next').click(function () {
        if (!$('.content_body_fourth input[name="radio_btn"]:checked').prop('checked')) {
            swal({
                title: "oke",
                text: "Select the amount",
                icon: "error",
                button: "Close"
            });
            return
        }

        window.location.href = $('.content_body_fourth input[name="radio_btn"]:checked').val()

    })

})


