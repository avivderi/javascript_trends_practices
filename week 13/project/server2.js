import express from 'express'
import fs from 'fs/promises'

const dir = await fs.readdir(process.cwd())
if (!dir.includes('data.json')) await fs.writeFile('data.json', [])

const server = express();

server.listen(3000, () => console.log('the server is running'))