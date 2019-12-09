const A = 305;
const R = 110;

$(document).ready(function() {
    $("img").on("click", function(event) {
        let h = document.getElementById("gr").offsetHeight;
        let w = document.getElementById("gr").offsetWidth;
        let x = event.pageX - this.offsetLeft;
        let y = event.pageY - this.offsetTop;
        let r = document.getElementById("R-select").value;

        let x_server = getServerX(x,h,r);
        let y_server = getServerY(y,h,r);
        console.log(x_server+" "+y_server+" "+r);
        $.post(
            jcp+"/controller",
            {
                x:x_server,
                y:y_server,
                r:r
            },
            function (data, textStatus, jqXHR) {
                let result_block = document.getElementById("xyi");
                result_block.innerHTML +="";
            });

        console.log("x:"+x+"  y:"+y+"\nh:"+h+"  w:"+w);
    });
 });
function getServerX(x, a, r){
    let x_server = (A/a)*((x-0.5*a)/(R/r));
    x_server = x_server.toFixed(4);
    return x_server;
}
function getServerY(y, a, r){
    let y_server = -(A/a)*((y-0.5*a)/(R/r));
    y_server = y_server.toFixed(4);
    return y_server;
}