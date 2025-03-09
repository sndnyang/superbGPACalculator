# GPA Calculator

众所周知 excel可以直接写， csv（逗号分隔符的文本文件）可以直接打开成excel

假设课程名、百分制成绩、学分 分别是A\B\C三列，第一行为名称，从第二行开始，则excel计算式子为：
```
在 D 列计算 4 分制成绩 (在D2单元格复制粘贴下行式子， 然后鼠标往下拖拽， 没拖拽过的搜一下怎么用excel）。 多种GPA分制按需选择即可。
=IF(B2>=90, 4.0, IF(B2>=80, 3.0, IF(B2>=70, 2.0, IF(B2>=60, 1.0, 0.0))))
=IF(B2>=85, 4.0, IF(B2>=70, 3.0, IF(B2>=60, 2.0, 0.0)))
=IF(B2>=85, 4.0, IF(B2>=75, 3.0, IF(B2>=60, 2.0, 0.0)))
=IF(B2>=90, 4.0, IF(B2>=85, 3.7, IF(B2>=82, 3.3, IF(B2>=78, 3.0, IF(B2>=75, 2.7, IF(B2>=72, 2.3, IF(B2>=68, 2.0, IF(B2>=64, 1.7, IF(B2>=60, 1.0, 0.0))))))))))
=IF(B2>=95, 4.3, IF(B2>=90, 4.0, IF(B2>=85, 3.7, IF(B2>=80, 3.3, IF(B2>=75, 3.0, IF(B2>=70, 2.7, IF(B2>=67, 2.3, IF(B2>=65, 2.0, IF(B2>=62, 1.7, IF(B2>=60, 1.0, 0.0)))))))))))
=IF(B2>=90, 4.0, IF(B2>=85, 3.7, IF(B2>=82, 3.3, IF(B2>=78, 3.0, IF(B2>=75, 2.7, IF(B2>=72, 2.3, IF(B2>=68, 2.0, IF(B2>=66, 1.7, IF(B2>=64, 1.3, IF(B2>=60, 1, 0))))))))))
=IF(B2>=95, 4.3, IF(B2>=90, 4.0, IF(B2>=85, 3.7, IF(B2>=82, 3.3, IF(B2>=78, 3.0, IF(B2>=75, 2.7, IF(B2>=72, 2.3, IF(B2>=68, 2.0, IF(B2>=65, 1.7, IF(B2>=64, 1.5, IF(B2>=61, 1.3, IF(B2>=60, 1.0, 0.0)))))))))))))
=IF(B2>=90, 4.3, IF(B2>=85, 4.0, IF(B2>=80, 3.7, IF(B2>=75, 3.3, IF(B2>=70, 3.0, IF(B2>=65, 2.7, IF(B2>=60, 2.3, 0.0))))))))


GPA （在某个空白单元格复制粘贴）
= (D2 * C2 + D3 * C3 + ... + Dn * Cn) / (C2 + C3 + ... + Cn)

加权平均分（在某个空白单元格复制粘贴）
= SUMPRODUCT(B2:B100, C2:C100) / SUM(C2:C100)
```

全能超级 GPA 计算器， 8种GPA算法

[中文版](http://sndnyang.github.io/gpa_calculator.html)

[English Version](http://sndnyang.github.io/gpa_calculator_en.html)

upload file or copy+paste to calculate your GPA. 

Don't input one by one by hand.

上传文件 或 复制粘贴到文本框 即可计算， 7种算法可供选择， 拒绝手输。

# License

This project is licensed under the MIT License. See LICENSE for more details

# 更新历史

## 2019-09-17

添加LICENSE 开源协议

## 2017-06-30

添加 EXCEL(XLS, XLSX)格式支持， 使用 [js-xlsx](https://github.com/SheetJS/js-xlsx)


