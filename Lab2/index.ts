import express from 'express'
import fs from 'fs' 
import {Request, Response} from 'express'
import Store from './models/Store'
import Note from './models/note'
import Tag from './models/Tag' 
import User from './models/User' 
import jwt from "jsonwebtoken"; 

import { getEnabledCategories } from 'trace_events'

const app = express()

const repo: Repository = new Repository(); 
let registerUser = new User(); 
const secret = "abc123"

let store: Store;
repo.readStore().then((a) => {
  if (a) {
    store = JSON.parse(a);
  } else {
    store = new Store()
  }
}); 

//const notes: Note[] = [] 
//const tags: Tag[] = [] 

app.use(express.json()); 

app.get("/note/list", function (req: Request, res: Response) {
  const authData = req.headers.authorization ?? ''
  if (IfUserIsAuthorized(authData, secret)) {
    getNotes(res, false, registerUser)
  } else {
    res.status(401).send("Unauthorized user")
  }
}); 

app.get("/note/:id", function (req: Request, res: Response) {
  const authData = req.headers.authorization ?? '' 
  if (IfUserIsAuthorized(authData, secret)) {
  const note = store.notes.find((a) => a.id === +req.params.id && registerUser.notesIds.includes(+req.params.id));  
  if(note === undefined) {
    res.status(404).send('Note does not exist')
  } else {
    res.status(200).send(note)
  } 
} else {
  res.status(401).send("Unauthorized user")
}
}); 

app.post("/note/list/user/:userName", function (req: Request, res: Response) {
  const user = store.users.find(a => a.login === req.params.userName)
  if(user) {
    getNotes(res, true, user); 
  } else {
    res.status(404).send("User name not exist")
  }
})

app.post("/note", function(req: Request, res: Response) {
  const authData = req.headers.authorization ?? ''
  if(IfUserIsAuthorized(authData, secret)) {
    const note: Note = req.body;
    if(note.title === undefined) {
      res.status(400).send("Note content is undefined");
    } else if (note.content === undefined) {
      res.status(400).send("Note content is undefined"); 
    } else {
      if (note.tags !== undefined) {
        note.tags.forEach((tag) => {
          if(!store.tags.find((a) => a.name === tag.name)) {
            const newTag: Tag = {
              id: Date.now(), 
              name: tag.name,
            }; 
            store.tags.push(newTag);
            registerUser.tagsIds.push(newTag.id ?? 0)
          } 
        }); 
      }
      note.id = Date.now(); 
      store.notes.push(note);
      registerUser.notesIds.push(note.id);
      res.status(201).send(note); 
      repo.updateStore(JSON.stringify(store));
    }
  } else {
    res.status(401).send("Unauthorized user")
  }
}); 


app.put('/note/:id', function (req: Request, res: Response) {
  const authData = req.headers.authorization ?? ''
  if(IfUserIsAuthorized(authData, secret)){ 
  const note: Note = req.body; 
  if(note.title === undefined) { 
    res.status(400).send('Note title is undefined')
  } else if (note.content === undefined) {
    res.status(400).send("Note content is undefined") 
  } else if (note.id === undefined) {
    res.status(400).send("Note id is undefined") 
  } else {
    let oldNote = store.notes.find((a) => a.id === note.id)
    if(oldNote === undefined) {
      res.status(404).send('Note does not exist')
    } else oldNote = note; 
    res.status(201).send(note); 
    repo.updateStore(JSON.stringify(store)); 
  }
  } else {
    res.status(401).send("Unauthorized user")
  } 
}); 

app.delete("/note/:id", function (req: Request, res: Response) {
  const authData = req.headers.authorization ?? '' 
  if(IfUserIsAuthorized(authData, secret)) {
  const note = store.notes.find(a => a.id === +req.params.id); 
  if(note === undefined) {
    res.status(400).send('Note does not exist'); 
  } else {
    store.notes.splice(req.body.id, 1); 
    registerUser.notesIds.splice(req.body.id, 1)
    res.status(204).send(note);
    repo.updateStore(JSON.stringify(store)); 
  }
} else {
  res.status(401).send("Unauthorized user")
}
}); 

function getNotes(res: Response, onlyPublicNotes: boolean, user: User) {
  try {
    let notes: Note[] = [];
    if(onlyPublicNotes) {
      notes = store.notes.filter(a => user.notesIds.includes(a.id ?? 0))
      notes = notes.filter(a => a.isPrivate.toString() === "false")
    } else {
      notes = store.notes.filter(a => user.notesIds.includes(a.id ?? 0))
    } 
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send(error); 
  }
}

