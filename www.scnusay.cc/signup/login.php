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
$q="select * from `tb_user` where `username` = '$name' and `password` = '$password'";//向数据库查询表单传来的值的sql
$con->query('SET NAMES UTF8');
$result = $con->query($q);// 执行 sql

// 获取执行 sql 后的返回对象
$obj=$result->fetch_assoc();

if (mysqli_num_rows($result) > 0){

    // 管理员
    if($obj["role"] == '1'){
        echo"管理员登录成功";
    }else{
        echo"普通用户登录成功";
    }

}else{
    echo "用户名或密码错误";
}
$con->close();//关闭数据库

?>

