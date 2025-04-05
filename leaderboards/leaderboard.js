const showRankingButton = document.getElementById("showRankingButton");
const popupContainer = document.getElementById("popupContainer");
const popupOverlay = document.getElementById("popupOverlay");


// Show just the leaderboard
function showPopup2() {
    popupContainer.innerHTML = `
        <div class="popup-content">
            <h2>Top 5 Leaderboard</h2>
            <div class="leaderboard-container">
                <h3>Current Leaderboard:</h3>
                <ol id="leaderboardList"></ol>
            </div>
            <button id="noButton">Tutup</button>
        </div>
    `;
    popupContainer.style.display = "flex";
    popupOverlay.style.display = "block";

    fetchLeaderboard();

    document.getElementById("noButton").addEventListener("click", function () {
        popupContainer.style.display = "none";
        popupOverlay.style.display = "none";
    });
}

function showPopup3() {
    popupContainer.innerHTML = `
        <div class="popup-content">
            <h2>Top 5 Leaderboard</h2>
            <div class="leaderboard-container">
                <h3>Current Leaderboard:</h3>
                <ol id="leaderboardList"></ol>
            </div>
            <button id="noButton">Tutup</button>
        </div>
    `;
    popupContainer.style.display = "flex";
    popupOverlay.style.display = "block";

    fetchLeaderboard2();

    document.getElementById("noButton").addEventListener("click", function () {
        popupContainer.style.display = "none";
        popupOverlay.style.display = "none";
    });
}

function fetchLeaderboard() {
    fetch('https://script.google.com/macros/s/AKfycbyQi8_tGTmx8lRhNhXvoWwZEYdjOWf09QabHpYm7wmgPpJWKfcK5CnXAWyrl6JRiGPqIw/exec')
        .then(response => response.json())
        .then(data => {
            if (!data || !Array.isArray(data)) {
                throw new Error("Invalid data format");
            }

            // Convert to numbers safely (assuming 'score' is used instead of 'time')
            const cleaned = data.map(entry => ({
                name: entry.name,
                score: Number(entry.score)  // Use the score (win streak) directly
            })).filter(entry => !isNaN(entry.score));  // Filter out any invalid numbers

            // Sort in descending order (highest to lowest score)
            const sorted = cleaned.sort((a, b) => b.score - a.score);

            // Get the top 5 elements (1 to 5, descending order)
            const topFive = sorted.slice(0, 5);

            const leaderboardList = document.getElementById("leaderboardList");
            leaderboardList.innerHTML = "";

            topFive.forEach(entry => {
                const li = document.createElement("li");
                li.textContent = `${entry.name} - ${entry.score} Streak!`; // Display name and score (win streak)
                leaderboardList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Leaderboard error:", error);
            const leaderboardList = document.getElementById("leaderboardList");
            leaderboardList.innerHTML = "<li>Error fetching leaderboard</li>";
        });
}

function fetchLeaderboard2() {
    fetch('https://script.google.com/macros/s/AKfycby4P6-qo2tjI-0ibyi7p5Bc_NcvPkZ-J2krdnliLiJ0ldenUvhG-1gRzz9KTOzhHyry/exec')
        .then(response => response.json())
        .then(data => {
            const leaderboardList = document.getElementById("leaderboardList");
            leaderboardList.innerHTML = "";
            if (data && Array.isArray(data)) {
                data.slice(0, 5).forEach(entry => {
                    const li = document.createElement("li");
                    li.textContent = `${entry.name} - ${entry.time}s`;
                    leaderboardList.appendChild(li);
                });
            } else {
                leaderboardList.innerHTML = "<li>Error fetching leaderboard</li>";
            }
        })
        .catch(error => {
            console.error("Error fetching leaderboard:", error);
            const leaderboardList = document.getElementById("leaderboardList");
            leaderboardList.innerHTML = "<li>Error fetching leaderboard</li>";
        });
}


showRankingButton.addEventListener("click", showPopup2);
showRankingButton2.addEventListener("click", showPopup3);