//tagi
app.get("/tag/list", function (req: Request, res: Response) {
  const authData = req.headers.authorization ?? '' 
  if(IfUserIsAuthorized(authData, secret)) {
  try {
    res.status(200).send(store.tags.filter(a => registerUser.tagsIds.includes(a.id ?? 0))); 
  } catch (error) {
    res.status(400).send(error);
  } 
} else {
  res.status(401).send("Unauthorized user")
}
}); 

app.get('tag/:id', function (req: Request, res: Response) {
  const authData = req.headers.authorization ?? '' 
  if(IfUserIsAuthorized(authData, secret)) {
  const tag = store.tags.find((a) => a.id === +req.params.id && registerUser.tagsIds.includes(+req.params.id)); 
  if(tag === undefined) {
    res.status(404).send('Tag does not exist')
  } else {
    res.status(200).send(tag); 
  }
} else {
  res.status(401).send("Unauthorized user")
}
}); 

app.post("/tag", function (req: Request, res: Response) {
  const authData = req.headers.authorization ?? '' 
  if(IfUserIsAuthorized(authData, secret)) {
  const tag: Tag = req.body; 
  if(tag.name === undefined) {
    res.status(400).send("Tag name is undefined"); 
  } else if (store.tags.find((a) => a.name === req.body.name)) {
    res.status(400).send("This tag name has already exist");
  } else {
    tag.id = Date.now()
    store.tags.push(tag); 
    registerUser.tagsIds.push(tag.id ?? 0)
    res.status(201).send(tag); 
    repo.updateStore(JSON.stringify(store)); 
  }
} else {
  res.status(401).send("Unauthorized user")
}
}); 

//tu
app.put("/tag/:id", function (req: Request, res: Response) {
  const authData = req.headers.authorization ?? '' 
  if(IfUserIsAuthorized(authData, secret)) {
  const tag: Tag = req.body; 
  if(tag.name === undefined) { 
    res.status(400).send('Tag name is undefined') 
  } else if (store.tags.find((a) => a.name === req.body.name)) {
    res.status(400).send('This tag name has already exist') 
  } else if (tag.id === undefined) {
    res.status(400).send("Tag id is undefined") 
  } else {
    let oldTag = store.tags.find((a) => a.id === tag.id)
    if(oldTag === undefined) {
      res.status(404).send('Tag does not exist')
    } else oldTag = tag; 
    res.status(201).send(tag)
    repo.updateStore(JSON.stringify(store)); 
  }
} else {
  res.status(401).send("Unauthorized user")
}
}); 

app.delete("/tag/:id", function (req: Request, res: Response) {
  const authData = req.headers.authorization ?? '' 
  if(IfUserIsAuthorized(authData, secret)) {
  const tag = store.tags.find((a) => a.id === +req.params.id); 
  if(tag === undefined) {
    res.status(400).send('Tag does not exist')
  } else {
    store.tags.splice(req.body.id, 1); 
    registerUser.tagsIds.splice(req.body.id, 1)
    res.status(204).send(tag);
    repo.updateStore(JSON.stringify(store));
  }
}
}); 

//login 
app.post("login", function (req: Request, res: Response) {
  const user: User = req.body
  if(!user.login || !user.password) {
    res.status(401).send("Login or password is undefined")
  }
  registerUser = new User(); 
  const existUser = store.users.find(a => a.login)
  if(existUser){
    if(existUser.password === user.password) {
      registerUser = existUser
    } else {
      res.status(400).send("Wrong password")
    }
  } else {
    registerUser.id = Date.now();
    registerUser.login = user.login
    registerUser.password = user.password
    registerUser.notesIds = []
    registerUser.tagsIds = []
    store.users.push(registerUser)
  }
  if (registerUser.id) {
    const payload = registerUser.id.toString()
    const token = jwt.sign(payload, secret)
    res.status(200).send(token)
    repo.updateStore(JSON.stringify(store)); 
  }

  function IfUserIsAuthorized(authData: string, secret: string): boolean {
    const token = authData?.split(' ')[1] ?? ''
    const payload = jwt.verify(token, secret)
    let checkValue = ''
    if(registerUser.id) {
      checkValue = registerUser.id.toString() ?? ''
    }
    if(registerUser.id && payload === checkValue) {
      return true
    } else {
      return false
    }
  } 

app.listen(8080); 
