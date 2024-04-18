document.getElementById("registration").addEventListener("submit",function(event){
    event.preventDefault();
    var info={
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        password:document.getElementById("confirmed").value
    }
    var data=JSON.stringify(info);
    localStorage.setItem("UID"+Math.random(),data);
    alert("Registration Succesful")
    window.location.replace("login.html")
})