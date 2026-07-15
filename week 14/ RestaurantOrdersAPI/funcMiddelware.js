import fs from 'fs/promises';

const FILE_DATA = 'data.json'

export async function readFile() {
    try {
        const data = await fs.readFile(FILE_DATA, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        res.send({message: status.error}) 
    }
}

export async function writeFile(data) {
    try {
        const write = await fs.writeFile(FILE_DATA, JSON.stringify(data, null, 2), 'utf8')
        console.log('the file is writer')
    } catch (error) {
        res.send({message: status.error}) 
    }
}

export function logger(req, res, next) {
    console.log({message: `${req.method}, ${req.url}`})
}

function vallidation(req, res, next) {
    
}