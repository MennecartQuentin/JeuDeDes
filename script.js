/*
GAME RULES:
- Le jeu se compose de 2 joueurs, jouant en tours à chaque tour.
- Chaque joueur peut lancer ses dés autant de fois qu'il le souhaite.
- Chaque résultat qu'ils obtiennent après avoir lancé leurs dés sera ajouté à son score ROUND mais, si le joueur lance un 1 dans ses dés, tout son score ROUND sera perdu.
- Ensuite, le joueur suivant aura son tour, le joueur peut choisir l'option "Hold", ce qui signifie que son score ROUND est ajouté à son score GLOBAL et sera ajouté à son tableau de bord.
- Apres cela, c'est à nouveau au tour du joueur suivant et de même, le jeu se termine si l'un des joueurs entre deux, atteint d'abord 100 points sur le tableau de bord GLOBAL.

*/

// player name
var player1 = 'Player 1';
var player2 = 'Player 2';

var scores, roundScore, activePlayer, gamePlaying;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. random number 
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice' + dice + '.png';


        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});
//Next player
function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');



    document.querySelector('.dice').style.display = 'none';
}

// new game
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


// Function to change the player name

function editNames() {
    player1 = prompt('Change Player1 name');
    player2 = prompt('Change player2 name');

    document.querySelector('.player1').innerHTML = player1;
    document.querySelector('.player2').innerHTML = player2;
}