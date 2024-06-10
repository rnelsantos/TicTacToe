/*
const Player = function (pal) {
    this.name = name;
    

}
*/

const makeMove = (function ()  {  
    const empty = ".";
    var board = [empty, empty, empty, empty, empty, empty, empty, empty, empty]; // how to reset if declared as const
    
    //commands
    const markField = (marker,index) => {if(board[index]===empty){return board[index] = marker;};}
    const readField = (index) => board[index];
    const reset = () => board = board.map((item) => item=empty)

    //for debug
    const boardLog = () => {  // temporary display
        console.log(board[0],board[1],board[2])
        console.log(board[3],board[4],board[5])
        console.log(board[6],board[7],board[8])
    }
    return {markField, readField,boardLog, reset};
  
})();



//FOR DISPLAY
const display= (function ()  {  
    const boxElements = document.querySelectorAll(".ticbox");
    
    //commands
    const board = () =>{ //boxElements[1].innerText = makeMove.readField(1);
        for(let i=0; i<=boxElements.length-1;i++) {
        boxElements[i].innerText = makeMove.readField(i);
        }   
    };


    return {board};
  
})();



makeMove.markField("X", 3);
makeMove.markField("O", 4);
makeMove.markField("X", 5);
//makeMove.reset();






// for display and debug
display.board();
makeMove.boardLog();
