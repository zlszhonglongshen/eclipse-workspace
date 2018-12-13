<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../base.jsp"%>

<%@ include file="../header.jsp"%>





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
                <li id="M" >
                    <a href="${ctx}" data-toggle="tooltip" data-placement="right" title="" data-original-title="建立的模型">
                        <div class="icon">
                            <span class="fs1" aria-hidden="true" data-icon="&#xe0a2;"></span>
                        </div>我的模型
                    </a>
                </li>
                <li id="SD">
                	
                    <a href="${ctx }/datasource/todatasource" data-toggle="tooltip" data-placement="right" title="" data-original-title="添加数据源">
                        <div class="icon">
                            <span class="fs1" aria-hidden="true" data-icon="&#xe0d2;"></span>
                        </div>数据源设置
                    </a>
                </li>
                
                <li id="S" class="active" >
                	
                    <a href="${ctx}/algorithm/toalgorithm" data-toggle="tooltip" data-placement="right" title="" data-original-title="添加算法">
                        <div class="icon">
                            <span class="fs1" aria-hidden="true" data-icon="&#xe00d;"></span>
                        </div>添加算法
                    </a>
                    <span class="current-arrow">&nbsp;</span>
                </li>
            </ul>
        </div>
        <!-- Mian navigation end -->
        <!-- Dashboard wrapper start -->
        <div class="dashboard-wrapper">

            <!-- Page title start -->
            <div class="row page-title">
                <h2>
                   	 应数大数据平台 
                    <small>
                        <li>主页</li>
                        <li>/</li>
                        <li>设置</li>
                    </small>
                </h2>
            </div>
            <!-- Page title end -->



			<!-- Row start -->
          <div class="row">
            <div class="col-md-12">
              <div class="widget no-margin">
                <div class="widget-header">
                  <div class="title">
                    <span class="fs1" aria-hidden="true" data-icon="&#xe19a;"></span> 添加算法
                  </div>
                </div>
                <div class="widget-body">
                  <div class="row">

                    <div class="col-md-11 col-sm-9">
                      <form class="form-horizontal" id="algorithmForm" action="${ctx }/algorithm/addAlgo.action" method="post" enctype="multipart/form-data"><fieldset>
                      	<input type="text" name="algoClass" value="2" hidden="true">
                      	<input type="text" name="userId" value="${User.userId }" hidden="true">
                        <h3 class="heading-a">基础配置</h3>
                        
                        <div class="form-group">
                          <label for="AlgorithmName" class="col-sm-2 control-label">算法名称</label>
                          <div class="col-sm-8">
                            <input type="name" class="form-control required" name="algoName" id="AlgorithmName" placeholder="Kmeans" >
                          </div>
                        </div>

						<div class="form-group">
                          <label for="inputNum" class="col-sm-2 control-label">输入参数个数</label>
                          <div class="col-sm-4">
                         		<select class="form-control" name="inputNum" id="inputNum">
		                        	<option value="1">1</option>
		                        	<option value="2">2</option>
		                        	<option value="3">3</option>
		                        	<option value="4">4</option>
		                        	<option value="5">5</option>
				                </select>
                          </div>
                        </div>


                        <div class="form-group">
                          <label for="AlgorithmIcon" class="col-sm-2 control-label">算法图标</label>
                          <div class="col-sm-4">
                            <input type="file" class="form-control required" name="file" id="AlgorithmIcon" accept="image/*">
                          </div>
                        </div>
                            
                        
                        <div class="form-group">
	                        <label for="AlgorithmType" class="col-sm-2 control-label">算法类型</label>
	                        <div class="col-sm-3">
		                        <select class="form-control" name="algoType" id="AlgorithmType" onchange="loadsubtype()">
		                        	<option value="">-- 请选择 --</option>
				                </select>
	                        </div>
              			</div>

              			<div class="form-group">
	                        <label for="AlgorithmSubType" class="col-sm-2 control-label">算法子类型</label>
	                        <div class="col-sm-3">
		                        <select class="form-control" name="algoSubtype" id="AlgorithmSubType">
									<option value="">-- 请选择 --</option>
				                </select>
	                        </div>
              			</div>

              			<div class="form-group">
							<label for="FileType" class="col-sm-2 control-label">算法语言</label>
						    <div class="col-sm-3">
						    	<select class="form-control" id="FileType" name="algoLanguage">
						    		<option value="">-- 请选择 --</option>
								</select>
							</div>
						</div>

                        <br/>

                        
                        <h3 class="heading-a">文件配置</h3>
                        <div id="fileConfig">
                        	<input type="hidden" value=0 id="fileCount">
                        	
                        </div>
						<div class="clearfix">
						    <div class="row">
						      <div class="col-sm-10 col-sm-offset-1">
						        <button type="button" class="btn btn-sm btn-primary" id="addFile">添加文件</button>
						        <button type="button" class="btn btn-sm btn-primary" id="delFile">删除文件</button>
						      </div>
						    </div>
						  </div>
