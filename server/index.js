const { Console } = require('console');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let playerCount = 0;
let board = ['','','','','','','','',''];

let playerId = { };
const PlayersInfo = [];

wss.on('connection', (ws) => {

    console.log(playerCount);
    if(playerCount <= 1)
    {
        
    console.log('Player connected');
    playerCount++;

    const clientId = generateClientID();
    PlayersInfo.push({ws, clientId});

    ws.send(JSON.stringify({type: "init", clientId}));

    // ws.send(JSON.stringify({type : "board", board}));


  ws.on('message', (message) => {
    console.log(`Received message from client ${clientId}: ${message}`);
    const data = JSON.parse(message);

    if(data.type === "resetBoard")
    {
        const {clientId} = data;
        board = Array(9).fill('');
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN)
            {
                client.send(JSON.stringify({type:"setBoard", board, clientId}));
            }
        });
    }

    if(data.type === "move")
    {
        const {clientId, index} = data;
        console.log("message from : " + clientId);
        if(clientId === playerId.player1)
        {
            board[index] = 'X';
            wss.clients.forEach((client) => {
                if(client.readyState === WebSocket.OPEN)
                client.send(JSON.stringify({type: "setCurrPlayer", clientId:playerId.player2, board}));
            })
        }
        else if(clientId === playerId.player2)
         {
            board[index] = 'O';
            wss.clients.forEach((client) => {
                if(client.readyState === WebSocket.OPEN)
                client.send(JSON.stringify({type: "setCurrPlayer", clientId:playerId.player1, board}));
            })
         }  

    }
    
    if(data.type === "setId")
    {
        const {clientId,name} = data;
        console.log(clientId);
        if(!playerId.player1)
        {
            playerId.player1 = clientId;
            playerId.player1move = 'X';
            playerId.player1Name = name;
        }
        if(playerId.player1 !== clientId && !playerId.player2)
        {
            playerId.player2 = clientId;
            playerId.player2move = 'O';
            playerId.player2Name = name;

            // ws.send(JSON.stringify(playerId));
            wss.clients.forEach((client) => {
                if(client.readyState === WebSocket.OPEN)
                client.send(JSON.stringify({ type : "setPlayers", playerId}));
            })
        }
        // playerId.push(clientId);
        console.log(playerId);
    }
    // console.log(wss.clients);
    wss.clients.forEach((client) => {
        // console.log("gg" + client);
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type : "mssg", message }));
        }
      });
    // Handle message from client
  });

 
  ws.on('close', () => {
    console.log('Client disconnected');
    playerCount = 0;
    const index = PlayersInfo.findIndex((player) => player.ws === ws);

    if(index !== -1)
    {
        console.log(`client disconnected : ${PlayersInfo[index].clientId}`);
        playerId = {};
        wss.clients.forEach((client) => {
            if(client.ws !== ws)
            client.send(JSON.stringify({type: "setPlayers", playerId}));
        })
        PlayersInfo.splice(index,1);
        board = ['','','','','','','','',''];
       
        console.log(playerId);
        
    }

    // Handle client disconnection
  });
}
});

function generateClientID()
{
    return Math.random().toString(36).substring(2, 9);
}

server.listen(8000, () => {
  console.log('Server started on http://192.168.29.144:8000');
});
