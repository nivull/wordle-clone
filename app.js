//the word to guess
const currentWord = "sahur";

//html row elements containing the guessing boxes
const rowElemnts = [document.getElementById("row1"),
    document.getElementById("row2"),
    document.getElementById("row3"),
    document.getElementById("row4"),
    document.getElementById("row5"),
    document.getElementById("row6")
    ]
let currentRow = 0;
let currentItem = -1;
const perRow = 4;
let gameActive = 1;
//how many duplicate letters there are, stays constant
let duplicateLetters = {};
//variable that will change values while checking a row, resets afterwards
let duplicateClock = {};

let matrix = [  ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["", "", "", "", ""]];

let results = [];
let test = ['', '', '', '', ''];

const allowedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const greenGuessColour = "#35e61e";
const yellowGuessColour = "#e6dc1e";
const greyGuessColour = "#0a0a0a";





setDuplicates();

document.addEventListener('keydown', (event) => {
    
    if(gameActive == 1) {
        addLetter(event.key.toLowerCase());
    }
});

function addLetter(key) {
    if(key == "enter" && matrix[currentRow][perRow] != "") {   
        //if submitting line
        currentItem = -1;
        submitGuess();
        currentRow++;

    } else if (key == "backspace") {
        //if backspace
        if(currentItem > -1) {
            deleteLetter();  
        }    
        
        if(currentItem != -1) {
            currentItem--;
        }
        matrix[currentRow][currentItem+1] = "";
        
    } else if ( allowedCharacters.includes(key) && currentItem < perRow) {
        //check if allowed character
        matrix[currentRow][currentItem+1] = key;

        

        if(currentItem < perRow) {
            currentItem++;
            
        }    
        drawLetter(key);
        
    }
}

function submitGuess() {
    //reset duplicate clock
    duplicateClock = structuredClone(duplicateLetters);
    
    // 0 = black, 1 = yellow, 2 = green
    for(let i = 0; i <= perRow; i++ ) {

        //test green
        if(matrix[currentRow][i] == currentWord[i]) {
            test[i] = 2;
            const subtractDuplicate = duplicateClock.find((e) => e.letter == currentWord[i]);
            if(subtractDuplicate){
                if(subtractDuplicate.count > 0) {
                    subtractDuplicate.count -= 1;
                }
            }
        }
        
    }
    //test yellow

    for(let i = 0; i <= perRow; i++) {

        if (currentWord.includes(matrix[currentRow][i]) && test[i]  != 2){
            if(checkDuplicates(matrix[currentRow][i]) ) {
                test[i] = 1;
            } 
        //black
        } else if (test[i] != 2) {
            test[i] = 0;
        }
    }
    //console.log(test);
    revealLetters();
    results.push(test);

    if(!test.includes(1) && !test.includes(0) && !test.includes('')){
        gameEnd(1);
        gameActive = 0;
    } else if(currentRow >= 5) {
        gameEnd(0);
        gameActive = 0;
    } else {
        //console.log("not won")
    }




    test = ['', '', '', '', ''];
}

function checkDuplicates(char) {
//find item with duplicate letter testing for
    const toTest = duplicateClock.find((e) => e.letter == char);    
    if(toTest) {
//if duplicate still has another, meaning we can say it's yellow 
        if(toTest.count > 0) {
            toTest.count -=1;
            return true;
//if it is listed as a duplicate but weve already marked, false 
        } else{
            return false;
        }
    } else{
        return true;
    }



}

function setDuplicates() { 
    for(const letter of currentWord) {

        duplicateLetters[letter] = (duplicateLetters[letter] || 0) + 1;
 
    }
    //set to key, value pairs ([[p, 1], [z,2]])
    duplicateLetters = Object.entries(duplicateLetters)
    //gets rid of non duplicates to add to object array, letter = key to remove, count = number attatched
    .filter( ([letter, count]) => count > 0)
    //transforms  key value pair array to object
    .map( ([letter, count]) => ({letter: letter, count: count}));

}

function drawLetter(char) {
    const letterDrawn = document.getElementById(`box${currentRow+1}-${currentItem+1}`);
    letterDrawn.textContent = char.toUpperCase();

}

function deleteLetter() {
    const boxToDelete = document.getElementById(`box${currentRow+1}-${currentItem+1}`);
    boxToDelete.textContent = "";

}



function revealLetters() {

    for(let i = 0; i <= perRow; i++) {

        const boxDrawn = document.getElementById(`box${currentRow+1}-${i+1}`);
        
        if(test[i] == 2) {
            boxDrawn.style.backgroundColor = greenGuessColour;
            boxDrawn.style.borderColor = greenGuessColour;
        } else if(test[i] == 1) {
            boxDrawn.style.backgroundColor = yellowGuessColour;
            boxDrawn.style.borderColor = yellowGuessColour;
        } else {
            boxDrawn.style.backgroundColor = greyGuessColour;
            boxDrawn.style.borderColor = greyGuessColour;
        }


    }


}

function gameEnd(won) {

        console.log(emojiResults());
}

function emojiResults() {

    let str = "";

    for(let i = 0; i < results.length; i++) {

        for(let x of results[i]) {
            if(x == 2) {
                str += "🟩";
            } else if(x == 1) {
                str+= "🟨";
            } else {
                str += "⬛";
            }
        }
        str += "\n";
    }

    return str;

}