// ===== AI CHATBOT FUNCTIONALITY - CORRECTED =====
function initializeChatbot() {
    console.log('🤖 Initializing AI Chatbot...');
    
    const chatBtn = document.getElementById('chatBtn');
    const chatPopup = document.getElementById('chatPopup');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const userMessage = document.getElementById('userMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatBtn || !chatPopup) {
        console.log('⚠️ Chat elements not found');
        return;
    }
    
    console.log('✅ Chat elements found:', { chatBtn: !!chatBtn, chatPopup: !!chatPopup });
    
    let isOpen = false;
    
    // Toggle chat popup
    chatBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
            chatPopup.classList.add('active');
            // show down-arrow icon
            chatBtn.classList.add('active');
            const openIcon = chatBtn.querySelector('.close-icon');
            const closedIcon = chatBtn.querySelector('.chat-icon');
            if (openIcon && closedIcon) {
                closedIcon.style.display = 'none';
                openIcon.style.display = 'block';
            }
            
            // Lock body scroll (fallback for browsers without :has support)
            document.body.classList.add('chat-open');

            // Add welcome message if no messages exist
            if (chatMessages && !chatMessages.querySelector('.chat-message')) {
                addWelcomeMessage();
            }
        } else {
            chatPopup.classList.remove('active');
            chatBtn.classList.remove('active');
            const openIcon = chatBtn.querySelector('.close-icon');
            const closedIcon = chatBtn.querySelector('.chat-icon');
            if (openIcon && closedIcon) {
                closedIcon.style.display = 'block';
                openIcon.style.display = 'none';
            }
            // Unlock body scroll
            document.body.classList.remove('chat-open');
        }
    });
    
    // Close chat
    if (closeChat) {
        closeChat.addEventListener('click', () => {
            isOpen = false;
            chatPopup.classList.remove('active');
            chatBtn.classList.remove('active');
            const openIcon = chatBtn.querySelector('.close-icon');
            const closedIcon = chatBtn.querySelector('.chat-icon');
            if (openIcon && closedIcon) {
                closedIcon.style.display = 'block';
                openIcon.style.display = 'none';
            }
            document.body.classList.remove('chat-open');
        });
    }
    
    // Handle suggestion chips
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-chip')) {
            const message = e.target.textContent;
            if (userMessage) {
                userMessage.value = message;
            }
            hideSuggestions();
            handleSendMessage();
        }
    });
      // Send message function
    async function handleSendMessage() {
        const message = userMessage?.value?.trim();
        console.log('handleSendMessage called, message:', message);
        
        if (!message) {
            console.log('No message to send');
            return;
        }
        
        // Add user message
        console.log('Adding user message');
        addChatMessage(message, 'user');
        userMessage.value = '';
        hideSuggestions();
        
        // Show typing indicator
        console.log('Showing typing indicator');
        showTypingIndicator();
        
        try {
            console.log('Sending to Flask backend...');
            // Send to Flask backend
            const response = await fetch('https://puneeth-portfolio-asst-8c01c90c4c03.herokuapp.com/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            console.log('Response received:', response.status);            if (response.ok) {
                const data = await response.json();
                console.log('Response data:', data);
                console.log('data.reply:', data.reply);
                console.log('typeof data.reply:', typeof data.reply);
                hideTypingIndicator();
                
                // Handle both single response and array of responses - Flask returns 'reply' not 'response'
                let botResponse;
                if (data.reply) {
                    if (Array.isArray(data.reply)) {
                        // Join array elements with line breaks for better formatting
                        botResponse = data.reply.join('<br>');
                    } else {
                        botResponse = data.reply;
                    }
                } else {
                    botResponse = 'No response received from server';
                }
                
                console.log('Final bot response:', botResponse);
                addChatMessage(botResponse, 'bot');
                // ensure we are scrolled to bottom after bot reply
                setTimeout(()=>{
                    const chatMessages = document.getElementById('chatMessages');
                    if(chatMessages){ chatMessages.scrollTop = chatMessages.scrollHeight; }
                }, 0);
                showSuggestions();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
            hideTypingIndicator();
            addChatMessage("I'm currently experiencing technical difficulties. Please try again later!", 'bot');
            showSuggestions();
        }
    }
    
    // Send message on button click
    if (sendMessage) {
        sendMessage.addEventListener('click', handleSendMessage);
    }
    
    // Send message on Enter key
    if (userMessage) {
        userMessage.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
}

// Add welcome message
function addWelcomeMessage() {
    const welcomeMsg = `Hi! I'm your DevOps AI Assistant. I can help you learn about Puneeth's expertise, experience, and projects. Ask me anything!`;
    addChatMessage(welcomeMsg, 'bot');
    
    // Ensure persistent bottom suggestions bar
    const suggestions = [
        "Certifications",
        "Get in touch",
        "Interests",
        "Education"
    ];
    ensurePersistentSuggestions(suggestions);
}

// Add chat message
function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) {
        console.error('chatMessages element not found');
        return;
    }
    
    console.log('Adding message:', message, 'Sender:', sender);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="bot-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                    <circle cx="9" cy="9" r="1"/>
                    <circle cx="15" cy="9" r="1"/>
                    <path d="M8 13a8 8 0 008 0"/>
                </svg>
            </div>
            <div class="message-content">${message}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">${message}</div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    console.log('Message added successfully');
}

// Add suggestion chips
function addSuggestionChips(suggestions) {
    // Deprecated in favor of persistent bar; keep as no-op to avoid duplicates
}

// Create/refresh a persistent suggestions dock inside messages area
function ensurePersistentSuggestions(suggestions){
    const chatMessages = document.getElementById('chatMessages');
    if(!chatMessages) return;
    let dock = document.getElementById('suggestionsDock');
    if(!dock){
        dock = document.createElement('div');
        dock.id = 'suggestionsDock';
        dock.className = 'suggestions-dock';
        chatMessages.appendChild(dock);
    }
    if(dock.childElementCount === 0){
        const bar = document.createElement('div');
        bar.className = 'persistent-suggestions';
        suggestions.forEach(text=>{
            const chip = document.createElement('button');
            chip.className = 'suggestion-chip';
            chip.type = 'button';
            chip.textContent = text;
            bar.appendChild(chip);
        });
        dock.appendChild(bar);
    }
}

function hideSuggestions(){
    const dock = document.getElementById('suggestionsDock');
    if(dock){ dock.remove(); }
}

function showSuggestions(){
    // Rebuild suggestions dock at the end of messages
    ensurePersistentSuggestions([
        "Certifications",
        "Get in touch",
        "Interests",
        "Education"
    ]);
    const chatMessages = document.getElementById('chatMessages');
    if(chatMessages){ chatMessages.scrollTop = chatMessages.scrollHeight; }
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="bot-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                <circle cx="9" cy="9" r="1"/>
                <circle cx="15" cy="9" r="1"/>
                <path d="M8 13a8 8 0 008 0"/>
            </svg>
        </div>
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();
});
