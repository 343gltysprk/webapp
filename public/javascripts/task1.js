var tasklist=[];
var tasks=[];
var done = [];

(function get_tasks(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if (this.readyState ==4 && this.status == 200){
          tasks = JSON.parse(this.responseText);
    for (i=0;i<tasks.length;i++){
        get_people_on_task(tasks[i].id);
    }

    //resetvue();
   get_done();
      }else if (this.readyState ==4 && this.status == 401){
       window.location.pathname = "/index.html";
      }
  };
  xhttp.open("GET","/task",true);
  xhttp.send();
})();

function get_people_on_task(id){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if (this.readyState ==4 && this.status == 200){
         var out =JSON.parse(this.responseText);
         var list= "";
         for (j=0;j<out.length;j++){
             list = list + out[j].people + ";";
         }
        for (i=0;i<tasks.length;i++){
            if (tasks[i].id==id){
                tasks[i].people = list;
            }
        }
      }
  };
  xhttp.open("POST","/people_on_task",true);
  xhttp.setRequestHeader("Content-type", "application/json");
  var hi = {number:id};
  xhttp.send(JSON.stringify(hi));
}



function get_done(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if (this.readyState ==4 && this.status == 200 || this.status==304){
    done = JSON.parse(this.responseText);

    use_vue();
      }
  };
  xhttp.open("GET","/task_done",true);
  xhttp.send();
}


function use_vue(){
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
});}

var current_task=0;

function showtask(id){
    document.getElementById("main").style.display="none";
    document.getElementById("tt").style.display="none";
    document.getElementById("taskcontent").style.display="block";
    var title = document.getElementById("t1");
    var temp_task;
    for (i =0; i<tasks.length; i++){
        if (tasks[i].id==id){
            current_task=i;
            temp_task = tasks[i];
            break;
        }
    }
    var due = document.getElementById("t2");
    due.innerHTML = "Due:"+ temp_task.dueday;
    title.innerHTML =temp_task.title;
    var content = document.getElementById("t3");
    var tp=document.getElementById("ttype");
    tp.innerHTML= "Type:"+temp_task.type;
    content.innerHTML= temp_task.content;
    document.getElementById("to_do_only").style.display="block";
}

function back(){
    document.getElementById("taskcontent").style.display="none";
    document.getElementById("tt").style.display="block";
    document.getElementById("main").style.display="block";
}

function complete(){
    finish_task();
    done.push(tasks[current_task]);
    tasks.splice(current_task,1);
}

function s(){
        var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if (this.readyState ==4 && this.status == 200){
          tasks = JSON.parse(this.responseText);
    for (i=0;i<tasks.length;i++){
        get_people_on_task(tasks[i].id);
    }
    alert("Refreshed!");
    //resetvue();
   get_done();
      }
  };
  xhttp.open("GET","/task",true);
  xhttp.send();
}

function showdone(id){
    document.getElementById("main").style.display="none";
    document.getElementById("tt").style.display="none";
    document.getElementById("taskcontent").style.display="block";
    var title = document.getElementById("t1");
    var temp_task;
    for (i =0; i<done.length; i++){
        if (done[i].id==id){
            temp_task = done[i];
            break;
        }
    }
    var due = document.getElementById("t2");
    due.innerHTML = "Due:"+ temp_task.dueday;
    title.innerHTML =temp_task.title;
    var content = document.getElementById("t3");
    content.innerHTML= temp_task.content;
    var tp=document.getElementById("ttype");
    tp.innerHTML= "Type:"+temp_task.type;
    document.getElementById("to_do_only").style.display="none";
}

function finish_task(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if (this.readyState ==4 && this.status == 200){
        back();
      }
  };
  xhttp.open("POST","/task/finish",true);
  console.log(current_task);
  var sendobj = JSON.stringify(tasks[current_task]);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(sendobj);
}

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
    var taskPost= {
    title:"Null",
    dueday:"Null",
    people:[],
    content: "Null",
     type: "Null",
    id:0
};//initialize

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
        }
  };
  xhttp.open("GET","/user_list",true);
  xhttp.send();
}

function select_user(){
    for (i=0;i<userlist.length;i++){
        let name = document.createElement('input');
        name.value = userlist[i].username;
        name.type="checkbox";
        name.name = "people";
        let label = document.createElement('span');
        label.innerHTML = "     " + userlist[i].username;
        document.getElementById("people_work_on_it").appendChild(label);
        document.getElementById("people_work_on_it").appendChild(name);
    }
}

function signup() {
    getElementById("fm1").style.display="none";
    getElementById("fm11").style.display="block";
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