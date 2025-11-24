// =============================
// CONFIG
// =============================
const API_URL = "https://smart-library-backend-83ly.onrender.com"; 
// Replace with your backend URL


// ----------------------------
// Load seat data from backend
// ----------------------------
async function loadSeats() {
    try {
        const response = await fetch(`${API_URL}/seats`);
        const data = await response.json();
        updateSeatColors(data);
        updateStats(data);
    } catch (error) {
        console.error("Error loading seats:", error);
    }
}


// ----------------------------
// Update seat colors on UI
// ----------------------------
function updateSeatColors(seats) {
    Object.keys(seats).forEach(seatId => {
        const seatElement = document.getElementById(seatId);
        if (!seatElement) return;

        const status = seats[seatId];

        if (status === "Free") {
            seatElement.style.background = "#4CAF50"; 
        } else if (status === "Occupied") {
            seatElement.style.background = "#F44336";
        } else if (status === "Reserved") {
            seatElement.style.background = "#FFC107";
        }
    });
}


// ----------------------------
// Update Stats Section
// ----------------------------
function updateStats(seats) {
    let free = 0, occupied = 0, reserved = 0;

    Object.values(seats).forEach(state => {
        if (state === "Free") free++;
        else if (state === "Occupied") occupied++;
        else if (state === "Reserved") reserved++;
    });

    document.getElementById("freeCount").textContent = free;
    document.getElementById("occupiedCount").textContent = occupied;
    document.getElementById("reservedCount").textContent = reserved;
}


// ----------------------------
// Auto Refresh every 3 seconds
// ----------------------------
setInterval(loadSeats, 3000);

// Initial load
loadSeats();
