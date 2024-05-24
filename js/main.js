const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  // Очищаем предыдущие фильмы
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
          <div class="movie__cover-inner">
          <img
            src="${movie.posterUrlPreview}"
            class="movie__cover"
            alt="${movie.nameRu}"
          />
          <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
          <div class="movie__title">${movie.nameRu}</div>
          <div class="movie__category">${movie.genres.map(
            (genre) => genre.genre
          )}</div>
          ${
            movie.rating &&
            `
          <div class="movie__average movie__average--${getClassByRate(
            movie.rating
          )}">${movie.rating}</div>
          `
          }
        </div>
          `;
    movieEl.addEventListener("click", () => openModal(movie.filmId)); // Добавлен обработчик события для открытия модального окна
    moviesEl.appendChild(movieEl);
  });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});

// Modal
const modalEl = document.querySelector(".modal");

async function openModal(id) {
  const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();

  modalEl.classList.add("modal--show");
  document.body.classList.add("stop-scrolling");

  modalEl.innerHTML = `
    <div class="modal__card">
      <img class="modal__movie-backdrop" src="${respData.posterUrl}" alt="">
      <h2>
        <span class="modal__movie-title">${respData.nameRu}</span>
        <span class="modal__movie-release-year"> - ${respData.year}</span>
      </h2>
      <ul class="modal__movie-info">
        <div class="loader"></div>
        <li class="modal__movie-genre">Жанр - ${respData.genres.map(
          (el) => el.genre
        )}</li>
        ${
          respData.filmLength
            ? `<li class="modal__movie-runtime">Время - ${respData.filmLength} минут</li>`
            : ""
        }
        <li >Сайт: <a class="modal__movie-site" href="${respData.webUrl}">${
    respData.webUrl
  }</a></li>
        <li class="modal__movie-overview">Описание - ${
          respData.description
        }</li>
      </ul>
      <button type="button" class="modal__button-close">Закрыть</button>
    </div>
  `;
  const btnClose = document.querySelector(".modal__button-close");
  btnClose.addEventListener("click", () => closeModal());
}

function closeModal() {
  modalEl.classList.remove("modal--show");
  document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
});

//

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}

async function main() {
  const postsData = await getData();
  let currentPage = 1;
  let rows = 10;

  function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector(".posts");
    postsEl.innerHTML = "";
    page--;

    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach((el) => {
      const postEl = document.createElement("div");
      postEl.classList.add("post");
      postEl.innerText = `${el.title}`;
      postsEl.appendChild(postEl);
    });
  }

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector(".pagination");
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add("pagination__list");

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
  }

  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add("pagination__item");
    liEl.innerText = page;

    if (currentPage == page) liEl.classList.add("pagination__item--active");

    liEl.addEventListener("click", () => {
      currentPage = page;
      displayList(postsData, rows, currentPage);

      let currentItemLi = document.querySelector("li.pagination__item--active");
      currentItemLi.classList.remove("pagination__item--active");

      liEl.classList.add("pagination__item--active");
    });

    return liEl;
  }

  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
}

main();

// Обработчики отправки формы для входа и регистрации
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  // Добавьте код для отправки запроса на сервер для авторизации
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  // Добавьте код для отправки запроса на сервер для регистрации нового пользователя
});

// Расширенный функционал поиска
const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchQuery = document.getElementById("search-input").value;
  // Добавьте код для отправки запроса на сервер для поиска фильмов по запросу
});

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}

async function main() {
  const postsData = await getData();
  let currentPage = 1;
  let rows = 10;

  function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector(".posts");
    postsEl.innerHTML = "";
    page--;

    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach((el) => {
      const postEl = document.createElement("div");
      postEl.classList.add("post");
      postEl.innerText = `${el.title}`;
      postsEl.appendChild(postEl);
    });
  }

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector(".pagination");
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add("pagination__list");

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
  }

  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add("pagination__item");
    liEl.innerText = page;

    if (currentPage == page) liEl.classList.add("pagination__item--active");

    liEl.addEventListener("click", () => {
      currentPage = page;
      displayList(postsData, rows, currentPage);

      let currentItemLi = document.querySelector("li.pagination__item--active");
      currentItemLi.classList.remove("pagination__item--active");

      liEl.classList.add("pagination__item--active");
    });

    return liEl;
  }

  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
}

main();

// CRUD START

const API = "  http://localhost:8000/todo";
let inpname = document.querySelector("#inpName");
let inpAuthor = document.querySelector("#inpAuthor");
let inpImg = document.querySelector("#inpImg");
let inpPrice = document.querySelector("#inpPrice");
let btnAdd = document.querySelector("#btnAdd");
let sectionBooks = document.querySelector(".sectionBooks");
let collapseThree = document.querySelector("#collapseThree");
const inpSearch = document.querySelector("#inpSearch");
let searchvalue = "";
let prevBtn = document.querySelector("#prevBtn");
let nextBtn = document.querySelector("#nextBtn");
let countPage = "";
let currentpage = "";





//!===========CREATE=============
btnAdd.addEventListener("click", () => {
  if (
    !inpname.value.trim() ||
    !inpAuthor.value.trim() ||
    !inpPrice.value.trim() ||
    !inpImg.value.trim()
  ) {
    alert("Введите данные");
    return;
  }
  let newBook = {
    bookName: inpname.value,
    bookAuthor: inpAuthor.value,
    bookImg: inpImg.value,
    bookPrice: inpPrice.value,
  };
  createBook(newBook);
  readBooks();
  inpname.value = "";
  inpAuthor.value = "";
  inpPrice.value = "";
  inpImg.value = "";
  collapseThree.classList.toggle("show");
});

// createBook(newBook){
//     collapseThree.classList.toggle('show')
// }

function createBook(book) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(book),
  });
}

//!==========READ==========

async function readBooks() {
  let res = await fetch(
    `${API}?q=${searchvalue}&_page=${currentpage}&_limit=3`
  );
  let data = await res.json();
  sectionBooks.innerHTML = "";
  data.forEach((elem) => {
    sectionBooks.innerHTML += `
        <div class="card cardBook m-4" style="width: 15rem;">
    <img style="height:300px" src="${elem.bookImg}" alt="${elem.bookName}">
    <div class="card-body">
        <h5 class="card-title">${elem.bookName}</h5>
        <p class="card-text">${elem.bookAuthor}</p>
        <span>${elem.bookPrice}</span>
        <button id="${elem.id}" class="btn btn-danger btnDelete" type="button">Удалить</button>
        <button data-bs-toggle="modal" data-bs-target="#exampleModal" id="${elem.id}" type="button" class="btn btn-info btnEdit " >Редактировать</button>
    </div>
 </div>
        `;
  });
  pageFunc();
}
readBooks();
//e-это обьект
//! readbooks - функция делает гет запрос,так как он делает запрос,а это долго.По этому мы ему делаем async функцию.Что-бы когда клиент заходил на наш сайт,то не тормозил,и долго не грузил.Он мешает(останавливает) другиим.
//! ================= DELETE =============

document.addEventListener("click", (e) => {
  const del_class = [...e.target.classList];
  let id = e.target.id;
  if (del_class.includes("btnDelete")) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then((res) => readBooks());
  }
});

//!
let inpEditname = document.querySelector("#inpEditName");
let inpEditAuthor = document.querySelector("#inpEditAuthor");
let inpEditImg = document.querySelector("#inpEditImg");
let inpEditPrice = document.querySelector("#inpEditPrice");
let btnEditSave = document.querySelector("#btnEditSave");
document.addEventListener("click", (e) => {
  let Edit_class = [...e.target.classList];
  let id = e.target.id;
  if (Edit_class.includes("btnEdit")) {
    fetch(`${API}/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        inpEditname.value = data.bookName;
        inpEditAuthor.value = data.bookAuthor;
        inpEditImg.value = data.bookImg;
        inpEditPrice.value = data.bookPrice;
        btnEditSave.setAttribute("id", data.id);
      });
  }
});

btnEditSave.addEventListener("click", () => {
  if (
    !inpEditname.value.trim() ||
    !inpEditAuthor.value.trim() ||
    !inpEditImg.value.trim() ||
    !inpEditPrice.value.trim()
  ) {
    alert("Введите данные");
    return;
  }
  let EditedBook = {
    bookName: inpEditname.value,
    bookAuthor: inpEditAuthor.value,
    bookImg: inpEditImg.value,
    bookPrice: inpEditPrice.value,
  };
  EditBook(EditedBook, btnEditSave.id);
});

function EditBook(book, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(book),
  }).then(() => readBooks());
}
readBooks();

//!============SEARCH==============
inpSearch.addEventListener("input", (e) => {
  searchvalue = e.target.value;
  readBooks();
});

//!=======================PAGINATION================
async function pageFunc() {
  const res = await fetch(API);
  const data = await res.json();
  countPage = Math.ceil(data.length / 3);
  console.log(countPage);
}

prevBtn.addEventListener("click", () => {
  if (currentpage <= 1) return;
  currentpage--;
  readBooks();
});

nextBtn.addEventListener("click", () => {
  if (currentpage >= countPage) return;
  currentpage++;
  readBooks();
});
// CRUD FINISH
