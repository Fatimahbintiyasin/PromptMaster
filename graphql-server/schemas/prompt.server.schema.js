//prompt.server.scheme.js
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema } = require('graphql');
const { createPrompt, deletePrompt, getPromptById, getPrompts } = require('../resolvers/prompt.server.resolver');

// Define types
const PromptType = new GraphQLObjectType({
    name: 'Prompt',
    fields: () => ({
      id: { type: GraphQLID },
      chatId: { type: GraphQLString },
      prompt: { type: GraphQLString },
      response: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      chatTitle: { type: GraphQLString },
      upVotes: { type: GraphQLInt },
      downVotes: {type: GraphQLInt}
    }),
  });

// Define queries
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {  
      prompts: {
        type: new GraphQLList(PromptType),
        resolve: getPrompts,
      },
      
      prompt: {
        type: PromptType,
        args: {
          id: { type: GraphQLString },
        },
        resolve: getPromptById,
      },
  },
  });

// Define mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createPrompt: {
        type: PromptType,
        args: {
            chatId: { type: GraphQLString },
            prompt: { type: GraphQLString },
            response: { type: GraphQLString },
            createdAt: { type: GraphQLString },
            chatTitle: { type: GraphQLString },
            upVotes: { type: GraphQLInt },
            downVotes: {type: GraphQLInt},
        },
        resolve: createPrompt,
      },
      deletePrompt: {
        type: PromptType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: deletePrompt,
      },
    },
  });

// Make queries and mutations available
module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation,
  });