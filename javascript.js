
let gameOver = false;
let result="";

//Storing Moves Made on the board
const makeMove = (function ()  {  
    const empty = "";
    var board = [empty, empty, empty, empty, empty, empty, empty, empty, empty]; // how to reset if declared as const
    firstMarker="O";
    marker =  firstMarker;
    let itemLength = 0 ;

    //commands
    const markField = (index) => {if(board[index]===empty){board[index] = marker; 
                                    makeMove.toggleMarker();
                                    itemLength++;
                                    return board[index];};};
                     
    const readField = (index) => board[index];
    const reset = () => {board = board.map((item) => item=empty); 
                        display.board();
                        gameOver = false; 
                        itemLength = 0;
                        result = "";
                        marker =  firstMarker;}
    const toggleMarker = () => {if(marker==="O"){return marker="X"}else{ return marker="O"}};
    const currentMarker = () => marker;
    const lastMarker = () => {if(marker==="O"){return "X"}else{return "O"}};
    const getLength = () => itemLength;
    const setMarker = (mark) => firstMarker=mark;
    
    return {markField, readField, reset, toggleMarker, currentMarker,lastMarker,getLength,setMarker};
})();



//Display UI for board
const display= (function ()  {  
    const boxElements = document.querySelectorAll(".ticbox");
    const resultElement = document.querySelector(".result");
    const slide = document.querySelector(".switch");
    const chooseMarker = document.querySelectorAll(".marker");
    const rematchBTN = document.querySelector(".reset");

    boxElements.forEach((field) =>//makeMove upon click
        field.addEventListener("click", (e) => {
            if(gameOver===false){
            makeMove.markField(e.target.dataset.index);
            boxElements[Number(e.target.dataset.index)].classList.remove('tempMarker');
            display.board();
            game.checkWinner();// TEMPORARY
            console.log(makeMove.lastMarker());
            }
        })
    );

    boxElements.forEach((field) =>//for hoverIn
        field.addEventListener("mouseover", (e) => {
            if(makeMove.readField(e.target.dataset.index) === "" && gameOver===false){
            boxElements[Number(e.target.dataset.index)].classList.remove('yellow');
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

    chooseMarker.forEach((marks) =>//select marker
    marks.addEventListener("click", (e) => {
        marker= e.target.dataset.index;
        marker= e.target.innerText;
        //marks.classList.add('chosenMarker')
        makeMove.setMarker(marker);
        changeMarkerColor();
        if(marker==="X"){
            slide.classList.add("switch-X");
            marks.classList.add('chosenMarker')
        } 
        else {
            marks.classList.add('chosenMarker');
            slide.classList.remove("switch-X");
        }
    })
    );

    
    rematchBTN.addEventListener("click", (e) => { // reset and rematch button
       rematchBTN.classList.add('hide')
        makeMove.reset();
        display.board();
    });
    

    //commands
    const board = () =>{ 
        resultElement.innerText=result;
        for(let i=0; i<=boxElements.length-1;i++) {
            boxElements[i].innerText = makeMove.readField(i);
        }
    };
    
    const changeMarkerColor = () =>{  chooseMarker.forEach((marks) => marks.classList.remove("chosenMarker"))};
    const rematch = () => rematchBTN.classList.remove('hide');

    return {board,rematch};
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
    const boxElements = document.querySelectorAll(".ticbox");
    const checkWinner = () => { Lastmarked = makeMove.lastMarker();
        winConditions.forEach( (condition) =>{
            if (makeMove.readField(condition[0])===Lastmarked && 
                makeMove.readField(condition[1])===Lastmarked && 
                makeMove.readField(condition[2])===Lastmarked) 
                { console.log(Lastmarked+" "+"wins");
                    boxElements[condition[0]].classList.add('yellow');
                    boxElements[condition[1]].classList.add('yellow');
                    boxElements[condition[2]].classList.add('yellow');
                gameOver=true;    
                result= Lastmarked+" "+"wins";
                display.board();
                display.rematch();
                }

                else if (makeMove.getLength() === 9 && gameOver===false) 
                { 
                gameOver=true;    
                result="DRAW";
                display.board();
                display.rematch();
                }
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
/*
console.log(makeMove.readField(0),makeMove.readField(1),makeMove.readField(2));
console.log(makeMove.readField(3),makeMove.readField(4),makeMove.readField(5))
console.log(makeMove.readField(6),makeMove.readField(7),makeMove.readField(8))
*/