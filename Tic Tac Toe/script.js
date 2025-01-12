window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'))
    const playerDisplay = document.querySelector('.display-player')
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer')
    

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;


    const PlayerX_won = 'PLAYERX_WON';
    const PlayerO_won = 'PLAYERO_WON';
    const tie = 'Tie';

    // index of the box
    //     0   1   2
    //     3   4   5
    //     6   7   8

    const winningvConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];     


    function handleResultValidation(){
        let roundWon = false;
        for (let i=0; i<=7; i++){
            const winCondition = winningvConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            if (a === '' || b === '' || c === ''){
                continue;
            }
            
            if (a === b && b === c){
                roundWon = true;
                break;
            }
        }
        

        if (roundWon){
            announce(currentPlayer === 'X'? PlayerX_won : PlayerO_won);
            isGameActive = false;
            return;
        }

        if (!board.includes(''))
            announce(tie);
    }

    const announce = (type) => {
        switch (type){
            case PlayerO_won:
                announcer.innerHTML = 'Player <span class="PlayerO">O</span> Won';
                break;
            case PlayerX_won:
                announcer.innerHTML = 'Player <span class="PlayerX">X</span> Won';
                break;
            case tie:
                announcer.innerText = 'Tie';
                break;
        }
        announcer.classList.remove('hide');
    }


    const isValidation = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === "O"){
            return false;
        }
        return true;
    }

    const updateBoard = (index) =>{
        board[index] = currentPlayer;
    }


    const changePlayer = () =>{
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }


    const userAction = (tile, index) => {
        if (isValidation(tile) && isGameActive){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }


    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide')

        if (currentPlayer === 'O'){
            changePlayer();
        }

        tiles.forEach(tile=>{
            tile.innerText = '';
            tile.classList.remove('playerX')
            tile.classList.remove('playerO')
        })
    }


    tiles.forEach((tile, index) => {
        tile.addEventListener('click', ()=>userAction(tile, index));
        
    })   

    resetButton.addEventListener('click', resetBoard);
    
})