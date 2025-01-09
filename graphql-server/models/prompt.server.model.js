//prompt.server.model.js
//Load the module dependencies
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define a new 'PromptSchema'
const PromptSchema = new Schema({
    chatId: { type: String, unique: true, required: true },
    prompt: String,
    response: String,
    createdAt: String,
    chatTitle: String,
    upVotes: Number,
    downVotes: Number
});

// Create the 'Prompt' model out of the 'PromptSchema'
const Prompt = mongoose.model('Prompt', PromptSchema); 

// Export the 'Prompt' model
module.exports = Prompt;