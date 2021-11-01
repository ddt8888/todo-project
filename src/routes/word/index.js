const express = require('express')
const WordRouter = express.Router()

const Word = require('../../models/Word')

WordRouter.route('/(:word)?').get(async (req, res) => {
    let words = []
    const { word } = req.params
    // const queries = word.split(',')
    // console.log(queries)

    if (word != undefined && word != "undefined") { // 사용자로부터 쿼리가 존재하는 경우
        // db.collection.find({ r_word: word })// 쿼리로 DB 검색
        // console.log(queries)
        //데이터베이스에서 쿼리로 단어를 검색
        try {
            // words = [
            //     {
            //         r_seq: "1",
            //         r_word: "학원",
            //         r_link: "https//google.com",
            //         r_chi: "한자",
            //         r_des: "학원은 지루하다",
            //         r_pos: "포스",
            //     },
            //     {
            //         r_seq: "1",
            //         r_word: "학원",
            //         r_link: "https//google.com",
            //         r_chi: "한자",
            //         r_des: "학원은 지루하다",
            //         r_pos: "포스",
            //     }
            // ]
            // words = await Word.find({ r_word: { $in: queries } })
            // words = await Word.find({ r_word: { $regex: `^${word}` } }) 
            //데이터베이스에서 검색어로 시작하는 단어를 검색
            // words = await Word.find({ r_word: { $regex: `{word}$` } }) 
            //데이터베이스에서 검색어로 끝나는 단어를 검색
            // words = await Word.find({ r_des: { $regex: `${word}`}}) 
            // Word 모델의 r_des 필드에서 쿼리를 포함하는 단어 검색
            words = await Word.find({
                $or: [
                    { r_word: { $regex: `${word}` } },
                    { r_des: { $regex: `${word}` } }
                ]
                // }).sort({ "_id": -1 //-1 = 최신순(내림차순), 1 = 과거순(오름차순) 으로 정렬
            })
        } catch (e) {
            console.log(e)
        }
    } else {
        //데이터베이스에서 전체 단어 검색
        //    words = ["no query"]
        console.log(word)
        // console.log(`word database: ${Word}`)
        try {
            // words = [
            //     {
            //         r_seq: "1",
            //         r_word: "학원",
            //         r_link: "https//google.com",
            //         r_chi: "한자",
            //         r_des: "학원은 지루하다",
            //         r_pos: "포스",
            //     },
            //     {
            //         r_seq: "1",
            //         r_word: "학원",
            //         r_link: "https//google.com",
            //         r_chi: "한자",
            //         r_des: "학원은 지루하다",
            //         r_pos: "포스",
            //     },
            //     {
            //         r_seq: "1",
            //         r_word: "학원",
            //         r_link: "https//google.com",
            //         r_chi: "한자",
            //         r_des: "학원은 지루하다",
            //         r_pos: "포스",
            //     },
            //     {
            //         r_seq: "1",
            //         r_word: "학원",
            //         r_link: "https//google.com",
            //         r_chi: "한자",
            //         r_des: "학원은 지루하다",
            //         r_pos: "포스",
            //     },
            //     {
            //         r_seq: "1",
            //         r_word: "학원",
            //         r_link: "https//google.com",
            //         r_chi: "한자",
            //         r_des: "학원은 지루하다",
            //         r_pos: "포스",
            //     },
            //     {
            //         r_seq: "1",
            //         r_word: "학원",
            //         r_link: "https//google.com",
            //         r_chi: "한자",
            //         r_des: "학원은 지루하다",
            //         r_pos: "포스",
            //     }
            // ]
            words = await Word.find()
        } catch (e) {
            console.log(e)
        }
    }
    // if(word !== undefined){
    //     //데이터베이스에서 쿼리로 단어를 검색
    res.json({ status: 200, words })
})

module.exports = WordRouter