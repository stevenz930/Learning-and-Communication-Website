var t = 3;//设定跳转的时间 
        setInterval("refer()", 1000); //启动1秒定时 
        function refer() {
            if (t == 0){
                location = "/"; //跳转的地址
            }
            document.getElementById('show').innerHTML = "" + t + "秒后跳转到首页"; // 显示倒计时 
            t--; // 计数器递减 
        } 