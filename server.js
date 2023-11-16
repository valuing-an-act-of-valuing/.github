// HTTP モジュールの読み込み
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

//  HTTP サーバーを作成
const server = http.createServer(function (req, res) {
    // HTTP ステータスとコンテンツタイプを持つ HTTP ヘッダーのレスポンスを設定
    res.writeHead(200, { "Content-Type": "text/plain" });

    // レスポンス本体の "Hello World" を送信
    res.end("Hello World\n");
});

//  サーバーにアクセスするための URL を出力
server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});