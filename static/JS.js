function Greeting() {   
    var time = new Date().getHours();
    let greeting;
    if (time < 12) {
        greeting = "Good morning";} 
    else if (time < 19) {
        greeting = "Good Day";} 
    else {
        greeting = "Good evening";}
    document.getElementById("greet").innerHTML = greeting;
    document.getElementById("Report").style.display = "none";
}

function StartEndShift() {
    var text;
    var style;
    var current = document.getElementById("startEnd__button");
    if(current.innerHTML == "Start New Shift"){
        text = "End This Shift";
        style = '#DF0024';}
    else{
        text = "Start New Shift";
        style = '#009F3D';}
    current.innerHTML = text;
    current.style.background = style;
}

function ShowHideReport() {
    var r = document.getElementById("Report");
    var rb = document.getElementById("ReportButton");
    if (r.style.display === "none") {
        rb.innerHTML = "Hide Report";
        r.style.display = "table";
        r.style.position = "center";} 
    else { 
        rb.innerHTML = "Show Report";
        r.style.display = "none";}
}

function validPassword() {
    var p = document.getElementById("newPassword").value;
    var pc = document.getElementById("passwordCheck"); 
    if(p.length<8) {  
        pc.innerHTML = "Password must contain 8 characters";  
         return false;}
    if(!p.match(/(?=.*\d)/g)) {  
        pc.innerHTML = "Password must contain numbers";  
        return false;}
    if(!p.match(/(?=.*[a-z])(?=.*[A-Z])/g)) {  
        pc.innerHTML = "Password must contain upper and lower case letters";  
        return false;}
    return true;
}