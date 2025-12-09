const express = require('express');
const axios = require('axios'); // Use axios for HTTP requests
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Telegram sending endpoint
app.post('/api/send-telegram', async (req, res) => {
    const { mood } = req.body;

    if (!mood) {
        return res.status(400).json({ error: 'Mood is required' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!token || !chatId) {
        console.error('Telegram credentials missing');
        return res.status(500).json({ error: 'Server misconfiguration' });
    }

    const message = `Good Morning Bot Report ☀️\n\nMood: ${mood.charAt(0).toUpperCase() + mood.slice(1)}\n\n(Auto-generated Myroslava's check-in)`;

    try {
        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
            chat_id: chatId,
            text: message
        });
        console.log(`Telegram message sent for mood: ${mood}`);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending Telegram message:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
