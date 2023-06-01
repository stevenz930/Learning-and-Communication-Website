function yz(){
    var m=document.getElementsByTagName("input");
    for(var i=0;i<m.length;i++)
    {
        if(m[i].value==""||m[i].value==null)
        {
            alert("请填写所有的空格！");
            return false;
        }else{
            return true;
        }
    }
}