// ========= global variables=======>
const inputs = document.querySelectorAll("input");
const btnRegister = document.querySelector("#btnRegister");
const form = document.querySelector("form");
let isValid = false;
const mode = document.getElementById("mode");
const themeData = localStorage.getItem("theme");
// ========== When Start============>
if (themeData !==null){
  if(themeData==="light"){
      mode.classList.replace("fa-moon","fa-sun");
  }
  else{
      mode.classList.replace("fa-sun","fa-moon");
  }
  document.querySelector("html").setAttribute("data-theme",themeData);
}

// ========== Events===========>
mode.addEventListener("click",function(e){
  if (mode.classList.contains("fa-sun")){
      document.querySelector("html").setAttribute("data-theme","light");
      mode.classList.replace("fa-sun","fa-moon")

      localStorage.setItem("theme","light");
  }
  else if (mode.classList.contains("fa-moon")){
      document.querySelector("html").setAttribute("data-theme","dark");
      mode.classList.replace("fa-moon","fa-sun")

      localStorage.setItem("theme","dark");
  }

})

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  if (isValid) {
    setUser();
  } else {
  
        validationName(inputs[0]) ||
        validationName(inputs[1]) ||
        validationEmail(inputs[2]) ||
        validationPassword(inputs[3]) ||
        validationAge(inputs[4])
  
  }
});

// ============= set form =========>
function setUser() {
  const user = {
    first_name: inputs[0].value,
    last_name: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
    age: inputs[4].value,
  };
  console.log(user);
  registerForm(user);
}

// =========== function======>
async function registerForm(userData) {
  const api = await fetch(`https://sticky-note-fe.vercel.app/signup`, {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();
  console.log(response);
  if (response.message === "success") {
    location.href = "./index.html";
  } else {
    document.getElementById("msg").innerHTML = response.errors?.email.message;
  }
}

// ============ validation =====>
form.addEventListener("input", function () {
  if (
    validationName(inputs[0]) &&
    validationName(inputs[1]) &&
    validationEmail(inputs[2]) &&
    validationPassword(inputs[3]) &&
    validationAge(inputs[4])
  ) {
    console.log("tmm");
    isValid = true;
  } else {
    isValid = false;
  }
});

// ============= name  =========>
function validationName(input) {
  const regex =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}
// ========== email ========>

function validationEmail(input) {
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}
// ========== password =========>
function validationPassword(input) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}
// ============ age ===============>
function validationAge(input) {
  const regex = /^([1-7][0-9]|80)$/;
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}
