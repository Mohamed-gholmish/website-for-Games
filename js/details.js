// ============ Global ==========>
const search = location.search;
const params = new URLSearchParams(search);
const id = params.get("id");
let detailsData;
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

// ============ Events ==========>
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

// ============ function ==========>
( async function (){
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '620a167456mshdfb6e2440b7333ap12704cjsnf0a180a0a8a6',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

    const api= await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,options)
    const response= await api.json();
    detailsData = response;
    console.log(response);
    displayData();
})();


function displayData(){
    const detailsBox=`<div class="col-md-4">
    <figure>
      <img src=${detailsData.thumbnail} alt="" class="w-100" />
    </figure>
  </div>
  <div class="col-md-8">
    <nav>
      <ul class="list-unstyled fs-4 d-flex ">
        <li class="text-reset  mx-3 ">
          <a href="../home.html" >Home</a>
        </li>
        <li class="  text-info slash ms-5 mb-4">${detailsData.title}</li>
      </ul>
    </nav>
    <div class="details">
      <h1>${detailsData.title}</h1>
      <h3 class=" my-4">About ${detailsData.title}</h3>
    <p class=" lead">${detailsData.description}</p>
    </div>
  </div>`;


  document.getElementById("detailsData").innerHTML=detailsBox;

  const backgroundImage = detailsData.thumbnail.replace("thumbnail","background");
  document.body.style.cssText = `
  background-image:url('${backgroundImage}');
  background-position:center;
  background-size:cover;
  `
}


