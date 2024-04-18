
document.getElementById("registration").addEventListener("submit",function(event){
    event.preventDefault();
    if(checkExist(document.getElementById("email").value)){
        alert("Email Registred");
    }
    else if(document.getElementById("password").value!==document.getElementById("confirmed").value){
        alert("Password should be Confirmed Correctly")
    }
    else{
    var info={
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        password:document.getElementById("password").value
    }
    var data=JSON.stringify(info);
    localStorage.setItem("UID"+Math.random(),data);
    alert("Registration Succesful")
    window.location.replace("login.html")
    }
})

document.getElementById("login").addEventListener("submit",function(event){
    event.preventDefault();
    if(auth(document.getElementById("email").value,document.getElementById("password").value)){
    window.location.replace("../main/index.html")
    }
    else{
        alert("Email or password false")
    }
});

function checkExist(searched){
    for(var i=0;i<localStorage.length;i++){
        var key =localStorage.key(i);
       var obj=JSON.parse(localStorage.getItem(key));
        if(Object.values(obj).includes(searched)){
            return true;
        }
    }
    return false;

}
function auth(email,password){
    for(var i=0;i<localStorage.length;i++){
        var key =localStorage.key(i);
       var obj=JSON.parse(localStorage.getItem(key));
        if((Object.values(obj).includes(email))&&(Object.values(obj).includes(password))){
            return true;
        }
    }
    return false;

}
