<%@ page language="java" pageEncoding="UTF-8"%>

<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>应数大数据平台</title>
    <meta name="author" content="Tang" />
    <meta content="width=device-width, initial-scale=1.0, user-scalable=no" name="viewport" />
    <meta name="description" content="应数大数据平台" />
    <meta name="keywords" content="大数据, 机器学习, 数据挖掘, 建模" />
    
    
    <script src="${ctx }/js/html5-trunk.js"></script>
    <link href="${ctx }/icomoon/style.css" rel="stylesheet" />

    <!-- bootstrap css -->
    <link href="${ctx }/css/bootstrap.css" rel="stylesheet" />

    <!-- custom css -->
    <link href="${ctx }/css/main.css" rel="stylesheet" />

    <!-- wysiwyg css <script src="FlowChart/Canvas.js"></script>-->
    <link href="${ctx }/css/wysiwyg/bootstrap-wysihtml5.css" rel="stylesheet" />
    <link href="${ctx }/css/wysiwyg/wysiwyg-color.css" rel="stylesheet" />
    
	<!--右击
    <link href="${ctx }/click/font-awesome.css" rel="stylesheet" />-->
	

</head>

<body>

    <!-- Header start -->
    <header>

        <!-- Logo start -->
        <div class="logo">
            Big<span>Data</span>
        </div>
        <!-- Logo end -->
        <!-- Optional Dropdown start -->
        <div id="optional-dropdown">
            <ul>
                <li>
                    <a href="index.html">
                        <span class="fs1" aria-hidden="true" data-icon="&#xe000;"></span>
                    </a>
                </li>
                <li>
                    <a href="invoice.html">
                        <span class="fs1" aria-hidden="true" data-icon="&#xe099;"></span>
                        <span class="count-label"></span>
                    </a>
                    <ul>
                        <li>
                            <a href="invoice.html"><span class="fs1" aria-hidden="true" data-icon="&#xe004;"></span> 云计算基础服务</a>
                        </li>
                        <li>
                            <a href="maps.html"><span class="fs1" aria-hidden="true" data-icon="&#xe042;"></span> 量化投资</a>
                        </li>
                        <li>
                            <a href="profile.html"><span class="fs1" aria-hidden="true" data-icon="&#xe074;"></span> 文本处理</a>
                        </li>
                        <li>
                            <a href="typography.html"> <span class="fs1" aria-hidden="true" data-icon="&#xe141;"></span> 图像识别</a>
                        </li>
                        <li>
                            <a href="icons.html"><span class="fs1" aria-hidden="true" data-icon="&#xe0a9;"></span> 建模定制</a>
                        </li>
                        <li>
                            <a href="grid.html"><span class="fs1" aria-hidden="true" data-icon="&#xe14c;"></span> 联系我们</a>
                        </li>
                    </ul>
                </li>
                <!--<li>
                  <a href="mail.html">
                    <span class="fs1" aria-hidden="true" data-icon="&#xe040;" ></span>
                    <span class="count-label"></span>
                  </a>
                </li>-->
            </ul>
        </div>
        <!-- Optional Dropdown end -->
        <!-- Search bar start -->
        <div class="custom-search">
            <input type="text" class="search-query">
            <button> <span class="fs1" aria-hidden="true" data-icon="&#xe07f;"></span></button>
        </div>
        <!-- Search bar end -->
        <!-- Mini navigation start -->
        <div id="mini-nav">
            <ul>
                <li class="hidden-sm">
                    <a href="maps.html">
                        操作
                        <span class="fs1" aria-hidden="true" data-icon="&#xe099;"></span>
                        <!-- <span class="count-label">7</span>-->
                    </a>
                    <ul>
                        <li>
                            <a href="maps.html"><span class="fs1" aria-hidden="true" data-icon="&#xe042;"></span>基本资料</a>
                        </li>
                        <li>
                            <a href="invoice.html"><span class="fs1" aria-hidden="true" data-icon="&#xe004;"></span>费用管理</a>
                        </li>
                        <li>
                            <a href="invoice.html"><span class="fs1" aria-hidden="true" data-icon="&#xe004;"></span>安全管控</a>
                        </li>
                    </ul>
                </li>
                <li class="hidden-sm">
                    <a href="maps.html">
                        <span class="fs1" aria-hidden="true" data-icon="&#xe042;"></span>
                        <!--<span class="count-label">6</span>-->
                    </a>
                    <ul>
                        <li>
                            <a href="invoice.html"><span class="fs1" aria-hidden="true" data-icon="&#xe004;"></span>工作空间</a>
                        </li>
                        <li>
                            <a href="invoice.html"><span class="fs1" aria-hidden="true" data-icon="&#xe004;"></span>集群选择</a>
                        </li>
                    </ul>
                </li>
                <li class="hidden-sm">
                    <a href="mail.html">
                        <span class="fs1" aria-hidden="true" data-icon="&#xe049;"></span>
                        <span class="count-label">5</span>
                    </a>
                    <ul>
                        <li>
                            <a href="mail.html"><span class="fs1" aria-hidden="true" data-icon="&#xe049;"></span> 消息</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="login.html">
                        <span class="text-label">${currentUser.userName } </span><span class="fs1" aria-hidden="true" data-icon="&#xe088;"></span>
                    </a>
                    <ul class="user-summary">
                        <li>
                            <div class="summary">
                                <div class="user-pic">
                                    <img src="${ctx }/img/avatar-1.png" alt="Slick Admin" />
                                </div>
                                <div class="basic-details">
                                    <h4 class="no-margin">Wilson.Tang</h4>
                                    <h5 class="no-margin">Administrator</h5>
                                    <small>GDUT, Guangzhou, China</small>
                                </div>
                                <div class="profile-progress">
                                    <div class="chart-progress" data-percent="99">
                                        99%
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </li>
                        <li>
                            <button class="btn btn-xs btn-danger pull-right" onclick="location.href='login.html'">注销</button>
                            <span class="clearfix"></span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- Mini navigation end -->

    </header>