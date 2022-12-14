function ShowHideReport() {
    var r = document.getElementById("Report");
    var rb = document.getElementById("ReportButton");
    if (rb.innerHTML == "Show Report") {
        rb.innerHTML = "Hide Report";
        r.style.display = "table";
        r.style.position = "center";} 
    else { 
        rb.innerHTML = "Show Report";
        r.style.display = "none";}
}

function validation() {
    var fName = document.getElementById("fName").value;
    var lName = document.getElementById("lName").value;
    var mail = document.getElementById("mail").value;
    var u = document.getElementById("newUsername").value;
    var p = document.getElementById("newPassword").value;
    var massage = document.getElementById("massage"); 
    if(!fName.match(/^[a-zA-Z]*$/)) { 
        massage.innerHTML = "*Invalid first name, please type again in English only";  
        return false;} 
    if(!lName.match(/^[a-zA-Z]*$/) && !lName.match(/^[a-zA-Z]+ [a-zA-Z]+$/) && !lName.match(/^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/)) { 
        massage.innerHTML = "*Invalid last name, please type again in English only";  
        return false;}
    if(fName.length < 2) {  
        massage.innerHTML = "*First name too short";  
        return false;}
    if(fName.length > 15) {  
        massage.innerHTML = "*First name too long";  
        return false;}
    if(lName.length < 2) {  
        massage.innerHTML = "*Last name too short";  
        return false;}
    if(!mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        massage.innerHTML = "*Invalid email address"
        return false;}
    if(u.length < 4) {  
        massage.innerHTML = "*Username must contain minimum 4 characters";  
        return false;}
    if(p.length < 8) {  
        massage.innerHTML = "*Password must contain 8 characters";  
        return false;}
    if(!p.match(/(?=.*\d)/g)) {  
        massage.innerHTML = "*Password must contain numbers";  
        return false;}
    if(!p.match(/(?=.*[a-z])(?=.*[A-Z])/g)) {  
        massage.innerHTML = "*Password must contain upper and lower case letters";  
        return false;}
    if(!p.match(/^[a-zA-Z0-9]*$/)) {  
        massage.innerHTML = "*Password must contain only digits & English letters";  
        return false;}
    return true;
}

function UpdateValidation() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var p = document.getElementById("updatedPassword").value;
    var massage = document.getElementById("updatemassage");
    massage.style.color = "red"; 
    if(!firstName.match(/^[a-zA-Z]*$/)) { 
        massage.innerHTML = "*Invalid first name, please type again in English only";  
        return false;} 
    if(firstName.length < 2) {  
        massage.innerHTML = "*First name too short";  
        return false;}
    if(firstName.length > 15) {  
        massage.innerHTML = "*First name too long";  
        return false;}
    if(!lastName.match(/^[a-zA-Z]*$/) && !lastName.match(/^[a-zA-Z]+ [a-zA-Z]+$/) && !lastName.match(/^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/)) { 
        massage.innerHTML = "*Invalid last name, please type again in English only";  
        return false;}
    if(lastName.length < 2) {  
        massage.innerHTML = "*Last name too short";  
        return false;}
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        massage.innerHTML = "*Invalid email address"
        return false;}
    if(p.length < 8) {  
        massage.innerHTML = "*Password must contain 8 characters";  
        return false;}
    if(!p.match(/(?=.*\d)/g)) {  
        massage.innerHTML = "*Password must contain numbers";  
        return false;}
    if(!p.match(/(?=.*[a-z])(?=.*[A-Z])/g)) {  
        massage.innerHTML = "*Password must contain upper and lower case letters";  
        return false;}
    if(!p.match(/^[a-zA-Z0-9]*$/)) {  
        massage.innerHTML = "*Password must contain only digits & English letters";  
        return false;}
    return true;
}

function toDelete(){
    let text = "To delete this user and all his history click 'OK'; otherwise, click 'CANCEL'";
    if (confirm(text)) {
        return true;
    }
    return false;
}