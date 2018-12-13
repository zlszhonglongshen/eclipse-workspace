<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="base.jsp"%>

<%@ include file="header.jsp"%>


     <!-- Main Container start -->
    <div class="main-container">

        <!-- Mian navigation start -->
        <div id="mainnav">

            <!-- User pic start -->
            <div class="user-profile-pic">
                <img src="${ctx }/img/avatar-1.png" alt="Slick Admin">
            </div>
            <!-- User pic end -->

            <ul id="Modular">
                <li class="active" id="M" >
                    <a href="#" data-toggle="tooltip" data-placement="right" title="" data-original-title="建立的模型">
                        <div class="icon">
                            <span class="fs1" aria-hidden="true" data-icon="&#xe0a2;"></span>
                        </div>我的模型
                    </a>
                    <span class="current-arrow">&nbsp;</span>
                </li>
                <li id="D">
                    <a href="#" data-toggle="tooltip" data-placement="right" data-original-title="导入数据">
                        <div class="icon">
                            <span class="fs1" aria-hidden="true" data-icon="&#xe0d2;"></span>
                        </div>数据源
                    </a>
                </li>
                <li id="E">
                    <a href="#" data-toggle="tooltip" data-placement="right" title="" data-original-title="数据清洗">
                        <div class="icon">
                            <span class="fs1" aria-hidden="true" data-icon="&#xe0b8;"></span>
                        </div>ETL
                    </a>
                </li>
                <li id="A">
                    <a href="#" data-toggle="tooltip" data-placement="right" title="" data-original-title="机器学习算法">
                        <div class="icon">
                            <span class="fs1" aria-hidden="true" data-icon="&#xe096;"></span>
                        </div>算法组件
                    </a>
                </li>
                <li id="V">
                    <a href="#" data-toggle="tooltip" data-placement="right" title="" data-original-title="直观看数据">
                        <div class="icon">
                            <span class="fs1" aria-hidden="true" data-icon="&#xe099;"></span>
                        </div>可视化
                    </a>
                </li>
                <c:if test="${currentUser.userRole==0 }">
	                <li id="S">
	                    <a href="${ctx}/algorithm/toalgorithm" data-toggle="tooltip" data-placement="right" title="" data-original-title="添加算法">
	                        <div class="icon">
	                            <span class="fs1" aria-hidden="true" data-icon="&#xe00d;"></span>
	                        </div>设置
	                    </a>
	                </li>
                </c:if>
            </ul>
        </div>
        <!-- Mian navigation end -->
        <!-- Dashboard wrapper start -->
        <div class="dashboard-wrapper">

            <!-- Page title start font-size-->
            <div class="row page-title">
                <h2>
					<span class="fs1 icon-bg" aria-hidden="true" data-icon="&#xe19a;"></span>&nbsp;应数大数据平台 
                    <small>
                        <li>主页</li>
                        <li>/</li>
                        <li>算法库</li>
                    </small>
                </h2>
                <ul class="stats hidden-xs">
                    <li class="ruby-red-bg">
                        <span id="currentSale" class="graph">
                            2, 4, 8, 2, 4, 1
                        </span>
                        <div class="details">
                            <span class="big">$8,597</span>
                            <span class="small">Current Sale</span>
                        </div>
                    </li>
                    <li class="light-grey-bg">
                        <span id="currentBalance" class="graph">
                            5, 2, 4, 9, 2, 3
                        </span>
                        <div class="details">
                            <span class="big">$21,345</span>
                            <span class="small">Current Balance</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- Page title end -->
			<div class="row">
                <div class="col-md-12">
                    <div class="widget">
<!--
                        <div class="widget-header">
                            <div class="title">
                                <span class="fs1" aria-hidden="true" data-icon="&#xe19a;"></span>算法库
                            </div>
                        </div>-->
                        <div class="widget-body">
                            <ul class="media-list">
                                <li class="media" id="ItemsBar">

                                    <!--<a class="pull-left" style="text-align: center;cursor:default">
                                        <img class="media-object" alt="64x64" style="width: 64px; height: 64px;" src="Main/img/avatar-4.png">
                                        <span>k-means</span>
                                    </a>-->


                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <!-- 实体画布 -->
            <div class="row">
                <div class="col-md-9">
                    <div class="widget">

                        <div class="widget-body" style="padding:1px">

                            <div id="instance" style="position:relative;" class="GooFlow">
