import express from 'express';
import fs from 'fs/promises'


const dir = await fs.readdir(process.cwd())

if(!dir.includes('users.json')) await fs.writeFile('users.json', '[]')

const server = express();

server.use(express.json());

server.use((req, res, next) => {
    console.log(req.url, req.method)
    next()
})

server.get('/api', (req, res) => {
    res.json({'message': "hello"});
})

server.get('/api/search', (req, res) => {
    const {name, family} = req.query;
    res.json({message: 'hello ' + name + ' ' + family})
})

server.get('/api/:name/:id', (req, res) => {
    res.json({message: 'hello ' + req.params.name})
})

server.post('/api', async (req, res) => {
    try {
        const {userName, password} = req.body
        if (!userName || userName.length < 2) {
            return res.status(400).json({message: 'username must include 2 charcters at least'})
        }
        if (!password || password.length < 6) {
            return res.status(400).json({message: 'password must include 6 charcters at least'})
        }
        const fileContent = await fs.readFile('users.json')
        const users = JSON.parse(fileContent)
        const id = Math.max(0, ...users.map(user => user.id)) +1;
        users.push({id, userName, password});
        await fs.writeFile('users.json', JSON.stringify(users, null, 2))
        res.status(201).send({
            message: 'user created succssesfully!',id
        })

    } catch (error) {
        res.status(500).json({message: 'server internal error'})
    }
})

server.put('/api/:id', async (req, res) => {
    try{
        const fileContent = await fs.readFile('users.json', 'utf8')
        const users = JSON.parse(fileContent)
        const user = users.find(user => user.id === +req.params.id);

        if (!user) {
            return res.status(404).json({message: 'user not found'})
        }

        const {username = user.username, password = user.password} = req.body;
        Object.assign(user, {username, password})
        await fs.writeFile('users.json', JSON.stringify(users, null, 2))
        res.json({message: 'user updated succssesfully!', user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'server internal error'})
    }
})

server.delete('/api/:id', async (req,res) => {
    try {
        const fileContent = await fs.readFile('users.json', 'utf8')
        const users = JSON.parse(fileContent)
        const userExists = users.some(useri => useri.id === +req.params.id);

        if (!userExists) {
            return res.status(404).json({message: 'user not found'})
        }

        const filteredUsers = users.filter(useri => useri.id !== +req.params.id);
        await fs.writeFile('users.json', JSON.stringify(filteredUsers, null, 2))
        res.send({meg: `user: ${req.params.id} died`})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'server internal error'})
    }
})

server.listen(3000, () => console.log('listening on port 3000'))