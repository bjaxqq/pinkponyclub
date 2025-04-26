import fs from 'fs/promises';
import path from 'path';

export async function readJsonFile(filePath) {
        try {
                const absolutePath = path.resolve(filePath);
                const data = await fs.readFile(absolutePath, 'utf-8');
                const jsonData = JSON.parse(data);
                return jsonData;
        } catch (error) {
                console.error('Error reading or parsing JSON file:', error);
                throw error;
        }
}

export async function writeJsonFile(filePath, data) {
        try {
                const absolutePath = path.resolve(filePath);
                const jsonString = JSON.stringify(data, null, 2);
                await fs.writeFile(absolutePath, jsonString, 'utf-8');
                return true;
        } catch (error) {
                console.error('Error writing JSON file:', error);
                throw error;
        }
}
