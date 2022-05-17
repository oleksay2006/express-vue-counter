import express from 'express';
import path from 'path';

const app = express()
const __dirname = path.resolve();
const PORT = 3000

app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/', (req, res) => {
  // res.render('index', {title: 'Main page', active: 'main'})
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`)
});
