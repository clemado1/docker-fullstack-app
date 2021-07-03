// 필요한 모듈 가져오기
const express = require("express");

const db = require("./db");

// Express 서버 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// 테이블 생성
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, fileds) => {
    console.log("result", results);
});

app.get('/api/hi', function (req, res) {
   res.status(200).send('good')
});

// DB lists 데이터를 프론트로 전송
app.get("/api/values", function(req, res) {
    db.pool.query("SELECT * FROM lists;",
    (err, results, fileds) => {
        if(err)
            return res.status(500).send(err);
        else
            return res.json(results);
    });
});


// 데이터를 DB에 입력
app.post("/api/value", function(req, res, next) {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fileds) => {
        if(err)
            return res.status(500).send(err);
        else
            return res.json({success: true, value: req.body.value});
    });
});


app.listen(5000, () => {
    console.log("Application started!");
});