var submit;


function docLoad(){
    submit = document.getElementById("go");
    getHistory();
    redraw();
}
function check(x, y, r) {
    var vars =[];
    if (x === undefined) vars.push("X");
    if (y === undefined || y === "") vars.push("Y");
    if (r === undefined) vars.push("R");
    if (/^(4.9+)$/.test(y)) {
        y = 4.9999;
    } else if (/^-4.9+$/.test(y)) {
        y = -4.9999;
    }
    if (vars.length !== 0) return 'Значения ' + vars.join(', ') + ' не инициализированы';
    if (isNaN(Number(y))) return 'Значение Y должно быть числом';
    if ((y >= 5 || y <= -5)) return 'Значение Y должно быть в промежутке (-5; 5)';
    return 'ok';
}
function submitForm(){
    var x=checkCheckboxes();
    var y=document.getElementById("Y").value;
    var r=document.getElementById("R-select").value;
    y=y.replace(",",".");
    var isOk = check(x,y,r);
    if(isOk=="ok"){
        var form = document.createElement("form");
        form.method = "POST";
        form.type = "hidden";
        form.action = jcp+"/controller";
        var str = getCheckedBoxes();
        form.innerHTML = str +
            "<input type='hidden' name='y' value=" + y + ">" +
            "<input type='hidden' name='r' value=" + r + ">" +
            document.body.appendChild(form);
        console.log(str);
        form.submit();
    }else{
        let output = document.getElementById("invalid_data");
        output.innerHTML = isOk;
    }

}
function checkCheckboxes() {
    let checkboxes = document.getElementsByName("x");
    let checkboxesChecked = [];
    let htmlStr="";
    if(checkboxes.length>0){
        for (let i=0; i<checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxesChecked.push(checkboxes[i]);
                return checkboxesChecked.length;
            }
        }
    }
}
function getCheckedBoxes() {
    let checkboxes = document.getElementsByName("x");
    let checkboxesChecked = [];
    let htmlStr="";
    if(checkboxes.length>0){
        for (let i=0; i<checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxesChecked.push(checkboxes[i]);
                htmlStr = htmlStr + "<input type='hidden' name='x' value=" + $(checkboxes[i]).val() + ">";
            }
        }
    }
    console.log(htmlStr);
    return htmlStr;
}


