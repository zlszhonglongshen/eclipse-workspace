//定义一个区域图类：
function GooFlow(bgDiv, Items, property, Data ){

//初始化区域图的对象
	this.$id=bgDiv.attr("id");                          //画布id
    this.$bgDiv = bgDiv;                                //画布实体div
    this.$items = Items;                                //上部item栏目实体
    this.$itemData = Data;                              //数据来源
    this.$scope = "myCanvas";

	var width=(property.width);                         //宽高
	var height=(property.height);
    this.$bgDiv.css({ width: width + "px", height: height + "px" });
    this.$head = null;                                  //头部功能栏


	//this.$nowType="cursor";                             //当前要绘制的对象类型
	this.$lineData={};
	this.$lineCount=0;
	this.$nodeData={};
	this.$nodeCount=0;
	//this.$lineDom={};                                   //用于作撤销等工作？
	//this.$nodeDom={};                                   //同上

	this.$max=property.initNum||1;                      //计算默认ID值的起始SEQUENCE
	this.$focus="";//当前被选定的结点/转换线ID,如果没选中或者工作区被清空,则为""
	this.$editable=true;                               //工作区是否可编辑，一般用于运行时禁止编辑
	var tmp="";                                         //临时字符串

    //森加，用来记录当前的model的id，一开始这里为null
    this.$nowModel = null;
    this.$nowType = 'M';
    this.$isNewCon = true;     //用来记录是否进入connection

    width = width - 8;
    height = height - 8;
    this.$workArea = this.$bgDiv;


    //森加
    this.refreshHeads(property);
    this.refreshItems(property, this.$nowType);
    //this.ParamEvent();


    //此处是森加的初始化代码，但是注意这个this的指向？到底是不是gooflow（应该不是？）
    
    
    var elementSign = 0;//标志元素唯一性
    var This = this;
    this.$bgDiv.droppable(      //这里的this?
        {
            scope: this.$scope,
            drop: function (event, ui)
            {
                //添加拽动事件，※，待测试
                var left = parseInt(ui.offset.left - $(this).offset().left);
                var top = parseInt(ui.offset.top - $(this).offset().top);

                var type = $(ui.draggable[0]).attr("id").split("_")[2];

                var obj_d = This.$itemData[type[0]][type.substring(1)];
                //var filekey = Object.keys(obj_d.file)[0];
                var param = new Array();

                var nodeId = This.$id + "_node_" + This.$max;
                var nodname = obj_d.name + "_" + This.$max;
                for (var key in obj_d.param) {
                    param.push(obj_d.param[key].value);
                };
                //param = { file: filekey, param: param };
                //添加可以输入的点数目inputNum，待测试
                var inputNum = obj_d.inputNum ? obj_d.inputNum : 0;
                    
                This.addNode(nodeId, { name: nodname, inputNum: inputNum , left: left, top: top, type: type, param: param } )      //拖动上方栏目后做的操作，首先就是加入结点，但是结点的信息，需要从其他地方获取，参考原文
                This.$max++;
            }
        }
    );
    //待测试，森，画结点 ※ 理论上应该是在originalEvent上的
    jsPlumb.bind("connection", function (connInfo, originalEvent) {//自己连自己管控
        if (connInfo.connection.sourceId == connInfo.connection.targetId) {
            jsPlumb.detach(connInfo); return;
        }
        if (This.$isNewCon)
        {
            //var endNum = connInfo.sourceEndpoint.id.split('_')[2];
            var endNum = connInfo.targetEndpoint.id.split('_')[3];
            //var  connInfo.targetEndpoint.id
            
            var conId = This.$id + "_line_" + This.$max + "_" + endNum; This.$max++;
            var name = conId.split("_");
            var name = name[1] + name[2];

            $(connInfo.connection).attr("id", conId);
            connInfo.connection.setLabel(name);
            This.refreshLineData(conId, { from: connInfo.source.id, to: connInfo.target.id, name: name, mark: "yellow" });

        }

        //var jsplumb_ = jsPlumb.getInstance();
        //jsplumb_.setDraggable(connInfo.connection, false);

        //var aa = connInfo;
        //var bb = originalEvent;
        //var cc = connInfo.sourceEndpoint.id;
        //var dd = jsPlumb.getAllConnections();
    });
    jsPlumb.bind("connectionDetached", function (conn) {//自己连自己管控
        This.deleteLineData(conn.connection.id);
    });
    jsPlumb.bind("click", function (conn, originalEvent) {//点击线段删除
        if (confirm("确定删除吗?"))
            This.delLine(conn.id);
    });


    //绑定各个按钮的点击事件
    this.$items.on("click", { inthis: this }, function (e) {
        if (e.data.inthis.$nowType != 'M') return;

        if (e.data.inthis.$editable == false) return;
        if (!e) e = window.event;
        var tar;
        switch (e.target.tagName) {
            case "DIV": return false;
            case "UL": return false;
            case "LI": return false;
            case "IMG": tar = e.target.parentNode; break;
            case "SPAN": tar = e.target.parentNode; break;
            case "A": tar = e.target;
        };
        var type_Id = $(tar).attr("id").split("btn_")[1];
        e.data.inthis.switchItemsBtn(type_Id);
        if (type_Id[0] == "M") {
            e.data.inthis.$nowModel = type_Id;

            e.data.inthis.clearData();
            e.data.inthis.loadData(e.data.inthis.$itemData[type_Id[0]][type_Id.substring(1)].data);
            //e.data.inthis.$nowType = "cursor";
        }
        return false;
    });
    this.$workArea.on("click", { inthis: this }, function (e) {
        if (!e) e = window.event;
        var This = e.data.inthis;
        switch (e.target.tagName) {
            case "TD": return false;
        };
        This.blurItem();
    });



    //添加工作区
	//this.$bgDiv.append("<div class='GooFlow_work' style='width:"+(width)+"px;height:"+(height)+"px;"+(property.haveHead? "":"margin-top:3px")+"'></div>");
	//this.$workArea=$("<div class='GooFlow_work_inner' style='width:"+width+"px;height:"+height+"px'></div>")
 //       .attr({ "unselectable": "on", "onselectstart": 'return false', "onselect": 'document.selection.empty()' });


	if(this.$editable){


	  //为了结点而增加的一些集体delegate绑定
	  this.initWorkForNode();
	  //对结点进行移动或者RESIZE时用来显示的遮罩层
	  this.$ghost=$("<div class='rs_ghost'></div>").attr({"unselectable":"on","onselectstart":'return false',"onselect":'document.selection.empty()'});
	  this.$bgDiv.append(this.$ghost);
	  this.$textArea=$("<textarea></textarea>");
	  this.$bgDiv.append(this.$textArea);
      



	  
	  //下面绑定当结点/线/分组块的一些操作事件,这些事件可直接通过this访问对象本身
	  //当操作某个单元（结点/线/分组块）被添加时，触发的方法，返回FALSE可阻止添加事件的发生
	  //格式function(id，type,json)：id是单元的唯一标识ID,type是单元的种类,有"node","line","area"三种取值,json即addNode,addLine或addArea方法的第二个传参json.
	  this.onItemAdd=null;
	  //当操作某个单元（结点/线/分组块）被删除时，触发的方法，返回FALSE可阻止删除事件的发生
	  //格式function(id，type)：id是单元的唯一标识ID,type是单元的种类,有"node","line","area"三种取值
	  this.onItemDel=null;
	  //当操作某个单元（结点/分组块）被移动时，触发的方法，返回FALSE可阻止移动事件的发生
	  //格式function(id，type,left,top)：id是单元的唯一标识ID,type是单元的种类,有"node","area"两种取值，线line不支持移动,left是新的左边距坐标，top是新的顶边距坐标
	  this.onItemMove=null;
	  //当操作某个单元（结点/线/分组块）被重命名时，触发的方法，返回FALSE可阻止重命名事件的发生
	  //格式function(id,name,type)：id是单元的唯一标识ID,type是单元的种类,有"node","line","area"三种取值,name是新的名称
	  this.onItemRename=null;
	  //当操作某个单元（结点/线）被由不选中变成选中时，触发的方法，返回FALSE可阻止选中事件的发生
	  //格式function(id,type)：id是单元的唯一标识ID,type是单元的种类,有"node","line"两种取值,"area"不支持被选中
	  this.onItemFocus=null;
	  //当操作某个单元（结点/线）被由选中变成不选中时，触发的方法，返回FALSE可阻止取消选中事件的发生
	  //格式function(id，type)：id是单元的唯一标识ID,type是单元的种类,有"node","line"两种取值,"area"不支持被取消选中
	  this.onItemBlur=null;
	  //当操作某个单元（结点/分组块）被重定义大小或造型时，触发的方法，返回FALSE可阻止重定大小/造型事件的发生
	  //格式function(id，type,width,height)：id是单元的唯一标识ID,type是单元的种类,有"node","line","area"三种取值;width是新的宽度,height是新的高度
	  this.onItemResize=null;
	  //当移动某条折线中段的位置，触发的方法，返回FALSE可阻止重定大小/造型事件的发生
	  //格式function(id，M)：id是单元的唯一标识ID,M是中段的新X(或Y)的坐标
	  this.onLineMove=null;
	  //当变换某条连接线的类型，触发的方法，返回FALSE可阻止重定大小/造型事件的发生
	  //格式function(id，type)：id是单元的唯一标识ID,type是连接线的新类型,"sl":直线,"lr":中段可左右移动的折线,"tb":中段可上下移动的折线
	  this.onLineSetType=null;
	  //当用重色标注某个结点/转换线时触发的方法，返回FALSE可阻止重定大小/造型事件的发生
	  //格式function(id，type，mark)：id是单元的唯一标识ID,type是单元类型（"node"结点,"line"转换线），mark为布尔值,表示是要标注TRUE还是取消标注FALSE
	  this.onItemMark=null;
	  
	  if(property.useOperStack){//如果要使用堆栈记录操作并提供“撤销/重做”的功能
		this.$undoStack=[];
		this.$redoStack=[];
		this.$isUndo=0;
		///////////////以下是构造撤销操作/重做操作的方法，往堆栈添加操作和操作参数（funcName操作名，paras操作参数）
		//为了节省浏览器内存空间,undo/redo中的操作缓存栈,最多只可放40步操作;超过40步时,将自动删掉最旧的一个缓存
		this.pushOper=function(funcName,paras){
			var len=this.$undoStack.length;
			if(this.$isUndo==1){
				this.$redoStack.push([funcName,paras]);
				this.$isUndo=false;
				if(this.$redoStack.length>40)	this.$redoStack.shift();
			}else{
				this.$undoStack.push([funcName,paras]);
				if(this.$undoStack.length>40)	this.$undoStack.shift();
				if(this.$isUndo==0){
					this.$redoStack.splice(0,this.$redoStack.length);
				}
				this.$isUndo=0;
			}
        };
        //森，此处可用于结点参数设置的返回
		//将外部的方法加入到GooFlow对象的事务操作堆栈中,在过后的undo/redo操作中可以进行控制，一般用于对流程图以外的附加信息进行编辑的事务撤销/重做控制；
		//传参func为要执行方法对象,jsonPara为外部方法仅有的一个面向字面的JSON传参,由JSON对象带入所有要传的信息；
		//提示:为了让外部方法能够被UNDO/REDO,需要在编写这些外部方法实现时,加入对该方法执行后效果回退的另一个执行方法的pushExternalOper
		this.pushExternalOper=function(func,jsonPara){
			this.pushOper("externalFunc",[func,jsonPara]);
		};
		//撤销上一步操作
		this.undo=function(){
			if(this.$undoStack.length==0)	return;
			var tmp=this.$undoStack.pop();
			this.$isUndo=1;
			if(tmp[0]=="externalFunc"){
				tmp[1][0](tmp[1][1]);
			}
			else{
			//传参的数量,最多支持5个.                 //注意传参的数量，函数最多也就5个参数
			switch(tmp[1].length){
				case 0:this[tmp[0]]();break;
				case 1:this[tmp[0]](tmp[1][0]);break;
				case 2:this[tmp[0]](tmp[1][0],tmp[1][1]);break;
				case 3:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2]);break;
				case 4:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2],tmp[1][3]);break;
				case 5:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2],tmp[1][3],tmp[1][4]);break;
			}
			}
		};
		//重做最近一次被撤销的操作
		this.redo=function(){
			if(this.$redoStack.length==0)	return;
			var tmp=this.$redoStack.pop();
			this.$isUndo=2;
			if(tmp[0]=="externalFunc"){
				tmp[1][0](tmp[1][1]);
			}
			else{
			//传参的数量,最多支持5个.                     //注意传参的数量，函数最多也就5个参数
			switch(tmp[1].length){
				case 0:this[tmp[0]]();break;
				case 1:this[tmp[0]](tmp[1][0]);break;
				case 2:this[tmp[0]](tmp[1][0],tmp[1][1]);break;
				case 3:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2]);break;
				case 4:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2],tmp[1][3]);break;
				case 5:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2],tmp[1][3],tmp[1][4]);break;
			}
			}
		};
      }
      this.onBtnSaveClick = function () {
          if (this.$nowModel == null) {
              alert("先创建一个模型");
              //待编写，森※
              //弹窗输入数据保存
              //成功后把$nowModel改成返回的modelid，并提示成功，显示图标，在Data.M上加入数据
              //保存失败不做任何操作
          }
          else {
              idx = this.$nowModel.substring(1);
              Data.M[idx].data = this.exportData();
              //这是发送请求到后台要求保存画板的程序
              this.saveToDB(idx,Data.M[idx].data,property.saveUrl);
          }
      }


    }       //end $editable
}
GooFlow.prototype={
	initWorkForNode:function(){
		//绑定点击事件
        this.$workArea.delegate(".GooFlow_item", "click", { inthis: this }, function (e) {
			e.data.inthis.focusItem(this.id,true);
            //$(this).removeClass("item_mark");
            $(this).removeClass("item_mark_" + e.data.inthis.$nodeData[this.id].mark);
		});
        //绑定用鼠标移动事件
        this.$workArea.delegate(".ico", "mousedown", { inthis: this }, function (e) {
            if (e.data.inthis.$editable == false) return;
            if (!e) e = window.event;
            var This = e.data.inthis;
            //if (This.$nowType == "direct") return;
            var Dom = $(this).parents(".GooFlow_item");
            if (Dom.length == 0) return;
            var id = Dom.attr("id");
            This.focusItem(id, true);
            var hack = 1;
            if (navigator.userAgent.indexOf("8.0") != -1) hack = 0;
            var ev = mousePosition(e), t = getElCoordinate(This.$workArea[0]);
            This.$ghost.css({
                display: "block",
                width: This.$nodeData[id].width - 2 + "px", height: This.$nodeData[id].height - 2 + "px",
                //top:This.$nodeData[id].top+t.top-This.$workArea[0].parentNode.scrollTop+hack+"px",
                //left:This.$nodeData[id].left+t.left-This.$workArea[0].parentNode.scrollLeft+hack+"px",cursor:"move"
                top: This.$nodeData[id].top - This.$workArea[0].parentNode.scrollTop + hack + "px",
                left: This.$nodeData[id].left - This.$workArea[0].parentNode.scrollLeft + hack + "px", cursor: "move"
            });
            Dom.children("table").clone().prependTo(This.$ghost);
            var X, Y;
            X = ev.x - t.left + This.$workArea[0].parentNode.scrollLeft;
            Y = ev.y - t.top + This.$workArea[0].parentNode.scrollTop;


            var vX = X - This.$nodeData[id].left, vY = Y - This.$nodeData[id].top;
            var isMove = false;
            document.onmousemove = function (e) {
                if (!e) e = window.event;
                var ev = mousePosition(e);
                X = ev.x - vX; Y = ev.y - vY;

                X += This.$workArea[0].scrollLeft - t.left;
                Y += This.$workArea[0].scrollTop - t.top;

                if (X < - This.$workArea[0].scrollLeft)
                    X = -This.$workArea[0].scrollLeft;
                else if (X + This.$workArea[0].scrollLeft + This.$nodeData[id].width > + This.$workArea.width())
                    X = This.$workArea.width() - This.$workArea[0].scrollLeft - This.$nodeData[id].width;
                if (Y < - This.$workArea[0].scrollTop)
                    Y = -This.$workArea[0].scrollTop;
                else if (Y + This.$workArea[0].scrollTop + This.$nodeData[id].height > + This.$workArea.height())
                    Y = This.$workArea.height() - This.$workArea[0].scrollTop - This.$nodeData[id].height;
                This.$ghost.css({ left: X + hack + "px", top: Y + hack + "px" });
                isMove = true;
            }
            document.onmouseup = function (e) {
                if (isMove) This.moveNode(id, X, Y);
                This.$ghost.empty().hide();
                document.onmousemove = null;
                document.onmouseup = null;
            }
        });


		if(!this.$editable)	return;
		//绑定鼠标覆盖/移出事件
        this.$workArea.delegate(".GooFlow_item", "mouseenter", { inthis: this }, function (e) {
            //$(this).addClass("item_mark_green");
            if (e.data.inthis.$focus == "") {
                $(this).removeClass("item_mark_" + e.data.inthis.$nodeData[this.id].mark);
                $(this).addClass("item_mouseenter");
            }
		});
    this.$workArea.delegate(".GooFlow_item", "mouseleave", { inthis: this }, function (e) {
            //alert(e.data.inthis.$focus);
            if (e.data.inthis.$focus == "") {
                $(this).removeClass("item_mouseenter");
                $(this).addClass("item_mark_" + e.data.inthis.$nodeData[this.id].mark);
            }
        });

		//绑定双击编辑事件
        this.$workArea.delegate(".GooFlow_item > .span", "dblclick", { inthis: this }, function (e) {
            if (e.data.inthis.$editable == false) return;
			var oldTxt=this.innerHTML;
			var This=e.data.inthis;
			var id=this.parentNode.id;
			var t=getElCoordinate(This.$workArea[0]);
			This.$textArea.val(oldTxt).css({display:"block",height:$(this).height(),width:100,
                left: This.$nodeData[id].left - This.$workArea[0].parentNode.scrollLeft - 24,
                top: This.$nodeData[id].top - This.$workArea[0].parentNode.scrollTop + 26
            })
				.data("id",This.$focus).focus();
			This.$workArea.parent().one("mousedown",function(e){
				This.setName(This.$textArea.data("id"),This.$textArea.val(),"node");
				This.$textArea.val("").removeData("id").hide();
			});
		});
        this.$workArea.delegate(".ico + td", "dblclick", { inthis: this }, function (e) {
            if (e.data.inthis.$editable == false) return;
			var oldTxt=this.innerHTML;
			var This=e.data.inthis;
			var id=$(this).parents(".GooFlow_item").attr("id");
			var t=getElCoordinate(This.$workArea[0]);
			This.$textArea.val(oldTxt).css({display:"block",width:$(this).width()+24,height:$(this).height(),
                left: 35 + This.$nodeData[id].left - This.$workArea[0].parentNode.scrollLeft,
                top: 2 + This.$nodeData[id].top - This.$workArea[0].parentNode.scrollTop
            })
				.data("id",This.$focus).focus();
			This.$workArea.parent().one("mousedown",function(e){
				This.setName(This.$textArea.data("id"),This.$textArea.val(),"node");
				This.$textArea.val("").removeData("id").hide();
			});
		});
		//绑定结点的删除功能
        this.$workArea.delegate(".rs_close", "click", { inthis: this }, function (e) {
            if (e.data.inthis.$editable == false) return;
			if(!e)e=window.event;
			e.data.inthis.delNode(e.data.inthis.$focus);
			return false;
		});
		//绑定结点的RESIZE功能
        this.$workArea.delegate(".GooFlow_item > div > div[class!=rs_close]", "mousedown", { inthis: this }, function (e) {
            if (e.data.inthis.$editable == false) return;
			if(!e)e=window.event;
			var cursor=$(this).css("cursor");
			if(cursor=="pointer"){return;}
			var This=e.data.inthis;
			var id=This.$focus;
            //This.switchItemsBtn("cursor");      //森改
			e.cancelBubble = true;
			e.stopPropagation();
			var hack=1;
			if(navigator.userAgent.indexOf("8.0")!=-1)	hack=0;
			var ev=mousePosition(e),t=getElCoordinate(This.$workArea[0]);
			This.$ghost.css({display:"block",
				width:This.$nodeData[id].width-2+"px", height:This.$nodeData[id].height-2+"px",
				top:This.$nodeData[id].top-This.$workArea[0].parentNode.scrollTop+hack+"px",
				left:This.$nodeData[id].left-This.$workArea[0].parentNode.scrollLeft+hack+"px",cursor:cursor
			});
			var X,Y;
			X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
			Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
			var vX=(This.$nodeData[id].left+This.$nodeData[id].width)-X;
			var vY=(This.$nodeData[id].top+This.$nodeData[id].height)-Y;
			var isMove=false;
			This.$ghost.css("cursor",cursor);
			document.onmousemove=function(e){
				if(!e)e=window.event;
				var ev=mousePosition(e);
				X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft-This.$nodeData[id].left+vX;
				Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop-This.$nodeData[id].top+vY;
				if(X<86)	X=86;
				if(Y<24)	Y=24;
                isMove = true;
                switch (cursor) {
                    case "nw-resize": This.$ghost.css({ width: X - 2 + "px", height: Y - 2 + "px" }); break;
                    case "w-resize": This.$ghost.css({ width: X - 2 + "px" }); break;
                    case "n-resize": This.$ghost.css({ height: Y - 2 + "px" }); break;
                }
			}
			document.onmouseup=function(e){
				This.$ghost.hide();
				if(!isMove)return;
				if(!e)e=window.event;
				This.resizeNode(id,This.$ghost.outerWidth(),This.$ghost.outerHeight());
				document.onmousemove=null;
				document.onmouseup=null;
	  		}
		});
	},
	
	//取消所有结点/连线被选定的状态
	blurItem:function(){		
		if(this.$focus!=""){
			var jq=$("#"+this.$focus);
			if(jq.prop("tagName")=="DIV"){
				if(this.onItemBlur!=null&&!this.onItemBlur(id,"node"))	return false;
                jq.removeClass("item_focus").children("div:eq(0)").css("display", "none");       //看不草笼罩层？
                $("#" + this.$focus).addClass("item_mark_" + this.$nodeData[this.$focus].mark);
                $("#" + this.$focus).removeClass("item_mouseenter");
			}
			else{
				if(this.onItemBlur!=null&&!this.onItemBlur(id,"line"))	return false;
				if(GooFlow.prototype.useSVG!=""){
					//if( !this.$lineData[this.$focus].mark){
					//	//jq[0].childNodes[1].setAttribute("stroke","#5068AE");
					//	//jq[0].childNodes[1].setAttribute("marker-end","url(#arrow1)");

     //                   //此处设置线段被选中时候的样式！               待补全，森，※
     //               }
                    
				}
				
				//this.$lineMove.hide().removeData("type").removeData("tid");         //移除折线的移动操作
				//if(this.$editable)	this.$lineOper.hide().removeData("tid");        //移除线段的选择框
			}
		}
		this.$focus="";
		return true;
	},
	//选定某个结点/转换线 bool:TRUE决定了要触发选中事件，FALSE则不触发选中事件，多用在程序内部调用。
	focusItem:function(id,bool){
		var jq=$("#"+id);
		if(jq.length==0)	return;
        if (!this.blurItem()) return;//先执行"取消选中",如果返回FLASE,则也会阻止选定事件继续进行.

        this.$focus = id;
		if(jq.prop("tagName")=="DIV"){
			if(bool&&this.onItemFocus!=null&&!this.onItemFocus(id,"node"))	return;
            jq.addClass("item_mouseenter");
			if(this.$editable)jq.children("div:eq(0)").css("display","block");
            //this.$workArea.append(jq);          //选中时候出现笼罩层？，※待测试

            this.refreshParam(id); //森加，选定某个节点的时候，添加参数栏更新
		}
		else{//如果是连接线
			if(this.onItemFocus!=null&&!this.onItemFocus(id,"line"))	return;

			if(!this.$editable)	return;
            var from, to;

            //此处添加节点选中事件？

		}
        //this.switchItemsBtn("cursor");      //森改

	},
    //移动结点到一个新的位置
    moveNode: function (id, left, top) {
        if (this.$editable == false) return;
        if (!this.$nodeData[id]) return;
        if (this.onItemMove != null && !this.onItemMove(id, "node", left, top)) return;
        if (this.$undoStack) {
            var paras = [id, this.$nodeData[id].left, this.$nodeData[id].top];
            this.pushOper("moveNode", paras);
        }
        if (left < 0) left = 0;
        if (top < 0) top = 0;
        $("#" + id).css({ left: left + "px", top: top + "px" });
        this.$nodeData[id].left = left;
        this.$nodeData[id].top = top;
        //重画转换线
        //this.resetLines(id, this.$nodeData[id]);
        //重设端点值
        this.resetEndpoint(id, this.$nodeData[id]);
    },

	//设置结点/连线/分组区域的文字信息
    setName: function (id, name, type) {
        if (this.$editable == false) return;
		var oldName;
		if(type=="node"){//如果是结点
			if(!this.$nodeData[id])	return;
			if(this.$nodeData[id].name==name)	return;
			if(this.onItemRename!=null&&!this.onItemRename(id,name,"node"))	return;
			oldName=this.$nodeData[id].name;
            this.$nodeData[id].name = name;
            $("#" + id).children("table").find("td:eq(1)").html(name);


            this.resetEndpoint(id, this.$nodeData[id]);
		}
		else if(type=="line"){//如果是线
			if(!this.$lineData[id])	return;
			if(this.$lineData[id].name==name)	return;
			if(this.onItemRename!=null&&!this.onItemRename(id,name,"line"))	return;
			oldName=this.$lineData[id].name;
			this.$lineData[id].name=name;

            //应该添加一个修改Connection的label的方法，森
            var tmpline = jsPlumb.getConnections({ source: this.$lineData[id].from, target: this.$lineData[id].to });
            tmpline.label = name;
		}

		if(this.$undoStack){
			var paras=[id,oldName,type];
			this.pushOper("setName",paras);
		}
    },

    //增加一个流程结点,传参为一个JSON,有id,name,top,left,width,height,type(结点类型)等属性$(this).removeClass("item_mark_" + e.data.inthis.$nodeData[this.id].mark);
    addNode: function (id, json) {
        if (this.$editable == false) return;
        if (this.onItemAdd != null && !this.onItemAdd(id, "node", json)) return;
        if (this.$undoStack) {
            this.pushOper("delNode", [id]);
        }
        json.mark = json.mark ? json.mark : "yellow";

        json.width = json.width ? json.width : 120;       //这里调节节点的宽高，※，有默认值
        json.height = json.height ? json.height : 30;
        if (json.top < 0) json.top = 0;
        if (json.left < 0) json.left = 0;
        var hack = 0;
        if (navigator.userAgent.indexOf("8.0") != -1) hack = 2;

        var icon_ = json.type.substring(0, 1); /*  &#xe00e;*/
        switch (icon_)
        {
            case "D": icon_ = "&#xe1b2;"; break;
            case "E": icon_ = "&#xe0a2;"; break;
            case "A": icon_ = "&#xe186;"; break;
            case "V": icon_ = "&#xe00e;"; break;
            default: icon_ = "&#xe1a3;"; break;
        }

        var nodeDom = $("<div class='GooFlow_item item_mark_" + json.mark + "' id='" + id + "' style='top:" + json.top + "px;left:" + json.left + "px'><table cellspacing='1' style='width:" + (json.width - 2) + "px;height:" + (json.height - 2) + "px;'><tr><td class='ico'><b data-icon='" + icon_ + "'></b></td><td>" + json.name + "</td></tr></table><div style='display:none'><div class='rs_bottom'></div><div class='rs_right'></div><div class='rs_rb'></div><div class='rs_close'></div></div></div>");
        if (json.type == 'complex') nodeDom.addClass('item_complex');

        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('msie') != -1 && ua.indexOf('8.0') != -1)
            nodeDom.css("filter", "progid:DXImageTransform.Microsoft.Shadow(color=#94AAC2,direction=135,strength=2)");
        this.$workArea.append(nodeDom);


        //森加，添加端点,待测试※
        var endpoint;
        var inputNum = json.inputNum ? json.inputNum : 2;
        var pointX = 1 / (inputNum + 1);

        for (var i = 1; i <= inputNum; i++) {
            endpoint = jsPlumb.addEndpoint(id, { anchors: [(pointX * i), 0, 0, -1] }, jQuery.extend(true, { uuid: id + "_" + i }, property.destination));
            endpoint.id = id + "_" + i;

        }


        endpoint = jsPlumb.addEndpoint(id, { anchors: "BottomCenter" }, jQuery.extend(true, { uuid: id + "_Out" }, property.origin));
        endpoint.id = id + "_Out";
        //jsPlumb.draggable(nodeDom, { containment: "parent" });      //待测
        //$(nodeDom).draggable({ containment: "parent" });


        this.$nodeData[id] = json;
        ++this.$nodeCount;
    },
    //获取结点/连线/分组区域的详细信息
    getItemInfo: function (id, type) {
        switch (type) {
            case "node": return this.$nodeData[id] || null;
            case "line": return this.$lineData[id] || null;
        }
    },
	//设置结点的尺寸,仅支持非开始/结束结点
    resizeNode: function (id, width, height) {
        if (this.$editable == false) return;
		if(!this.$nodeData[id])	return;
        if (this.onItemResize != null && !this.onItemResize(id, "node", width, height)) return;

		if(this.$undoStack){
			var paras=[id,this.$nodeData[id].width,this.$nodeData[id].height];
			this.pushOper("resizeNode",paras);
		}
		var hack=0;
        if (navigator.userAgent.indexOf("8.0") != -1) hack = 2;

        var nodeDom = $('#' + id);
        nodeDom.children("table").css({ width: width - 2 + "px", height: height - 2 + "px" });
        width = nodeDom.outerWidth()-hack;
        height = nodeDom.outerHeight() - hack;
        nodeDom.children("table").css({ width: width - 2 + "px", height: height - 2 + "px" });

		this.$nodeData[id].width=width;
		this.$nodeData[id].height=height;
		//重塑端点位置
		this.resetEndpoint(id,this.$nodeData[id]);
    },

    //待编写，森，用于重塑端点的位置
    resetEndpoint: function (id, json)
    {
        //重塑端点位置
        var aa = jsPlumb.getEndpoints(id);
        var len = aa.length;
        step = 1 / len;
        for (var i = 0; i < len-1;i++)
        {
            aa[i].setAnchor( [(i+1) * step , 0, 0,-1  ]);
        }
        aa[len - 1].setAnchor('BottomCenter');

    },





	//删除结点
    delNode: function (id) {
        if (this.$editable == false) return;
		if(!this.$nodeData[id])	return;
        if (this.onItemDel != null && !this.onItemDel(id, "node")) return;         //此处可以叫停删除操作
        for (var k in this.$lineData) {
            //var tmp = this.$lineData[k].from.split('_');
            //var idfrom = tmp[0] + '_' + tmp[1] + '_' + tmp[2];
            //tmp = this.$lineData[k].to.split('_');
            //var idto = tmp[0] + '_' + tmp[1] + '_' + tmp[2];
            if (this.$lineData[k].from == id || this.$lineData[k].to == id) {
                //delete this.$lineData[k];
                //var lineId = this.$lineData[k].id;
                this.delLine(k);
            }
        }
        if (this.$undoStack) {
            var paras = [id, this.$nodeData[id]];
            this.pushOper("addNode", paras);
        }
		delete this.$nodeData[id];
		//this.$nodeDom[id].remove();         //这里是否就已经是删除了？在新的框架下
		//delete this.$nodeDom[id];

        $('#' + id).remove();
		--this.$nodeCount;
		if(this.$focus==id)	this.$focus="";
        
        //森，待测试
        //删除插件
        jsPlumb.removeAllEndpoints(id);         //注意，在jsPlumb上不存在节点，只存在断点？endpoint
        
	},
	//设置流程图的名称
 //   setTitle: function (text) {
 //       if (this.$editable == false) return;
	//	this.$title=text;
	//	if(this.$head)	this.$head.children("label").attr("title",text).text(text);
	//},
	//载入一组数据
	loadData:function(data){
		if(data.initNum)	this.$max=data.initNum;
		for(var i in data.nodes)
			this.addNode(i,data.nodes[i]);
		for(var j in data.lines)
			this.addLine(j,data.lines[j]);
	},

	//把画好的结束导出到一个变量中(其实也可以直接访问GooFlow对象的$nodeData,$lineData,$areaData这三个JSON属性)
	exportData:function(){
        return jQuery.extend(true, {}, { nodes: this.$nodeData, lines: this.$lineData, initNum: this.$max });
	},
	//清空工作区及已载入的数据
	clearData:function(){
		for(var key in this.$nodeData){
			this.delNode(key);
		}
		for(var key in this.$lineData){
			this.delLine(key);
		}
	},
	//销毁自己
	destrory:function(){
        //把所有元素都变成null或者0
	},



	//增加一条线
    addLine: function (id, json) {
		if(this.onItemAdd!=null&&!this.onItemAdd(id,"line",json))return;
		if(this.$undoStack){
			this.pushOper("delLine",[id]);
		}
		var n1=null,n2=null;//获取开始/结束结点的数据
		if(json.from==json.to)	return;
		//避免两个节点间不能有一条以上同向接连线
		//for(var k in this.$lineData){
		//	if((json.from==this.$lineData[k].from&&json.to==this.$lineData[k].to))
		//		return;
        //}
        //var tmp = json.from.split('_');
        //var idfrom = tmp[0] + '_' + tmp[1] + '_' + tmp[2];
        //tmp = json.to.split('_');
        //var idto = tmp[0] + '_' + tmp[1] + '_' + tmp[2];

        var n1 = this.$nodeData[json.from], n2 = this.$nodeData[json.to];//获取开始/结束结点的数据
		if(!n1||!n2)	return;
		var res;

        //待测试，type暂时还不需要
        //res = jsPlumb.connect({
        //    source: json.from,
        //    target: json.to,
        //    label: json.name,
        //    //id: id,
        //});
        endNum = id.split('_')[3];

        this.$isNewCon = false;         //执行connect的时候把connection关掉
        res = jsPlumb.connect({
            uuids: [json.from + "_Out", json.to + "_" + endNum]
        });
        this.$isNewCon = true;

        if (!res) return;         //返回的res是一个connection
        res.setLabel(json.name);
        res.id = id;
        this.refreshLineData(id, json);
    },

    refreshLineData:function(id,json)
    {
        this.$lineData[id] = {};
        this.$lineData[id].from = json.from;
        this.$lineData[id].to = json.to;
        this.$lineData[id].name = json.name;
        if (json.mark) this.$lineData[id].mark = json.mark;
        else this.$lineData[id].mark = false;
        ++this.$lineCount;
    },
    deleteLineData: function (id)
    {
        delete this.$lineData[id];
        //delete this.$lineDom[id];       //$lineDom放置的就是connection
        if (this.$focus == id) this.$focus = "";
        --this.$lineCount;
    },

	//删除转换线，待测试※
	delLine:function(id){
		if(!this.$lineData[id])	return;
		if(this.onItemDel!=null&&!this.onItemDel(id,"node"))	return;             //此处可以叫停删除
		if(this.$undoStack){
			var paras=[id,this.$lineData[id]];
			this.pushOper("addLine",paras);
		}
        //this.$draw.removeChild(this.$lineDom[id]);


        //※森，这里相当麻烦，是最麻烦的地方，要遍历全部的线段，然后找出符合条件的线段？是否有可以直接查询的方法？如通过id（$(id)）
        var tmpline = jsPlumb.getConnections({ source: this.$lineData[id].from, target: this.$lineData[id].to });
        for (var k in tmpline)
        {
            if (tmpline[k].id == id)
            {
                jsPlumb.detach(tmpline[k]);          //代测试，森
                //jsPlumb.detach(k);
            }
        }

    },

    //保存一组数据到服务器，待编写，森
    saveToDB: function (idx, Data, url) {
        //alert(url);
    	this.$editable = false;
    	var This = this;
        $.ajax({
            url: url,
            type: "POST",
            data: { mymodelId: idx, mymodelData: JSON.stringify(Data) },
            contentType: "application/json;charset=utf-8",
            success: function (msg) {alert("保存成功" + msg); },
            error: function (XMLHttpRequest, textStatus, errorThrown) { alert("保存失败"); },
            complete: function (XMLHttpRequest, textStatus) { This.$editable = true; }
        });
    },


	//用颜色标注/取消标注一个结点或转换线，常用于显示重点或流程的进度。
	//这是一个在编辑模式中无用,但是在纯浏览模式中非常有用的方法，实际运用中可用于跟踪流程的进度。
    markItem: function (id, type, mark) {
        var oldMark;
		if(type=="node"){
			if(!this.$nodeData[id])	return;
            if (this.onItemMark != null && !this.onItemMark(id, "node", mark)) return;

            oldMark = this.$nodeData[id].mark ? this.$nodeData[id].mark : null;
            $('#' + id).removeClass("item_mark_" + this.$nodeData[id].mark);
            this.$nodeData[id].mark = mark ? mark:"yellow";
            $('#' + id).addClass("item_mark_" + this.$nodeData[id].mark);
        }
  //      else if (type == "line") {
		//	if(!this.$lineData[id])	return;
		//	if(this.onItemMark!=null&&!this.onItemMark(id,"line",mark))	return;
		//	this.$lineData[id].mark=mark||false;
		//	if(GooFlow.prototype.useSVG!=""){
  //              if (mark) {
  //                  this.$lineDom[id].childNodes[1].setAttribute("stroke", "#ff3300");
  //                  this.$lineDom[id].childNodes[1].setAttribute("marker-end","url(#arrow2)");
		//		}else{
  //                  this.$lineDom[id].childNodes[1].setAttribute("stroke","#5068AE");
  //                  this.$lineDom[id].childNodes[1].setAttribute("marker-end","url(#arrow1)");
		//		}
  //          } else {
  //              if (mark) this.$areaDom[id].strokeColor = "#ff3300";
  //              else this.$areaDom[id].strokeColor="#5068AE"
		//	}
		//}


        //撤销操作，目前没有必要？
		//if(this.$undoStatck){
  //          var paras = [id, type, oldMark];
		//	this.pushOper("markItem",paras);
		//}
	},



	//重构整个流程图设计器的宽高
	reinitSize:function(width,height){
		//var w=(width||800)-2;
		//var h=(height||500)-2;
        var w = width - 6;
        var h = height;
		this.$bgDiv.css({height:h+"px",width:w+"px"});
		var headHeight=0,hack=10;
		if(this.$head!=null){
			//headHeight=24;
			hack=7;
		}
		if(this.$tool!=null){
			this.$tool.css({height:h-headHeight-hack+"px"});
		}
		//w-=39;
		h=h-headHeight-(this.$head!=null? 5:8);
		this.$workArea.css({height:h+"px",width:w+"px"});
		//this.$workArea.css({height:h*2+"px",width:w*2+"px"});
    },


    //以下是森加的函数：
    refreshItems: function (property, type)
    {

        gooflow = this;
        this.$items.slideToggle(function () {
            gooflow.refreshItems2(property, type)
        });
        this.$items.slideToggle();

        //this.$editable = true;//只有具有工具栏时可编辑  this.$itemData[type]

    },

    refreshHeads:function(property)
    {
            this.$head = $('#icons');

            //以下是当工具栏按钮被点击时触发的事件自定义(虚函数),格式为function(),因为可直接用THIS操作对象本身,不用传参；用户可自行重定义:
            //this.onBtnNewClick = null;        //新建流程图按钮被点中
            //this.onBtnOpenClick = null;       //打开流程图按钮定义
            //this.onBtnSaveClick = null;       //保存流程图按钮定义
            //this.onFreshClick = null;         //重载流程图按钮定义

            //this.onBtnToolClick = null;
            this.onBtnSaveClick = null;
            this.onBtnRunClick = null;

            this.$head.on("click", { inthis: this }, function (e) {
                if (!e) e = window.event;
                if (e.data.inthis.$editable == false) return;
                var tar = e.target;
                if (tar.tagName == "DIV" || tar.tagName == "P") return;
                else if (tar.tagName == "SPAN") tar = tar.parentNode;
                var This = e.data.inthis;
                //定义顶部操作栏按钮的事件
                if (!$(tar).attr("id")) return;
                var type = $(tar).attr("id").split("ico_")[1];
                switch (type) {
                    case "save": if (This.onBtnSaveClick != null) This.onBtnSaveClick(); break;
                    case "undo": This.undo(); break;
                    case "redo": This.redo(); break;
                    case "run": if (This.onFreshClick != null) This.onFreshClick(); break;              //森，添加一个运行事件
                };
                This.refreshHeadButtons(type);
            });

    },

    //onBtnToolClick: function (type) {},



    refreshItems2: function (property, type)
    {
        //这些加控件的可以先去掉
        this.$items.children("a").each(function () {
            this.remove();
        });

        if (this.$itemData[type]) {
            var tmp = '';
            var Dataobj = this.$itemData[type];
            for (var key in Dataobj) {
                tmp += '<a style="text-align: center;cursor:default;z-index:11;" class="pull-left" id="' + this.$id + '_btn_' + type + key + '">';
                tmp += '<img class="media-object" alt="64x64" style="width: 64px; height: 64px;display:inline" src="' + Dataobj[key].url + '">';
                tmp += '<br/><span>' + Dataobj[key].name + '</span></a>';//加入自定义按钮
            }
            this.$items.append(tmp);
        }

        if (this.$nowModel != null && type == 'M')
        {
            this.switchItemsBtn(this.$nowModel);
        }
        if (type != 'M')        //待测试，森，用于绑定拖拽事件和取消拖拽事件
        {
            this.$items.children().draggable({
                helper: "clone",
                scope: this.$scope,
            });
        }
        this.$nowType = type;
        //else {
        //    this.$items.children().draggable("enable");
        //}
        

    },



    //切换上方的栏目
    //如果是选中某一个节点，那么应该更新参数栏目
    switchItemsBtn: function (type_Id) {
        this.$items.children("a").attr("class", "pull-left");
        this.$items.children("#" + this.$id + "_btn_" + type_Id).attr("class", "pull-left GooFlow_items_btndown");
        //this.refreshHeadButtons(type_Id);

        $('#icons button').each(function () { $(this).removeClass('active'); });
        //$("#ico_" + type_Id).addClass('active');
        if (this.$textArea.css("display") == "none") this.$textArea.removeData("id").val("").hide();
    },

    refreshHeadButtons: function (type)
    {
        $('#icons button').each(function () { $(this).removeClass('active'); });
    },


    refreshParam:function(nodeID)
    {
        //var aa = $('#Param_Panel form').children();
        var form = $('#Param_Panel form');
        form.children().each(function () { this.remove();});	//删除原来的参数栏目

        var nodeData = this.$nodeData[nodeID];
        //var filedata = this.$itemData[nodeData.type[0]][nodeData.type.substring(1)].file;
        var param = this.$itemData[nodeData.type[0]][nodeData.type.substring(1)];
		param = param==null?{}:param.param
        var tmp = '<h4 class="media-heading">' + nodeData.name + '</h4>';
        //tmp += '<div class="form-group"><label for="inputFile1" class="col-lg-3 control-label">File</label><div class="col-lg-9"><select class="form-control input-sm">';
        //for (var key in filedata)
        //{
        //    var selected = ""; if (key == nodeData.param.file) selected = "selected";
        //    tmp += '<option value= "' + key + '" ' + selected + ' >' + filedata[key].filename + '</option>';
        //}
        //tmp += '</select></div></div>';
        
        //var param = filedata[nodeData.param.file].param; 
        var i = 0;
        for (var key in param)
        {
            //设置各种参数的显示形式
            tmp += '<div class="form-group">';
            tmp += '<label for="input_' + key  + '" class="col-lg-3 control-label">' + param[key].paramname + '</label>';
            tmp += '<div class="col-lg-9"><input type="text" class="form-control" id="input_' + key + '" placeholder="' + param[key].paramname + '" value="' + nodeData.param[i] + '" ></div>';
            tmp += '</div>';
            i++;
        }
        
        form.append(tmp);
        //var aa = form.find("input");
        var This = this;
        //var node = This.$nodeData[This.$focus];
        //var nodeID = This.$focus;
        form.find("input").each(function (e) {
            $(this).bind("blur", function () {
                if (This.$editable == false) return;
                var index = this.id.split("input_")[1];
                var val = this.value;

                if (illegal(nodeData, index, val))   //判断是否非法输入，如果是，那么就变成默认值
                {
                    //var tmpData = This.$itemData[nodeData.type[0]][nodeData.type.substring(1)].file;
                    //tmpData = tmpData[nodeData.param.file].param;
                    var tmpData = This.$itemData[nodeData.type[0]][nodeData.type.substring(1)].param;
                    val = tmpData[index].value;
                }
                nodeData.param[e] = val;
                this.value = val;
            });

            function illegal(node, index, val) {        //代添加：判断是否非法输入，森※
                //空字符串
                if (val == "" || val == null || !val) {
                    return true;
                }
                return false;
            }

            $(this).change(function (a) {
                $("#" + nodeID).removeClass("item_mark_" + nodeData.mark);
                nodeData.mark = "yellow";
                $("#" + nodeID).addClass("item_mark_" + nodeData.mark);
            });


        });


        //form.find("select").change(function (e) {
        //    if (This.$editable == false) return;
        //    var fileID = e.target.value;
        //    //var node = This.$nodeData[nodeID];
        //    var tmpData = This.$itemData[nodeData.type[0]][nodeData.type.substring(1)].file;

            
        //    var param = new Array();
        //    for (var key in tmpData[fileID].param) {
        //        param.push(tmpData[fileID].param[key].value);
        //    };
        //    nodeData.param.file = fileID;
        //    nodeData.param.param = param;


        //    This.refreshParam(nodeID);
        //});
    }

}

//将此类的构造函数加入至JQUERY对象中
jQuery.extend({
    createGooFlow: function (bgDiv, Items, property, Data){
        return new GooFlow(bgDiv, Items, property, Data);
	}
}); 