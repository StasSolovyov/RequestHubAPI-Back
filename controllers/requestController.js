const { addRequest, requestExists } = require('../models/requestModel');
const TelegramBot = require('node-telegram-bot-api');

const botToken = '6662562385:AAFkWgHwMkCEhcDVMEDFcsn4jo___paKFwQ';
const chatId = '859401688';
const bot = new TelegramBot(botToken, { polling: true });

const validatePhone = (phone) => {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phone);
};

const createRequest = (req, res) => {
    const { phone, message, utm_source, utm_medium, utm_campaign } = req.body;

    if (!validatePhone(phone)) {
        return res.status(400).json({ error: 'Invalid phone number format' });
    }

    if (requestExists(phone)) {
        return res.status(400).json({ error: 'Phone number already used' });
    }

    addRequest(phone, message);

    let utmString = '';
    if (utm_source || utm_medium || utm_campaign) {
        utmString = `UTM Source: ${utm_source || ''}, UTM Medium: ${utm_medium || ''}, UTM Campaign: ${utm_campaign || ''}`;
    }

    const botMessage = `New request received:\nPhone: ${phone}\nMessage: ${message}\n${utmString}`;
    bot.sendMessage(chatId, botMessage);

    res.status(200).json({ message: 'Request received' });
};

module.exports = {
    createRequest,
};
