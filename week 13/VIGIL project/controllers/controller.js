import fs from 'fs/promises'
import z from 'zod'

export function getServer(req, res) {
    try {
        res.status(200).send({
            'message': 'the server is on'})
    } catch (error) {
        res.send(error)
    }
}

export async function getHeroes(req, res) {
    try {
        const heroes = await fs.readFile("../data/heroues.json", 'utf8')
        res.send({'success': true, 'data': heroes})
    } catch (error) {
        res.send({'success': false, 'message': error})
    }
}

export async function getHeroesById(req, res, id) {
    try {
        const dataHeroes = await getHeroes(req, res)
        const data = JSON.parse(dataHeroes.data)
        const findId = data.find(heoru => heoru.id === id)
        if (findId) {
            res.send({'success': true, 'data': findId})
        } res.send({'success': false, 'message': 'id not found'})
    } catch {
        res.send({'success': false, 'message': error})
    }
}

export async function getStatistic(req, res) {
    try {
        const dataHeroes = await getHeroes(req, res)
        const data = JSON.parse(dataHeroes.data)
        const totalHeroes = data.length
        const byStatus = {
            'active': 0,
            'retired': 0,
            'missing': 0,
            'deceased': 0
        }
        for (let obj of data) {
            let status = obj.status
            byStatus[status] +=1
        }
        const sumThreatLevel = data.reduce((acc, crr) => 
            acc.threatLevel + crr.threatLevel, data[0])
        const averageThreatLevel = sumThreatLevel / totalHeroes
        const allPower = {}
        for (const obj of data) {
            for (let one of obj.powers) {
                if (!(one in allPower)) {
                    allPower[one] = 1
                } else {
                    allPower[one] += 1
                }
            }
        }
        let maxValue = 0
        let mostCommonPower = []
        for (const key in allPower) {
            const value = allPower[key]
            if (value >= maxValue) {
                maxValue = value
                mostCommonPower.push(key)
            }
        }
        const highestThreat = data.reduce((acc, cur) => {
            if (cur.threatLevel > acc.threatLevel) {
                return cur
            } return acc
                }, data[0])
        const newestRecord = data[data.length -1]
        res.send({'success': true, 'data':{
            totalHeroes,
            totalHeroes,
            averageThreatLevel,
            mostCommonPower,
            highestThreat,
            newestRecord
        }})
    } catch {
        res.send({'success': false, 'message': error})
    }
}

export async function createHeroes(req, res) {
    
}