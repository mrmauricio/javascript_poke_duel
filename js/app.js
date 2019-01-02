// ----------------------------------
// ----------- CONTROLLER -----------
// ----------------------------------

// next step: make turn changing and config movement

class Controller {

    constructor(piecesView, boardView) {
        this.piecesView = piecesView;
        this.boardView = boardView;
    }

    init() {
        this.piecesView.init(this);
        this.boardView.init(this);
    }

    // playerData functions:
    getPlayerData() {
        return model.playerData;
    }

    getPlayerDataByID(ID) {
        return model.playerData.find(player => player.ID === ID);
    }

    getPlayerDataByName(name) {
        return model.playerData.find(player => player.name === name);
    }

    // pieceData functions:
    getPieceData() {
        return model.pieceData;
    }

    getPieceDataByID(ID) {
        return model.pieceData.find(piece => piece.ID === ID);
    }

    // boardPositions functions:
    getBoardPositions() {
        return model.boardPositions;
    }

    // activePlayers functions:
    getActivePlayers() {
        return model.activePlayersID;
    }

    // gamePieces functions:
    getGamePieces() {
        return model.gamePieces;
    }

    getCurrentPlayerTurn() {
        return model.currentTurn;
    }

    // change the player name on the model's variable currentTurn. optimized for games with 2+ players
    changeTurn() {
        let playerNames = [],
            activePlayersID = this.getActivePlayers(),
            currentIndex = 0;

        for (const activePlayerID of activePlayersID) {
            playerNames.push(this.getPlayerDataByID(activePlayerID).name);
        }
        currentIndex = playerNames.indexOf(this.getCurrentPlayerTurn());
        
        if (currentIndex === (playerNames.length - 1)) {
            model.currentTurn = playerNames[0];
        } else {
            currentIndex++;
            model.currentTurn = playerNames[currentIndex];
        }
    }    

    // function executed when a piece enters the board
    manageBoardEnter(element, playerName, index) {
        this.handToField(playerName, index);
        this.piecesView.managePieceEvents(false)
        this.boardView.enterBoard(element, playerName); 
       // this.piecesView.changeImg(this.getPieceDataByID(0).imgRoute, element);
    }

    // call piecesView function that change img to blank and disable event
    changeImg(element) {
        this.piecesView.changeImg(this.getPieceDataByID(0).imgRoute, element);
    }

    // change the current player's info, deleting the piece from the handPieces and inserting on the
    // fieldPieces
    handToField(playerName, index){
        let currentPlayer = this.getPlayerDataByName(playerName);
        let currentValue = currentPlayer.handPiecesID[(index - 1)];
        currentPlayer.fieldPiecesID[(index - 1)] = currentValue;
        currentPlayer.handPiecesID[(index - 1)] = 0;
    }        

    // get the index of the current board position
    getBoardPositionIndex(currentPosition) { 
        return model.boardPositions.indexOf(currentPosition);
    }

    // get the board connected to the one whose index is passed as a parameter
    getBoardConnectionsByIndex(index) { 
        return model.boardConnections[index];
    }    

}
// ----------------------------------
// -------------- VIEW --------------
// ----------------------------------

class PiecesView {  

    // initialize the pieces view 
    // the for loop set events for each player's handpieces, according to their turns.
    init(controller) {
        this.controller = controller;
        this.handleClick = this.handleClick.bind(this);        
        this.selectHandDivs();
        this.selectPiecesElements();
        this.managePieceEvents(true);
    }

    //add the player's hands div to the array and then call render() for all existing players
    selectHandDivs() {
        this.handDivs = [0]; //starts with 0 so the next positions can be the same as their ID 
        const players = this.controller.getPlayerData();

        for (const player of players) {
            let playername = player.name;
            this.handDivs.push(document.getElementById(playername));
            this.renderActivePlayers(player.name);
        }
    }

    // add to the piecesElements array the elements for each player's pieces, inside an object 
    // containing both the player name and the element.
    selectPiecesElements() {
        this.piecesElements = [];
        let activePlayersID = this.controller.getActivePlayers();

        for (const activePlayer of activePlayersID) {
            let playerName = this.controller.getPlayerDataByID(activePlayer).name;
            for (const handDiv of this.handDivs) {
                if (handDiv !== 0 && handDiv !== null && handDiv.id === playerName) {
                    this.piecesElements.push({
                        player: playerName,
                        elements: Array.from(handDiv.childNodes)
                    });
                }
            }
        }
    }

    // checks if the player's name passed as a parameter is set as an active player, and if its true, 
    // then renders its hand (deleting current content and then adding the pieces set in the playerData's 
    // handDivs parameter)
    renderActivePlayers(player) {
        const activePlayers = this.controller.getActivePlayers();

        for (const activePlayer of activePlayers) {
            let playerPieces,
                currentPlayer = this.controller.getPlayerDataByID(activePlayer).name,
                handPiecesDiv = this.handDivs[this.controller.getPlayerDataByName(currentPlayer).ID],
                gamePieces = this.controller.getGamePieces(),
                i = 0;

            if (player === currentPlayer) {
                handPiecesDiv.innerHTML = '';
                playerPieces = this.controller.getPlayerDataByName(currentPlayer).handPiecesID.map(this.controller.getPieceDataByID);
                for (const playerPiece of playerPieces) {
                    this.addHandPiece(playerPiece.imgRoute, handPiecesDiv, `${currentPlayer}-${gamePieces[i]}`);
                    i++;
                }
            }
        }
    }

