const express = require('express');
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
  console.log('Login---The solution is: ', results[0].solution);
});

var router = express.Router();

router.get('/',(req,res)=>{
    let uName = req.signedCookies.uName;
    console.log('uName: '+uName);
    res.render("login",{
        uName:uName
    });
})

router.post('/',(req,res)=>{
    const uName = req.body.username;//获取输入的用户名
    const uPwd = req.body.password;//获取输入的密码

    //若为空，返回登录界面
    if(req.body.username==''&&req.body.password==''){
        res.render("login",{
            uName:uName
        });
    }

    var sql = 'SELECT count(*) AS ans FROM Users where uName="'+uName+'" and uPwd="'+uPwd+'"';
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[select ERROR] - ',err.message);
            res.render("login",{});
            return;
        }else if(result[0].ans != 1){
            console.log('result: '+result[0].ans);
            res.render("error",{});
            return;
        }else if(result[0].ans == 1){
            console.log('result: '+result[0].ans);
            res.cookie('uName',uName,{maxAge:60000*5,signed:true});//uName存为cookie,寿命5分钟，加密
            res.redirect("./");
        }
    })
    //res.send('执行登录'+body.username);
})

module.exports = router;