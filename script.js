document.addEventListener('DOMContentLoaded', function() {
    const sounds = ['Alpha', 'Black', 'Blue', 'Circle', 'Diamond', 'Echo', 'Red', 'Purple', 'Square', 'Tango', 'X', 'Yankee'];
    let rounds = 0;
    let difficulty = '';
    let score = 0;

    // Setup round buttons
    document.querySelectorAll('.round-btn').forEach(button => {
        button.addEventListener('click', function() {
            rounds = this.dataset.rounds;
            document.querySelectorAll('.round-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Setup difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(button => {
        button.addEventListener('click', function() {
            difficulty = this.dataset.difficulty;
            document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Start session button
    document.getElementById('start').addEventListener('click', function() {
        if (!rounds || !difficulty) {
            alert('Please select both a round count and difficulty level.');
            return;
        }
        resetScore();
        updateStatus('Get ready...');
        startCountdown(3);
    });

    // Countdown before session starts
    function startCountdown(count) {
        updateStatus(`Starting in ${count}...`);
        let countdownInterval = setInterval(() => {
            count--;
            if (count <= 0) {
                clearInterval(countdownInterval);
                playReadySound();
            } else {
                updateStatus(`Starting in ${count}...`);
            }
        }, 1000);
    }

    // Play "Ready" sound
    function playReadySound() {
        const readySound = new Audio('Sounds/Ready.mp3');
        readySound.play();
        readySound.onended = function() {
            updateStatus("Ready!");
            setTimeout(startSession, 3000); // Wait for 3 seconds after "Ready" before starting
        };
    }

    // Start the session
    function startSession() {
        updateStatus('Session started...');
        let currentRound = 0;
        const intervalDuration = calculateInterval();

        const sessionInterval = setInterval(() => {
            if (currentRound < rounds) {
                playSound(sounds[currentRound % sounds.length]);
                currentRound++;
                updateScore(1); // Increment score, adjust as needed
            } else {
                clearInterval(sessionInterval);
                updateStatus('Session Complete! Great job!');
            }
        }, intervalDuration);
    }

    // Play a sound from the list
    function playSound(sound) {
        const audio = new Audio(`Sounds/${sound}.mp3`);
        audio.play();
    }

    // Calculate interval between sounds based on difficulty
    function calculateInterval() {
        switch (difficulty) {
            case 'easy': return 3000;
            case 'medium': return 2000;
            case 'hard': return 1000;
            default: return 3000;
        }
    }

    // Update the score display
    function updateScore(points) {
        score += points;
        document.getElementById('score').innerText = `Score: ${score}`;
    }

    // Reset score to zero
    function resetScore() {
        score = 0;
        updateScore(0); // Reset the score display
    }

    // Update status message
    function updateStatus(message) {
        document.getElementById('status').textContent = message;
    }
});
