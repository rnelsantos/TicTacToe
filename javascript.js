/*
const Player = function (pal) {
    this.name = name;
    

}
*/

const makeMove = (function ()  {  
    const empty = "";
    var board = [empty, empty, empty, empty, empty, empty, empty, empty, empty]; // how to reset if declared as const
    firstMarker="O";
    marker =  firstMarker;

    //commands
    const markField = (index) => {if(board[index]===empty){board[index] = marker; 
                                    makeMove.toggleMarker();
                                    return board[index];};};
                     
    const readField = (index) => board[index];
    const reset = () => board = board.map((item) => item=empty)
    const toggleMarker = () => {if(marker==="O"){return marker="X"}else{ return marker="O"}};
    

   //for debug
    const boardLog = () => {  // temporary display
        console.log(board[0],board[1],board[2])
        console.log(board[3],board[4],board[5])
        console.log(board[6],board[7],board[8])
    }

    return {markField, readField,boardLog, reset, toggleMarker};
  
})();



//FOR DISPLAY
const display= (function ()  {  
    const boxElements = document.querySelectorAll(".ticbox");

    boxElements.forEach((field) =>
        field.addEventListener("click", (e) => {
            makeMove.markField(e.target.dataset.index);
            console.log(e.target.dataset.index);
            display.board();
            makeMove.boardLog();

        })
    );
    
    //commands
    const board = () =>{ //boxElements[1].innerText = makeMove.readField(1);
        for(let i=0; i<=boxElements.length-1;i++) {
            boxElements[i].innerText = makeMove.readField(i);
        }   
    };
    return {board};
})();








//makeMove.reset();






// for display and debug
display.board();
//makeMove.boardLog();
