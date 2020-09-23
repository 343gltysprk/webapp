function signup() {
    document.getElementById("login").style.display="none";
    document.getElementById("fm11").style.display="block";
}

function edit_cancel(){
    document.getElementById("login").style.display="block";
    document.getElementById("fm11").style.display="none";
}

function login(){


    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 2 && this.status == 200) {
            window.location.pathname = "/dashboard.html";

        } else if (this.readyState == 2 && this.status >= 400) {

            // Login Failed
            alert("Login Failed");

        }
    };

    var credentials = { username:document.getElementById("username").value,
                        password:document.getElementById("password").value  };
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(credentials));

}

function sign(){


    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 2 && this.status == 200) {
            alert("Sign up success");
            edit_cancel();

        } else if (this.readyState == 2 && this.status >= 400) {

            // Login Failed
            alert("Signup Failed, because username is taken or not enough infomation provided");

        }
    };

    var credentials = { username:document.getElementById("u2").value,
                        email: document.getElementById("e2").value,
                        phone: document.getElementById("p2").value,
                        password:document.getElementById("pass1").value,
                        character: document.getElementById("role").value};
    xhttp.open("POST", "/signup", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(credentials));

}



function onSignIn(googleUser){
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 2 && this.status == 200) {
            window.location.pathname = "/dashboard.html";

        } else if (this.readyState == 2 && this.status >= 400) {

            // Login Failed
            alert("Login Failed");

        }
    };
    profile.id_token = id_token;
    profile.email = profile.getEmail();

    xhttp.open("POST", "/glogin", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(profile));

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
  }