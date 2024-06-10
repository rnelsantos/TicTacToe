

//Storing Moves Made on the board
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
    const currentMarker = () => marker;
    const lastMarker = () => {if(marker==="O"){return "X"}else{return "O"}};
    
    return {markField, readField, reset, toggleMarker, currentMarker,lastMarker};
})();



//Display UI for board
const display= (function ()  {  
    const boxElements = document.querySelectorAll(".ticbox");

    boxElements.forEach((field) =>//makeMove upon click
        field.addEventListener("click", (e) => {
            makeMove.markField(e.target.dataset.index);
            boxElements[Number(e.target.dataset.index)].classList.remove('tempMarker');
            display.board();
            game.checkWinner();
            console.log(makeMove.lastMarker());
        })
    );
    boxElements.forEach((field) =>//for hoverIn
        field.addEventListener("mouseover", (e) => {
            if(makeMove.readField(e.target.dataset.index) === ""){
            boxElements[Number(e.target.dataset.index)].innerText = makeMove.currentMarker();
            boxElements[Number(e.target.dataset.index)].classList.add('tempMarker'); }    
        })
    );
    boxElements.forEach((field) =>//for hoverOut
    field.addEventListener("mouseout", (e) => {
        if(makeMove.readField(e.target.dataset.index) === ""){
        boxElements[Number(e.target.dataset.index)].innerText = "";}
        boxElements[Number(e.target.dataset.index)].classList.remove('tempMarker');
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


//Match Pointing System
const game = (function ()  {  
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
   


    //commands
    const checkWinner = () => { Lastmarked = makeMove.lastMarker();
        winConditions.forEach( (condition) =>{
            if (makeMove.readField(condition[0])===Lastmarked && 
                makeMove.readField(condition[1])===Lastmarked && 
                makeMove.readField(condition[2])) 
                { console.log(Lastmarked+" "+"wins");return "win"}
            }
        )

    };                        
    return {checkWinner};
})();










// for display and debug
display.board();
//makeMove.reset();
//makeMove.boardLog();
//console.log(makeMove.readField(0));