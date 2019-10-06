let productName = document.getElementById("productName");
let productCompany = document.getElementById("productCompany");
let productPrice = document.getElementById("productPrice");
let productDesc = document.getElementById("productDesc");
let addBtn = document.getElementById("addBtn");
let searchInp = document.getElementById("searchInp")
let index = 0;
let productContainer
if (localStorage.getItem("productContainer") == null) {
    productContainer = [];
}
else {
    productContainer = JSON.parse(localStorage.getItem("productContainer"))
    displayProduct();
}
addBtn.addEventListener("click", function () {
    if (addBtn.innerHTML == "Add Product") {
        addProduct();
        displayProduct();
        clearForm();
    }
    else {
        updateProduct()
    }
})
function addProduct() {
    if (productName.value == "" || productPrice.value == "" || productCompany.value == "" || productDesc.value == "") {
        alert("all fields are required");
    }
    else {
        let product = {
            name: productName.value,
            company: productCompany.value,
            price: productPrice.value,
            desc: productDesc.value
        }
        productContainer.push(product);
        localStorage.setItem("productContainer", JSON.stringify(productContainer));
    }
}
function displayProduct() {
    temp = "";
    for (let i = 0; i < productContainer.length; i++) {
        temp += `<div class="col-md-3 my-3">
        <div class="item">
            <h3>${productContainer[i].name}</h3>
            <h4 class="text-info">${productContainer[i].company}</h4>
            <p class="text-danger">${productContainer[i].price}</p>
            <p class="text-muted">${productContainer[i].desc}</p>
            <button class="btn btn-danger m-2" onclick="deleteProduct(${i})">Delete</button>
            <button class="btn btn-primary m-2" onclick="setForm(${i})">Update</button>
        </div>
    </div>`
    }
    document.getElementById("rowData").innerHTML = temp
}
function clearForm() {
    let inputs = document.querySelectorAll(".form-control");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ""
    }
}
function deleteProduct(i) {
    productContainer.splice(i, 1);
    localStorage.setItem("productContainer", JSON.stringify(productContainer));
    displayProduct();
}
searchInp.onkeyup = function () {
    searchProduct(searchInp.value);
}
function searchProduct(term) {
    let searchCols = ""
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.includes(term)) {
            searchCols += `<div class="col-md-3 my-3">
        <div class="item">
            <h3>${productContainer[i].name}</h3>
            <h4 class="text-info">${productContainer[i].company}</h4>
            <p class="text-danger">${productContainer[i].price}</p>
            <p class="text-muted">${productContainer[i].desc}</p>
            <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
            <button class="btn btn-primary m-2" onclick="setForm(${i})">Update</button>
        </div>
    </div>`
        }
    }
    document.getElementById("SearchData").innerHTML = searchCols;
}
function setForm(i) {
    productName.value = productContainer[i].name;
    productCompany.value = productContainer[i].company;
    productPrice.value = productContainer[i].price;
    productDesc.value = productContainer[i].desc;
    addBtn.innerHTML = "Update Product";
    index = i;
}
function updateProduct() {
    productContainer[index].name = productName.value;
    productContainer[index].company = productCompany.value;
    productContainer[index].price = productPrice.value;
    productContainer[index].desc = productDesc.value;
    localStorage.setItem("productContainer", JSON.stringify(productContainer))
    displayProduct();
    clearForm();
    btn.innerHTML = "Add Product";
}