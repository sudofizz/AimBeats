document.addEventListener('DOMContentLoaded', function() {
    const sounds = ['Alpha', 'Black', 'Blue', 'Circle', 'Diamond', 'Echo', 'Red', 'Purple', 'Square', 'Tango', 'X', 'Yankee'];
    let rounds = 0;
    let difficulty = '';
    let score = 0;
    let currentRound = 0;

    document.querySelectorAll('.round-btn').forEach(button => {
        button.addEventListener('click', function() {
            rounds = parseInt(this.dataset.rounds, 10);
            document.querySelectorAll('.round-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    document.querySelectorAll('.difficulty-btn').forEach(button => {
        button.addEventListener('click', function() {
            difficulty = this.dataset.difficulty;
            document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    document.getElementById('start').addEventListener('click', function() {
        if (!rounds || !difficulty) {
            alert('Please select both a round count and difficulty level.');
            return;
        }
        this.disabled = true; // Disable the start button to prevent re-starts
        resetScore();
        currentRound = 0;
        updateStatus('Tap to start the session');
        // Change the button text to prompt for next sound
        this.textContent = 'Tap for Next Sound';
        this.removeEventListener('click', arguments.callee);
        this.addEventListener('click', playNextSound);
    });

    function playNextSound() {
        if (currentRound < rounds) {
            const soundIndex = currentRound % sounds.length;
            const audio = new Audio(`Sounds/${sounds[soundIndex]}.mp3`);
            audio.play().then(() => {
                updateScore(1); // Increment score
                currentRound++;
                updateStatus(`Played ${sounds[soundIndex]}. Tap for next.`);
            }).catch(error => console.error("Error playing sound:", error));
        } else {
            updateStatus('Session Complete! Great job!');
            document.getElementById('start').disabled = false; // Re-enable the start button
            document.getElementById('start').textContent = 'Start Session';
        }
    }

    function calculateInterval() {
        switch (difficulty) {
            case 'easy': return 3000;
            case 'medium': return 2000;
            case 'hard': return 1000;
            default: return 3000;
        }
    }

    function updateScore(points) {
        score += points;
        document.getElementById('score').innerText = `Score: ${score}`;
    }

    function resetScore() {
        score = 0;
        updateScore(0);
    }

    function updateStatus(message) {
        document.getElementById('status').textContent = message;
    }
});
