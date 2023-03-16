/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll1, prevRoll2, winningScore;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Random Number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display result
        document.getElementById('dice1').style.display = 'block';
        document.getElementById('dice1').src = 'dice-' + dice1 + '.png';

        document.getElementById('dice2').style.display = 'block';
        document.getElementById('dice2').src = 'dice-' + dice2 + '.png';

        //3. Update round score IF the rolled number is not a 1 and not two 6s in a row
        if(dice1 !== 1 && dice2 !== 1) {
            if((prevRoll1 == 6 && dice1 == 6) || (prevRoll2 == 6 && dice2 == 6)) {
                //Set score to 0
                scores[activePlayer] = 0;
                updateScoreUI();
                nextPlayer();
                console.log('REASON: Dice 1: Previous Roll: ' + prevRoll1 + ' Current Roll: ' + dice1)
                console.log('REASON: Dice 2: Previous Roll: ' + prevRoll2 + ' Current Roll: ' + dice2)
            } else {
                 //Add round score
                roundScore += dice1 + dice2
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                prevRoll1 = dice1;
                prevRoll2 = dice2;
            }
        } else {
            //Next player
            nextPlayer();
            console.log('REASON: Dice 1: Current Roll: ' + dice1)
            console.log('REASON: Dice 2: Current Roll: ' + dice2)
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Add current score to global score
        scores[activePlayer] += roundScore;

        //2. Update UI
        updateScoreUI();

        //3. Check if player won game 
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('#dice1').style.display = 'none';
            document.querySelector('#dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';
}

function newGame() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    prevRoll = 0;
    winningScore = document.getElementById('winningScore').value;

    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

function updateScoreUI() {
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. 
*/