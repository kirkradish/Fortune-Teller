// INITIALIZE IMAGES
var teller = document.getElementById("fortune-teller");
var slides = {
    colors : document.getElementById("colors"),
    numSlide1 : document.getElementById("num-slide1"),
    numSlide2 : document.getElementById("num-slide2")
};
var message = {
    banner : document.getElementById("banner"),
    startText : document.getElementById("start-text"),
    note : document.getElementById("note"),
    messageText : ""
};

function showStartText() {
    message.banner.className = "show";
    message.startText.className = "show";
    message.note.className = "hide";
}

function showNote() {
    message.banner.className = "show";
    message.note.className = "show";
    message.startText.className = "hide";
}
function hideAllBanner() {
    message.banner.className = "hide";
    message.startText.className = "hide";
    message.note.className = "hide";
}

function hideSlides() {
    slides.colors.className = "hide";
    slides.numSlide1.className = "hide";
    slides.numSlide2.className = "hide";
}
function showColors() {
    hideSlides();
    slides.colors.className = "show";
}
function showNumSlide1() {
    hideSlides();
    slides.numSlide1.className = "show";
}
function showNumSlide2() {
    hideSlides();
    slides.numSlide2.className = "show";
}

function beginGame() {
    hideAllBanner();
    colors.className += " rotate";
}

showColors();
showStartText();
message.startText.onclick = beginGame;

function displayMessageText(num) {
    switch (num) {
        case 1:
            message.messageText = "All Set";
            break;
        case 2:
            message.messageText = "Right On";
            break;
        case 3:
            message.messageText = "Well Done";
            break;
        case 4:
            message.messageText = "Javascript Rules";
            break;
        case 5:
            message.messageText = "Everything is Awesome";
            break;
        case 6:
            message.messageText = "You're the Coolest";
            break;
        case 7:
            message.messageText = "All Right";
            break;
        case 8:
            message.messageText = "Nice Work";
            break;
    }
    showNote();
    message.note.innerHTML = message.messageText;
}

function showChoice(choice) {
    switch (choice) {
        case "red":
            message.note.style.color = "#ba1319";
            break;
        case "blue":
            message.note.style.color = "#005996";
            break;
        case "green":
            message.note.style.color = "#00652e";
            break;
        case "orange":
            message.note.style.color = "#c06615";
            break;
        default:
            message.note.style.color = "#6a6c6c";
    }
    showNote();
    message.note.innerHTML = choice;
    setTimeout(function() {
        hideAllBanner();
    }, 800);
}

function startOver() {
    setTimeout(function() {
        showColors();
        showStartText();
        x = 0;
        return x;
    }, 1500);
}

// GET CHILD ID, PARENT ID AND CONVERT TO LIMIT TO CHANGE
// IF A NUMBER IS A STRING, CONVERT IT TO A NUMBER
for (var i in slides) {
    var x = 0;
    slides[i].addEventListener("click",
        function(e) {
            var childId = e.target.id;
            var childIdLen;
            if (!isNaN(childId)) {
                childId = Number(childId);
                childIdLen = childId;
            }
            else {
                var childIdLen = childId.length;
            }
            var parentClass = e.target.parentNode.getAttribute("class");
            var parentId = e.target.parentNode.getAttribute("id");
            if (x < 2) {
                x++;
                changeSlides(childIdLen, parentId);
                showChoice(childId);
            }
            else {
                displayMessageText(childIdLen);
                x = startOver();
            }
        }
    );
}

// REPEAT THIS FUNCTION AS MANY TIMES AS LIMIT SAYS
function changeSlides(limit, curSlide) {
    var i = 0;
    function moves() {
        if (curSlide == "num-slide2" || curSlide == "colors") {
            setTimeout(function() {
                showColors();
                setTimeout(function() {
                    showNumSlide1();
                    curSlide = "num-slide1";
                    i++;
                    if (i < limit) {
                        moves();
                    }
                 }, 250);
            }, 250);
        }
        else {
            setTimeout(function() {
                showColors();
                setTimeout(function() {
                    showNumSlide2();
                    curSlide = "num-slide2";
                    i++;
                    if (i < limit) {
                        moves();
                    }
                 }, 250);
            }, 250);
        }
        if (i !== limit - 1) {
            teller.className = "no-click";
        }
        else {
            teller.className = "click-ok";
        }
    }
    moves();
}
