<?php
header("Content-Type: text/html; charset=utf8");
$server = "localhost";//主机
$db_username = "root";//你的数据库用户名
$db_password = "23314567913aq";//你的数据库密码

$con = new mysqli($server, $db_username, $db_password);//链接数据库

// 检测连接
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
//echo "连接成功";



mysqli_select_db($con, 'user' );
$username=$_POST['username'];//post获取表单里的name
$password=md5($_POST['password']);//post获取表单里的password
$userphone=$_POST['userphone'];//post获取表单里的phone
$scnu_number=$_POST['scnu_number'] ;//post获取表单里的role

$q="insert into scnusay(id,user_id,userpassword,userphone,scnu_number) values (null,'$username','$password','$userphone','$scnu_number')";//向数据库插入表单传来的值的sql
$reslut=$con->query($q);//执行sql
$success="注册成功!";


if ($reslut){
    echo iconv("GB2312","UTF-8","$success");
}else {
	echo iconv("GB2312","UTF-8","注册失败,请核对手机号码以及学号!");
}
$con->close()//关闭数据库
?>
