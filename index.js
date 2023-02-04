var score = 0;

document.getElementById("word").innerHTML = "Welcome Game";
document.getElementById("button").innerHTML = "Start";
document.getElementById("time").innerHTML = "time";
document.getElementById("score").innerHTML = "score";

document.getElementById("input").disabled = true;

document.querySelector("button").addEventListener("click", function () {
    if (document.getElementById("button").innerHTML == "Start") {
        startGame();
        showTime(3, 60);
        document.getElementById("button").innerHTML = "Submit";
    }
    if (document.getElementById("button").innerHTML == "Restart") {
        resetGame();
        document.getElementById("button").innerHTML = "Start";
    }
});

function startGame() {
    getRandomWord();
    document.getElementById("score").innerHTML = score;
}

function resetGame() {
    score = 0;
    randomWord = "";
    document.getElementById("score").innerHTML = score;
    document.getElementById("message").style.display = "none";
}

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("button").click();
    }
});

function submitInput() {
    var input = document.getElementById("input").value;
    document.getElementById("input").value = "";
    scoringFunc(input, randomWord);
}

function showTime(c, t) {
    document.getElementById("button").disabled = true;
    document.getElementById("time").innerHTML = t;
    document.getElementById("time").innerHTML = c;
    counter = setInterval(function () {
        if (c > 0) {
            c--;
            document.getElementById("time").innerHTML = c;
        } else if (t > 0) {
            document.getElementById("button").disabled = false;
            document.getElementById("input").disabled = false;
            t--;
            document.getElementById("time").innerHTML = t;
            if (t == 0) {
                document.getElementById("button").innerHTML = "Restart";
                document.getElementById("input").disabled = true;
                document.getElementById("message").innerHTML = "Your score: " + score;
                document.getElementById("message").style.display = "block";
            }
        }
    }, 1000);
}

async function getRandomWord() {
    if (document.getElementById("button").innerHTML == "Submit" || "Start") {
        const response = await fetch('words.json');
        const data = await response.json();
        var wordsList = data.data;
        var randomIndex = Math.floor(Math.random() * wordsList.length);
        randomWord = wordsList[randomIndex];
        console.log(randomWord);
        document.getElementById("word").innerHTML = randomWord;
        return randomWord;
    }

}

function scoringFunc(input, word) {
    if (document.getElementById("button").innerHTML == "Submit") {
        if (input == reverseText(word)) {
            score += word.length;
            console.log(score);
        } else if (input != reverseText(word)) {
            score -= word.length;
            console.log(score);
        }
        getRandomWord();
        return document.getElementById("score").innerHTML = score;
    }

}

const reverseText = function (word) {
    if (word === "") return "";
    return reverseText(word.substr(1)) + word[0];
}