$(window).load(function () {
    $("#preloader").fadeOut("slow");
});

$(document).ready(function () {

    var gamecounter = 0
    var gamesins = []

    // BELOW IS A COPY-PASTED sha256 FROM STACKOVERFLOW; TRUSTWORTHY ENOUGH FOR OUR PURPOSES BECAUSE WE AREN'T USING IT FOR SECURE STUFF BUT ONLY TO PREVENT CHEATING

    function sha256(ascii) {
    function rightRotate(value, amount) {
        return (value>>>amount) | (value<<(32 - amount));
    };
    
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length'
    var i, j; // Used as a counter across the whole file
    var result = ''

    var words = [];
    var asciiBitLength = ascii[lengthProperty]*8;
    
    //* caching results is optional - remove/add slash from front of this line to toggle
    // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
    // (we actually calculate the first 64, but extra values are just ignored)
    var hash = sha256.h = sha256.h || [];
    // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
    var k = sha256.k = sha256.k || [];
    var primeCounter = k[lengthProperty];
    /*/ 
    var hash = [], k = [];
    var primeCounter = 0;
    //*/

    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
            k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
        }
    }
    
    ascii += '\x80' // Append Ƈ' bit (plus zero padding)
    while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j>>8) return; // ASCII check: only accept characters in range 0-255
        words[i>>2] |= j << ((3 - i)%4)*8;
    }
    words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
    words[words[lengthProperty]] = (asciiBitLength)
    
    // process each chunk
    for (j = 0; j < words[lengthProperty];) {
        var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
        var oldHash = hash;
        // This is now the undefinedworking hash", often labelled as variables a...g
        // (we have to truncate as well, otherwise extra entries at the end accumulate
        hash = hash.slice(0, 8);
        
        for (i = 0; i < 64; i++) {
            var i2 = i + j;
            // Expand the message into 64 words
            // Used below if 
            var w15 = w[i - 15], w2 = w[i - 2];

            // Iterate
            var a = hash[0], e = hash[4];
            var temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                + ((e&hash[5])^((~e)&hash[6])) // ch
                + k[i]
                // Expand the message schedule if needed
                + (w[i] = (i < 16) ? w[i] : (
                        w[i - 16]
                        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                        + w[i - 7]
                        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                    )|0
                );
            // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
            var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
            
            hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
            hash[4] = (hash[4] + temp1)|0;
        }
        
        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i])|0;
        }
    }
    
    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            var b = (hash[i]>>(j*8))&255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
};

    new WOW().init();

    $('#top-nav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 0
    });

    function setCookie(name,value,days) {
    value = JSON.stringify(JSON.stringify(value))
    console.log(value)
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0){
                return JSON.parse(JSON.parse(c.substring(nameEQ.length,c.length)));
            }
        }
        return null;
    }

    function eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    console.log(window.location.pathname)

    if(window.location.pathname.includes("secretmayballdayofgame")){
        const params = new Proxy(new URLSearchParams(window.location.search), {
              get: (searchParams, prop) => searchParams.get(prop),
            }); 
            // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
            let value = "working"
            try{
                console.log(params.found.replace(/[^0-9a-z\s]/gi, ''))
                console.log(params.found.replace(/[^0-9a-zA-Z\s]/gi, ''))
                value = params.found.replace(/[^0-9a-zA-Z\s]/gi, '') // "some_value"
            }
            catch{
                value = null;
            }

            console.log(value)

            if (value != null){

                if(getCookie("found") == null){
                    setCookie("found", [], 2)// TODO: Make this set the cookie expiry to the end of the ball
                }

                console.log(getCookie("found"))

                var verify = [...new Set(getCookie("found").concat(value))]

                console.log(verify)

                var checkones = ["ea7d8540e2b032d6301ca81039b4ea1d53662fb5a716660726a3c5df53ed6c3b","c39fae21a60ce64f7523f5347df35f83fa9765d81ac682e147d5637b80d89ab3", "0dd5bef605722d8489e996f256930db8bdc1c44f227203fdd6c56451d5cbd406", "03951f45e70010aa8bec558c0c8becc99be271fa2ecac86cbadee9bf20184cd7", "644d1c468f75d6a86e2f8d7f84166585b2ee596f01cea515ed66c0277b66a27f", "3a96b8af1e808ba3f617ab51f828ed7de2567c7e10c11878f74e79a66cb314d2", "8b2f61411d14489329807ac87773b4a8e67e8ae8af8110d89ece21d6e33f0698"]

                var checkones = ["ea7d8540e2b032d6301ca81039b4ea1d53662fb5a716660726a3c5df53ed6c3b","c39fae21a60ce64f7523f5347df35f83fa9765d81ac682e147d5637b80d89ab3", "0dd5bef605722d8489e996f256930db8bdc1c44f227203fdd6c56451d5cbd406", "03951f45e70010aa8bec558c0c8becc99be271fa2ecac86cbadee9bf20184cd7", "644d1c468f75d6a86e2f8d7f84166585b2ee596f01cea515ed66c0277b66a27f", "3a96b8af1e808ba3f617ab51f828ed7de2567c7e10c11878f74e79a66cb314d2", "8b2f61411d14489329807ac87773b4a8e67e8ae8af8110d89ece21d6e33f0698", "823a3180dad3c9c3c4dea43ab2baf9f04bac9c3a7711745ff5f702551496d735"]

                var codes = ["020020Superbia at SPACE the Plodge", "win"] //TODO: Remove, this is for testing only

                var posses = [[-0.8,1.25],[-0.6,2.4],[-1,2.2],[-1.5,1],[40.1,2.6],[-0.7,1.2],[-0.6,1.3]]
                var posses2 = [[0,0],[38.7,-55],[39.2,-54.5],[-3.1,-1.3],[36.9,-0.5],[-0.7,1.2],[-0.6,1.3]]

                // TODO: Remove this

                var newones = []

                for (i = 0; i < verify.length; i++) {
                    var checksum = sha256(verify[i])
                    if(checkones.includes(checksum)) {
                        gamecounter += 1;
                        newones.push(verify[i]);
                        gamesins.push(checkones.indexOf(checksum));

                        if (checkones.indexOf(checksum) == 7){ // TODO: Remove, this is for testing only
                            gamesins = [0,1,2,3,4,5,6,7];
                            break;
                        }


                    }
                }

                for (j = 0; j < gamecounter; j++){
                    var i = gamesins[j]
                    console.log("IN!" + i)
                    var totstring = newones[j]
                    console.log(totstring.substring(0,3))
                    var xcoord = posses[j][0]
                    console.log("xcoord = " + xcoord)
                    var ycoord = posses[j][1]
                    console.log(totstring.substring(3,6))
                    var string = totstring.substring(6,totstring.length)
                    document.querySelector(".i-"+i).style.marginTop = ycoord+"vw"
                    document.querySelector(".i-"+i).style.marginLeft = xcoord+"vw"
                    var xcoord = posses2[j][0]
                    console.log("xcoord = " + xcoord)
                    var ycoord = posses2[j][1]
                    console.log(totstring.substring(3,6))
                    var string = totstring.substring(6,totstring.length)
                    try{
                        document.querySelector(".i2-"+i).style.marginTop = ycoord+"vw"
                        document.querySelector(".i2-"+i).style.marginLeft = xcoord+"vw"
                    }
                    catch{}
                    console.log(ycoord+"%")
                    console.log(xcoord+"%")
                    console.log(document.querySelector(".s-"+i).style.margintop)
                    console.log(document.querySelector(".s-"+i).style.marginleft)
                    //document.querySelectorAll(".p-"+i)[1].innerHTML = string.replace('SPACE', '<br/>')
                }

                setCookie("found", newones, 2)

                console.log(gamecounter)

                console.log(gamesins)

                console.log(newones)

                if (gamesins.length == 7){
                    gamesins.push(7)
                }

                console.log("Thingy " + gamesins)

                var killed = 0
                for(i = 0; i <= 7; i++){
                    if (gamesins.includes(i)){
                    $(".s-" + i.toString()).css("display", "block")
                    $(".p-" + i.toString()).css("display", "block")
                    $(".i-" + i.toString()).css("display", "block")
                    $(".i2-" + i.toString()).css("display", "block")
                    if (killed == 0){
                        $(".s-" + i.toString()).css("margin-top", "-20vw")
                        $(".p-" + i.toString()).css("margin-top", "20vw")
                        //$(".i-" + i.toString()).css("margin-top", "20vw")
                    }
                    killed = 1
                    }
                    else{
                        document.querySelector(".s-" + i.toString()).innerHTML = ""
                    }
                }

            }
            else{
                window.location.assign("https://caiusball.com")
            }

        }

    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll > 20) {
        //console.log('a');
        $(".navigation").addClass("animated");
        $(".navbar-brand").addClass("animated");
        $(".navbar-brand").css("display","none");
    } else {
        //console.log('a');
        $(".navigation").removeClass("animated");
        $(".navbar-brand").removeClass("animated");
        $(".navbar-brand").css("display","block");
    }

    //animated header class
    $(window).scroll(function () {
        var scroll = $(this).scrollTop();
        //console.log(scroll);
        if (scroll > 20) {
            //console.log('a');
            $(".navigation").addClass("animated");
            $(".navbar-brand").addClass("animated");
            $(".navbar-brand").css("display","none");
        } else {
            //console.log('a');
            $(".navigation").removeClass("animated");
            $(".navbar-brand").removeClass("animated");
            $(".navbar-brand").css("display","block");
        }   
    });

    $('.hmbgrbtn').click(function(){
        var scroll = $(window).scrollTop();
        if ($('.menu-list').css('display') == 'none'){
            if (scroll < 20) {
            //console.log('a');
            $(".navbar-brand").addClass("animated");
            }
            $('.menu-list').css('display', 'block');

        }
        else if ($('.menu-list').css('display') == 'block'){
                        if (scroll < 20) {
            //console.log('a');
            $(".navbar-brand").removeClass("animated");
            }
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
            $(".digit").css("font-size","40px");
            $(".dash_title").css("font-size","3vw");
            $(".dash_move_3").css("left","-10px");
            $(".dash_move_2").css("left","-20px");
            $(".dash_move_1").css("left","-25px");
            $(".pushdown").css("min-height","325px");
            $(".ticketbox").css("min-height","750px");
            $(".headticket").css("font-size","15pt");
            $(".small").css("font-size","15pt");
            $(".small2").css("font-size","60pt");
            $(".decenter").css("margin","auto");
            $(".decenter").css("width","100%");
            $(".one").css("display","none");
            $(".two").css("display","block");
            $(".display2").css("display","block");
            $(".topbot").css("width","90%");
            $(".topbot2").css("margin-left", "5%");
            $(".topbot2").css("margin-top","10px");

        } else {
            $(".normal-nav").css("display","block");
            $(".mobile-nav").css("display","none");
            $(".countdownWidget").css("width","60vw");
            $(".digit").css("font-size","4vw");
            $(".dash_title").css("font-size","3vw");
            $(".dash_move_3").css("left","0");
            $(".dash_move_2").css("left","0px");
            $(".dash_move_1").css("left","-20px");
            $(".pushdown").css("min-height","200px");
            $(".ticketbox").css("min-height","325px");
            $(".headticket").css("font-size","20pt");
            $(".ticketbox").css("min-height","200px");
            $(".headticket").css("font-size","25pt");
            $(".small").css("font-size","30pt");
            $(".small2").css("font-size","100pt");
            $(".decenter").css("margin","auto");
            $(".decenter").css("width","100%");
            $(".one").css("display","inline-block");
            $(".two").css("display","none");
            $(".display2").css("display","table-cell");
            $(".topbot").css("width","42%");
            $(".topbot2").css("margin-left","0");
            $(".topbot2").css("margin-top","0");
        }
        if (scroll > 1980) {
            //console.log('a');
            $(".digit").css("font-size", "70px");
            $(".dash_title").css("font-size", "58px");
        }

    $(window).resize(function () {
        var scroll = document.body.clientWidth;
        //console.log(scroll);
        if (scroll < 990) {
            //console.log('a');
            $(".normal-nav").css("display","none");
            $(".mobile-nav").css("display","block");
            $(".countdownWidget").css("width","80vw");
            $(".digit").css("font-size","40px");
            $(".dash_title").css("font-size","3vw");
            $(".dash_move_3").css("left","-10px");
            $(".dash_move_2").css("left","-20px");
            $(".dash_move_1").css("left","-25px");
            $(".pushdown").css("min-height","325px");
            $(".ticketbox").css("min-height","325px");
            $(".headticket").css("font-size","20pt");
            $(".ticketbox").css("min-height","750px");
            $(".headticket").css("font-size","15pt");
            $(".small").css("font-size","15pt");
            $(".small2").css("font-size","60pt");
            $(".decenter").css("margin","auto");
            $(".decenter").css("width","100%");
            $(".one").css("display","none");
            $(".two").css("display","block");
            $(".display2").css("display","block");
            $(".topbot").css("width","90%");
            $(".topbot2").css("margin-left", "5%");
            $(".topbot2").css("margin-top","10px");
        } else {
            $(".normal-nav").css("display","block");
            $(".mobile-nav").css("display","none");
            $(".countdownWidget").css("width","60vw");
            $(".digit").css("font-size","4vw");
            $(".dash_title").css("font-size","3vw");
            $(".dash_move_3").css("left","0");
            $(".dash_move_2").css("left","0px");
            $(".dash_move_1").css("left","-20px");
            $(".pushdown").css("min-height","200px");
            $(".ticketbox").css("min-height","325px");
            $(".headticket").css("font-size","20pt");
            $(".ticketbox").css("min-height","200px");
            $(".headticket").css("font-size","25pt");
            $(".small").css("font-size","30pt");
            $(".small2").css("font-size","100pt");
            $(".decenter").css("margin","auto");
            $(".decenter").css("width","100%");
            $(".one").css("display","inline-block");
            $(".two").css("display","none");
            $(".display2").css("display","table-cell");
            $(".topbot").css("width","42%");
            $(".topbot2").css("margin-left","0");
            $(".topbot2").css("margin-top","0");
        }
        if (scroll > 1980) {
            //console.log('a');
            $(".digit").css("font-size", "70px");
            $(".dash_title").css("font-size", "58px");
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