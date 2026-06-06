//the word to guess
const currentWord = "bbbaa";

//html row elements containing the guessing boxes
const row1el = document.getElementById("row1");
const row2el = document.getElementById("row2");
const row3el = document.getElementById("row3");
const row4el = document.getElementById("row4");
const row5el = document.getElementById("row5");
const row6el = document.getElementById("row6");

let currentRow = 0;
let currentItem = 0;
const perRow = 4;

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

const allowedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
 
setDuplicates();

document.addEventListener('keydown', (event) => {
    addLetter(event.key.toLowerCase());
})

function addLetter(key) {
    if(key == "enter" && matrix[currentRow][perRow] != "") {   
        //if submitting line
        currentItem = 0;
        submitGuess();
        currentRow++;

    } else if (key == "backspace") {
        //if backspace
        matrix[currentRow][currentItem] = "";
                if(currentItem != 0) {
            currentItem--;
        }

    } else if ( allowedCharacters.includes(key) && currentItem <= perRow) {
        //check if allowed character
        matrix[currentRow][currentItem] = key;
        if(currentItem < perRow) {
            currentItem++;
        }     
    }
}
let test = ['', '', '', '', ''];
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
    console.log(test);
    //test yellow

    for(let i = 0; i <= perRow; i++) {

        if (currentWord.includes(matrix[currentRow][i]) && checkDuplicates(matrix[currentRow][i]) && test[i] != 2){
            test[i] = 1;
        //black
        } else if (test[i] != 2) {
            test[i] = 0;
        }
    }
    console.log(test);
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
    .filter( ([letter, count]) => count > 1)
    //transforms  key value pair array to object
    .map( ([letter, count]) => ({letter: letter, count: count}));

}