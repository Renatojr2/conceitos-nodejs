const express = require('express')
const cors = require('cors')

const { uuid } = require('uuidv4')

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.get('/repositories', (request, response) => {
  return response.json(repositories)
})

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body
  const repository = { 
    id: uuid(), 
    title, 
    url, 
    techs, 
    likes: 0,
  }

  repositories.push(repository)

  return response.json(repository)
})

app.put('/repositories/:id', (request, response) => {
  const {title, url, techs} = request.body
  const {id} = request.params

  const findRepositoryById = repositories.findIndex(repository => {
    return repository.id === id
  })
  if(findRepositoryById < 0) {
    return response.status(400).json({error: 'repository does not exites'})
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepositoryById].likes
  }

  repositories[findRepositoryById] = repository

  return response.json(repository)


})

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params

  const findRepositoryById = repositories.findIndex(repository => {
    return repository.id === id
  })

  if (findRepositoryById >= 0) {
    repositories.splice(findRepositoryById, 1)
    
  } else {
    return response.status(400).json({error: 'repository does not exites'})
  }

  return response.status(204).send()
  
})

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params

  const findRepositoryById = repositories.findIndex(repository => {
    return repository.id === id
  })
  if(findRepositoryById < 0 ) {
    return response.status(400).json({error: 'repository does not exites'})
  }

  repositories[findRepositoryById].likes ++


  return response.json(repositories[findRepositoryById])

  
})

module.exports = app
