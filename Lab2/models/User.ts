import jwt from "jsonwebtoken"; 

class User {
    id?: number;
    login: string;
    password: string; 
    notesIds: number[];
    tagsIds: number[];

    constructor(user?: User) {
        if(user) {
            this.login = user.login
            this.password = user.password
            this.notesIds = user.notesIds
        } else {
            this.login = ''
            this.password = ''
            this.notesIds = []
            this.tagsIds = []
        }
    } 

}
export default User 