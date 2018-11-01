<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>信息验证中</title>
	 
</head>
<body>
	 
	<?php
		function dopost($url, $data){  
			$postdata = http_build_query(  
	  
				$data  
	  
			);    

			$opts = array('http' =>  
	  
						  array(  
	  
							  'method'  => 'POST',  
	  
							  'header'  => 'Content-type: application/x-www-form-urlencoded',  
	  
							  'content' => $postdata  
	  
						  )  
	  
			);  
	  

			$context = stream_context_create($opts);  
	 
			$result = file_get_contents($url, false, $context);
			return $result;
		}
		
		function curl_get_https($url){
			$curl = curl_init(); // 启动一个CURL会话
			curl_setopt($curl, CURLOPT_URL, $url);
			curl_setopt($curl, CURLOPT_HEADER, 0);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 跳过证书检查
			curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);  // 从证书中检查SSL加密算法是否存在
			$tmpInfo = curl_exec($curl);     //返回api的json对象
			//关闭URL请求
			curl_close($curl);
			return $tmpInfo;    //返回json对象
		}

		
		
		$code = "";
		if(isset($_GET["code"])) {
			$code = $_GET["code"];
		}
		//echo "code==" . $code;
		
		$url = "https://api.weibo.com/oauth2/access_token";

		//echo $url;
		$data = array('client_id'=>'1662975332',
              'client_secret'=>'0acef31d11e33dd47c1104cbb6085a3a',
              'grant_type'=>'authorization_code',
              'redirect_uri'=>'https://smartxiaohan.github.io',
			  'code'=>$code);
			  
		$result = dopost($url,$data);	  
		
		
		//echo $result;
		
		$res = json_decode($result);
		
		$access_token = $res->{'access_token'};
		
		//echo "access_token=" . $access_token;
		
		$url = "https://api.weibo.com/2/account/get_uid.json?access_token=" . $access_token;
		//echo $url;
		//$data = array('access_token'=>$access_token);
		$info = curl_get_https($url);//, $data);
		//echo $info;
		
		$resinfo = json_decode($info);
		
		$uid = $resinfo->{'uid'};
		
		//echo "uid=" . $uid;
		
		$url = "https://api.weibo.com/2/users/show.json?access_token=" . $access_token . "&uid=" . $uid;
		
		$allinfo = curl_get_https($url);
		echo $allinfo;
		
		$allinfojson = json_decode($allinfo);
		
		$name = $allinfojson->{'screen_name'};
		$id = $allinfojson->{'id'};
		$avatar_large = $allinfojson->{'avatar_large'};
		$avatar_large = $allinfojson->{'avatar_large'};
		$gender = $allinfojson->{'gender'};
		echo "name=" . $name;
		echo "gender=" . $gender;
		echo "avatar_large=" . $avatar_large;
		
		setcookie("weiboid",$id, time()+3600*24);
		
		
		
		$mysql_server_name="qsmj.cozocqg7ehhy.ap-northeast-1.rds.amazonaws.com"; //数据库服务器名称

		$mysql_username="hanrui"; // 连接数据库用户名

		$mysql_password="hanrui105213"; // 连接数据库密码

		$mysql_database="hanrui"; // 数据库的名字

	 
		//echo "start mysql";
		// 连接到数据库

		$conn=mysql_connect($mysql_server_name, $mysql_username,

							$mysql_password);

	
		// 从表中提取信息的sql语句

		$strsql="select * from tb_user where third_id=" . $id;

		// 执行sql查询

		$result=mysql_db_query($mysql_database, $strsql, $conn);

		// 获取查询结果

		$row=mysql_fetch_array($result);
		
		//var_dump($row);
		
		if($row) {
			echo "yyyyyy";
		}
		else
		{
			echo "nnnnnnnnnn";
			//insert info
			$sql = "select * from tb_user order by uid desc limit 1";
			
			$result=mysql_db_query($mysql_database, $sql, $conn);
			
			$row1=mysql_fetch_array($result);
			if($row1) {
				$uid = $row1['uid']; 
				$uid = $uid + 1;
				$nowtime = time();
				$password = "123456";
				$sex = 0;
				$sql = "insert into tb_user values('" . $uid . "','" . $name . "','" . $password . "','" . $nowtime . "','" . $id . "','" . $avatar_large  . "','" . $sex . "')";
				echo "77777777sql=" . $sql;
				mysql_db_query($mysql_database, $sql, $conn);
			}
			else
			{
				$uid = 1000;
				$nowtime = time();
				$password = "123456";
				$sql = "insert into tb_user values('" . $id . "','" . $name . "','" . $password . "','" +$nowtime . "')";
				mysql_db_query($mysql_database, $sql, $conn);
			}
		}
		header("location:https://smartxiaohan.github.io/mj/index.html?weiboid=" . $id);
	?>
	
</body>
</html>