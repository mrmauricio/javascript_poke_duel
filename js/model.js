// ----------------------------------
// -------------- MODEL -------------
// ----------------------------------

let model = {
    currentTurn: 'player1',
    activePlayersID:[
        1,
        2
    ],
    gamePieces:[
        "first-1",
        "second-2",
        "third-3",
        "fourth-4",
        "fifth-5",
        "sixth-6"
    ],
    playerData:[
        {
            ID: 1,
            name: 'player1',
            handPiecesID: [1,2,3,4,1,3],
            fieldPiecesID: [0,0,0,0,0,0],
            lostPieces: [0,0,0,0,0,0],
            startingPositions: ['e1','e7']
        },
        {
            ID: 2,
            name: 'player2',
            handPiecesID: [3,4,1,2,4,2],
            fieldPiecesID: [0,0,0,0,0,0],
            lostPieces: [0,0,0,0,0,0],
            startingPositions: ['a1','a7']            
        },
        {
            ID: 3,
            name: 'player3',
            handPiecesID: [1,2],
            fieldPiecesID: [],
            lostPieces: [],
            startingPositions: []                
        }
    ],
    pieceData:[
        {
            ID: 1,
            name: 'Blue',
            imgRoute: 'img/piece-sqr-blue.png',
            moveListID: [],
            MP: 2
        },
        {
            ID: 2,
            name: 'Purple',
            imgRoute: 'img/piece-sqr-purple.png',
            moveListID: [],
            MP: 2
        },
        {
            ID: 3,
            name: 'White',
            imgRoute: 'img/piece-sqr-white.png',
            moveListID: [],
            MP: 2
        },
        {
            ID: 4,
            name: 'Yellow',
            imgRoute: 'img/piece-sqr-yellow.png',
            moveListID: [],
            MP: 2
        },      
        {
            ID: 0,
            imgRoute: 'img/blank.png'
        }                         
    ],
    moveListData:[
        {

        }
    ],
    boardPositions:[
        'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 
        'b1',    'b2',    'b4',    'b6',    'b7', 
        'c1',    'c2',             'c6',    'c7', 
        'd1',    'd2',    'd4',    'd6',    'd7', 
        'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7'
    ],
    boardConnections:[
        {
         position: 'a1' ,
         connections: ['a2','b1','b2']
        },
        {
         position: 'a2' ,
         connections: ['a1','a3']
        },
        {
         position: 'a3' ,
         connections: ['a2','a4','b4']
        },
        {
         position: 'a4' ,
         connections: ['a3','a5']
        },
        {
         position: 'a5' ,
         connections: ['a4','a6']
        },
        {
         position: 'a6' ,
         connections: ['a5','a7']
        },
        {
         position: 'a7' ,
         connections: ['a6','b7','b6']
        },
        {   
         position: 'b1' ,
         connections: ['a1','c1']
        },
        {
         position: 'b2' ,
         connections: ['a1','c2','b4']
        },
        {
         position: 'b4' ,
         connections: ['b2','b6','a3']
        },
        {
         position: 'b6' ,
         connections: ['b4','c6','a7']
        },
        {
         position: 'b7' ,
         connections: ['a7','c7']
        },        
        {
         position: 'c1' ,
         connections: ['d1','b1']
        },    
        {
         position: 'c2' ,
         connections: ['b2','d2']
        },
        {
         position: 'c6' ,
         connections: ['b6','d6']
        },
        {
         position: 'c7' ,
         connections: ['b7','d7']
        },        
        {
         position: 'd1' ,
         connections: ['e1','c1']
        },
        {
         position: 'd2' ,
         connections: ['e1','c2','d4']
        },
        {
         position: 'd4' ,
         connections: ['d2','d6','e5']
        },
        {
         position: 'd6' ,
         connections: ['d4','c6','e7']
        },
        {
         position: 'd7' ,
         connections: ['e7','c7']
        },  
        {
         position: 'e1' ,
         connections: ['d1','e2','d2']
        },
        {
         position: 'e2' ,
         connections: ['e1','e3']
        },
        {
         position: 'e3' ,
         connections: ['e2','e4']
        },
        {
         position: 'e4' ,
         connections: ['e3','e5']
        },
        {
         position: 'e5' ,
         connections: ['e4','e6','d4']
        },
        {
         position: 'e6' ,
         connections: ['e5','e7']
        },
        {
         position: 'e7' ,
         connections: ['e6','d7','d6']
        },

    ] 

}