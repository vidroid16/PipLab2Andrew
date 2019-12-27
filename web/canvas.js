const A = 222;
const R = 80;

var pointsHistoryJson = "";

$(document).ready(function() {
    $("#my-canvas").on("click",function (event) {
        let h = document.getElementById("my-canvas").offsetHeight;
        let w = document.getElementById("my-canvas").offsetWidth;
        let x = event.pageX - this.offsetLeft;
        let y = event.pageY - this.offsetTop;
        let r = document.getElementById("R-select").value;

        let x_server = getServerX(x, h, r);
        let y_server = getServerY(y, h, r);
        var isOK = check(x_server,y_server, r);
        if(isOK=="ok"){
            $.ajax({
                url: '/controller',
                type: 'POST',
                dataType: 'html',
                data: {'x': x_server, 'y': y_server, 'r': r},
                beforeSend: function () {
                },
                success: function (data) {
                    getHistory();
                }
            });
        }else{
            let output = document.getElementById("invalid_data");
            output.innerHTML = isOK;
        }
    });
});

function getServerX(x, a, r){
    //let x_server = (A/a)*((x-0.5*a)/(R/r));
    let x_server = ((x-0.5*a)/(R/r));
    x_server = x_server.toFixed(4);
    //console.log("x-server: " + x_server);
    return x_server;
}
function getServerY(y, a, r){
    let y_server = -(A/a)*((y-0.5*a)/(R/r));
    y_server = y_server.toFixed(4);
    //console.log("y_server: " + y_server);
    return y_server;
}

function getClientX(x, a, r){
    let x_client = ((x* (R/r)+0.5 * A));
    x_client = x_client.toFixed(4);
    //console.log("x_client: " + x_client);
    return x_client;
}
function getClientY(y, a, r){
    let y_client = -((y* (R/r)-0.5 * A));
    y_client = y_client.toFixed(4);
    //console.log("y_client: " + y_client);
    return y_client;
}

function getHistory() {
    document.getElementById('xyi').innerHTML = "";
    $.ajax({
        url: '/controller?param=1',
        headers:{
            "IsUser":"true"
        },
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
        },
        success: function (data) {
            pointsHistoryJson = data;
            JSON.parse(data).forEach((p)=>{
                let mdiv = document.createElement('div');
                let subdiv = document.createElement('div');
                mdiv.className = 'result_h';
                mdiv.textContent = "X= " + p.x + ", Y= " + p.y+ ", R=" + p.r +"\n";
                subdiv.textContent = "Результат - " + (p.isIn ? "Входит" : "Не входит") + "\n";

                mdiv.appendChild(subdiv);
                $('#xyi').prepend(mdiv);
            });
            redraw();
        }
    });
}

function getR() {
    var selectedR = $('#R-select').children("option:selected").val();
    return selectedR;
}

function drawPoints() {
    JSON.parse(pointsHistoryJson).forEach((p, i)=>{
        let h = document.getElementById("my-canvas").offsetHeight;
        let xClient = getClientX(parseFloat(p.x), h, parseInt(p.r));
        let yClient = getClientY(parseFloat(p.y), h, parseInt(p.r));
        let canvas = document.getElementById("my-canvas");
        let context = canvas.getContext("2d");
        context.beginPath();
        if(parseInt(getR()) != parseInt(p.r)){
            //context.strokeStyle = 'black';
            //context.fillStyle = 'black';
        }else{
            if(p.isIn){
                context.strokeStyle = 'green';
                context.fillStyle = 'green';
            }else{
                context.strokeStyle = 'red';
                context.fillStyle = 'red';
            }
        }


        context.arc(xClient, yClient, 1.5, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
    });
}
function redraw(){
    //let r = $("#R-select").val();
    let r = getR();
    document.getElementById("my-canvas").getContext("2d").clearRect(0, 0, 222, 222);
    JSON.parse(pointsHistoryJson).forEach((p, i)=>{
        let h = document.getElementById("my-canvas").offsetHeight;
        let xClient = getClientX(parseFloat(p.x), h, parseInt(r));
        let yClient = getClientY(parseFloat(p.y), h, parseInt(r));
        let canvas = document.getElementById("my-canvas");
        let context = canvas.getContext("2d");
        console.log("X= " + p.x + ", Y= " + p.y+ ", R=" + p.r +"\n");
        context.beginPath();
        if(parseInt(getR()) != parseInt(p.r)){
            context.strokeStyle = 'black';
            context.fillStyle = 'black';
        }else{
            if(p.isIn){
                context.strokeStyle = 'green';
                context.fillStyle = 'green';
            }else{
                context.strokeStyle = 'red';
                context.fillStyle = 'red';
            }
        }


        context.arc(xClient, yClient, 1.5, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
    });
}