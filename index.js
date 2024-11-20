import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

// Store current joke
let currentJoke = {
    setup: "Loading joke...",
    delivery: "Please wait..."
}

// Function to fetch new joke
async function fetchNewJoke() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart')
        const data = await response.json()
        if (data.error) {
            throw new Error('Failed to fetch joke')
        }
        currentJoke = {
            setup: data.setup,
            delivery: data.delivery
        }
        console.log('New joke fetched:', currentJoke)
    } catch (error) {
        console.error('Error fetching joke:', error)
    }
}

// Initialize first joke
fetchNewJoke()

// Set up interval to fetch new joke every 10 seconds
setInterval(fetchNewJoke, 10000)

// Endpoint to get current joke
app.get('/joke', (req, res) => {
    res.json(currentJoke)
})

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Joke Server!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})