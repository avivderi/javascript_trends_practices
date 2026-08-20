import express from 'express'
import dotenv from 'dotenv'
import { startGame,
        startRound,
        hit,
        stand,
        myRound
        } from './controllers/controller.js'
import functionService from './service/service.js';
import playerRepo from "./repo/playerRepo.js";
import roundRepo from './repo/roundRepo.js'


const roundService = functionService(roundRepo, playerRepo)

export async function checkOpenRound(req, res, next) {
    try {
        const playerId = req.get('x-player-id');
        if (!playerId) {
            return res.status(401).json({ message: 'Unauthorized: Missing x-player-id header' });
        }

        const round = await roundService.getRound(playerId);
        if (!round) {
            return res.status(404).json({ message: "You don't have an open round" });
        }

        req.playerId = playerId;
        req.round = round;

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function authPlayer(req, res, next) {
    try {
        const playerId = req.get('x-player-id');
        if (!playerId) {
            return res.status(401).json({ message: 'Unauthorized: Missing x-player-id header' });
        }
        req.playerId = playerId;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.post('/start-game', startGame)

app.post('/start-round', authPlayer, startRound)

app.post('/hit', checkOpenRound, hit)

app.post('/stand', checkOpenRound, stand)

app.get('/my-round', myRound)

app.listen(PORT, () => {
    console.log(`the server is running in port ${PORT}...`)
})