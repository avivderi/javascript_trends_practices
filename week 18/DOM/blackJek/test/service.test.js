import {it, describe, mock} from 'node:test'
import assert from 'node:assert'
import functionService from '../service/service.js'

// const roundService = functionService(roundRepo, playerRepo)

describe("getRound", () => {
    it('should return the round with status IN-PROGRES when one exists', async () => {
        const finishedRound = { _id: 'r1', playerId: 'p1', status: 'player_win' }
        const openRound = { _id: 'r2', playerId: 'p1', status: 'IN-PROGRES' }
        const roundRepo = {
            find: mock.fn(async () => [finishedRound, openRound])
        }
        const playerRepo = {}
        const service = functionService(roundRepo, playerRepo)
        const result = await service.getRound('p1')
        
        assert.deepEqual(roundRepo.find.mock.calls.length, 1)
        assert.deepStrictEqual(roundRepo.find.mock.calls[0].arguments, ['p1'])
        assert.deepStrictEqual(result, openRound)
    })
})