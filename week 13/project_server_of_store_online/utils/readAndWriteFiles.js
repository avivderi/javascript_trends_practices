import fs from 'fs/promises'

export async function readFiles(filePath) {
    const response = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(response)
    return data
}

export async function writeFiles(filePath, content) {
    await fs.writeFile(filePath, JSON.stringify(content, null, 2))
    return true
}
