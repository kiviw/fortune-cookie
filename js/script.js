const cookie = document.getElementById('cookie');
const crack = document.getElementById('crack');
const message = document.getElementById('message');
const crackButton = document.getElementById('crackButton');
const shareLink = document.getElementById('shareLink');

const messages = [
    "Good fortune is coming your way!",
    "You are destined for success.",
    "Today is a lucky day!",
    "Keep smiling, good things are on their way.",
    "Expect a pleasant surprise soon!",
    "Your future looks bright!",
];

crackButton.addEventListener('click', () => {
    crack.style.animation = 'crack 0.5s ease forwards';
    setTimeout(() => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        message.textContent = randomMessage;
        message.style.display = 'block';
        shareLink.style.display = 'block';
    }, 500);
});

shareLink.addEventListener('click', () => {
    // Replace with your social media sharing code
    alert("Sharing on social media... (not implemented in this example)");
});
