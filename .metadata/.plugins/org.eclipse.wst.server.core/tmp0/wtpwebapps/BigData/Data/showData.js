function showResData(id) {
    $("#ResTitle").html(instance.$nodeData[id].name  );        //设置题目
    var txtList = resData[id];
    if (!txtList) { $("#ResContent").html(""); $("#showResData").click(); return; }
    var tmp = "";
    txtList = txtList.txtList;

    for (var i in txtList) {
        //if (i > 20) break;
        tmp += txtList[i] + "<br/>";
    }
    $("#ResContent").html(tmp);
    $("#showResData").click();
}