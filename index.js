var score = 0;
var randomWord;

function submitInput() {
    var input = document.getElementById("input").value;
    document.getElementById("input").value = "";
    scoringFunc(input, randomWord);
}

async function getRandomWord() {
    const response = await fetch('words.json');
    const data = await response.json();
    var wordsList = data.data;
    var randomIndex = Math.floor(Math.random() * wordsList.length);
    randomWord = wordsList[randomIndex];
    console.log(randomWord);
    document.getElementById("word").innerHTML = randomWord;
    return randomWord;
}

function scoringFunc(input, word) {
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

const reverseText = function (word) {
    if (word === "") return "";
    return reverseText(word.substr(1)) + word[0];
}

getRandomWord();
