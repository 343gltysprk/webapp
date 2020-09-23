var tasks=[];
var done = [];


var vueinst = new Vue({

    el: '#vuemain',
    data: {

      text: 'Pretty good.',
      showad:true,
      nightmode:false,
      tcard:tasks,
      tlink:done,
      topmenu:[{ title:'Dashboard', url:'/dashboard.html', submenus: []},
{ title:'Setting', url:'/user_setting.html',

},
{ title:'Post Tasks',   url:'/posttask.html',

}],
      ctext: 'type your comment here',
      carr: [],
}
});


var the_user;
function get_user_info(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if (this.readyState ==4 && this.status == 200){
        the_user = JSON.parse(this.responseText);
        //console.log(the_user);
        document.getElementById("u1").innerHTML=the_user[0].username;
        document.getElementById("e1").innerHTML=the_user[0].email;
        document.getElementById("e3").innerHTML=the_user[0].email;
        document.getElementById("p1").innerHTML=the_user[0].phone;
        document.getElementById("pre1").innerHTML=the_user[0].preference;
        if (the_user[0].availability==1){
        document.getElementById("a1").innerHTML= "Yes";}
        else {document.getElementById("a1").innerHTML= "No";}
        } else if (this.readyState ==4 && this.status == 401){
            window.location.pathname = "/index.html";
        }
  };
  xhttp.open("GET","/the_user",true);
  xhttp.send();
}

function edit(){
    document.getElementById("info").style.display="none";
    document.getElementById("edit_info").style.display="block";
    document.getElementById("uname").innerHTML=the_user[0].username;
    document.getElementById("e2").value=the_user[0].email;
    document.getElementById("p2").value=the_user[0].phone;
    document.getElementById("true").checked=true;
    document.getElementById("type1").checked=true;
}

function edit_cancel(){
    document.getElementById("info").style.display="block";
    document.getElementById("edit_info").style.display="none";
}


function test(){
      var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if (this.readyState ==4 && this.status == 200){
        alert("Email sent");
      }
  };
  xhttp.open("POST","/email",true);
  xhttp.setRequestHeader("Content-type", "application/json");
  var em = {title:"Test"};
  em.content = "test";
  em.address= document.getElementById("e1").innerHTML;

  xhttp.send(JSON.stringify(em));
}


function logout(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 2 && this.status == 200) {

            // Logout Successful, redirect to home
            window.location.pathname = "/";

        }
    };

    xhttp.open("POST", "/logout", true);
    xhttp.send();
}