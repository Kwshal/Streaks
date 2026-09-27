const streaks = JSON.parse(localStorage.getItem("streaks")) || {};

const DAY = 24 * 60 * 60 * 1000;

function today() {
     return new Date().toISOString().slice(0, 10);
}

function daysBetween(a, b) {
     return Math.round((new Date(b) - new Date(a)) / DAY);
}

function save() {
     localStorage.setItem("streaks", JSON.stringify(streaks));
}

function checkIn() {
     const date = today();

     for (const name in streaks) {
          const streak = streaks[name];
          streak.count += daysBetween(streak.lastCheckIn, date);
          streak.lastCheckIn = date;
     }

     save();
}

function render() {
     const container = document.querySelector("#streaks");
     container.innerHTML = "";

     for (const name in streaks) {
          const streak = streaks[name];

          const div = document.createElement("div");
          div.className = "streak";

          div.innerHTML = `
          <span>${name}</span>
          <span class="fires"><strong>${streak.count}</strong> : ${"🔥".repeat(streak.count)}</span>
          <button class="reset" onclick="resetStreak('${name}')">Reset</button>
        `;

          container.appendChild(div);
     }
}

function addStreak() {
     const input = document.querySelector("#name");
     const name = input.value.trim();

     if (!name || name in streaks) return;

     streaks[name] = {
          count: 1,
          lastCheckIn: today()
     };

     save();
     render();
     input.value = "";
}

function resetStreak(name) {
     streaks[name] = {
          count: 1,
          lastCheckIn: today()
     };

     save();
     render();
}

checkIn();
render();
