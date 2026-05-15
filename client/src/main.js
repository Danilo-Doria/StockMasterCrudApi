import { renderProducts } from './services/products.service';
import './styles/globals.css';

const urlApi = "http://localhost:3000/products"
const next = document.getElementById("next");
const prev = document.getElementById("prev");

getApi()

async function getApi() {
    try {
        const response = await fetch(urlApi);
        const products = await response.json();

        renderProducts(products)

    } catch (error) {
        console.log("Error: ", error);
    }
}

next.addEventListener('click', () => {

});

prev.addEventListener('click', () => {

});

