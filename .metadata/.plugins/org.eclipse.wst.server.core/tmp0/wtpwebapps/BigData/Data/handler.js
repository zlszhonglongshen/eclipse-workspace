function postDropDown(url,params,node)
{
	//var url="${pageContext.request.contextPath}/dict_findByCode.action";
	//var params={"dict_type_code":"002"};//信息来源

	$.post(url,params,function(data){
		$.each(data,function(i,n){
			$("#" + node).append("<option value='"+n.dictId+"'>"+n.dictItemName+"</option>");
		});
	},"json");
}

    //var gooflow = Pretreatment(instance.exportData(),useId,instance.$nowModel.substring(1) );
function ClickRun(Url, useId) {
    var inst_ = instance;
    var gooflow = (inst_.exportData());
    if (inst_.$editable == false) return;
    if (!inst_.$nowModel) { alert("请先保存模型");return; }
    if (!checkLoop(gooflow)) { alert("流程存在回路");return; }
    checkStart(gooflow);
    inst_.$editable = false;

     var nDSet = nonDominateSort(gooflow.nodes, gooflow.lines );


    //每一次的流都应该把ModelId和UserId带入，用jQuery.extend(来实现
     var modelId = inst_.$nowModel.substring(1);
    var tensorFlow = new Array();
    var F = new Array();
    var RunOrNot = {};
    for (var i in nDSet)
    {
        if (nDSet[i].np == 0)
        {
            //tensorFlow.push(createFlow(i, gooflow[i], nDSet[i], useId, modelId));
            F.push(i);
            //if (inst_.$nodeData[i].mark == "green") { RunOrNot[i] = false; }      //如果开始节点为绿色，那么就不用跑了，RunOrNot为false
            //else{RunOrNot[i] = true;}                                               //否则就需要跑。为true；
        }   
    }


    sendRequest(F);

    function sendRequest(F) {
        if (F.length == 0) {
            inst_.$editable = true;
            return;
        }
        var G = new Array();
        tensorFlow = new Array();
        for (var i in F) {
            var idx = F[i];
            var tmpSp = nDSet[idx].Sp;
            //参数：该节点的名字，用来作为输出，该节点的参数，输入（未排序），uID，mID
            tensorFlow.push(createFlow(idx, gooflow.nodes[idx], nDSet[idx].nSp, useId, modelId));
            for (var j in tmpSp) {
                var tmpNode = tmpSp[j];
                nDSet[tmpNode].np--;
                if (nDSet[tmpNode].np == 0) {
                    G.push(tmpNode);
                }
            }
        }

        var req = 0;
        //发送运行请求
        for (var i in tensorFlow) {
            //要跑为true，不跑为false
            //发送请求的条件是：上一步的全是绿灯且这一步不是绿灯，才会发送请求
            var tmpRunOrNot = false;                    //一开始设置为不用跑，但是如果它的爸爸要跑，那么他也要跑
            var tmpNodeId = tensorFlow[i].nodeName;       //即将要运行的节点id
            var isRunReady = true;                          //一开始设置为要跑的，因为假设都准备好了
            for (var j in tensorFlow[i].input) {            //遍历该节点的爸爸(名)
                var tmpInput_ = tensorFlow[i].input[j];
                if (tmpInput_ != "") {
                    if (inst_.$nodeData[tmpInput_].mark != "green") {
                        isRunReady = false;
                        //$("#" + tmpNodeId).removeClass("item_mark_" + inst_.$nodeData[tmpNodeId].mark);
                        //inst_.$nodeData[tmpNodeId].mark = "red";
                        //$("#" + tmpNodeId).addClass("item_mark_" + inst_.$nodeData[tmpNodeId].mark);
                    }         //如果爸爸节点没有准备好，那么就不用跑了，同时把自己也变成没有准备好
                    if (RunOrNot[tmpInput_] == true) { tmpRunOrNot = true; }            //看看上个爸爸节点有没有跑过，有跑过那么自己也要跑
                }
            }
            if (tmpRunOrNot == false && inst_.$nodeData[tmpNodeId].mark == "green") { RunOrNot[tmpNodeId] = false; }        //只有爸爸全亮绿灯，自己也亮绿灯，才不跑
            else { RunOrNot[tmpNodeId] = true; }


            if (isRunReady == true && RunOrNot[tmpNodeId] == true) {            //只要有一个为false，那么都不用跑了
                //alert(tensorFlow[i].nodeName);
                inst_.markItem(tensorFlow[i].nodeName, "node", "red");        //只有成功才会变成绿色，否则全是红色
                $("#" + tmpNodeId).removeClass("item_mark_" + inst_.$nodeData[tmpNodeId].mark);
                $.ajax({
                    url: Url,
                    type: "POST",
                    data: JSON.stringify(tensorFlow[i]),
                    contentType: "application/json;charset=utf-8",
                    success: function (a, b, res) {
                        //var msg = eval(res);
                        //var msg = $.parseJSON(res.responseText);
                        var msg = res.responseText;
                        var mark = msg.isSuccess ? "green" : "red";
                        inst_.markItem(msg.resName, "node", mark);
                        resData[msg.resName] = { column: msg.column, txtList: msg.txtList };
                    },
                    error: function (msg) { },
                    complete: function (XMLHttpRequest, textStatus) { req++; if (req == F.length) { sendRequest(G); } }
                });
            }
            else {
                req++;
                if (req == F.length) {
                    sendRequest(G);
                }
            }
        }

    }

    //while (F.length > 0)
    //{
        
    //    //停留直到全部信号发送接收完？是否有更好的办法？

    //    F = G;
    //}
    //inst_.$editable = true;
}

