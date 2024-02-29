document.addEventListener('DOMContentLoaded', function() {
    const sounds = ['Alpha', 'Black', 'Blue', 'Circle', 'Diamond', 'Echo', 'Red', 'Purple', 'Square', 'Tango', 'X', 'Yankee'];
    let rounds = 0;
    let difficulty = '';
    let score = 0;

    document.querySelectorAll('.round-btn').forEach(button => {
        button.addEventListener('click', function() {
            rounds = this.dataset.rounds;
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
        resetScore();
        // Directly initiate the first sound as part of the interaction
        // to comply with mobile browsers' autoplay policies.
        playReadySound();
    });

    function playReadySound() {
        const readySound = new Audio('Sounds/Ready.mp3');
        readySound.play().then(() => {
            updateStatus("Ready!");
            setTimeout(() => {
                startSession();
            }, 3000); // Adjust as necessary for timing after "Ready"
        }).catch(error => {
            console.error("Error playing sound:", error);
            // Fallback or user prompt to manually start the session could go here
        });
    }

    function startSession() {
        updateStatus('Session started...');
        let currentRound = 0;
        const intervalDuration = calculateInterval();

        const sessionInterval = setInterval(() => {
            if (currentRound < rounds) {
                // Ensures subsequent sounds also follow user interactions
                if (currentRound > 0) playSound(sounds[currentRound % sounds.length]);
                currentRound++;
                updateScore(1); // This is a placeholder to increment score, adjust as needed
            } else {
                clearInterval(sessionInterval);
                updateStatus('Session Complete! Great job!');
            }
        }, intervalDuration);
    }

    function playSound(sound) {
        const audio = new Audio(`Sounds/${sound}.mp3`);
        audio.play().catch(error => console.error("Error playing sound:", error));
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
