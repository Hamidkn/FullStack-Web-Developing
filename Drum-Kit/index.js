// for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
//     document.querySelectorAll(".drum")[i].addEventListener("click", clickevent);

//     function clickevent() {
//         alert("clicked!");
//     }

// };
var i = 0;
while (i < document.querySelectorAll(".drum").length) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        clickAndKeyboard(this.innerHTML);
        buttonAnimation(this.innerHTML);
    });


    // function clickevent() {
    //     // this.style.color = "white";
    //     // this.textContent
    //     switch (this.innerText) {
    //         case "w":
    //             var crash = new Audio("sounds/crash.mp3");
    //             crash.play();
    //             break;
    //         case "a":
    //             var kik = new Audio("sounds/kik.mp3");
    //             kik.play();
    //             break;
    //         case "s":
    //             var snare = new Audio("sounds/snare.mp3");
    //             snare.play();
    //             break;
    //         case "d":
    //             var tom1 = new Audio("sounds/tom-1.mp3");
    //             tom1.play();
    //             break;
    //         case "j":
    //             var tom2 = new Audio("sounds/tom-2.mp3");
    //             tom2.play();
    //             break;
    //         case "k":
    //             var tom3 = new Audio("sounds/tom-3.mp3");
    //             tom3.play();
    //             break;
    //         case "l":
    //             var tom4 = new Audio("sounds/tom-4.mp3");
    //             tom4.play();
    //             break;
    //     };
    // }
    i++;
};


// var audio = new Audio("sounds/tom-1.mp3");
// audio.play();
// var audio = new Audio('Sounds/crash.mp3');
// audio.play();

// document.querySelector("button").addEventListener("click", function () {
//     alert("clicked!");
// });
function clickAndKeyboard(key) {
    switch (key) {
        case "w":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;
        case "a":
            var kik = new Audio("sounds/kik.mp3");
            kik.play();
            break;
        case "s":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        case "d":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
        case "j":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
        case "k":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
        case "l":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
    };
};

document.addEventListener("keydown", function(event) {
    clickAndKeyboard(event.key);
    buttonAnimation(event.key);
});

function buttonAnimation(key) {
    var active = document.querySelector("." + key);
    active.classList.add("pressed");
    setTimeout(function() {
        active.classList.remove("pressed");

    }, 100);
}