import { renderProducts } from './services/ui.service';
import { searchProduct } from './services/search.service';
import { updateStats } from './services/stats.service';
import { addProduct, deleteProduct, editProduct } from './services/product.service';
import { showView } from "./router/router";
import './styles/globals.css';

// Login Logic
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("login-message");

loginForm.addEventListener("submit", (e) => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    e.preventDefault();

    if (!username || !password) {
        loginMessage.textContent = "Please complete all fields";
        return;

    } else if (username !== "admin") {
        loginMessage.textContent = "Incorrect username";
        return;

    } else if (password !== "1234") {
        loginMessage.textContent = "Incorrect password";
        return;
    } else {
        loginMessage.textContent = "";
        showView("home-view");
    }

});

// API Logic

const urlApi = "http://localhost:3000/products"
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const form = document.getElementById("product-form");

getApi()

async function getApi() {
    try {
        const response = await fetch(urlApi);
        const products = await response.json();

        await renderProducts(products.reverse());
        await searchProduct(products);
        await updateStats(products);

    } catch (error) {
        console.log("Error: ", error);
    }
}

// next.addEventListener('click', () => {

// });

// prev.addEventListener('click', () => {

// });

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newProduct = {
        nombre: document.getElementById("nombre").value,
        precio: Number(document.getElementById("precio").value),
        stock: Number(document.getElementById("stock").value),
        descripcion: document.getElementById("descripcion").value || ''
    };


    await addProduct(newProduct);

    form.reset();

    await getApi();
});


document.addEventListener("click", async (e) => {

    const btnDelete = e.target.closest(".delete-btn");

    if (!btnDelete) {
        return;
    }

    const id = btnDelete.dataset.id;

    await deleteProduct(id);
    await getApi()
});

// EDIT PRODUCT LOGIC

const editModal = document.getElementById("edit-modal");
const saveModal = document.getElementById("save-product");
const closeModal = document.getElementById("close-modal");

// ID'S NODAL
const editName = document.getElementById("edit-name");
const editDescription = document.getElementById("edit-description");
const editStock = document.getElementById("edit-stock");
const editPrice = document.getElementById("edit-price");

let currentProductId = null;

// OPEN MODAL

document.addEventListener("click", (e) => {

    const btnEdit = e.target.closest(".edit-btn");

    if (!btnEdit) {
        return;
    }

    currentProductId = btnEdit.dataset.id;

    editName.value = btnEdit.dataset.name;
    editDescription.value = btnEdit.dataset.description;
    editStock.value = btnEdit.dataset.stock;
    editPrice.value = btnEdit.dataset.price;

    editModal.classList.remove("hidden");
    editModal.classList.add("flex");

});



// SAVE PRODUCT

saveModal.addEventListener("click", async (e) => {

    e.preventDefault();

    const updatedProduct = {
        nombre: editName.value,
        descripcion: editDescription.value,
        stock: parseInt(editStock.value),
        precio: parseFloat(editPrice.value)
    };

    await editProduct(currentProductId, updatedProduct);

    editModal.classList.add("hidden");
    editModal.classList.remove("flex");

    await getApi();

});

// CLOSE MODAL

closeModal.addEventListener("click", () => {

    editModal.classList.add("hidden");
    editModal.classList.remove("flex");

});