import { renderProducts } from './services/ui.service';
import { searchProduct } from './services/search.service';
import { updateStats } from './services/stats.service';
import { addProduct, deleteProduct } from './services/product.service';
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

    const btn = e.target.closest(".delete-btn");

    if (!btn) {
        return;
    }

    const id = btn.dataset.id;

    await deleteProduct(id);
    await getApi()
});