//function Pretreatment(data,uId,modelId)
//{
//	res = {  nodes:new Array(),lines:new Array() };
	
//	for(var i in data.nodes)
//	{
//		res.nodes.push( $.extend({nodeKey:i},data.nodes[i]) );
//	}
//	for(var j in data.lines)
//	{
//		res.lines.push( $.extend({lineKey:j},data.lines[j]) );
//	}
//	return res;
//}


//先提取flow，然后把基本信息带入对象
function nonDominateSort(nodes,lines)
{
    var nDSet = {};
    for (var i in nodes) {
        //nDSet.i.Sp = new Array();      //该点支配的点集
        //nDSet.i.nSp = new Array();     //支配该点的点集
        //nDSet.i.np = 0;
        nDSet[i] = { Sp: new Array(), nSp: new Array(), np: 0 };
    }
    for (var i in lines)
    {
        var idx = i.split("_")[3];
        nDSet[lines[i].from].Sp.push(lines[i].to);
        nDSet[lines[i].to].nSp.push({ from: lines[i].from, idx: idx });
        nDSet[lines[i].to].np++;
    }
    return nDSet;
}



//检查是否存在循环回路，如果存在直接返回
function checkLoop(gooflow) {
    //使用splice
    return true;
}

//1，删除指向数据源的线段
function checkStart(gooflow) {
    var lines = gooflow.lines;
    var nodes = gooflow.nodes;
    $.each(lines, function (i, data) {
        //alert("CheckStart");
        if (nodes[data.to].type.substr(0, 1) == "D") {
            delete lines[i];
        }
    });
}

function createFlow(idx, nodes, input_ , useId, modelId)
{
    var flow_ = { useId: useId, modelId };
    flow_.ModularType = nodes.type.substring(0, 1);
    flow_.ModularId = nodes.type.substring(1);
    flow_.input = new Array(nodes.inputNum);
    flow_.nodeName = idx;
    for (var i = 0; i < flow_.input.length;i++)
    {
        flow_.input[i] = "";
    }
    for (var i in input_) {
        flow_.input[input_[i].idx] = input_[i].from;
    }
    flow_.param = nodes.param;
    return flow_;
}
