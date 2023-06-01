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
  console.log('Register---The solution is: ', results[0].solution);
});

var router = express.Router();

router.get('/',(req,res)=>{
    let uName = req.signedCookies.uName;
    console.log('uName: '+uName);
    res.render("register",{
        uName:uName
    });
})

router.post('/',(req,res)=>{
    res.clearCookie('uName');//清除cookie
    const uName = req.body.username;
    const uEmail = req.body.email;
    const uPwd = req.body.password;
    //获取输入的数据
    console.log(uName);

    //若为空，返回登录界面
    if(req.body.username==''&&req.body.password==''&&req.body.email==''){
        res.render("register",{
            uName:uName
        });
    }
    //查
    var sql = 'SELECT count(*) AS ans FROM Users where uName="'+uName+'"';
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[select ERROR] - ',err.message);
            res.render("register",{});
            return;
        }else if(result[0].ans != 0){
            console.log('result: '+result[0].ans);
            res.render("error",{});
            return;
        }else if(result[0].ans == 0){
            console.log('result: '+result[0].ans);
            //添加数据
            var addsql = "insert into Users(uName,uEmail,uPwd) values(?,?,?)";
            var addsqlparams = [uName,uEmail,uPwd]
            connection.query(addsql,addsqlparams,function (err, result) {
                if(err){
                    console.log('[insert ERROR] - ',err.message);
                    //res.send("请重新尝试注册");
                    res.render("error",{
                        uName:uName
                    });
                    return;
                }else{
                    console.log(result);
                    res.redirect("./");
                }
                connection.end();
            })
        }
    })
    
})

module.exports = router;