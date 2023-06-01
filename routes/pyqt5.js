const express = require('express');
const url = require('url');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '39.101.140.146',
    user     : 'web_database',
    password : '123456',
    database : 'web_database'
});
connection.connect();
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('pyqt5---The solution is: ', results[0].solution);
});

var router = express.Router();

router.get('/',(req,res)=>{
    let uName = req.signedCookies.uName;
    console.log('uName: '+uName);
    res.render("pyqt5",{
        uName:uName
    });
})

router.get('/:id',(req,res)=>{
    var father = 'pyqt5';
    console.log('father: '+father);
    let uName = req.signedCookies.uName;
    console.log('uName: '+uName);
    var id = req.params['id'];
    console.log('id: '+id);

    //获取留言
    var sql = 'SELECT uName AS uName,message AS msg,whatdate as date,floor as floor FROM comments where class="'+father+'"';
    console.log('sql: ',sql);
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[select ERROR] - ',err.message);
            return;
        }else if(result != ''){
            //console.log('---------------------------------');
            //console.log('result: '+result);
            res.render("unit",{
                uName:uName,
                ph:id,
                father:father,
                result:result
            });
        }else if(result == ''){
            console.log('result is null');
            return;
        }
    })

    /*
    var pathname = req.headers['referer'];
    console.log('pathname: '+pathname);

    var pathname = url.parse(req.url);
    var ph = pathname.href;
    console.log('ph: '+ph);
    */
    //var n = ph.match(/[^/]*/g);
    //var ph = n[1]
    //console.log('ph: '+ph);
})

router.post('/:id',(req,res)=>{
    console.log('posting commet');
    var father = 'pyqt5';
    let uName = req.signedCookies.uName;
    console.log('n: '+uName);
    var id = req.params['id'];

    const msg = req.body.comment;
    console.log('msg: '+msg);

    //获取留言
    var sql = 'SELECT uName AS uName,message AS msg,whatdate as date,floor as floor FROM comments where class="'+father+'"';
    console.log('sql: ',sql);
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[select ERROR] - ',err.message);
            return;
        }else if(msg==''){
            console.log('msg为空');
            res.redirect('./'+id);
        }else if(result != ''&&msg != ''){
            //找最大楼层
            var sql2 = "SELECT MAX(`floor`) as floor FROM `comments` WHERE `class`='pyqt5'";
            connection.query(sql2,function (err, result) {
                if(err){
                    console.log('[select ERROR] - ',err.message);
                    return;
                }else if(result != ''){
                    console.log('---------------------------------');
                    console.log('max floor: '+result[0].floor);
                    var floor = result[0].floor + 1;
                    console.log('new floor: '+floor);
                    //发送留言
                    var addsql = "insert into comments(class,uName,floor,message) values('pyqt5','"+uName+"','"+floor+"','"+msg+"')";
                    console.log('sql: ',addsql);
                    connection.query(addsql,function (err, result) {
                        if(err){
                            console.log('[发送失败] - ',err.message);
                            res.render("unit",{
                                uName:uName,
                                ph:id,
                                father:father,
                                result:result
                            });
                            return;
                        }else{
                            console.log('[发送了]');
                            res.redirect('./'+id);
                        }
                    })
                }else if(result == ''){
                    console.log('result is null');
                    return;
                }
            })
        }else if(result == ''){
            console.log('result is null');
            return;
        }
    })
    /*
    else if(msg==''){
            console.log('msg为空');
            res.render("unit",{
                uName:uName,
                ph:id,
                father:father,
                result:result
            });
        }
    */
    


    
})

module.exports = router;