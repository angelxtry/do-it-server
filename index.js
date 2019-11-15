const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const passportConfig = require('./passport');
const db = require('./models');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');
const todosRouter = require('./routes/todos');

dotenv.config();

const app = express();
const env = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8085;
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(
  cors({
    origin: env ? 'http://doitreviews.com:3000' : true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: env && '.doitreviews.com',
      maxAge: 60 * 60 * 1000,
    },
    name: 'domybest',
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);
app.use('/api/todos', todosRouter);

app.get('/', (req, res) => {
  res.send('doitreviews.com');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;

// app.use(
//   require('express-session')({
//     secret: 'crackalackin',
//     resave: true,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
//   }),
// );
