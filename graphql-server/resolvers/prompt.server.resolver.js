//prompt.server.resolvers.js
const Prompt = require('../models/prompt.server.model');
// 
const getPrompts = async () => {
  return await Prompt.find();
};
//
const getPromptById = async (parent, args) => {
  return await Prompt.findById(args.id);
};
//
const createPrompt = async (parent, args) => {
  const prompt = new Prompt(args);
  return await prompt.save();
};
//
const deletePrompt = async (parent, args) => {
  return await Prompt.findByIdAndDelete(args.id);
};
// Make resolvers available to other modules
module.exports = {
  getPrompts,
  getPromptById,
  createPrompt,
  deletePrompt,
};