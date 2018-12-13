var param1 = {
    1: { paramname: "a1", value: 4 , bind:"1", type:"text" },
    2: { paramname: "b2", value: 25, bind: "", },
    3: { paramname: "c3", value: 40 },
    4: { paramname: "d4", value: 3 },
    5: { paramname: "e5", value: 345 },
    6: { paramname: "f6", value: 390 },
    7: { paramname: "g7", value: 2 },
    8: { paramname: "h8", value: 67 },
    9: { paramname: "i9", value: 87 },
}

var param2 = {
    10: { paramname: "j1", value: 2 },
    11: { paramname: "k2", value: 345 },
    12: { paramname: "l3", value: 390 },
    13: { paramname: "m4", value: 10 },
    14: { paramname: "n5", value: 567 },
    15: { paramname: "o6", value: 56 }
}

var param3 = {
    16: { paramname: "p1", value: 2 },
    17: { paramname: "q2", value: 345 },
    18: { paramname: "r3", value: 390 },
    19: { paramname: "s4", value: 10 },
    20: { paramname: "t5", value: 567 },
    21: { paramname: "u6", value: 56 },
}

var param4 = {
    22: { paramname: "v1", value: 10 },
    23: { paramname: "w2", value: 567 },
    24: { paramname: "x3", value: 56 },
    25: { paramname: "y4", value: 10 },
    26: { paramname: "z5", value: 567 },
    27: { paramname: "a6", value: 56 }
}


var A = {
    123: { name: 'k-means', url: "${ctx }/img/avatar-4.png", param: param1, inputNum:3 },
    124: { name: 'sasdfvm', url: "${ctx }/img/avatar-1.png", param: param4, inputNum: 2 },
    125: { name: 'knn', url: "${ctx }/img/avatar-5.png", param: param3, inputNum: 2 }
}

var D = {
    126: { name: 'HDFS', url: "${ctx }/img/avatar-1.png", param: param1, inputNum: 0},
    127: { name: 'SQL', url: "${ctx }/img/avatar-2.png", param: param4, inputNum: 1},
    128: { name: '可变文件', url: "${ctx }/img/avatar-3.png", param: param3, inputNum: 4 }
}



var E = {
    129: { name: 'One-hot', url: "${ctx }/img/avatar-2.png", param: param4, inputNum: 4 },
    130: { name: '补充空', url: "${ctx }/img/avatar-3.png", param: param2, inputNum: 2},
    131: { name: '抽样', url: "${ctx }/img/avatar-4.png", param: param3, inputNum: 1 }
}

var V = {
    132: { name: '柱状图', url: "${ctx }/img/avatar-5.png", param: param1, inputNum: 3},
    133: { name: '圆饼图', url: "${ctx }/img/avatar-4.png", param: param2, inputNum: 4},
    134: { name: '其他', url: "${ctx }/img/avatar-3.png", param: param3, inputNum: 2}
}



