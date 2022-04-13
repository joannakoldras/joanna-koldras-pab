import fs from 'fs';
import Store from './models/Store';

class Repository { 
    public async readStore(): Promise<string> {
        try {
            return await fs.promises.readFile('storeFile.txt', 'utf-8');
        } catch (err) {
            return ""
        }
    }

public async updateStore(dataToSave: string): Promise<void> {
    try {
        await fs.promises.writeFile('storeFile.txt', dataToSave);
    } catch (err) {
        return 
        }
    }   
}

export default Repository 