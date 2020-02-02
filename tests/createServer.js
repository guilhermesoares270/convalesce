const app = require('../index')();

const port = process.env.PORT || 8080;

// app.listen(8080, () => console.log('Hello World'));

app.listen(port, (err) => {
  if (err) {
    console.log(`An error has ocurred:\n${err}`);
  }
  console.log(`Server listening at: ${port}`);
});