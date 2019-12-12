<%@ page import="mypkg.Result" %>
<%@ page import="mypkg.LabConst" %>
<%@ page import="java.util.stream.Collectors" %>
<%@ page import="java.util.*" %>
<%@ page import="mypkg.Pair" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <script type="text/javascript">const jcp = '${pageContext.request.contextPath}';</script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="script.js"></script>
    <script type="text/javascript" src="jquery-3.4.1.js"></script>
    <script type="text/javascript" src="canvas.js"></script>
    <script type="text/javascript">const jspContextPath = '${pageContext.request.contextPath}';</script>
</head>
<body onload="docLoad()">
<script>console.log(jcp);</script>
    <div id="main_hat" class="hat">
        <table>
            <tr>
                <td>Студент: </td><td>Шаля Андрей Юрьевич</td>
            </tr>
            <tr>
                <td>Группа: </td><td>P3211</td>
            </tr>
            <tr>
                <td>Вариант: </td><td>211022</td>
            </tr>
        </table>
    </div>
    <h1 id="lab_name" class="title">Лабораторная работа №2 по ВЕБ-Программированию</h1>
    <div id="logic">
        <div id="graph-container">
                <canvas id="my-canvas"></canvas>
<%--                <img id="gr" src="area.png"/>--%>
        </div>
        <div id="table-grid-container">
            <div id="table_container">
                    <div>
                        <div id="buttons">
                            <div id="X" class="vars x-coord">
                                X
                                <label><input type="checkbox" value="-2" name="x">-2</label>
                                <label><input type="checkbox" value="-1.5" name="x">-1.5</label>
                                <label><input type="checkbox" value="-1" name="x">-1</label>
                                <label><input type="checkbox" value="-0.5" name="x">-0.5</label>
                                <label><input type="checkbox" value="0" name="x">0</label>
                                <label><input type="checkbox" value="0.5" name="x">0.5</label>
                                <label><input type="checkbox" value="1" name="x">1</label>
                                <label><input type="checkbox" value="1.5" name="x">1.5</label>
                                <label><input type="checkbox" value="2" name="x">2</label>
                            </div>
                            <div class="vars">
                                <div id="yField" colspan="7"><input type="text" maxlength="6" name="y" id="Y" >
                                    <span>Y</span>
                                </div>
                            </div>
                            <div class="vars" id="R">
                                R
                                <select name="r" id="R-select" style="width: 98%;">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <input type="button" id="go" name="start" value="Ну что народ, погнали!!!" onclick="submitForm()">
                    </div>
        
                </div>
        </div>
        <div id="rez-container">
            <div id="result-box">
                <div id="invalid_data" class="result_h">
                </div>
                <div id="xyi">
                    <%
                        @SuppressWarnings("unchecked")
                        ArrayList<Pair<String, Result>> results = (ArrayList<Pair<String, Result>>) application.getAttribute(LabConst.RESULT_ARRAY);
                        StringBuilder str = new StringBuilder();
                        if(results != null){
                            List<Result> resultList = results.stream().filter(p -> p.getKey().equals(request.getRequestedSessionId()))
                                    .map(Pair::getValue).collect(Collectors.toList());
                            Collections.reverse(resultList);
                            resultList.forEach(p -> {
                                String s = "<div class=\"result_h\">\n" +
                                        "                            X= "+ p.getX() +", Y= "+p.getY()+", R="+p.getR()+"\n" +
                                        "                            <div>Результат - "+ (p.isIn() ? "Входит" : "Не входит") +"</div>\n" +
                                        "                        </div>";
                                str.append(s);
                            });
                            out.print(str.toString());
                        }
                    %>
                </div>
            </div>
        </div>
    </div>
</body>
</html>