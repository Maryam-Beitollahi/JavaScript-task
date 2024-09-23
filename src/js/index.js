Base_URL = "http://localhost:3000/transactions";

const showBtn = document.querySelector(".show-transactions__btn");
const initialPage = document.querySelector(".show-transactions");
const transactionsTable = document.querySelector(".transactions");
const transactionDom = document.querySelector("#transaction-item");
const icons = document.querySelectorAll(".fa-chevron-down");
const searchInput = document.querySelector(".transactions__search-input");

let allTransactions = [];
const filters = {
  searchItems: "",
  sort: "",
  sortOrder: "",
};

showBtn.addEventListener("click", (e) => getTransactions(e));

function getTransactions(e) {
  axios
    .get(Base_URL)
    .then((res) => {
      allTransactions = res.data;
      renderTransactions(res.data);
    })
    .catch();
  initialPage.classList.add("hidden");
  transactionsTable.classList.remove("hidden");
}

function renderTransactions(_transactions) {
  result = "";
  _transactions.forEach((t) => {
    result += `<tr class="transaction__items">
      <td>${t.id}</td>
      <td class="${
        t.type === "برداشت از حساب"
          ? "transaction__item-validity not"
          : "transaction__item-validity"
      }">${t.type}</td>
      <td class="transaction__item-price">${t.price}</td>
      <td>${t.refId}</td>
      <td>${new Date(t.date).toLocaleDateString("fa-IR")}</td>
      </tr>
        `;
    transactionDom.innerHTML = result;
  });
}

icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    //console.log(icon.classList);
    icon.classList.toggle("rotate");
    filters.sort = e.target.dataset.type;
    //console.log(e.target.dataset.type);
    filters.sortOrder = e.target.classList.contains("rotate") ? "des" : "asc";
    fetchwithQuery();
  });
});

searchInput.addEventListener("input", (e) => {
  //console.log(e.target.value);
  filters.searchItems = e.target.value;
  fetchwithQuery();
});

function fetchwithQuery() {
  //console.log(filters);
  axios
    .get(
      `${Base_URL}?refId_like=${filters.searchItems}&_sort=${filters.sort}&_order=${filters.sortOrder}`
    )
    .then((res) => {
      allTransactions = res.data;
      renderTransactions(res.data);
    })
    .catch((err) => console.log(err.message));
}
