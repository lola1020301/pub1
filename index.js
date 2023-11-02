const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
let notes = [
  {
    "id": 1,
    "content": "HTML is easy",
    "important": false
  },
  {
    "id": 2,
    "content": "Browser can execute only JavaScript",
    "important": false
  },
  {
    "id": 3,
    "content": "GET and POST are the most important methods of HTTP protocol",
    "important": true
  },
  {
    "content": "note added",
    "important": false,
    "id": 4
  },
  {
    "content": "n1",
    "important": false,
    "id": 5
  },
  {
    "content": "a new note...",
    "important": false,
    "id": 6
  },
  {
    "content": "מ2",
    "important": true,
    "id": 7
  },
  {
    "content": "n1",
    "important": true,
    "id": 8
  }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response)=>{
  response.json(persons)
})

app.get('/api/notes', (request, response)=>{
  response.json(notes);
})

app.get('/info', (request, response)=>{
  const now = new Date();
  const persons_length = persons.length;
  response.send(`<p>Phonebook has info for ${persons_length} people</p> 
  <br/>
  ${now}`)
})

app.get('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id);
  const person = persons.find(p=>p.id === id)
  console.log('person:', person)
  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

const generateId = ()=>{
   maxId = persons.length > 0 ? 
   Math.max(...persons.map(p=>p.id))
   :0
   console.log(maxId+1);
   return maxId+1;
}

const generateId1 = ()=>{
  console.log(...notes)
  const maxId = notes.length > 0 ?
    Math.max(...notes.map(n=>n.id))
    : 0
  return maxId+1
}
app.post('/api/persons', (request, response)=>{
  const body = request.body
  if (!body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }else if(!body.name){
    return response.status(400).json({
      error:'name is missing!'
    })
  }else if(!body.number){
    return response.status(400).json({
      error:'number is missing'
    })
  }
  const id =  generateId()
  const newPerson = {
    id: id,
    name: body.name,
    number: body.number
  }
 persons = persons.concat(newPerson)
 response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

