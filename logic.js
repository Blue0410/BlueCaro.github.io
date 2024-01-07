let boxes= Array.from(boxElements=document.getElementsByClassName('cell'));
let board= document.getElementById('board')
let msg=document.getElementById('msg')

//getElementsByClassName ko the dung chung voi classList.rm
const winCombination=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]
const X_turn= 'X'
const O_turn='O'
let currentTurn=1
let tmpBoxes=Array(9).fill(null)
startGame()
function startGame(){
    boxes.forEach(box =>{
    box.addEventListener('click',boxClicked,{once:true})
})
    hoverEffect()
}



function boxClicked(e){
    //place mark
    const index=e.target.id
    const cell=e.target
    const currentPlayer= currentTurn?X_turn:O_turn
    placeMark(cell,currentPlayer,e)
    tmpBoxes[index]=currentPlayer
    //check win
    if(checkWin()){
        endgame(false,currentPlayer)
    } 
    //check draw
    else if(checkDraw()){
        endgame(true,currentPlayer)
    } else{
        //swap turn
        swapTurn()
        hoverEffect()
    }
    
}
function placeMark(cell,currentPlayer,e){
    const index=e.target.id
    cell.classList.add(currentPlayer)
    cell.innerHTML=currentPlayer
    tmpBoxes[index]=currentPlayer
    
}
function checkWin(){
    for(const condition of winCombination){
        let [a,b,c]=condition
        if(tmpBoxes[a] && tmpBoxes[a]==tmpBoxes[b] && tmpBoxes[b]==tmpBoxes[c]){
            return true
        }
    }
}
function checkDraw(){
    return boxes.every(function(box){
        return box.innerHTML !== ''
    })
}
function endgame(draw,currentPlayer){
    if(draw){
        msg.innerHTML='DRAW!'
        document.getElementById('main').classList.add('show')
    } else {
        msg.innerHTML=`${currentPlayer} WINS!`
        document.getElementById('main').classList.add('show')
    }
}
function swapTurn(){
    currentTurn= !currentTurn
}
function hoverEffect(){
    board.classList.remove(X_turn)
    board.classList.remove(O_turn)
    if(currentTurn) board.classList.add(X_turn)
    else board.classList.add(O_turn)
}


function restart(){
    tmpBoxes.fill(null)
    boxes.forEach(box =>{
        box.innerHTML=''
        box.classList.remove(X_turn)
        box.classList.remove(O_turn)
    })
   document.getElementById('main').classList.remove('show')
   currentTurn=1
   startGame()
}
