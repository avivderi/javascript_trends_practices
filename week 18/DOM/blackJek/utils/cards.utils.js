export const getRandomCards = () => {
    const ranks = ['A',2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10,'J','Q','K']
    const suits = ['♥', '♦', '♣', '♠']
    return {
        rank: ranks[Math.floor(Math.random() * ranks.length)],
        suit: suits[Math.floor(Math.random() * suits.length)]
    }
}

export const cardEvauletion = (card) => {
    if (["J","Q","K"].includes(card.rank)) return 10
    return Number(card.rank)
}

export const hendEvauletion = (hend) => {
    const aces = hend.filter(card => card.rank === "A")
    const handWithoutAces = hend.filter(card => card.rank !== "A")

    let valueWithoutAces = handWithoutAces.reduce((total, card) => 
        total + cardEvauletion(card)
    , 0)

    let total = valueWithoutAces + (aces.length * 11)
    let acesValue = aces.length

    while (total > 21 && acesValue > 0) {
        total -= 10
        acesValue--
    }
    return total
}
