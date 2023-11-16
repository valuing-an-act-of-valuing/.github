// Express モジュールをインポート
const express = require('express')
const app = express()

const port = 3000;

// Express での静的ファイルの提供
app.use(express.static('profile'))

/* 基本的なルーティング */
// GETリクエストを処理する
app.get('./online', (req, res) => {
    console.log(req.query)
    res.send(req.query)
})

// body-parser で フォームからの POST データを受け取る方法
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

// POSTリクエストを処理する
app.post('/thankyou', (req, res) => {
    console.log(req.body);
    res.status(200).json({
      yourValue: `${req.body.yourValue}`,
      yourLanguage: `${req.body.yourLan}`,
      valuText: `${req.body.valuText}`
    });
})

// サーバーを起動
app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}/`);
});