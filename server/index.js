import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import path from 'path'

const db = require ('./db-functions');
const api = require('./api-functions')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('../client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
}

app
  .route('/newusers')
  .post(db.addUser);
app
  .route('/users/:email/:pass')
  .get(db.getUsers)
  // .post(db.addUser);
// database - get latest info of one user - latest weight
app
  .route('/user/:id')
  .get(db.getUser)
  // database - post weight at current date
app
  .route('/usersby/:email')
  .get(db.getUserByEmail)
app
  .route('/weight')
  .post(db.addWeight)
// database - post - posts in ingredients, then in meals
// get - all meals per date per user
app
  .route('/meals')
  .post(db.addMeals)
  .get(db.getAllMeals);
  // database - get amount of calories per user of all dates
app
  .route('/delmeals/:id')
  .delete(db.deleteMeal)
  
// get nutrients per user for all dates for graph
app
  .route('/calorie/:id')
  .get(db.getUserCalories);
app
  .route('/carb/:id')
  .get(db.getUserCarbs);
app
  .route('/fat/:id')
  .get(db.getUserFat);
app
  .route('/protein/:id')
  .get(db.getUserProteins);
  app
  .route('/kilograms/:id')
  .get(db.getUserWeight);
// database - get amount of calories per date per user
app
  .route('/calories/:id/:date')
  .get(db.getDailyCalories);
// api - get list of products
app
  .route('/meals/:id/:meal/:date')
  .get(db.getMeals)
app
  .route('/search/:query')
  .get(api.fetchSearch);
// api - get details for one product
app
  .route('/:type/:name')
  .get(api.fetchItem);

// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`server listening`);
});
