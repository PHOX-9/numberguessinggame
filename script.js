"use strict";

const containerEL=document.querySelector('.container');
const btnChckEL=document.querySelector('.btn');
const msgEL=document.querySelector('.message');
const rangeEL=document.querySelector('.range .diff');
const inputNumEL=document.querySelector('.input_number');
const hideNumEl = document.querySelector('.hide_num');
const btnEL = document.querySelector('.btn');
const correct = document.getElementById('correct');
const scorrect = document.getElementById('slightclose');
const vcorrect = document.getElementById('veryclose');
const wrong = document.getElementById('wrong');
const go = document.getElementById('go');
const fault=document.getElementById('fault');
const guessHistory=document.getElementById('guessHistory');
const livrem = document.querySelector('.livrem');
const score =document.querySelector('.score');

const brlives = document.getElementById("brokenheart");
brlives.style.display="none";

let scretNum=Math.floor(Math.random()*50 +1);

let score1=1000;

function displayhistory(guess,scretNum){
 const newGuess=document.createElement('p');
 if(guess==scretNum){
     newGuess.textContent='Correct! You guessed '+ guess+'!';
     newGuess.style.color= '#FEE715';
}
 else{
    newGuess.textContent='You guessed '+ guess+'!';
 }

 guessHistory.appendChild(newGuess);
}


function setDifficulty(difficulty){

    const difficulties = document.querySelectorAll('.tooltip-link');

    difficulties.forEach(difficulty => {
        difficulty.classList.remove('active-link');
    });

    const selectedElement = document.getElementById(difficulty);
    selectedElement.classList.add('active-link');

    if(difficulty=='easy'){
        rangeEL.textContent="(1 - 50)";
        scretNum=Math.floor(Math.random()*50 +1);
    }
    else if(difficulty=='medium'){
        rangeEL.textContent="(1 - 100)";
        scretNum=Math.floor(Math.random()*100 +1);
    }
    else if(difficulty=='hard'){
        rangeEL.textContent="(1 - 500)";
        scretNum=Math.floor(Math.random()*500 +1);
    }

}


btnChckEL.addEventListener("click",()=>{
    event.preventDefault();
    const guess=Number(inputNumEL.value);
    if(guess){
        displayhistory(guess,scretNum);
        const lives = document.querySelectorAll(".fa-solid.fa-heart");
        if(lives.length>1)
    {
        lives[lives.length - 1].remove();
        if(guess==scretNum){
            correct.play();
            msgEL.textContent="You guessed it right in "+ (11-lives.length)+" attempts!";
            btnEL.textContent="Play Again";
            btnEL.addEventListener("click", function() {
                location.reload();
            })
            
        }
        else
          {
            if(Math.abs(guess-scretNum)<=1){
                msgEL.textContent="Very Close!";
                vcorrect.play();
                score1=score1-25;
            }
            else if(guess-scretNum<=5&&guess-scretNum>0){
                msgEL.textContent="Try a slightly lower number!";
                scorrect.play();
                score1=score1-50;
            }
            else if(scretNum-guess<5&&scretNum-guess>0){
                msgEL.textContent="Try a slightly higher number!";
                scorrect.play();
                score1=score1-50;
            }
            else if(guess-scretNum>5){
                msgEL.textContent="Too High!";
                wrong.play();
                score1=score1-100;
            }
            else if(scretNum-guess>5){
                msgEL.textContent="Too Low!";
                wrong.play();
                score1=score1-100;
            }
          }  
    }

        else{
            go.play();
            msgEL.textContent="Game Over. The number was "+scretNum;
            btnEL.textContent="Play Again";
            livrem.textContent="Out of Lives!"
            lives[lives.length - 1].remove();
            brlives.style.display="block";
            btnEL.addEventListener("click", function() {
                location.reload();
                
            })
        }
        score.textContent=score1;
    }
    else{
        msgEL.textContent="Please Enter a Number!";
        fault.play();
    }
})