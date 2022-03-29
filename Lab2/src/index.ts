import express from 'express'
import {Request, Response} from 'express'
import Note from '../Lab2/Note'
import Tag from '../Lab2/Tag' 

const app = express()
const notes: Note[] = [] 
const tags: Tag[] = [] 

app.use(express.json())

app.get('note/:id', function (req: Request, res: Response) {
  const note = notes.find(a => a.id === +req.params.id)
  console.log(req)
  if(note === undefined) {
    res.status(404).send('Note does not exist')
  } else {
    res.status(200).send(note)
  }
})
app.post('/note', function (req: Request, res: Response) {
  const note: Note = req.body
  if(note.title === undefined) {
    res.status(400).send('Note title is undefined')
  } else if (note.content === undefined) {
    res.status(400).send("Note content is undefined") 
  } else {
    console.log(note)
    if(note.tags !== undefined){
      note.tags.forEach(tag => {
        if(!tags.find(a => a.name === tag.name)) {
          const newTag: Tag = {
            id: Date.now(), 
            name: tag.name
          }
          tags.push(newTag)
        }
      }); 
    }
    note.id = Date.now()
    notes.push(note)
    res.status(201).send(note)
  }
})
/////
app.put('/note/:id', function (req: Request, res: Response) {
  const note: Note = req.body
  if(note.title === undefined) { 
    res.status(400).send('Note title is undefined')
  } else if (note.content === undefined) {
    res.status(400).send("Note content is undefined") 
  } else if (note.id === undefined) {
    res.status(400).send("Note id is undefined") 
  } else {
    let oldNote = notes.find(a => .ID === note.id)
    if(oldNote === undefined) {
      res.status(404).send('Note does not exist')
    } else 
    oldNote = note; 
    res.status(201).send(note)
  }
})

app.delete('/note/:id', function (req: Request, res: Response) {
  const note = notes.find(a => a.id === +req.params.id)
  if(note === undefined) {
    res.status(400).send('Note does not exist')
  } else {
    notes.splice(req.body.id, 1)
    res.status(204).send(note)
  }
})

app.get('/notes', function (req: Request, res: Response) {
  try {
    res.status(200).send(notes)
  } catch (error) {
    res.status(400).send(error)
  }
}) 

//tagi
app.get('/tags', function (req: Request, res: Response) {
  try {
    res.status(200).send(tags)
  } catch (error) {
    res.status(400).send(error)
  }
}) 

app.get('tag/:id', function (req: Request, res: Response) {
  const tag = tags.find(a => a.id === +req.params.id)
  if(tag === undefined) {
    res.status(404).send('Tag does not exist')
  } else {
    res.status(200).send(tag)
  }
})

app.post('/tag', function (req: Request, res: Response) {
  const tag: Tag = req.body
  if(tag.name === undefined) {
    res.status(400).send('Tag title is undefined')
  } else if (tags.find(a => a.name === req.body.name)) {
    res.status(400).send('This tag name has already exist')
  } else {
    tag.id = Date.now()
    tags.push(tag) 
    res.status(201).send(tag)
  }
}) 

app.put('/tag/:id', function (req: Request, res: Response) {
  const tag: Tag = req.body
  if(tag.name === undefined) { 
    res.status(400).send('Tag name is undefined') 
  } else if (tags.find(a => a.name === req.body.name)) {
    res.status(400).send('This tag name has already exist') 
  } else if (tag.id === undefined) {
    res.status(400).send("Tag id is undefined") 
  } else {
    let oldTag = tags.find(a => a.id === tag.id)
    if(oldTag === undefined) {
      res.status(404).send('Tag does not exist')
    } else 
    oldTag = tag; 
    res.status(201).send(tag)
  }
})

app.delete('/tag/:id', function (req: Request, res: Response) {
  const tag = tags.find(a => a.id === +req.params.id)
  if(tag === undefined) {
    res.status(400).send('Tag does not exist')
  } else {
    tags.splice(req.body.id, 1)
    res.status(204).send(tag)
  }
})

app.listen(3000) 
