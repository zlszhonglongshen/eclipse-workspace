<%@ page language="java" pageEncoding="UTF-8"%>

<!------------------------------------------------------------------------js加载---------------------------------------------------------------------------->

                <!-- Scripts -->
                <script src="${ctx }/js/wysiwyg/wysihtml5-0.3.0.js"></script>
				<script src="${ctx }/Canvas/jquery-ui-1.9.2.min.js" type="text/javascript" charset="utf-8"></script>
                <script src="${ctx }/Canvas/jquery.jsPlumb-1.6.2-min.js" type="text/javascript" charset="utf-8"></script>
                
                <!-- 加载画布 
                <script type="text/javascript" src="${ctx }/Data/Data.js"></script>-->
				<!-- 加载右击 -->
				<script type="text/javascript" src="${ctx }/js/BootstrapMenu.min.js"></script>
				<script type="text/javascript" src="${ctx }/Data/showData.js"></script>
				
				
                <script type="text/javascript" src="${ctx }/Canvas/GooFunc.js"></script>
                <link rel="stylesheet" type="text/css" href="${ctx }/Canvas/style.css">
                <script type="text/javascript" src="${ctx }/Canvas/script.js"></script>
                <script type="text/javascript" src="${ctx }/Canvas/Init.js"></script>
				<script type="text/javascript" src="${ctx }/Data/handler.js"></script>
	
				<script type="text/javascript" src="${ctx }/js/bootstrap.js"></script>
				
				<!--加载校验-->
				<script src="${ctx}/dist/jquery.validate.min.js"></script>
				<script src="${ctx}/dist/messages_zh.min.js"></script>
				

                <%-- <script src="${ctx }/js/jquery-ui-1.8.23.custom.min.js"></script> --%>

                <!-- Flot charts -->
                <script src="${ctx }/js/flot/jquery.flot.js"></script>
                <script src="${ctx }/js/flot/jquery.flot.resize.min.js"></script>
                <script src="${ctx }/js/flot/jquery.flot.tooltip.js"></script>
                <!-- Easy pie charts -->
                <script src="${ctx }/js/jquery.easy-pie-chart.js"></script>
                <!-- Tiny Scrollbar JS -->
                <script src="${ctx }/js/tiny-scrollbar.js"></script>
                <!-- Sparkline JS -->
                <script src="${ctx }/js/jquery.sparkline.js"></script>
                <script src="${ctx }/js/rating/jquery.raty.js"></script>
                <!-- custom Js -->
                <script src="${ctx }/js/custom-index.js"></script>
                <script src="${ctx }/js/custom.js"></script>





                <script type="text/javascript">
    ////初始化星级评价分数，这里以后可以省略
    //  $(function() {
    //  $.fn.raty.defaults.path = 'img';
    //  $('#rate3').raty({ score: 3 });
    //  $('#rate5').raty({ score: 5 });
    //  $('#rate1').raty({ score: 1 });
    //});
                </script>

<!------------------------------------------------------------------------js加载end---------------------------------------------------------------------------->

</body>
</html>