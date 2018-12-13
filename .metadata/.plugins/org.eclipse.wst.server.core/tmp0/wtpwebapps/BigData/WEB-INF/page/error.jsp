<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="base.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

  <head>
    <meta charset="utf-8">
    <title>错误页面</title>
    <meta name="author" content="John">
    <meta content="width=device-width, initial-scale=1.0, user-scalable=no" name="viewport">
    <meta name="description" content="Slick Admin Admin UI">
    <meta name="keywords" content="Slick Admin, Admin UI, Admin Dashboard, John">
    
    <script src="${ctx }/js/html5-trunk.js"></script>
    <link href="${ctx }/icomoon/style.css" rel="stylesheet">
    <link href="${ctx }/css/bootstrap.css" rel="stylesheet">
    <link href="${ctx }/css/main.css" rel="stylesheet">

  </head>

  <body>
    
    <!-- Main Container start -->
    <div class="main-container">
      <div class="row">
        <div class="col-md-12">
          <div class="error-container">
            <h1>Oops!</h1>
            <h2>Sorry,${errorMessage }</h2>
            <div class="error-actions">
              <a href="${ctx }" class="btn btn-success btn-large">
                Back to Home          
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Main Container end -->

  </body>
</html>