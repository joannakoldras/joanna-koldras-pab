import Note from "./Note"
import Tag from "./Tag"
import User from "./User"
import fs from 'fs'; 

class Store implements Store { //IStore 
    notes: Note[] = []
    tags: Tag[] = []
    users: User[] = []

    constructor(data?: Store) {
        if(data) {
            this.notes = data.notes
            this.tags = data.tags
            this.users = data.users
        }
    }

    public async readStore(): Promise<string> {
        try { 
            return await fs.promises.readFile('storeFile.txt', 'utf-8'); 
        } catch (err) {
            return ""
        }
    }
    public async updateStore(dataToSave: string): Promise<void>{
        try {
            await fs.promises.writeFile('storeFile.txt', dataToSave); 
        } catch (err) {
            return
        }
    }
}
export default Store