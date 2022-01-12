import "./index.css";

const submitHandler = (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const theForm = document.querySelector("form");
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error");
  errorDiv.id = "searchError";
  errorDiv.innerText = "Please enter a search term";
  errorDiv.style.display = "block";

  const errors = validateForm(formData);
 
  if (!document.querySelector(".error")) {
    theForm.appendChild(errorDiv);
  };

  const err = document.querySelector(".error");

  const searchTerm = document.getElementById("searchTerm").value;
  if (!searchTerm.replace(/\s/g, "")) {
    err.style.display = "block";
  } 
  else if (document.querySelector(".error") && searchTerm.replace(/\s/g, "")) {
    err.style.display = "none";
  }

  if (!Object.keys(errors).length) {
    // write code to perform search
    const articles = document.querySelectorAll("article");
    const headers = document.querySelectorAll("h2");
    for (let i = 0; i < articles.length; i++) {
      articles[i].classList.add("hidden");
      if (headers[i].innerHTML.includes(formData.get("searchTerm"))) {
        articles[i].classList.remove("hidden");
      }
    }
  }
};

const main = () => {
  const form = document.querySelector("#searchForm");

  form.addEventListener("submit", submitHandler);
};

window.addEventListener("DOMContentLoaded", main);

function validateExists(value) {
  return value && value.trim();
}

function validateForm(formData) {
  const error = {};

  if (!validateExists(formData.get("searchTerm"))) {
    error.message = "Please enter a search term";
  }

  return error;
}
