const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/src/videos')
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + '-' + path.extname(file.originalname))
  }
});

const upload = multer({storage: storage})


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());


  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

app.use(express.static('staticPages'));

app.get('/upload', cors(), (req, res) => {
  res.sendFile(path.join(__dirname, './staticPages/upload.html'));
  console.log("get upload");
});

app.post('/upload', cors(), upload.single('file'), (req, res ) => {
  console.log("post upload");
  res.send('Image uploaded');
})

// Call the async function to start the server
startApolloServer();