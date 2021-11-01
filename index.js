// node_modules 내 express 관련 코드를 가져온다
var express = require('express')
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
var routes = require('./src/routes')

var corsOptions = { //cors 옵션
    origin: '*',
    credentials: true
}

app.use(cors(corsOptions)) //cors 설정
app.use(express.json()) //request body 파싱
app.use(logger('tiny')) //Logger 설정

// const CONNECT_URL = 'mongodb://localhost:27017/kor_dic_db'
const CONNECT_URL = 'mongodb+srv://kimsang:1234@dic-dic-dic.e8im2.mongodb.net/kor_dic_db?retryWrites=true&w=majority'
mongoose.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongodb connected..."))
    .catch(e => console.log(`failed to connect mongodb: ${e}`))

app.use('/api', routes) //api 라우팅

app.get('/hello', (req, res) => { //URL 응답 테스트
    res.send('Hello World !')
})

//id값에 따라 출력값을 다르게 할때
// app.get('/hello/:id', (req, res) => {
//     res.send(req.params.id)
// })

//사용자가 요청한 페이지가 없는 경우 에러처리
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find page")
})

app.use((err, req, res, next) => { //서버 내부 오류 처리
    console.error(err.stack)
    //서버 내부 오류 처리 로직
    res.status(500).send("something is broken on server !")
})

app.listen(process.env.PORT || 5000, () => { //5000 포트로 서버 오픈
    console.log('server is running on port 5000! - nodemon')
})
// const points = [3, 4];
// const app = {}
// app.doubleNums = (points) => {
//     return points.map(p => {
//         return p * p
//     })
// }
// app.sum = (points_doubled) => {
//     let s = 0;
//     points_doubled.forEach(p => {
//         s += p;
//     })
//     return s;
// }
// app.sq = (s) => {
//     return Math.sqrt(s)
// }

// const pipeline = [app.doubleNums, app.sum, app.sq]
// const result = app.sq(app.sum(app.doubleNums(points)))
// console.log(result)