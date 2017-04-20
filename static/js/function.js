/**
 * Created by sndnyangd on 2014-9-4.
 */

function calit()
{
    var content = $("#grade").val();
    var algorithm = $("#algorithm").val();
    var elements = new Array("课程名", "百分制", "等级制", "4分制", "学分", "学时");
    var ele_eng = new Array("name", "hund", "lett", "four", "cred", "hour");

    // 分隔符类型
    var type = $("#type").val();
    var map = {'csv':',', 'space':' ', ',':',', ' ':' ', '\\t':'\t', 'tab':'\t', '':' '};
    if (map[type]) 
    {
        type = map[type];
    }
    else
    {
        alert(type + " 未定义");
        return 1;
    }

    // 要组一个漂亮的表格, 这是表头
    var table = $('<table border="1"></table>');
    var row = $('<tr></tr>');
    for (var i in elements)
    {
        var cell = $('<th>' + elements[i] + '</th>');
        row.append(cell);
    }
    table.append(row);

    var lines = content.split(/\r?\n/);
    var divs = new Array();
    var findex = 0;

    var optbox = document.getElementsByName("select");
    var record = new Array();

    // 逐行遍历
    for (var i in lines)
    {
        var line = lines[i];
        
        if (type != ' ' && type != '\t' && type != 'space')
        {
            line = line.replace(/\s+/g, "");
        }
        else
        {
            line = line.replace(/\s+/g, " ");
            type = " ";
        }
        
        if (line == '' || line == ' ') continue;

        row = $('<tr></tr>');
        
        var fields = line.split(type);
        var c = 0;
        var sgrade = {};
        for (var j in elements) {
            var text;
            if (optbox[j].checked) {
                // 字段选项是否被选中
                // 选中则直接取
                text = fields[c];
                c++;
            }
            else if (j == 2) {
                if (!sgrade['hund'])
                    continue;
                //  有百分制， 则计算 ABCD
                text = gpa_letter(sgrade['hund'], algorithm);
            }
            else if (j == 3) {
                if (!sgrade['hund'] && !sgrade['lett']) {
                    alert(line + '  百分制 等级制 4分制 三种分数你好歹选一种吧!');
                    return 1;
                }
                text = gpa_four(sgrade['hund'], sgrade['lett'], algorithm);
            }
            else {
                text = ""
            }
            // console.log(j + ' ' + text)

            sgrade[ele_eng[j]] = text;
            var cell = $('<td>' + text + '</td>');
            row.append(cell);     
        }
        table.append(row);
        record[i] = sgrade;
    }

    $('#content').html('');
    $('#content').append(table);

    result_set = calculator(record);
    for (var i in result_set) {
        $('#sum'+i).val(result_set[i]);
    }
}

function gpa_four(hgrade, lgrade, type)
{
    var map = {'s4': standard_4(), 's41': standard_4_1(), 's42': standard_4_2(), 'p4': peking_4(), 'c4': canada_4_3(), 'sjt4': SJTU_4_3(), 'cs4': CSU_4_3()};
    var calculator = map[type];
    var threshold = calculator['threshold'];
    var letter_val = calculator['letter'];
    var gpa_val = calculator['gpa'];

    var result = 0.0;
    hgrade = hgrade - 0;
    for (var i in threshold) {
        if (!hgrade && lgrade && lgrade == letter_val[i]) {
            result = gpa_val[i];
            break;
        }
        else if (hgrade >= threshold[i]) {
            result = gpa_val[i];
            break;
        }
    }
    return result;
}

function gpa_letter(hgrade, type)
{
    var map = {'s4': standard_4(), 's41': standard_4_1(), 's42': standard_4_2(), 'p4': peking_4(), 'c4': canada_4_3(), 'sjt4': SJTU_4_3(), 'cs4': CSU_4_3()};
    var calculator = map[type];
    var threshold = calculator['threshold'];
    var letter_val = calculator['letter'];
    var gpa_val = calculator['gpa'];
    var result = 'F';
    hgrade = hgrade - 0;
    for (var i in threshold) {
        if (hgrade >= threshold[i]) {
            result = letter_val[i];
            break;
        }
    }
    return result;
}

function calculator(record)
{
    var result;
    var sum_credit = 0;
    var sum_weight_credit = 0;
    var sum_weight_score = 0;
    
    for (var i in record) {
        var grade = record[i];
        var credit = grade['cred'] - 0;
        var hund = grade['hund'] - 0;
        var four = grade['four'] - 0;
        sum_credit += credit;
        sum_weight_credit += four * credit;
        sum_weight_score  += hund * credit;
    }

    return new Array(sum_credit, sum_weight_credit, 
        sum_weight_credit * 1.0 / sum_credit, sum_weight_score * 1.0 / sum_credit);
}

function standard_4() {
    var threshold = new Array(90,80,70,60,0);
    var letter_val = new Array('A', 'B', 'C', 'D', 'F');
    var gpa_val = new Array(4.0,3.0,2.0,1.0,0.0);
    var map = {'threshold': threshold, 'letter': letter_val, 'gpa': gpa_val};
    return map;
}

function standard_4_1() {
    var threshold = new Array(85,70,60,0);
    var letter_val = new Array('A', 'B', 'C', 'F');
    var gpa_val = new Array(4.0,3.0,2.0,0.0);
    var map = {'threshold': threshold, 'letter': letter_val, 'gpa': gpa_val};
    return map;
}

function standard_4_2() {
    var threshold = new Array(85,75,60);
    var letter_val = new Array('A', 'B', 'C');
    var gpa_val = new Array(4.0,3.0,2.0);
    var map = {'threshold': threshold, 'letter': letter_val, 'gpa': gpa_val};
    return map;
}

function peking_4() {
    var threshold = new Array(90,85,82,78,75,72,68,64,60);
    var letter_val = new Array('A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D');
    var gpa_val = new Array(4.0,3.7,3.3,3.0,2.7,2.3,2.0,1.7,1.0);
    var map = {'threshold': threshold, 'letter': letter_val, 'gpa': gpa_val};
    return map;
}

function canada_4_3() {
    var threshold = new Array(90,85,80,75,70,65,60);
    var letter_val = new Array('A+', 'A', 'A-', 'B+', 'B', 'C+', 'C');
    var gpa_val = new Array(4.3, 4.0,3.7,3.3,3.0,2.7,2.3);
    var map = {'threshold': threshold, 'letter': letter_val, 'gpa': gpa_val};
    return map;
}

function CSU_4_3() {
    var threshold = new Array(95,90,85,82,78,75,72,68,65,64,61,60);
    var letter_val = new Array('A+','A','A-','B+','B','B-','C+','C','C-','D+','D','D-');
    var gpa_val = new Array(4.3,4.0,3.7,3.3,3.0,2.7,2.3,2.0,1.7,1.5,1.3,1.0);
    var map = {'threshold': threshold, 'letter': letter_val, 'gpa': gpa_val};
    return map;
}

function SJTU_4_3() {
    var threshold = new Array(95,90,85,80,75,70,67,65,62,60);
    var letter_val = new Array('A+','A','B+','B','C+','C','C-','D+','D','D-');
    var gpa_val = new Array(4.3,4.0,3.7,3.3,3.0,2.7,2.3,2.0,1.7,1.0);
    var map = {'threshold': threshold, 'letter': letter_val, 'gpa': gpa_val};
    return map;
}
