document.addEventListener("DOMContentLoaded", function () {
    loadHistory();
});

function addHistoryItem() {
    const title = document.getElementById("cpTitle").value.trim();
    const url = document.getElementById("cpURL").value.trim();
    const time = document.getElementById("cpTime").value.trim();
    const date = document.getElementById("cpDate").value.trim();
    if (!title || !url || !time || !date) {
        alert("Please fill all fields (use YYYY-MM-DD for Date or 'Recent').");
        return;
    }
    const historyItem = `<div class="history-item">
        <div class="item-info">
            <div class="title">${title}</div>
            <div class="url">${url}</div>
        </div>
        <div class="timestamp">${time}</div>
    </div>`;
    document.querySelector(".history-list").innerHTML += historyItem;
    saveHistory();
    clearControlPanel();
}

function clearAllHistory() {
    if (confirm("Are you sure you want to clear all history?")) {
        document.querySelector(".history-list").innerHTML = "";
        localStorage.removeItem("fakeHistory");
    }
}

function clearControlPanel() {
    document.getElementById("cpTitle").value = "";
    document.getElementById("cpURL").value = "";
    document.getElementById("cpTime").value = "";
    document.getElementById("cpDate").value = "";
}

function saveHistory() {
    localStorage.setItem("fakeHistory", document.querySelector(".history-list").innerHTML);
}

function loadHistory() {
    const savedHistory = localStorage.getItem("fakeHistory");
    if (savedHistory) {
        document.querySelector(".history-list").innerHTML = savedHistory;
    }
}

function toggleFullScreen() {
    const elem = document.getElementById("edgeUI");
    if (!document.fullscreenElement) {
        elem.requestFullscreen().then(() => {
            document.getElementById("overlayInstruction").style.display = "flex";
        }).catch(err => {
            alert(`Error enabling full screen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
        document.getElementById("overlayInstruction").style.display = "none";
    }
}

function closeOverlay() {
    document.getElementById("overlayInstruction").style.display = "none";
}
