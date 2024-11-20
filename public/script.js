function updateJoke() {
    fetch('http://localhost:3001/joke')
        .then(response => response.json())
        .then(joke => {
            document.getElementById('setup').textContent = joke.setup
            document.getElementById('delivery').textContent = joke.delivery
        })
        .catch(error => console.error('Error:', error))
}

// Update joke every 10 seconds
setInterval(updateJoke, 10000)
// Initial joke load
updateJoke()