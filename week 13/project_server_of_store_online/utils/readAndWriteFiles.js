import fs from 'fs/promises'

export async function readFiles(filePath) {
    try {
    const response = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(response)
    return data
    } catch (error) {
        return {success: false, message: error.message}
    }
}

export async function writeFiles(filePath, content) {
    try {
        const response = await fs.writeFile(filePath, JSON.stringify(content))
        return {success: true, data: 'successfully'}
    } catch (error) {
        return {success: false, message: error.message}
    }
}

