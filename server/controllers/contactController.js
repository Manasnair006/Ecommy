const Contact = require("../models/Contact");

const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (
            !name?.trim() ||
            !email?.trim() ||
            !subject?.trim() ||
            !message?.trim()
        ) {
            return res.status(400).json({
                message: "All fields are required.",
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                message: "Please provide a valid email address.",
            });
        }

        // Save inquiry to MongoDB
        const contact = await Contact.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim(),
        });

        return res.status(201).json({
            message: "Your message has been submitted successfully.",
            contactId: contact._id,
        });
    } catch (error) {
        console.error("Contact submission error:", error);

        return res.status(500).json({
            message: "Unable to submit your message. Please try again.",
        });
    }
};

module.exports = { submitContact };