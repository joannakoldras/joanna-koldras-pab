import Note from "./Note"
import Tag from "./Tag"
import User from "./User"

class Store {
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
}
export default Store