    // gets the img url, the parent div and the element ID and then append
    addHandPiece(route, div, id) {
        const img = document.createElement("img");
        img.src = route;
        img.setAttribute("class", "hand-pieces pointer");
        img.setAttribute("id", id);
        div.appendChild(img);
    }

    // change the handpiece's image to a blank one and disable its event
    changeImg(route, element) {
        document.getElementById(element.id).src = route;
        element.classList.remove("pointer");
        this.manageBoardEnterEvent(element, false);
    }

    // function executed on the click event for the hand pieces, managing board enter
    handleClick(event) {
        //console.log(this); // this in this case = the element
        let playerName = event.target.id.split("-")[0],
            index = event.target.id.split("-")[2];
        this.controller.manageBoardEnter(event.target, playerName, index);
    }

    // when boolean parameter is true, adds an event. when false, disables it.
    manageBoardEnterEvent(element, boolean) {
        if (boolean === true){ 
            element.addEventListener('click', this.handleClick);
        }   
        if (boolean === false) { 
            element.removeEventListener('click', this.handleClick);
        }
    }

    // disable all events related to the current player's handPieces
    managePieceEvents(bool) {
        for (const pieceElement of this.piecesElements) {
            if (pieceElement.player === this.controller.getCurrentPlayerTurn()) {
                for (const element of pieceElement.elements) {
                    this.manageBoardEnterEvent(element, bool);
                }
            }
        }
    }    
}

class BoardView {

    //
    init(controller) {
        this.controller = controller;
        this.handleMovement = this.handleMovement.bind(this);
        this.selectBoardPositionsDivs();

    }

    // manage board entering settings
    enterBoard(element, playerName) {
        let positions = this.controller.getPlayerDataByName(playerName).startingPositions;
        this.currentMovementOptions = [];
        this.fade(element);
        console.log(element);

        for (const position of positions) {
            let index = this.controller.getBoardPositionIndex(position);
            this.selectMovement(position, element, false);    
            this.addClassToDot(this.controller.getBoardPositionIndex(position));
            this.manageMovementEvent(index, true);
            this.currentMovementOptions.push(position);
        }
    }

    // pass the current board position by parameter and then select it's connections. then, applu
    // the pulse effect to the selected dots. the bool parameter refers to the enterboard function.
    selectMovement(currentPosition, element, bool) {
        let positions = this.controller.getBoardPositions(),
            currentIndex = this.controller.getBoardPositionIndex(currentPosition),
            connections = this.controller.getBoardConnectionsByIndex(currentIndex).connections;
        this.currentElement = element;      

            if(bool) {
                this.currentMovementOptions = []; // reset when its not the first enter
            }

            for (const connection of connections) {
                this.currentMovementOptions.push(connection);
                let index = positions.indexOf(connection);
                this.addClassToDot(index);
                this.manageMovementEvent(index, true);
            }

            if(bool) {  // when entering, this part of the function cant be executed

            }
    }

    // function executed when movement place is chosen:
    // inserts piece in the selected place (with same properties except id), then disables other movements
    // events and pulse effect. also, makes the handpiece disappear.
    handleMovement(event) {
        //console.log(this);        // this was bound to this = boardView
        //console.log(event.currentTarget);     // the current event target 
        const img = document.createElement("img");
        img.src = this.currentElement.getAttribute("src");
        img.setAttribute("class", "piece square-left pointer");
        img.setAttribute("id", `${this.currentElement.getAttribute("id")}-field`);   
        event.currentTarget.insertAdjacentElement('afterend', img);   
        this.disableOtherMovementOptions();     
        controller.changeImg(this.currentElement)  
        //console.log(boolean);     // falta desativar os eventos e os pulse
    }

    // when boolean parameter is true, adds an event. when false, disables it.
    manageMovementEvent(index, boolean) {
        let element = this.selectDot(index);
        if (boolean === true){ 
            element.addEventListener('click', this.handleMovement);
        }   
        if (boolean === false) { 
            element.removeEventListener('click', this.handleMovement);
        }
    }

    // disable events and pulse from all movement options
    disableOtherMovementOptions() {
        let positions = this.controller.getBoardPositions();
              
        for (const currentMovementOption of this.currentMovementOptions) {
            let index = positions.indexOf(currentMovementOption), 
                currentDot = this.selectDot(index);
                this.manageMovementEvent(index, false);
                currentDot.classList.remove("pulse");
        }  
    }

    // add the css class pulse to the selected dots
    addClassToDot(index) {
        let currentDot = this.selectDot(index);
        currentDot.classList.add("pulse");
    }

    // receive index by parameter and then returns it's div's element
    selectDot(index) {
        let currentDiv = this.boardPositionsDivs[index];
        return currentDiv.querySelector("img.dot");
    }

    // apply javascript fade effect 
    fade(element) {
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.3){ //0.1
                clearInterval(timer);
                //element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.5; //0.1
        }, 50);
    }

    // add the board position's divs to the array in the same order as the boardPosition's array
    // so boardPositionDivs[0] = boardPositions[0]
    selectBoardPositionsDivs() {
        let boardPositions;
        this.boardPositionsDivs = [];
        boardPositions = this.controller.getBoardPositions();

        for (const boardPosition of boardPositions) {
            this.boardPositionsDivs.push(document.getElementById(boardPosition));
        }
    }
}

//window.addEventListener("DOMContentLoaded", function() {
const piecesview = new PiecesView();
const boardview = new BoardView();
const controller = new Controller(piecesview, boardview);
controller.init();
//}, false);
