function randomnumber() {
    var randNumber1 = Math.floor(Math.random() * 6) + 1;
    // switch (randNumber1) {
    //     case 1:
    //         return "./Images/dice1.png";
    //     case 2:
    //         return "./Images/dice2.png";
    //     case 3:
    //         return "./Images/dice3.png";
    //     case 4:
    //         return "./Images/dice4.png";
    //     case 5:
    //         return "./Images/dice5.png";
    //     case 6:
    //         return "./Images/dice6.png";
    // }
    return randNumber1;
}

var ran = randomnumber();
var randImage = "./Images/dice" + ran + ".png";

var ran2 = randomnumber();
var randImage2 = "./Images/dice" + ran2 + ".png";

document.querySelectorAll("img")[0].setAttribute("src", randImage);
document.querySelectorAll("img")[1].setAttribute("src", randImage2);

function changeh1() {
    if (ran > ran2) {
        return "🚩Player1 wins.";
    } else if (ran2 > ran) {
        return "Player2 wins.🚩";
    } else {
        return "🚩Draw!🚩";
    }
}

document.querySelector("h2").innerHTML = changeh1();