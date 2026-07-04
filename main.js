const sections = document.querySelectorAll(".section");

function showSection(id) {
    sections.forEach(section => section.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function animateCounter(element, target, duration = 3000) {

    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {

        const progress = Math.min((currentTime - startTime) / duration, 1);

        const value = Math.floor(progress * target);

        element.textContent = value.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

function goToSection2() {

    const userId = document.getElementById("userId").value.trim();

    if (userId === "") {
        alert("Please enter your ID.");
        return;
    }

    showSection("section2");

    const coins = document.getElementById("coins").checked;
    const gp = document.getElementById("gp").checked;

    const coinsCounter = document.getElementById("coinsCounter");
    const gpCounter = document.getElementById("gpCounter");

    coinsCounter.textContent = "0";
    gpCounter.textContent = "0";

    if (coins)
        animateCounter(coinsCounter, 999999999);

    if (gp)
        animateCounter(gpCounter, 999999999);

    setTimeout(showResult, 1000);
}

function showResult() {

    const rewards = [];

    if (document.getElementById("coins").checked) {
        rewards.push(`
            <div class="reward-item">
                <img src="draft.png">
                <span>999,999,999 Coins</span>
            </div>
        `);
    }

    if (document.getElementById("gp").checked) {
        rewards.push(`
            <div class="reward-item">
                <img src="fc3.png">
                <span>999,999,999 GP</span>
            </div>
        `);
    }

    if (document.getElementById("admin").checked) {
        rewards.push(`
            <div class="reward-item">
                <img src="admin.png">
                <span>Admin 2026 Activated</span>
            </div>
        `);
    }

    document.getElementById("resultText").innerHTML = `
        <p style="margin-bottom:20px">
            Your rewards have been successfully generated.
        </p>

        <div class="rewards">
            ${rewards.join("")}
        </div>
    `;

    showSection("section3");
}