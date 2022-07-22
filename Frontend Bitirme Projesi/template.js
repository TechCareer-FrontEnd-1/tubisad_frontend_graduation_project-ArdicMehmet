
// $("a[href='#back_top']").click(function () {
//   $("html, body").animate({ scrollTop: 0 }, "slow");
//   return false;
// });
$(document).ready(function () {

  setInterval(getDate, 1000);

})
function getDate() {
  let currentdate = new Date();

  let date = currentdate.getDate() > 9 ? currentdate.getDate() : "0" + currentdate.getDate()
  let month = currentdate.getMonth() + 1 > 9 ? currentdate.getMonth() + 1 : "0" + (currentdate.getMonth() + 1)
  let year = currentdate.getFullYear()
  let hours = currentdate.getHours() > 9 ? currentdate.getHours() : "0" + currentdate.getHours()
  let minutes = currentdate.getMinutes() > 9 ? currentdate.getMinutes() : "0" + currentdate.getMinutes()
  let seconds = currentdate.getSeconds() > 9 ? currentdate.getSeconds() : "0" + currentdate.getSeconds()

  let datetime = date + "/"
    + month + "/"
    + year + "  "
    + hours + ":"
    + minutes + ":"
    + seconds;

  $("#date_id").text(datetime);

}

$("a[href='#back_top']").click(function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

$(window).scroll(function (event) {
  var scroll = $(window).scrollTop();
  if (scroll == 0) {
    $("#back_top").hide();
  }
  if (scroll > 0) {
    $("#back_top").show();
  }
});
$(function () {
  var data = ["Alias", "Boston Celtics", "Chicago Bulls", "Miami Heat", "Orlando Magic", "Atlanta Hawks", "Philadelphia Sixers", "New York Knicks", "Indiana Pacers", "Charlotte Bobcats", "Milwaukee Bucks", "Detroit Pistons", "New Jersey Nets", "Toronto Raptors", "Washington Wizards", "Cleveland Cavaliers"];
  $("#find").autocomplete({ source: data });
});

//regex email
function regexEmail(email) {
  let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

//regex password
function regexPassword(password) {
  let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return regex.test(password);
}

let userArray = [
  {
    firstName: "mehmet",
    lastName: "ardıç",
    userName: "mehmet1726",
    email: "mehmetardic1726@gmail.com",
    password: "Mehmet*9"
  },
  {
    firstName: "mehmet",
    lastName: "ardıç",
    userName: "ardicmehmet96",
    email: "ardicmehmet96@gmail.com",
    password: "ardic/2"
  }
]



/* login value and validation*/
$(function () {



  $("#loginForm").on('submit', function () {
    for (user of userArray) {
      console.log(user);
    }
    let email, password;
    email = jQuery.trim($("#loginEmail").val());
    password = jQuery.trim($("#loginPassword").val());


    //validation  email
    if (email == "") {
      $("#login_validation_email").html("Email boş geçilemez...")
      return false;
    } else if (regexEmail(email) == false) {
      $("#login_validation_email").html("Uygun formatta email girilmedi exam: deneme@gmail.com")
      return false;
    }
    //validation  password
    if (password == "") {
      $("#login_validation_password").html("password boş geçilemez...")
      return false;
    }

    for (user of userArray) {
      if (user.email === email) {
        if (user.password === password) {
          alert("Login successfully");
          return true;
        }
      }
    }
    $("#login-validation-general").html("Email or Password is wrong!");
    return false;



  })//login close


  // Register start
  $("#registerForm").on('submit', function () {

    let email, password, retryPassword, firstName, lastName, userName;

    email = jQuery.trim($("#registerEmail").val());
    userName = jQuery.trim($("#registerUserName").val());
    firstName = jQuery.trim($("#firstName").val());
    lastName = jQuery.trim($("#lastName").val());
    password = jQuery.trim($("#registerPassword").val());
    retryPassword = jQuery.trim($("#registerRetryPassword").val());


    //validation  email
    if (!regexEmail(email)) {
      $("#register_validation_email").html("Uygun formatta email girilmedi exam: deneme@gmail.com")
      return false;
    }

    //validation  password
    if (!regexPassword(password)) {
      $("#register_validation_general").html("Uygun formatta  şifre girilmedi exam: en az 8 karakter")
      return false;
    }

    if (password !== retryPassword) {
      $("#register_validation_general").html("Şifreler uyuşmuyor, lütfen kontrol edin!")
      return false;
    }
    for (user of userArray) {
      if (user.userName === userName) {
        $("#register_validation_general").html("Bu username sistemde kayıtlı");
        return false;
      }
      if (user.email === email) {
        $("#register_validation_general").html("Bu email sistemde kayıtlı");
        return false;
      }

    }
    let obj = {
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      email: this.email,
      password: this.password
    }
    userArray.push(obj)
    console.log("Kayıt başarılı");
    return true;


  })
  // Register end



}) //document ready close
let dateStatus = 0;
$("#dateBtn").click(function () {
  dateStatus++;
  if (dateStatus % 2 == 1) {
    $("#date_id").hide();
    $("#dateBtn").css("background-color", "green");
    $("#dateBtn").attr('value', 'Show');
  } else {
    $("#date_id").show();
    $("#dateBtn").css("background-color", "red");
    $("#dateBtn").attr('value', 'Hide');
  }
})

/* TODO LIST*/

const addTodoHtml = (todo) => {
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  let todoLeft = document.createElement("div");
  todoLeft.classList.add("todo_left");

  let todoCheckbox = document.createElement("input");
  todoCheckbox.type = "checkbox";
  todoCheckbox.checked = todo.isComplated;
  todoCheckbox.classList.add("todo_cb");

  let todoText = document.createElement("span");
  todoText.classList.add("todo_text");
  todoText.textContent = todo.text;

  todoLeft.appendChild(todoCheckbox);
  todoLeft.appendChild(todoText);


  let todoRight = document.createElement("div");
  todoRight.classList.add("todo_right");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("todo_delete");
  deleteBtn.textContent = "Delete"

  todoRight.appendChild(deleteBtn);



  todoDiv.appendChild(todoLeft);
  todoDiv.appendChild(todoRight);

  todo_container.appendChild(todoDiv);
}



const todoForm = document.querySelector(".todo_form");
const todoInput = document.querySelector(".todo_input");
const todo_container = document.querySelector(".todo_container");
let todo_delete_btns;
let todo_checkboxes;

const deleteTodo = (e) => {
  const todoItem = e.target.parentElement.parentElement;
  const text = todoItem.firstChild.children[1].textContent;
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter(td => td.text != text);
  localStorage.setItem("todos", JSON.stringify(todos));
  todoItem.remove();
}
const complatedTodo = (e) => {
  const todoItem = e.target.parentElement.parentElement;
  const text = todoItem.firstChild.children[1].textContent;
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach(td => {
    if (td.text === text) {
      td.isComplated = !td.isComplated;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));

}




const storageConfigure = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos) {
    localStorage.setItem("todos", JSON.stringify([]));
  }
  else {
    for (todo of todos) {
      addTodoHtml(todo);
    }
    todo_delete_btns = document.querySelectorAll(".todo_delete");
    todo_delete_btns.forEach(btn => btn.addEventListener("click", deleteTodo));
    todo_checkboxes = document.querySelectorAll(".todo_cb");
    todo_checkboxes.forEach(checkBtn => checkBtn.addEventListener("click", complatedTodo));
  }
}
storageConfigure();

const addTodo = (e) => {
  e.preventDefault();
  inputVal = todoInput.value;

  const todo = {
    text: inputVal,
    isComplated: false
  }

  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  addTodoHtml(todo);
  todo_delete_btns = document.querySelectorAll(".todo_delete");
  todoForm.reset();
  todo_delete_btns.forEach(btn => btn.addEventListener("click", deleteTodo));
  todo_todo_checkboxes = document.querySelectorAll(".todo_cb");
  todo_todo_checkboxes.forEach(checkBtn => checkBtn.addEventListener("click", complatedTodo));
}
todoForm.addEventListener("submit", addTodo);





