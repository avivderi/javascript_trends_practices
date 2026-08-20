import functionService from "../service/service.js";
import playerRepo from "../repo/playerRepo.js";
import roundRepo from '../repo/roundRepo.js'

const roundService = functionService(roundRepo, playerRepo)

export async function startGame(req, res) {
    try {
        const playerId = await playerRepo.create();
        res.status(201).json({ playerId, chips: 1000 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function startRound(req, res) {
    try {
        const playerId = req.playerId
        const round = req.round
        const { bet } = req.body || {};

        const validation = await roundService.valideBet(playerId, bet);
        if (!validation.success) {
            const status = validation.isOpenRound ? 409 : 400;
            return res.status(status).json({ message: validation.msg });
        }

        const dataStartRound = await roundService.startRound(playerId, bet);
        return res.status(201).json(dataStartRound);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function hit(req, res) {
    try {
        const playerId = req.playerId
        const round = req.round

        const result = await roundService.playerHit(playerId, round);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error.stack)
        res.status(500).json({ message: error });
    }
}

export async function stand(req, res) {
    try {
        const playerId = req.playerId
        const round = req.round

        const result = await roundService.playerStand(playerId, round);
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function myRound(req, res) {
    try {
        const playerId = req.playerId;
        const round = await roundService.getRound(playerId);

        if (!round) {
            return res.status(200).json({ round: null });
        }

        return res.status(200).json(round);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}