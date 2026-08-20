import { getRandomCards, hendEvauletion } from "../utils/cards.utils.js";

export default function(roundRepo, playerRepo){
    return {
        getRound: async (playerId) => {
            const rounds = await roundRepo.find(playerId)
            const [round] = rounds.filter(round => round.status === "IN-PROGRES")
            return round
        },


        startRound: async (playerId, bet) => {
            const playerCards =  [getRandomCards(), getRandomCards()]
            const dealerCards = [getRandomCards()]

            const player = await playerRepo.find(playerId)
            const newPlayerChips = Number(player.chips) - bet
            await playerRepo.updateChips(playerId, newPlayerChips)

            const roundId = await roundRepo.create({
                playerId,
                bet,
                playerCards,
                dealerCards
            })
            return {roundId, playerCards, dealerCards, chips: newPlayerChips}
        },

        async playerHit (playerId, round) {
            round.playerCards.push(getRandomCards())
            
            const handValue = hendEvauletion(round.playerCards)
            
            if (handValue <= 21) {
                const {playerCards, status} = round
                await roundRepo.update(playerId, round)
                return {playerCards, playerTotal: handValue, status, chips: (await playerRepo.find(playerId)).chips}
            }
            await roundRepo.update(playerId, round)
            return await this.endGame(playerId, 'player_bust', round)
        },


        async playerStand (playerId, round) {
            let dealerCardsValue = hendEvauletion(round.dealerCards)

            while (dealerCardsValue < 17) {
            round.dealerCards.push(getRandomCards())
            dealerCardsValue = hendEvauletion(round.dealerCards)
            }

            return await this.endGame(playerId, null, round)
        },


        async endGame (playerId, status = null, existsRound) {
            const round = existsRound

            let finalStatus = status

            let playerCardsValue;
            let dealerCardsValue;

            playerCardsValue = hendEvauletion(round.playerCards)
            dealerCardsValue = hendEvauletion(round.dealerCards)
            
            if (!status) {
                if (playerCardsValue === dealerCardsValue) {
                    finalStatus = 'push'
                } else if (dealerCardsValue > 21) {
                    finalStatus = 'dealer_bust'
                } else if (playerCardsValue > 21) {
                    finalStatus = 'player_bust'
                } else if (dealerCardsValue > playerCardsValue) {
                    finalStatus = 'dealer_win'
                } else if (playerCardsValue > dealerCardsValue) {
                    finalStatus = 'player_win'
                }
            }

            const player = await playerRepo.find(playerId)
            if (finalStatus === 'push') {
                await playerRepo.updateChips(playerId, Number(player.chips + round.bet))
            } else if (finalStatus === 'player_win' || finalStatus === 'dealer_bust') {
                await playerRepo.updateChips(playerId, Number(player.chips + (round.bet * 2)))
            }


            const playerCards = round.playerCards
            const dealerCards = round.dealerCards

            round.status = finalStatus;
            await roundRepo.update(playerId, round);

            return { playerCards, dealerCards, playerCardsValue, dealerCardsValue, status: finalStatus, chips: (await playerRepo.find(playerId)).chips}
        },

        valideBet: async (playerId, bet) => {
            const player = await playerRepo.find(playerId);
            if (!player) return { success: false, msg: "Player not found" };

            if (!bet || typeof bet !== 'number' || bet <= 0) {
                return { success: false, msg: "Bet must be a positive number" };
            }
            if (bet > player.chips) {
                return { success: false, msg: "Insufficient chips" };
            }

            const rounds = await roundRepo.find(playerId);
            const hasOpenRound = rounds.some(round => round.status === "in_progress" || round.status === "IN-PROGRES");
            if (hasOpenRound) {
                return { success: false, msg: "An open round already exists for player", isOpenRound: true };
            }

            return { success: true };
        }
    }
}