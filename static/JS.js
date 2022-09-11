function StartEndShift(){
    if(document.getElementById("start__button").innerHTML == "Start New Shift"){
        document.getElementById("start__button").innerHTML = "End This Shift";
        document.getElementById("start__button").style.background = '#DF0024';    
    }
    else{
        document.getElementById("start__button").innerHTML = "Start New Shift";
        document.getElementById("start__button").style.background = '#009F3D';    
    }
}

function showtable1() {
    var x = document.getElementById("Report");
    if (x.style.display === "none") {
        document.getElementById("ReportButton").innerHTML = "Hide Report";
        x.style.display = "table";
        x.style.position = "center";
    } else {
        x.style.display = "none";
        document.getElementById("ReportButton").innerHTML = "Show Report";
    }
}

function validPassword()
{
    var p = document.getElementById("newPassword").value; 
    if(!p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {  
         document.getElementById("passwordCheck").innerHTML = "Password must contain 8 characters, numbers, upper and lower case letters";  
         return false;
    }
    return true;
}