const express = require('express')
// express.Router를 생성
const router = express.Router()
// todo라는 하위 로직을 가져온다
// const todo = require('./todo')
const word = require('./word')

//router를 이용해서 하위폴더 하나 더 생성
// router.use('/todos', todo)
// => api/todos/ app.get('edit')
// 하위에 처리 로직이 있으면 불러들인 값을 실행
router.use('/words', word)   // /api/word로 실행


module.exports = router