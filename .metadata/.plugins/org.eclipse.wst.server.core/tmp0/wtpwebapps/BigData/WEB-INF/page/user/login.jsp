<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../base.jsp"%>

<html lang="en">

<head>
	<meta charset="utf-8">
	<title>登录</title>
	<meta name="author" content="John">
	<meta content="width=device-width, initial-scale=1.0, user-scalable=no"
		name="viewport">
	<meta name="description" content="Slick Admin Admin UI">
	<meta name="keywords"
		content="Slick Admin, Admin UI, Admin Dashboard, John">
	

	<script src="${ctx}/js/html5-trunk.js"></script>
	<script src="${ctx}/dist/jquery.validate.min.js"></script>
	<script src="${ctx}/dist/messages_zh.js"></script>
	<link href="${ctx}/icomoon/style.css" rel="stylesheet">
	<link href="${ctx}/css/bootstrap.css" rel="stylesheet">
	<link href="${ctx}/css/main.css" rel="stylesheet">
	
	
	
	<script type="text/javascript">
//		拦截提交
//		$.validator.setDefaults({
//			submitHandler: function() {
//				alert("提交？");
//			}
//		});
		
		
		$().ready(function() {
			jQuery.validator.addMethod("isUserName", function(value, element) {
				var tel = /^[0-9A-Za-z.@\-\_]{6,25}$/;
				return tel.test(value);		//this.optional(element) || 若该栏可空，则加入这个判断
			}, "请输入正确的用户名（6~25个字符）");
			$("#loginForm").validate({
				rules: {
					userName: {
						required: true,
						isUserName: true
					},
					password: {
						required: true,
						rangelength: [5,25]
					},
				},   
			});
		});
		
		
		function formSubmit(){
			$("#loginForm").submit();
		}
		
		
	</script>
	
</head>

<body>

	<!-- Main Container start -->
	<div class="main-container">
		<div class="row">
			<form action="${ctx }/login.action" class="login-wrapper" method="post" id="loginForm">
				<div class="header">
					<div class="row">
						<div class="col-md-12">
							<h3>
								数据平台<img src="${ctx }/img/logo.png" alt="Logo" class="pull-right">
							</h3>
							<p>为您打造一个方便的数据建模环境</p>
						</div>
					</div>
				</div>
				<div class="content">
					<div class="row">
						<div class="col-md-12 col-sm-12">
							<input class="input col-md-12 col-sm-12" id="userName" name="userName"
								placeholder="用户名（6~25个字符）"
								type="text" value="">
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 col-sm-12">
							<input class="input col-md-12 col-sm-12 password" id="password" name="password"
								placeholder="密码（6~25个字符）" type="password">
						</div>
					</div>

					<div class="row">
						<div class="col-md-12 validation" style="color: red" id="message">
							<p>${loginerror }</p>
						</div>
					</div>
				</div>


				<div class="actions">
					<a href="#" class="btn btn-danger" onclick="formSubmit()">登录</a>
					<a class="link" href="#">忘记密码?</a>
					<div class="clearfix"></div>
				</div>
				
			</form>
		</div>
	</div>
	<!-- Main Container end  -->
</body>
</html>