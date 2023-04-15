const Player = {
    name: '',
    score: 3,
    lives: 3,
    highscore: 0,
    level: 1
};

const PlayerAbilities = [
    { name: 'Speed', description: 'Gives the you a temporary increase in movement speed, allowing you to hit moles more quickly.', 
    rarity: 'Common', max_amount: 5, amount: 0, allowed: true }
]

function Save(){
    localStorage.setItem('highScore', highscore.toString());
}

function retrieveStorage(){
    Player.highscore = parseInt(localStorage.getItem('highScore'));
}