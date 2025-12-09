document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');
    const pollQuestionElement = document.getElementById('poll-question');
    const pollContainer = document.getElementById('poll-container');
    const wishTextElement = document.getElementById('wish-text');
    const emojiButtons = document.querySelectorAll('.emoji-btn');

    const greetingText = "Good morning, Myroslava";
    const pollQuestionText = "How is your mood today?";
    
    // Wishes based on mood
    const wishes = {
        sad: "Sending you a massive hug. Remember, even the darkest night ends with a sunrise. Today will get better.",
        confused: "It's okay not to have all the answers. Take a deep breath, trust yourself, and clarity will come.",
        neutral: "A calm day is a good foundation. May you find little sparks of joy to make it special.",
        happy: "That's wonderful! Keep shining your light and making the world a brighter place today.",
        excited: "Love that energy! Go crush your goals and enjoy every amazing moment of this day!"
    };

    const typingSpeed = 100; // ms per char

    function typeWriter(text, element, callback) {
        let i = 0;
        element.textContent = "";
        
        // Add cursor
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        // cursor.innerHTML = '&nbsp;'; 
        element.appendChild(cursor);

        function type() {
            if (i < text.length) {
                const char = document.createTextNode(text.charAt(i));
                element.insertBefore(char, cursor);
                i++;
                setTimeout(type, typingSpeed);
            } else {
                if (callback) {
                    // Remove cursor after typing is done for this element
                    cursor.remove();
                    callback();
                } else {
                    // Keep cursor at the very end
                }
            }
        }
        type();
    }

    function handleEmojiClick(e) {
        const mood = e.target.closest('button').dataset.mood;
        const wish = wishes[mood] || wishes.neutral;

        // 1. Prepare Email
        const email = "hmyriayehor@gmail.com";
        const subject = `Myroslava's Mood: ${mood.charAt(0).toUpperCase() + mood.slice(1)}`;
        const body = `Hi Yehor,\n\nMyroslava just checked in. Her mood is: ${mood}.\n\n(Auto-generated from Good Morning Site)`;
        
        // Trigger mailto
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // 2. Hide Poll
        pollContainer.classList.add('hidden');
        pollQuestionElement.style.display = 'none';

        // 3. Type Wish
        setTimeout(() => {
            typeWriter(wish, wishTextElement);
        }, 1000); 
    }

    // Start Sequence
    typeWriter(greetingText, greetingElement, () => {
        setTimeout(() => {
            typeWriter(pollQuestionText, pollQuestionElement, () => {
                // Show Poll
                pollContainer.classList.remove('hidden');
                pollContainer.style.display = 'flex'; // Ensure flex layout
                
                // Add blinking cursor to the end of question? Or just stop.
                // Let's add a permanent cursor to the question to indicate waiting for input
                const cursor = document.createElement('span');
                cursor.classList.add('cursor');
                pollQuestionElement.appendChild(cursor);
            });
        }, 500);
    });

    // Event Listeners
    emojiButtons.forEach(btn => {
        btn.addEventListener('click', handleEmojiClick);
    });
});
