// script.js

const socket = io();

const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');

// Example user IDs
const currentUser = 'user1'; // This should be dynamically assigned based on user authentication
const otherUser = 'user2';   // Example identifier for other users

// Listen for incoming messages
socket.on('message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    // Apply class based on user ID
    if (data.user === currentUser) {
        messageElement.classList.add('right');
    } else {
        messageElement.classList.add('left');
    }
    
    messageElement.textContent = data.message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
});

function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== '') { // Prevent sending empty messages
        socket.emit('message', { user: currentUser, message: message });
        messageInput.value = '';
    }
}
