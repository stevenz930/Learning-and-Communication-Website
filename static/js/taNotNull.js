function abc(){
    var n = document.getElementById("comment").value;
    alert("hey|"+n+'|');
    if(n==""||n==null)
    {
        alert("请填写要发表的内容！");
        return;
    }
}