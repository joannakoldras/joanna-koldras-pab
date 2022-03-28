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

app.listen(3000) 