<!------------------------------------------------------------------------画布头按钮---------------------------------------------------------------------------->
                                <div style="position:absolute;width:100%;left:0;top:0;margin-top:6px;z-index:999;" id="icons">
                                    <p class="center-align-text">
                                        <span class="_opacity1">
                                        
                                        

                                            <button type="button" class="btn btn-xs btn-default" id="ico_undo">
                                                &nbsp;<span class="fs1" aria-hidden="true" data-icon="&#xe062;">&nbsp;撤销</span>&nbsp;
                                            </button>
                                            <button type="button" class="btn btn-xs btn-default" id="ico_redo">
                                                &nbsp;<span class="fs1" aria-hidden="true" data-icon="&#xe063;">&nbsp;重做</span>&nbsp;
                                            </button>
                                            <button type="button" class="btn btn-xs btn-default" id="ico_save">
                                                &nbsp;<span class="fs1" aria-hidden="true" data-icon="&#xe060;">&nbsp;保存</span>&nbsp;
                                            </button>
                                            <button type="button" class="btn btn-xs btn-danger" id="ico_run" onclick="ClickRun('/modelHandler/ClickRun','${currentUser.userId}')">
                                                &nbsp;<span class="fs1" aria-hidden="true" data-icon="&#xe10a;">&nbsp;运行</span>&nbsp;
                                            </button>
                                        </span>
                                    </p>
                                </div>
<!------------------------------------------------------------------------画布头按钮end---------------------------------------------------------------------------->
                            </div>

                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="widget">
                        <div class="widget-body" id="Param_Panel">
                            <div class="widget-header">
                                <div class="title">
                                    <span class="fs1" aria-hidden="true" data-icon="&#xe1ce;"></span>参数
                                </div>
                            </div>
<!------------------------------------------------------------------------参数表单---------------------------------------------------------------------------->
                                <form class="form-horizontal" role="form" >
                                    
                                    <!--<div class="form-group">
                                        <label for="inputFile1" class="col-lg-3 control-label">File</label>
                                        <div class="col-lg-9">
                                            <select class="form-control input-sm">
                                                <option value="">.input-sm</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputName1" class="col-lg-3 control-label">Name</label>
                                        <div class="col-lg-9">
                                            <input type="Name" class="form-control" id="inputName1" placeholder="Name">
                                        </div>
                                    </div>-->


                                </form>
<!------------------------------------------------------------------------参数表单end---------------------------------------------------------------------------->

                        </div>
                    </div>
                </div>
            </div>
<!------------------------------------------------------------------------ 算法栏目 -------------------------------------------------------------------------------->
            

			
			
			
        </div>
        <!-- Dashboard wrapper end -->
		
    </div>
    <!-- Main Container end -->

	
	<div class="widget-body">
        <a data-toggle="modal" id="showResData" href="#showModal" style="display:none;">节点数据</a>

        <!-- Modal -->
        <div class="modal fade" id="showModal" tabindex="-1" role="dialog" aria-labelledby="showModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="ResTitle">  </h4>
                    </div>
                    <div class="modal-body" id="ResContent" style="height:400px;overflow-y:scroll;">
                        ...
                    </div>
                    <div class="modal-footer">（只显示前一百行数据）&nbsp;&nbsp;
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">保存修改</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


<!------------------------------------------------------------------------index的js在此处添加---------------------------------------------------------------------------->
<script type="text/javascript">
	Data={A:${A} ,M:${M},E:${E},V:${V},D:${D} };
	//左侧栏目点击事件：切换 items
	$('#Modular').on("click", function (e) {
	    if (!e) e = window.event;
	    var tar;
	    switch (e.target.tagName) {
	        case "A": tar = e.target.parentNode; break;
	        case "DIV": tar = e.target.parentNode.parentNode; break;
	        case "SPAN": tar = e.target.parentNode.parentNode.parentNode; break;
	        default: return false;
	    };
	    var type = $(tar).attr("id"); if (type == "S") return true;
	    instance.refreshItems(property, type);
	    return false;
	});
	</script>
<%@ include file="footer.jsp"%>

