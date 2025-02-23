import {King ,Bishop,Knight, Rook ,Queen ,Pawn ,} from "./pieces.js"
// import * as piece from "../Data/pieces.js";


const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8

let playerGo = 'black'
playerDisplay.textContent = 'black'

const startPieces = [

    Rook , Knight , Bishop , Queen , King , Bishop , Knight , Rook,
    Pawn , Pawn ,  Pawn , Pawn , Pawn , Pawn , Pawn , Pawn , 
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 
    Pawn , Pawn , Pawn , Pawn , Pawn , Pawn , Pawn , Pawn , 
    Rook , Knight , Bishop , Queen , King , Bishop , Knight , Rook,

]


function createBoard() {
    startPieces.forEach(( startPieces , i)=> {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPieces
        square.setAttribute('square-id' , i)
        const row = Math.floor( (63 - i) / 8) + 1
        if (row % 2 ===0) {
            square.classList.add(i % 2 === 0 ? "beige" : "brown")
        } else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige")
            
        }
        if (i <= 15) {
            square.firstChild.classList.add('black')
            square.firstChild?.setAttribute('draggable' , true )

        }
        if (i >= 48) {
            square.firstChild.classList.add('white')
            square.firstChild?.setAttribute('draggable' , true )
        }
        
        gameBoard.append(square)
    })
    
}

createBoard()

const allSquare = document.querySelectorAll(".square ")

allSquare.forEach(square =>{
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})


let startPositionId
let draggedElement 

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute("square-id");
    draggedElement = e.target 
    console.log(draggedElement);
    
    
    
}

function dragOver(e) {
    e.preventDefault()
}
function dragDrop(e) {
    e.stopPropagation();  
    
    const taken = e.target.classList.contains("piece")
    const correctGo = draggedElement.classList.contains(playerGo)
    console.log(correctGo);
    const opponentGo = playerGo === "white" ? "black" : "white"  
    const valid  = checkIfValid(e.target)  
    const takenByOpponent =e.target.classList.contains(opponentGo)
    console.log(valid);
        
    if (correctGo) {
        if (takenByOpponent && valid) {
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            checkForWin()
            changePlayer()
            return 
        }
        
        if (taken && !takenByOpponent) {
            
            infoDisplay.textContent = 'you cannot go here'
            setTimeout(() => infoDisplay.textContent = "", 2000);
            return
        }
        
         if (valid) {
            e.target.append(draggedElement)
            checkForWin()
              changePlayer()
              return
            
        }
    }        
}


function changePlayer() {
    if (playerGo === 'black') {
         reverseIds()
        playerGo = 'white'
        playerDisplay.textContent = 'white'
    } else {
        revertIds()
        playerGo = 'black'
        playerDisplay.textContent = 'black'
    }
}



function reverseIds() {
    const allSquare = document.querySelectorAll(".square")
    allSquare.forEach((square , i) => 
        square.setAttribute("square-id" , (width*width - 1 ) - i ) )
}

