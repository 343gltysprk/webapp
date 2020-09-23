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

    var taskPost= {
    title:"Null",
    dueday:"Null",
    people:[],
    content: "Null",
     type: "Null",
    id:0
};


function submitPost(){

    console.log("Submit Post");

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 2 && this.status == 200) {
             sendemail();
            alert("Success");

            window.location.pathname = "/dashboard.html";

        }};
    var rand = Math.random();
//initialize

    taskPost.title= document.getElementById('postTitle').value;
    taskPost.content=document.getElementById('postBody').value;
    taskPost.dueday=document.getElementById('due').value;
    taskPost.type=document.getElementById('worktype').value;
    taskPost.people=document.getElementById('people_work_on_it').value;
    taskPost.people = new Array();
    var selected = document.querySelectorAll("input[name='people']");
    for (i =0;i<selected.length;i++){
        if (selected[i].checked){

           taskPost.people.push(selected[i].value);
        }
        }


    xhttp.open("POST", "/newPost",true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(taskPost));

}

var userlist =[];
function get_user_list() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if (this.readyState ==4 && this.status == 200){
        userlist = JSON.parse(this.responseText);
        //console.log(userlist);
        select_user();
        }else if (this.readyState ==4 && this.status == 401){
            document.getElementById("vuemain").innerHTML = "Unauthorized, redirecting...";
            window.location.pathname = "/dashboard.html";
        }
  };
  xhttp.open("GET","/user_list",true);
  xhttp.send();
}

function select_user(){
    document.getElementById("people_work_on_it").innerHTML = "";
    var color = document.getElementById("worktype").value;
    for (i=0;i<userlist.length;i++){
        let name = document.createElement('input');
        name.value = userlist[i].username;
        name.type="checkbox";
        name.name = "people";
        let label = document.createElement('span');
        if (userlist[i].preference==color){label.style.color="green";
        label.innerHTML = "     " + userlist[i].username + "(👍)";
        }else {label.style.color="black";
            label.innerHTML = "     " + userlist[i].username;
        }
        document.getElementById("people_work_on_it").appendChild(label);
        document.getElementById("people_work_on_it").appendChild(name);
    }
}







function signup() {
    getElementById("fm1").style.display="none";
    getElementById("fm11").style.display="block";
}

function test(){
      var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if (this.readyState ==4 && this.status == 200){
        alert("Email sent");
      }else {alert("Failed to send email");}
  };
  xhttp.open("POST","/email",true);
  xhttp.setRequestHeader("Content-type", "application/json");
  var em = {title:"Test"};
  em.content = "test";
  em.address= document.getElementById("e1").innerHTML;

  xhttp.send(JSON.stringify(em));
}

function sendemail(){
      var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if (this.readyState ==4 && this.status == 200){
        console.log("Email sent");
      }
  };
  xhttp.open("POST","/email",true);
  xhttp.setRequestHeader("Content-type", "application/json");
  var em = {title:document.getElementById('postTitle').value};
  em.content = document.getElementById('postBody').value;
  em.address = "";
    for (let i=0;i<userlist.length;i++){
        for (let j=0;j<taskPost.people.length;j++){
            if (taskPost.people[j]==userlist[i].username){
                if (em.address==""){em.address =  userlist[i].email;}else{
                em.address = em.address + ', ' +  userlist[i].email;}
            }
        }
    }


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