let url =
  "https://api.openweathermap.org/data/2.5/weather?q=spain&appid=f4ee0b9267188d89b26a09249eb02360";
let datosClima = document.querySelector(".cuerpo");
let cuadro = document.querySelector("#name");
let boton = document.querySelector("#btn");
let form = document.querySelector("#getWeather");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cuadro.value === "") {
    showError("Campo obligatorio...");
    return;
  }
  callApi(cuadro.value);
});

async function callApi(city) {
  const apiId = "f4ee0b9267188d89b26a09249eb02360";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod == "404") {
    showError("ciudad no encontrada...");
  } else {
    clear();
    showWeather(data);
  }
  console.log(data);
}

function showWeather(data) {
  const {
    main: { temp },
    weather: [arr],
    name,
    wind: { speed },
  } = data;

  const degrees = transition(temp); //IMPORTANT

  const content = document.createElement("div");
  content.classList.add("datos");
  content.innerHTML = `
<h2>${degrees}·</h2>
<p>${arr.description}</p>
<img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
<h2>${name}</h2>
<p>${speed}</p>
`;
  //

  datosClima.appendChild(content);

  // console.log(temp);
  // console.log(arra.description);
  // console.log(arr.icon);
  // console.log(name);
  // console.log(wind.speed);
}

function showError(message) {
  const alert = document.createElement("p");
  alert.classList.add("alert");
  alert.innerHTML = message;

  form.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 2000);
}

function transition(temp) {
  return parseInt(temp - 273.15);
}

function clear() {
  datosClima.innerHTML = ``;
}