function revertIds() {
    const allSquare = document.querySelectorAll(".square")
    allSquare.forEach((square , i) => 
        square.setAttribute("square-id" ,  i  ))

}
  function checkIfValid(target){
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const piece = draggedElement.id
    console.log('startId', startId);
    console.log('targetId',targetId);
    console.log('piece', piece);

    const starterRow = [8,9,10,11,12,13,14,15]
    switch (piece) {
        case 'Pawn':
            if (
                (starterRow.includes(startId) && startId + width * 2 === targetId) ||( startId + width === targetId && !document.querySelector(`[square-id="${ startId + width}"]`).innerHTML.includes("piece")) ||
                (startId + width - 1 === targetId && document.querySelector(`[square-id="${ startId + width - 1}"]`).innerHTML.includes("piece"))
                ||
               ( startId + width + 1 === targetId && document.querySelector(`[square-id="${ startId + width + 1}"]`).innerHTML.includes("piece")) 
                
                
            ) {                
                return true
            }
           
            case 'Knight':
                if (
                    startId + width * 2 + 1 ===targetId ||
                    startId + width * 2 - 1 ===targetId ||
                    startId + width - 2  ===targetId ||
                    startId + width + 2  ===targetId ||
                    startId - width * 2 + 1 ===targetId ||
                    startId - width * 2 - 1 ===targetId ||
                    startId - width - 2  ===targetId ||
                    startId - width + 2  ===targetId 
                   
                ) {
                   return true 
                }
                break;
            
                    case 'Bishop' :
                        if (
                            // ++
                          (startId + width + 1 === targetId ||
                           startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${ startId + width + 1}"]`).firstChild || 
                           startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${ startId + width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 + 2}"]`).firstChild ||
                           startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${ startId + width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 + 3}"]`).firstChild  ||
                           startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${ startId + width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 + 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 + 4}"]`).firstChild ||
                           startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${ startId + width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 + 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 5 + 5}"]`).firstChild ||
                           startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${ startId + width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 + 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 6 + 6}"]`).firstChild )
                           
                           ||

                          // --
                         ( startId - width - 1 === targetId  ||
                          startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${ startId - width - 1}"]`).firstChild || 
                          startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${ startId - width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 - 2}"]`).firstChild ||
                          startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${ startId - width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 - 3}"]`).firstChild  ||
                          startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${ startId - width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 - 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 - 4}"]`).firstChild ||
                          startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${ startId - width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 - 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 5 - 5}"]`).firstChild ||
                          startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${ startId - width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 - 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 6 - 6}"]`).firstChild )
                          
                          ||

     
                          // +-
                        ( startId + width - 1 === targetId  ||
                          startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${ startId + width - 1}"]`).firstChild || 
                          startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${ startId + width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 - 2}"]`).firstChild ||
                          startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${ startId + width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 - 3}"]`).firstChild  ||
                          startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${ startId + width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 - 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 - 4}"]`).firstChild ||
                          startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${ startId + width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 - 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 5 - 5}"]`).firstChild ||
                          startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${ startId + width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 - 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 6 - 6}"]`).firstChild )
                          
                          ||

                          //-+
                         ( startId - width + 1 === targetId  ||
                          startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${ startId - width + 1}"]`).firstChild || 
                          startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${ startId - width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 + 2}"]`).firstChild ||
                          startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${ startId - width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 + 3}"]`).firstChild  ||
                          startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${ startId - width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 + 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 + 4}"]`).firstChild ||
                          startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${ startId - width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 + 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 5 + 5}"]`).firstChild ||
                          startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${ startId - width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 + 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 6 + 6}"]`).firstChild )

                        ) {
                          return true  
                        }
                        break;

                        case 'Rook'  :
                            if (
                                // ++
                               ( startId + width  === targetId ||
                                startId + width * 2   === targetId && !document.querySelector(`[square-id="${ startId + width }"]`).firstChild || 
                                startId + width * 3  === targetId && !document.querySelector(`[square-id="${ startId + width}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2}"]`).firstChild ||
                                startId + width * 4  === targetId && !document.querySelector(`[square-id="${ startId + width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 }"]`).firstChild  ||
                                startId + width * 5  === targetId && !document.querySelector(`[square-id="${ startId + width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 }"]`).firstChild ||
                                startId + width * 6  === targetId && !document.querySelector(`[square-id="${ startId + width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 5 }"]`).firstChild ||
                                startId + width * 7  === targetId && !document.querySelector(`[square-id="${ startId + width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 5 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 6 }"]`).firstChild )

                                ||
                                
                                // --

                                (startId - width  === targetId ||
                                startId - width * 2   === targetId && !document.querySelector(`[square-id="${ startId - width }"]`).firstChild || 
                                startId - width * 3   === targetId && !document.querySelector(`[square-id="${ startId - width}"]`).firstChild   && !document.querySelector(`[square-id="${ startId - width * 2}"]`).firstChild ||
                                startId - width * 4   === targetId && !document.querySelector(`[square-id="${ startId - width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 }"]`).firstChild  ||
                                startId - width * 5   === targetId && !document.querySelector(`[square-id="${ startId - width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 }"]`).firstChild ||
                                startId - width * 6   === targetId && !document.querySelector(`[square-id="${ startId - width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 5 }"]`).firstChild ||
                                startId - width * 7   === targetId && !document.querySelector(`[square-id="${ startId - width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 5 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 6 }"]`).firstChild )

                                ||

                                // rightward move

                                (startId + 1  === targetId ||
                                startId + 2  === targetId && !document.querySelector(`[square-id="${ startId + 1 }"]`).firstChild || 
                                startId + 3  === targetId && !document.querySelector(`[square-id="${ startId + 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 2 }"]`).firstChild ||
                                startId + 4  === targetId && !document.querySelector(`[square-id="${ startId + 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 3 }"]`).firstChild  ||
                                startId + 5  === targetId && !document.querySelector(`[square-id="${ startId + 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 4 }"]`).firstChild ||
                                startId + 6  === targetId && !document.querySelector(`[square-id="${ startId + 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 5 }"]`).firstChild ||
                                startId + 7  === targetId && !document.querySelector(`[square-id="${ startId + 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 5 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 6 }"]`).firstChild)
                                
                                ||
                                
                                // leftward

                               ( startId - 1  === targetId ||
                                startId - 2  === targetId && !document.querySelector(`[square-id="${ startId - 1 }"]`).firstChild || 
                                startId - 3  === targetId && !document.querySelector(`[square-id="${ startId - 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 2 }"]`).firstChild ||
                                startId - 4  === targetId && !document.querySelector(`[square-id="${ startId - 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 3 }"]`).firstChild  ||
                                startId - 5  === targetId && !document.querySelector(`[square-id="${ startId - 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 4 }"]`).firstChild ||
                                startId - 6  === targetId && !document.querySelector(`[square-id="${ startId - 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 5 }"]`).firstChild ||
                                startId - 7  === targetId && !document.querySelector(`[square-id="${ startId - 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 5 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 6 }"]`).firstChild )
                                
                            
                             ) {
                                return true
                            }
                            break;


                       case 'Queen'  :

                       if (

                          // ++
                           (startId + width + 1 === targetId ||
                            startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${ startId + width + 1}"]`).firstChild || 
                            startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${ startId + width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 + 2}"]`).firstChild ||
                            startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${ startId + width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 + 3}"]`).firstChild  ||
                            startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${ startId + width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 + 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 + 4}"]`).firstChild ||
                            startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${ startId + width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 + 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 5 + 5}"]`).firstChild ||
                            startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${ startId + width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 + 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 6 + 6}"]`).firstChild 
                            )
                            
                            ||
 
                           // --
                          (startId - width - 1 === targetId  ||
                           startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${ startId - width - 1}"]`).firstChild || 
                           startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${ startId - width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 - 2}"]`).firstChild ||
                           startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${ startId - width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 - 3}"]`).firstChild  ||
                           startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${ startId - width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 - 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 - 4}"]`).firstChild ||
                           startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${ startId - width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 - 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 5 - 5}"]`).firstChild ||
                           startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${ startId - width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 - 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 6 - 6}"]`).firstChild
                          )
                           
                           ||
 
      
                           // +-
                           (startId + width - 1 === targetId  ||
                           startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${ startId + width - 1}"]`).firstChild || 
                           startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${ startId + width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 - 2}"]`).firstChild ||
                           startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${ startId + width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 - 3}"]`).firstChild  ||
                           startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${ startId + width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 - 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 - 4}"]`).firstChild ||
                           startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${ startId + width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 - 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 5 - 5}"]`).firstChild ||
                           startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${ startId + width - 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 - 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 6 - 6}"]`).firstChild
                          )
                           
                           ||
 
                           //-+
                          ( startId - width + 1 === targetId  ||
                           startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${ startId - width + 1}"]`).firstChild || 
                           startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${ startId - width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 + 2}"]`).firstChild ||
                           startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${ startId - width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 + 3}"]`).firstChild  ||
                           startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${ startId - width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 + 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 + 4}"]`).firstChild ||
                           startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${ startId - width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 + 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 5 + 5}"]`).firstChild ||
                           startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${ startId - width + 1}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 + 3}"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 6 + 6}"]`).firstChild
                          )

                           ||

                           ( startId + width  === targetId ||
                            startId + width * 2  === targetId && !document.querySelector(`[square-id="${ startId + width }"]`).firstChild || 
                            startId + width * 3  === targetId && !document.querySelector(`[square-id="${ startId + width}"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2}"]`).firstChild ||
                            startId + width * 4  === targetId && !document.querySelector(`[square-id="${ startId + width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 }"]`).firstChild  ||
                            startId + width * 5  === targetId && !document.querySelector(`[square-id="${ startId + width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 }"]`).firstChild ||
                            startId + width * 6  === targetId && !document.querySelector(`[square-id="${ startId + width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 5 }"]`).firstChild ||
                            startId + width * 7  === targetId && !document.querySelector(`[square-id="${ startId + width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + width * 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 5 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 6 }"]`).firstChild 
                           )

                            ||
                            
                            // --

                            (startId - width  === targetId ||
                            startId - width * 2   === targetId && !document.querySelector(`[square-id="${ startId - width }"]`).firstChild || 
                            startId - width * 3   === targetId && !document.querySelector(`[square-id="${ startId - width}"]`).firstChild   && !document.querySelector(`[square-id="${ startId - width * 2}"]`).firstChild ||
                            startId - width * 4   === targetId && !document.querySelector(`[square-id="${ startId - width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 }"]`).firstChild  ||
                            startId - width * 5   === targetId && !document.querySelector(`[square-id="${ startId - width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 }"]`).firstChild ||
                            startId - width * 6   === targetId && !document.querySelector(`[square-id="${ startId - width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 5 }"]`).firstChild ||
                            startId - width * 7   === targetId && !document.querySelector(`[square-id="${ startId - width }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - width * 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 5 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - width * 6 }"]`).firstChild 
                            )

                            ||

                            // rightward move

                            (startId + 1 === targetId ||
                            startId + 2  === targetId && !document.querySelector(`[square-id="${ startId + 1 }"]`).firstChild || 
                            startId + 3  === targetId && !document.querySelector(`[square-id="${ startId + 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 2 }"]`).firstChild ||
                            startId + 4  === targetId && !document.querySelector(`[square-id="${ startId + 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 3 }"]`).firstChild  ||
                            startId + 5  === targetId && !document.querySelector(`[square-id="${ startId + 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 4 }"]`).firstChild ||
                            startId + 6  === targetId && !document.querySelector(`[square-id="${ startId + 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 5 }"]`).firstChild ||
                            startId + 7  === targetId && !document.querySelector(`[square-id="${ startId + 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId + 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 5 }"]`).firstChild && !document.querySelector(`[square-id="${ startId + 6 }"]`).firstChild
                            )
                            
                            ||
                            
                            // leftward

                           ( startId - 1 === targetId ||
                            startId - 2  === targetId && !document.querySelector(`[square-id="${ startId - 1 }"]`).firstChild || 
                            startId - 3  === targetId && !document.querySelector(`[square-id="${ startId - 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 2 }"]`).firstChild ||
                            startId - 4  === targetId && !document.querySelector(`[square-id="${ startId - 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 3 }"]`).firstChild  ||
                            startId - 5  === targetId && !document.querySelector(`[square-id="${ startId - 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 4 }"]`).firstChild ||
                            startId - 6  === targetId && !document.querySelector(`[square-id="${ startId - 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 5 }"]`).firstChild ||
                            startId - 7  === targetId && !document.querySelector(`[square-id="${ startId - 1 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 2 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 3 }"]`).firstChild  && !document.querySelector(`[square-id="${ startId - 4 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 5 }"]`).firstChild && !document.querySelector(`[square-id="${ startId - 6 }"]`).firstChild 
                           )

                       ) {
                        
                        return true

                       }

                       break;

                       case 'King' :

                       if (

                        startId + 1 === targetId ||
                        startId - 1 === targetId ||
                        startId + width === targetId ||
                        startId - width === targetId ||
                        startId - width + 1 === targetId ||
                        startId - width - 1 === targetId ||
                        startId + width - 1 === targetId ||
                        startId + width + 1 === targetId 

                       ) {
                        return true
                       }
               
            
            
    
    }
    
                    
 }


 function checkForWin() {
    const kings = Array.from(document.querySelectorAll('#King'))
    console.log(kings);
    
    if (!kings.some(King => King.classList.contains('white'))) {
       infoDisplay.innerHTML = "Black player wins!" 
       const allSquare = document.querySelectorAll('.square')
       allSquare.forEach(square =>square.firstElementChild?.setAttribute('draggable', false))
    }
    if (!kings.some(King => King.classList.contains('black'))) {
       infoDisplay.innerHTML = "White player wins!" 
       const allSquare = document.querySelectorAll('.square')
       allSquare.forEach(square =>square.firstElementChild?.setAttribute('draggable', false))
    }
 }