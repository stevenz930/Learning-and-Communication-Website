const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
//引入外部模块
const login = require('./routes/login');
const register= require('./routes/register');
const pyqt5 = require('./routes/pyqt5');

//配置模板引擎
app.set('view engine','ejs');
//配置第三方中间件
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//配置cookie与密钥
app.use(cookieParser("user"));
//配置静态web目录
app.use(express.static('static'));

//挂载模块
app.use("/login",login)
app.use("/pyqt5",pyqt5)
app.use("/register",register)

//配置路由
app.get('/',(req,res)=>{
    let uName = req.signedCookies.uName;
    console.log('uName: '+uName);
    res.render("index",{
        uName:uName
    });
})
app.get('/error',(req,res)=>{
    let uName = req.signedCookies.uName;
    console.log('uName: '+uName);
    res.render("error",{
        uName:uName
    });
})

app.get('/logout',(req,res)=>{
    res.clearCookie('uName');
    res.render("logout",{});
})

app.listen(80);

console.log('Server running at http://127.0.0.1:80/');