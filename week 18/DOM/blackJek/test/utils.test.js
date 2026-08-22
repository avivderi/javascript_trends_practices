import {it, describe, mock} from 'node:test'
import assert from 'node:assert'
import { hendEvauletion } from '../utils/cards.utils.js'

describe("hendEvauletion", () => {
    it ('should sum simple number cards correctly', () => {
        const hand = [{rank: 7, suit: '♥'}, {rank: 8, suit: '♦'}]
        assert.strictEqual(hendEvauletion(hand), 15)
    })

    it ('Changing "Q/J/K" to value 10', () => {
        const hand = [{rank: 'K', suit: '♥'}, {rank: 8, suit: '♦'}]
        assert.strictEqual(hendEvauletion(hand), 18)
    })

    it ('checking "A" to value 1', () => {
        const hand = [{rank: 'Q', suit: '♥'}, {rank: 8, suit: '♦'}, {rank: 'A', suit: '♦'}]
        assert.strictEqual(hendEvauletion(hand), 19)
    })

    it ('checking "A" to value 11', () => {
        const hand = [{rank: 'Q', suit: '♥'}, {rank: 'A', suit: '♦'}]
        assert.strictEqual(hendEvauletion(hand), 21)
    })
})