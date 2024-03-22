let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let msg=document.querySelector(".message-container");
let msgPara=document.querySelector("#msg");
let newBtn=document.querySelector("#new-btn");

const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

let TurnO=true;

let count=0;

const resetGame = () => {
    TurnO=true;
    enableBoxes();
    msg.classList.add("hidden");
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        count=0;
        
    }
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled=true;
    }
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if(TurnO){
            box.innerText="X";
            TurnO=false;
        }else{
            box.innerText="O";
            TurnO=true;
        }
        count++;
        if(count == 9){
            msgPara.innerText='DRAW!!';
            msg.classList.remove("hidden");
        }
        box.disabled=true;
        checkWinner();
    })
});

const showWinner = (winner) => {
    msgPara.innerText=`Winner is ${winner}`;
    msg.classList.remove("hidden");
    disableBoxes();
    
}

const checkWinner = () => {
    for(let pattern of winPattern ){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
            }
        }
    }
}
newBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);

