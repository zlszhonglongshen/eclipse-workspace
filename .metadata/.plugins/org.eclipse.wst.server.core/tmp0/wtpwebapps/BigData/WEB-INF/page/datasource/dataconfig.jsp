<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../base.jsp"%>
<%@ include file="../header.jsp"%>
	<div class="main-container">
		<div id="mainnav">
			<div class="user-profile-pic">
                <img src="${ctx }/img/avatar-1.png" alt="Slick Admin">
            </div>
            <ul id="Modular">
            	<li id="M" >
                    <a href="${ctx}" data-toggle="tooltip" data-placement="right" title="" data-original-title="建立的模型">
                        <div class="icon">
                            <span class="fs1" aria-hidden="true" data-icon="&#xe0a2;"></span>
                        </div>我的模型
                    </a>
                </li>
                <li id="SD" class="active">
                	
                    <a href="${ctx}" data-toggle="tooltip" data-placement="right" title="" data-original-title="添加数据源">
                        <div class="icon">
                            <span class="fs1" aria-hidden="true" data-icon="&#xe0d2;"></span>
                        </div>数据源设置
                    </a>
                    <span class="current-arrow">&nbsp;</span>
                </li>
                <li id="S">
                    <a href="${ctx}/algorithm/toalgorithm" data-toggle="tooltip" data-placement="right" title="" data-original-title="添加算法">
                        <div class="icon">
                            <span class="fs1" aria-hidden="true" data-icon="&#xe00d;"></span>
                        </div>添加算法
                    </a>
                </li>
            </ul>
        </div>
        <div class="dashboard-wrapper">
	        <div class="row page-title">
                <h2>
                   	 应数大数据平台 
                    <small>
                        <li>数据源配置</li>
                        <li>/</li>
                        <li>可变文件</li>
                    </small>
                </h2>
            </div>
        	<div class="row">
            	<div class="col-md-12">
              		<div class="widget no-margin">
                		<div class="widget-header">
                  			<div class="title">
                    			<span class="fs1" aria-hidden="true" data-icon="&#xe19a;"></span> 添加数据源
                  			</div>
                		</div>
                		<div class="widget-body">
                			<div class="row">
                				<div class="col-md-11 col-sm-9">
                					<form class="form-horizontal" id="dataForm" action="${ctx }/datasource/addFileSource" method="post" enctype="multipart/form-data"><fieldset>
                						<h3 class="heading-a">基础配置</h3>
                						<div class="form-group">
											<label for="dataName" class="col-sm-2 control-label">数据源名称</label>
											<div class="col-sm-8">
										 		<input type="name" class="form-control" name="fileName" id="dataName" placeholder="" >
											</div>
				                        </div>
				                        
				                        <div class="form-group">
					                        <label for="delimiter" class="col-sm-2 control-label">分隔符</label>
					                        <div class="col-sm-3">
						                        <select class="form-control" name="separatorType" id="delimiter">
						                        	<option value="">-- 请选择 --</option>
								                </select>
					                        </div>
				              			</div>
				                        <h3 class="heading-a">文件配置</h3>
										<div id="fileConfig">
                       						<div class="form-group">
                       							<label for="fileUpload" class="col-sm-1 control-label">目标文件</label>
												<div class="col-sm-4">
													<input type="file" name="file" class="form-control required" id="fileUpload_" multiple accept="text/plain">
												</div>
											</div>
                       					</div><br/><br/>
				                        <h3 class="heading-a">使用说明</h3>
				                        <div class="form-group">
                          					<label for="Describe" class="col-sm-1 control-label"></label>
                          					<div class="col-sm-9">
                            					<textarea name="fileDesc" id="Describe" cols="50" rows="7" class="form-control" placeholder="填写该数据源的描述"></textarea>
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
        </div>
	</div>

<script src="${ctx }/dist/jquery.validate.js"></script>
<script src="${ctx }/dist/additional-methods.js"></script>
<script type="text/javascript">
	$(function(){
		var delimiterUrl = "${ctx}/dict/separatorType";
		postDropDown(delimiterUrl,null,"delimiter");
		$("#dataForm").validate();
	})
</script>

<%@ include file="../footer.jsp"%>