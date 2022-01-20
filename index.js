const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { routes } = require('./src/routes');

// настроим подключение к бд

mongoose.connect('mongodb+srv://pfmDB:mamatato123@cluster0.8dxc5.mongodb.net/pfmDB?retryWrites=true"', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// инициализируем приложение
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

routes.forEach((item) => {
  console.log(item)
  app.use(`/api/${item}`, require(`./src/routes/${item}`));
});

//if(process.env.NODE_ENV === "production"){
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
//}

// объявим наши  роуты
const PORT = process.env.PORT || 3000
// объявим наши  роуты
app.listen(PORT);


console.log(`Server running at ${PORT}`);
