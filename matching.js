var tracker = {}
var cards = ["Image/A.jpg", "Image/A(1).jpg", "Image/2.jpg", "Image/2(1).png", "Image/K.png", "Image/K(1).jpg"];
var left = 6;
var flipped1;
var flipped2;
var flippedTotal = 0;

function flipCard(id) {
    if(document.getElementById(id).src.indexOf("Image/backdesign.jpg") != -1){
        if(flipped1 != null && flipped2 != null) {
            return;
        }
        if(tracker[id] == null) {
            var cardChosen = chooseCard();
            document.getElementById(id).src=cardChosen;
            tracker[id] = cardChosen;
            tracker[cardChosen] = id;
        } else {
            document.getElementById(id).src=tracker[id];
        }
        var message = checkForPairs(id);
            if(flipped1 != null && flipped2 != null) {
                setTimeout(function() {
                    if(message != "match") {
                        document.getElementById(tracker[flipped1]).src = "Image/backdesign.jpg";
                        document.getElementById(tracker[flipped2]).src = "Image/backdesign.jpg";
                    } else {
                        flippedTotal += 2;
                    }
                    flipped1 = null;
                    flipped2 = null;
                }, 700)

            }

        console.log(flipped1);
        console.log(flipped2);
    }
}

window.onload = function() {
    timer();
}

var min = 0;
var sec = -1;
function timer() {
    if(flippedTotal == 6) {
        document.getElementById("stopwatch").innerHTML = min + ":" + sec + "  Nice";
        return;
    }
    min = parseInt(min);
    sec = parseInt(sec);

    sec += 1;

    if(sec == 60) {
        min += 1;
        sec = 0;
    }

    if(sec < 10) {
        sec = "0" + sec;
    }
    if(min < 10) {
        min = "0" + min;
    }

    document.getElementById("stopwatch").innerHTML = min + ":" + sec;
    setTimeout("timer()", 1000);

}

function chooseCard() {
    if(left >= 0) {
        var num = Math.floor(Math.random()*left);
        var ans = cards[num];
        cards.splice(num, 1);
        left -= 1;
        console.log(cards);
        return ans;
    }
}

function checkForPairs(id) {
    if(flipped1 == null){
        flipped1 = tracker[id];
        flipped1id = id;
    } else if(flipped2 == null) {
        flipped2 = tracker[id];
        flipped2id = id;
        if((flipped1.indexOf("A") != -1 && flipped2.indexOf("A") != -1) || (flipped1.indexOf("K") != -1 && flipped2.indexOf("K") != -1) || (flipped1.indexOf("2") != -1 && flipped2.indexOf("2") != -1)) {
            return "match";
        }
    }
}

function restart() {
    document.location.reload();
}

//timer
//only 2 at a time
//if same, remain revealed
//cannot click same card multiple times
//flipped card must remain same