var flow1 =
    {
        "nodes":
        {
            "instance_node_8": { "name": "抽样_8", "inputNum": 1, "left": 416, "top": 141, "type": "E130", "param": [2, 345, 390,34,6,8], "mark": "yellow", "width": 120, "height": 30 },
            "instance_node_9": { "name": "k- means_9", "inputNum": 3, "left": 32, "top": 269, "type": "A123", "param": [4, 25, 40,23,45,65,78,45,67], "mark": "yellow", "width": 120, "height": 30 },
            "instance_node_10": { "name": "sasdfvm_10", "inputNum": 2, "left": 232, "top": 275, "type": "A124", "param": [2, 345, 390, 34, 6, 23], "mark": "green", "width": 120, "height": 30 },
            "instance_node_11": { "name": "knn_11", "inputNum": 2, "left": 441, "top": 261, "type": "A125", "param": [2, 345, 390, 34, 6, 8], "mark": "yellow", "width": 120, "height": 30 },
            "instance_node_12": { "name": "HDFS_12", "inputNum": 0, "left": 245, "top": 54, "type": "D127", "param": [4, 25, 40, 345, 390, 34], "mark": "green", "width": 120, "height": 30 },
            "instance_node_19": { "name": "补充空_19", "inputNum": 2, "left": 98, "top": 130, "type": "E131", "param": [2, 345, 390, 345, 30, 3], "mark": "green", "width": 120, "height": 30 },
            "instance_node_25": { "name": "sasdfvm_25", "inputNum": 2, "left": 141, "top": 363, "type": "A124", "param": [2, 345, 390, 67, 8, 98], "mark": "green", "width": 120, "height": 30 },
            "instance_node_26": { "name": "圆饼图_26", "inputNum": 4, "left": 437, "top": 374, "type": "V132", "param": [2, 345, 390, 5, 390, 67, 4, 25, 4 ], "mark": "yellow", "width": 120, "height": 30 },
            "instance_node_32": { "name": "柱状图_32", "inputNum": 3, "left": 268, "top": 447, "type": "V133", "param": [4, 25, 40, 390, 5, 390], "mark": "yellow", "width": 120, "height": 30 },
            "instance_node_35": { "name": "SQL_35", "inputNum": 1, "left": 684, "top": 257, "type": "D126", "param": [2, 345, 390, 390, 5, 390, 67, 4, 25], "mark": "yellow", "width": 120, "height": 30 },
            "instance_node_36": { "name": "HDFS_36", "inputNum": 0, "left": 619, "top": 67, "type": "D127", "param": [4, 25, 40, 2, 345, 78], "mark": "yellow", "width": 120, "height": 30 },
            "instance_node_39": { "name": "sasdfvm_39", "inputNum": 2, "left": 618, "top": 366, "type": "A124", "param": [2, 345, 390, 90, 390, 5], "mark": "yellow", "width": 120, "height": 30 },
            "instance_node_41": { "name": "其他_41", "inputNum": 2, "left": 583, "top": 448, "type": "V134", "param": [2, 345, 390, 2, 345, 390], "mark": "yellow", "width": 120, "height": 30 }
        },
        "lines":
        {
            "instance_line_16_1": { "from": "instance_node_12", "to": "instance_node_8", "name": "line16", "mark": "yellow" },
            "instance_line_17_2": { "from": "instance_node_8", "to": "instance_node_11", "name": "line17", "mark": "yellow" },
            "instance_line_20_2": { "from": "instance_node_19", "to": "instance_node_9", "name": "line20", "mark": "yellow" },
            "instance_line_21_1": { "from": "instance_node_12", "to": "instance_node_19", "name": "line21", "mark": "yellow" },
            "instance_line_22_2": { "from": "instance_node_19", "to": "instance_node_10", "name": "line22", "mark": "yellow" },
            "instance_line_23_1": { "from": "instance_node_8", "to": "instance_node_10", "name": "line23", "mark": "yellow" },
            "instance_line_27_2": { "from": "instance_node_11", "to": "instance_node_26", "name": "line27", "mark": "yellow" },
            "instance_line_28_2": { "from": "instance_node_10", "to": "instance_node_25", "name": "line28", "mark": "yellow" },
            "instance_line_29_1": { "from": "instance_node_10", "to": "instance_node_26", "name": "line29", "mark": "yellow" },
            "instance_line_30_1": { "from": "instance_node_9", "to": "instance_node_25", "name": "line30", "mark": "yellow" },
            "instance_line_33_3": { "from": "instance_node_26", "to": "instance_node_32", "name": "line33", "mark": "yellow" },
            "instance_line_34_1": { "from": "instance_node_25", "to": "instance_node_32", "name": "line34", "mark": "yellow" },
            "instance_line_37_1": { "from": "instance_node_36", "to": "instance_node_11", "name": "line37", "mark": "yellow" },
            "instance_line_38_1": { "from": "instance_node_36", "to": "instance_node_35", "name": "line38", "mark": "yellow" },
            "instance_line_40_1": { "from": "instance_node_35", "to": "instance_node_39", "name": "line40", "mark": "yellow" },
            "instance_line_42_1": { "from": "instance_node_26", "to": "instance_node_41", "name": "line42", "mark": "yellow" },
            "instance_line_43_2": { "from": "instance_node_39", "to": "instance_node_41", "name": "line43", "mark": "yellow" },
            "instance_line_44_2": { "from": "instance_node_35", "to": "instance_node_39", "name": "line44", "mark": "yellow" },
            "instance_line_45_4": { "from": "instance_node_36", "to": "instance_node_26", "name": "line45", "mark": "yellow" }
        },
        "initNum": 46
    }





var M = {
    2: { name: '测试流程', url: "img/avatar-1.png", data:flow1 },
    4: {
        name: '贷款预测', url: "img/avatar-3.png", data: {
            nodes: {
                instance_node_1: { name: "de_1", inputNum: 3, left: 67, top: 69, type: "A123", width: 120, height: 30, param: [7, 465, 87],mark: "red" },
                instance_node_2: { name: "node_2", inputNum: 2, left: 219, top: 71, type: "E124", width: 120, height: 30, param: [8, 888, 88], mark: "yellow" },
                instance_node_5: { name: "node_5", inputNum: 4, left: 380, top: 71, type: "A123", width: 120, height: 30, param: [9, 999, 99], mark: "green" }
            },
            lines: {
                instance_line_3_2: { type: "sl", from: "instance_node_1", to: "instance_node_2", name: "", mark: false },
                instance_line_6_3: { type: "sl", from: "instance_node_2", to: "instance_node_5", name: "", mark: false }
            },
            initNum: 7
        }
    },
}


var Data = {
    A: A,
    M: M,
    E: E,
    V: V,
    D: D
};
