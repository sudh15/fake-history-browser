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
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
        document.getElementById("overlayInstruction").style.display = "none";
    }
}

function closeOverlay() {
    document.getElementById("overlayInstruction").style.display = "none";
}

function generateFakeHistory() {
    const groups = groupHistoryByDate();
    const historyGroupsDiv = document.getElementById("historyGroups");
    historyGroupsDiv.innerHTML = "";
    for (const date in groups) {
        const header = document.createElement("div");
        header.className = "history-section-title";
        header.textContent = formatDateHeader(date);
        header.style.margin = "10px 0 6px";
        header.style.fontSize = "14px";
        header.style.color = "#aaa";
        historyGroupsDiv.appendChild(header);
        groups[date].forEach(item => {
            const row = document.createElement("div");
            row.className = "history-item";
            row.innerHTML = `
              <div class="item-info">
                <div class="title">${item.title}</div>
                <div class="url">${item.url}</div>
              </div>
              <div class="timestamp">${item.time}</div>
            `;
            historyGroupsDiv.appendChild(row);
        });
    }
}

function groupHistoryByDate() {
    const groups = {};
    historyItems.forEach(item => {
        if (!groups[item.date]) {
            groups[item.date] = [];
        }
        groups[item.date].push(item);
    });
    const sortedDates = Object.keys(groups).sort((a, b) => b.localeCompare(a));
    const sortedGroups = {};
    sortedDates.forEach(date => { sortedGroups[date] = groups[date]; });
    return sortedGroups;
}

function formatDateHeader(dateStr) {
    if (dateStr === "Recent") return "Recent";
    const today = new Date().toISOString().slice(0,10);
    if (dateStr === today) {
        const d = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return "Today – " + d.toLocaleDateString(undefined, options);
    } else {
        const d = new Date(dateStr);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return d.toLocaleDateString(undefined, options);
    }
}

// Initialize fake history on load
generateFakeHistory();