<br/><br/>
			

                        <h3 class="heading-a">算法描述</h3>
                        <div class="form-group">
                          <label for="Describe" class="col-sm-1 control-label"></label>
                          <div class="col-sm-9">
                            <textarea name="algoDesc" id="Describe" cols="50" rows="7" class="form-control">请填写该算法的作用及参数描述 </textarea>
                          </div>
                        </div>

                        <div class="form_submit clearfix" style="">
                          <div class="row">
                            <div class="col-sm-10 col-sm-offset-1">
                              <button class="btn btn-primary btn-lg" type="submit" >Save</button>
                            </div>
                          </div>
                        </div>
                        
                      </fieldset></form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Row end -->


        </div>
        <!-- Dashboard wrapper end -->

    </div>
    <!-- Main Container end -->


<!---------------------------------------------------------js在此处添加---------------------------------------------------------------------------->
    <script src="${ctx }/dist/jquery.validate.js"></script>
	<script src="${ctx }/dist/additional-methods.js"></script>

<script type="text/javascript">
    $(function(){
//      	$("#AlgorithmType").html(loadOption(["Regression","Cluster","Feature"]));
//      	$("#AlgorithmSubType").html(loadOption(["SubType3","SubType2","SubType1"]));
//      	$("#FileType").html(loadOption(["Java","python"]));

		
		var algorithmTypeUrl = "${ctx}/dict/algoType";
		var fileTypeUrl = "${ctx}/dict/algoLanguage";
		
       	postDropDown(algorithmTypeUrl,null,"AlgorithmType");
       	postDropDown(fileTypeUrl,null,"FileType");

       	
    	
    	$("#algorithmForm").validate();
    	$("#addFile").click(function(){
    		var currentFileCount = parseInt($('#fileCount').val(), 10);
    		var newCount = currentFileCount + 1;
    		
    		var newInput = CreateFileBar(newCount);
    		$('#fileConfig').append(newInput);
    		$('#fileCount').val(newCount);
    		
    		CreateClick(newCount);
    		
    	});
    	
    	$('#delFile').click(function () {
            var currentFileCount = parseInt($('#fileCount').val(), 10);
            if (currentFileCount == 0)
            {
                alert('已经没有文本框可以被移除了~~');
                return false;
            }
            $('#subFile_' + currentFileCount).remove();

            $('#fileCount').val(currentFileCount - 1);
        });
    	
    	
    	//function loadOption(opt){var str = "";for(var key in opt){str += '<option id="' + key + '">' + opt[key] + '</option>';}return str;}
    });
    
    //加载子分类
	function loadsubtype() {
   		// 1. 获取pid
   		var pid = $("#AlgorithmType").val();
   		// 2. 发送异步请求
   		$.ajax({
   			async:true,
   			cache:false,
   			url:"${ctx}/dict/findByParentId",
   			data:{parentId:pid},
   			type:"POST",
   			dataType:"json",
   			success:function(data) {
   				// 3. 得到cid，删除它的内容
   				$("#AlgorithmSubType").empty();//删除元素的子元素
   				$("#AlgorithmSubType").append($("<option>-- 请选择 --</option>"));//4.添加头
   				// 5. 循环遍历数组，把每个对象转换成<option>添加到cid中
   				$.each(data,function(i,n){
					$("#AlgorithmSubType").append("<option value='"+n.dictId+"'>"+n.dictItemName+"</option>");
				});
   			}
   		});
   	}
    
    function CreateFileBar(newCount)
    {
    	var newInput = '<div id="subFile_' + newCount + '" >';
     	newInput += '<div lass="form-group">';
//     	newInput += '<label for="fileType_' + newCount + ' " class="col-sm-1 control-label">文件类型</label>';
//     	newInput += '<div class="col-sm-3"><select class="form-control" id="fileType_' + newCount + '">';
//     	newInput += loadOption(['python','Java']);
//     	newInput += '</select></div></div>';
		newInput += '<label for="fileName_' + newCount + '" class="col-sm-1 control-label">文件名</label>';
		newInput += '<div class="col-sm-4"><input type="text" name="fileName_' + newCount + '" class="form-control" id="fileName_' + newCount + '"></div></div>';
		
		
		
    	newInput += '<div class="form-group">';
    	newInput += '<label for="fileUpload_' + newCount + '" class="col-sm-1 control-label">目标文件</label>';
    	newInput += '<div class="col-sm-4"><input type="file" name="file" class="form-control required" id="fileUpload_' + newCount + '" multiple accept="text/plain"></div></div>';
    	//添加参数
    	newInput += '<label for="paramTable_' + newCount + '" class="col-sm-1 control-label">参数</label>';
    	newInput += '<div class="col-sm-11">';
    	newInput += '<table class="table table-condensed table-bordered table-hover no-margin" id="paramTable_' + newCount + '">';
    	newInput += '<thead><tr><th style="width:20%">参数名</th><th style="width:10%">展示方式</th><th style="width:10%" class="hidden-phone">输入输出</th><th style="width:15%" class="hidden-phone">数据类型</th><th style="width:25%" class="hidden-phone">默认值</th><th style="width:20%" class="hidden-phone">描述</th></tr></thead>';
    	newInput += '<tbody id="paramTbody_' + newCount +'">';
    	newInput += '</tbody></table>';
    	
    	newInput += '<div class="clearfix"><div class="row"><div class="col-sm-10"><br/>';
    	newInput += '<button type="button" class="btn btn-xs btn-primary" id="addParam_' + newCount + '">添加参数</button>&nbsp;&nbsp;';
    	newInput += '<button type="button" class="btn btn-xs btn-primary" id="delParam_' + newCount + '">删除参数</button>';
    	newInput += '</div></div></div><br/>';
    	
    	newInput += '<input type="hidden" value=0 id="paramCount_' + newCount + '"></div><br/><br/><br/><br/>';
    	
    	return newInput;
    }
    

    function CreateClick(newCount)
    {
    	$('#addParam_' + newCount).click(function(){
    		var currentParamCount = parseInt($('#paramCount_' + newCount).val(), 10);
    		var newParamCount = currentParamCount + 1;
    		var Parameter_Str = '<tr>';
    		var Identification = '_' + newCount + '_' + newParamCount;
    		
    		var fileCount=newCount-1;
    		var paramCount=newParamCount-1;
    		
//     		alert("fileCount:"+fileCount+"--paramCount:"+paramCount);
    		
    		Parameter_Str += '<td><input class="form-control padding3px" name="fileList['+fileCount+'].paramList['+paramCount+'].paramName" id="paramName' + Identification + '" ></td>';
    		Parameter_Str += '<td><select class="form-control padding3px" name="fileList['+fileCount+'].paramList['+paramCount+'].showType" id="paramDisplay' + Identification + '"><option value="0">文本</option><option value="1">下拉框</option></select></select></td>';
    		Parameter_Str += '<td><select class="form-control padding3px" name="fileList['+fileCount+'].paramList['+paramCount+'].inputType" id="paramIO' + Identification + '"><option value="0">输入</option><option value="1">输出</option></select></td>';
    		Parameter_Str += '<td><select class="form-control padding3px" name="fileList['+fileCount+'].paramList['+paramCount+'].paramType" id="paramType' + Identification + '">';
    		//Parameter_Str += loadOption(['int','double','string','mat']);

    		Parameter_Str += '</select></td>';
    		Parameter_Str += '<td><input class="form-control padding3px" name="fileList['+fileCount+'].paramList['+paramCount+'].paramDefaultValue" id="paramDefault' + Identification + '" ></td>';
    		Parameter_Str += '<td><input class="form-control padding3px" name="fileList['+fileCount+'].paramList['+paramCount+'].paramDesc" id="paramDescribe' + Identification + '" ></td></tr>';
    		
    		 $('#paramTbody_' + newCount).append(Parameter_Str);
             $('#paramCount_' + newCount).val(newParamCount);
             
             var paramTypeUrl = "${ctx}/dict/algoParamType";
             postDropDown(paramTypeUrl,null,'paramType'+Identification);
    	});
    	
    	$('#delParam_' + newCount).click(function(){
    		
    		var currentParamCount = parseInt($('#paramCount_' + newCount).val(), 10);
            if (currentParamCount == 0) {
                alert('已经没有参数可以被移除了~~');
                return false;
            }
            
            var _tr = $('#paramTbody_' + newCount + ' tr');
            _tr[_tr.length - 1].remove();

            var newParamCount = currentParamCount - 1;
            $('#paramCount_' + newCount).val(newParamCount);

    	});
    }
    
    
    
    
    
</script>

<style>
.padding3px{padding-left:3px;}
</style>



<%@ include file="../footer.jsp"%>








