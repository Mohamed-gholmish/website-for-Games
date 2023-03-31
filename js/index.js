// ======== Global variables =========>
let inputs=document.querySelectorAll("input");
let form=document.querySelector("form");
let isValid=false;
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
// ======== Events =========>
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
        setExistUser()
    } else {
          validationEmail(inputs[0]) ||
          validationPassword(inputs[1]) 
    }
});

form.addEventListener("input", function () {
    if (
      validationEmail(inputs[0]) &&
      validationPassword(inputs[1])
    ) {
      isValid = true;
    } else {
      isValid = false;
    }
});
// ======== functions  =========>
function setExistUser(){
    const user={
        "email":inputs[0].value,
        "password":inputs[1].value  
    }
console.log(user);
loginForm(user);
}
async function loginForm(userData){
    const api= await fetch(`https://sticky-note-fe.vercel.app/signin`,{
        method:'POST',
        body:JSON.stringify(userData),
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'},
    });
    const response=await api.json();
    console.log(response)
   if(response.message=='success'){
    localStorage.setItem("uToken",response.token);
    location.href='../home.html';
   }
   else{
    document.getElementById("msg").innerHTML=response.message;
   }

}
// =========== validation Email=========>
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
// =========== validation password=========>
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