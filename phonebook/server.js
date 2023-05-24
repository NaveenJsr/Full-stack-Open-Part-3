const http = require('http')

const data = [
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

const app = http.createServer((req,res)=>{
       res.writeHead(200,{ 'Content-Type': 'text/plain' })
       res.end(JSON.stringify(data)) 
})

const PORT = 3001
app.listen(PORT)

console.log(`Server is started on port ${PORT}`)

