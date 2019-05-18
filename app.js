var scores, roundScore, player_scores, activePlayer, previousRoll;
var currentScoreDOM, totalScoreDOM, diceDOM, playerPanelDOM, playerNameDOM;

player_scores = [0, 0];
roundScore = 0;
winMargin = 100;
activePlayer = 0; // 0 is player A | 1 is player B
currentScoreDOM = [document.getElementById('current-0'),
                  document.getElementById('current-1')];
totalScoreDOM = [document.getElementById('score-0'),
                document.getElementById('score-1')];
playerPanelDOM = [document.querySelector('.player-0-panel'),
                 document.querySelector('.player-1-panel')];
playerNameDOM = [document.getElementById('name-0'),
                document.getElementById('name-1')];
diceDOM = document.querySelector('.dice');

// Initail setup function calls
setUpEventListeners();


function setUpEventListeners() {
    setUpNewGameButton();
    setUpRollDiceButton();
    setUpHoldButton();
    setUpSubmitButton();
    setUpRuleButton();
    setUpCloseButton();
}

function setUpCloseButton() {
    document.querySelector('.btn-close').addEventListener('click', function() {
        document.querySelector('.wrapper-3').style.display = 'none';
        document.querySelector('.wrapper').style.display = 'block'; 
    });
}

function setUpRuleButton() {
    document.querySelector('.btn-rule').addEventListener('click', function() {
        document.querySelector('.wrapper').style.display = 'none';
        document.querySelector('.wrapper-3').style.display = 'block';
    });
}

function setUpSubmitButton() {
    document.querySelector('.btn-set').addEventListener('click', function() {
        var marginDOM = document.getElementById('marginInput');
        var margin = Number(marginDOM.value);
        if (!Number.isNaN(margin) && margin !== "" && margin !== null && margin !== 0) {
            winMargin = margin;
            toggleWinScoreMargin(false);
        }
        else {
            alert("Please enter only numbers!");
        }
        marginDOM.value = '';
    });
}

function setUpNewGameButton() {
    document.querySelector('.btn-new').addEventListener('click', function() {
       resetGame(); 
        toggleWinScoreMargin(true);
    });
}

function setUpHoldButton() {
    document.querySelector('.btn-hold').addEventListener('click', function() {
        if (roundScore !== 0) {
            // Adds active player's round score to total score
            player_scores[activePlayer] += roundScore;
            totalScoreDOM[activePlayer].textContent = player_scores[activePlayer];
            if (player_scores[0] >= winMargin) {
                winGame(0);
            }
            else if (player_scores[1] >= winMargin) {
                winGame(1);
            }
            else {
                changeTurn();
            }
        }
        else {
            alert('You cannot hold a score of 0');
        }
    });
}

function setUpRollDiceButton() {
    document.querySelector('.btn-roll').addEventListener('click', function() {
        // Once the player started playing, they should no longer be able to change the win margin
        toggleWinScoreMargin(false);
        
        var dice = getRandomInt(1,7);
        
        // If player roll two six in a roll then they lose all points
        if (dice === 6 && previousRoll === 6) {
            totalScoreDOM[activePlayer].textContent = 0;
            player_scores[activePlayer] = 0;
        }
        
        previousRoll = dice;
        
        diceDOM.style.display = 'block';
        // change the dice image and current point accordingly to the roll result 
        diceDOM.src = 'dice-' + dice + '.png';
        
        // Active player loses the round score and change turn
        if (dice == 1) {
            changeTurn()
        }
        else{
            roundScore += dice;
            currentScoreDOM[activePlayer].textContent = roundScore;
        }
    });
}

function changeTurn() {
    roundScore = 0;
    currentScoreDOM[activePlayer].textContent = 0;
    playerPanelDOM[activePlayer].classList.toggle('active');
    activePlayer = activePlayer ==0 ? 1 : 0;
    playerPanelDOM[activePlayer].classList.toggle('active');
    diceDOM.style.display = 'none';
}

function winGame(winner) {
    playerNameDOM[winner].textContent = 'WINNER';
    playerNameDOM[winner].style.color = '#FF0000';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    diceDOM.style.display = 'none';
}

function resetGame() {
    activePlayer = 0;
    roundScore = 0;
    winMargin = 100;
    diceDOM.style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    for (var i = 0; i < 2 ; i++) {
        currentScoreDOM[i].textContent = 0;
        totalScoreDOM[i].textContent = 0;
        player_scores[i] = 0;
        playerNameDOM[i].textContent = 'Player ' + (i + 1);
        playerNameDOM[i].style.color = '#000000';
    }
    //
    if (!playerPanelDOM[0].classList.contains('active')) {
        playerPanelDOM[0].classList.add('active');
        playerPanelDOM[1].classList.remove('active');
    }
}

function toggleWinScoreMargin(active) {
    var winMarginPanelDOM = document.querySelector('.wrapper-2');
    if (active) {
        winMarginPanelDOM.style.display = 'block';
    }
    else {
        winMarginPanelDOM.style.display = 'none';
    }
}

/*
Function that returns a random number that is greater or equal to min 
but less than max. 
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min)) + min;
}