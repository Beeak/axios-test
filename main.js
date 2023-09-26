import axios from "axios";
import { gsap } from "gsap";

var tl = gsap.timeline({ repeat: -1 });
tl.to("h1", 30, { backgroundPosition: "-960px 0" });

axios.defaults.baseURL = "https://random-data-api.com/api/v2";
axios.defaults.headers.post["Content-Type"] = "application/json";

function typeWriterEffect(text, element, delay) {
  let index = 0;

  function type() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, delay);
    }
  }

  type();
}

function fetchData() {
  axios({
    method: "get",
    url: "/beers",
  })
    .then((res) => {
      const data =
        typeof res.data === "object" ? JSON.stringify(res.data) : res.data;
      const resultsElement = document.getElementById("results");
      resultsElement.innerHTML = "";
      typeWriterEffect(data, resultsElement, 50);
    })
    .catch((err) => console.log(err));
}

document.getElementById("get").onclick = fetchData;
