const { GraphQLServer, PubSub } = require("graphql-yoga");

const messages = [];

const typeDefs = `
    type Message {
        id: ID!
        user: String!
        content: String!
    }

    type Query {
        messages: [Message!]
    }

    type Mutation{
        postMessage(user: String!, content: String!): ID!
    }

    type Subscription{
      messages: [Message!]
    }

`;

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (parent, { user, content }) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      return id;
    },
  },
  Subscription: {
    messages: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random().toString(36).slice(2, 15);
        console.log(channel);
      },
    },
  },
};

const pubsub = new PubSub();

const channel = Math.random().toString(36).slice(2, 15);
console.log(channel);
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.start(({ port }) => {
  console.log(`Serving on  http://localhost:${port}/`);
});
