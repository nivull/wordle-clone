let currentRow = 0;
let currentItem = 0;

let matrix = [  ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["", "", "", "", ""] ];

const allowedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
 
document.addEventListener('keydown', (event) => {
    addLetter(event.key.toLowerCase());
})

function addLetter(key) {
    if(key == "enter" && matrix[currentRow][4] != "") {   
        //if submitting line
        currentItem = 0;
        submitGuess(currentRow);
        currentRow++;

    } else if (key == "backspace") {
        //if backspace
        matrix[currentRow][currentItem] = "";
                if(currentItem != 0) {
            currentItem--;
        }

    } else if ( allowedCharacters.includes(key) && currentItem <= 4) {
        //check if allowed character
        matrix[currentRow][currentItem] = key;
        if(currentItem < 4) {
            currentItem++;
        }     
    }
}

function submitGuess() {
}