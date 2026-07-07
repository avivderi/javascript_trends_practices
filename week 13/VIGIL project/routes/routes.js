export default {
    'GET': {
        '/health': getServer,
        '/heroes': getHeroes,
        '/heroes/:id': getHeroesById,
        '/stats': getStatistic
    },
    'POST': {
        '/heroes': createHeroes,
        '/heroes/search': searchHeroes
    },
    'PATCH': {
        '/heroes/:id': updateHeroes
    },
    'DELETE': {
        '/heroes/:id': deleteHeroesById
    }
}