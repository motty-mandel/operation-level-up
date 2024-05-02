const fs = require('fs');
require('dotenv').config();
const { Storage } = require('megajs');
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'videos')
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + path.extname(file.originalname))
//   }
// });

// const upload = multer({storage: storage})


(async function () {
  const storage = new Storage({
    email: 'mandelmottyisrael65@gmail.com',
    password: 'Minemegajs1515',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  })
  await storage.ready
}()).catch(error => {
  console.error(error)
  process.exit(1)
})

storage.upload('hello-world.txt', 'Hello world!', (error, file) => {
  if (error) return console.error('There was an error:', error)
  console.log('The file was uploaded!', file)
})

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

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/videos', express.static(path.join(__dirname, '/videos')));

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


app.post('/upload', cors(), (req, res ) => {
  const filePath = path.join('/videos', req.file.filename);
  try {
    res.json({ filePath });
  } catch (err) {
    res.status(500).json(err);
  }
  
})

// Call the async function to start the server ;upload.single('file'),
startApolloServer();