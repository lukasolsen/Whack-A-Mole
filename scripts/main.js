const holes = [...document.querySelectorAll('.hole')];
const currScore = document.getElementById('currentScore');
const highScore = document.getElementById('highScore');
let score = 0;
let numMoles = 0;

let gameState = GameState.MENU;

// Mole
let moleDisplay = false;
let moleTimer = null;

function start(){  
  gameState = GameState.MENU;
  menu();
}

function mole() {
    if (moleDisplay == false && gameState == GameState.STARTED) {
      const i = Math.floor(Math.random() * holes.length);
      const hole = holes[i];
  
      // Limit the maximum number of moles to 4
      if (hole.childElementCount < 4) {
        const img = document.createElement("img");
        img.classList.add("mole");
        img.src = "assets/mole/mole.png";
  
        img.addEventListener("click", () => {
          score += 10;
          currScore.innerText = score;
          highscore();
          img.src = "assets/mole/mole-whacked.png";
          clearTimeout(timer);
          setTimeout(() => {
            hole.removeChild(img);
            mole();
          }, 500);
        });
  
        hole.appendChild(img);
  
        // Gradually speed up the spawn rate
        const spawnTime = Math.max(2000 - score * 10, 500);
        const removeTime = spawnTime - 500;
  
        timer = setTimeout(() => {
          hole.removeChild(img);
          mole();
        }, removeTime);
      }
    }
}

function pause(){
    if (gameState == GameState.PAUSED){
        gameState = GameState.STARTED;
        document.body.style.background = '#fb8500';
        var audio = new Audio("assets/music/menu/098_Unpause_04.wav");
        audio.play();
    }else if(gameState == GameState.STARTED){
        gameState = GameState.PAUSED;
        document.body.style.background = '#934e00';
        var audio = new Audio("assets/music/menu/092_Pause_04.wav");
        audio.play();
        mole();
    }
    
}

function menu(){
  if (gameState == GameState.MENU){
    
    // Play Function
    document.getElementById('play').addEventListener('click', function(){
      var audio = new Audio("assets/music/menu/001_Hover_01.wav");
      audio.play();

      document.getElementById('menu').style.display = 'none';
      document.getElementById('gameplay').style.display = 'block';
      gameState = GameState.STARTED;
      mole();
    });

    // About
    document.getElementById('about').addEventListener('click', function(){
      var audio = new Audio("assets/music/menu/001_Hover_01.wav");
      audio.play();

      document.getElementById('menu-wrapper').style.display = 'none';
      document.getElementById('about-wrapper').style.display = 'block';
    });

    document.getElementById('about-back').addEventListener('click', function(){
      var audio = new Audio("assets/music/menu/001_Hover_01.wav");
      audio.play();

      document.getElementById('menu-wrapper').style.display = 'block';
      document.getElementById('about-wrapper').style.display = 'none';
    });

    // Exit
    document.getElementById('exit').addEventListener('click', function(){
      window.close();
    });

    // Options Wrapper
    document.getElementById('options').addEventListener('click', function(){
      var audio = new Audio("assets/music/menu/001_Hover_01.wav");
      audio.play();

      document.getElementById('menu-wrapper').style.display = 'none';
      document.getElementById('options-wrapper').style.display = 'block';
    });

    document.getElementById('options-back').addEventListener('click', function(){
      var audio = new Audio("assets/music/menu/001_Hover_01.wav");
      audio.play();

      document.getElementById('menu-wrapper').style.display = 'block';
      document.getElementById('options-wrapper').style.display = 'none';
    });
  
  
  }
}

addEventListener('keydown', (event) => {
    if (event.keyCode == 27){
        pause();
        console.log(gameState);
    }
});

function highscore(){
    if (Number(score) > Number(Player.highscore)){
        highScore.innerText = Number(score);
        Player.highscore = score;
    }
}

function backgroundMusic(){
  music = false;
  setInterval(function(){
    if (typeof window !== "undefined"){
      music = true;
    }else{
      music = false;
    }
  }, 1500);
  if (music === true){
    const music = new Audio('assets/music/theme.mp3');
    music.autoplay = true;
    music.loop = true;
  } 
  
}


start();