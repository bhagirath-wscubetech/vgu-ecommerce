const listing = document.querySelector("#listing");
const categoryListing = document.querySelector("#categoryListing");
const cartCountBox = document.querySelector("#cart-count");
const wishCountBox = document.querySelector("#wishlist-count");
const sideCartListing = document.querySelector("#side-cart-listing");
const overlay = document.querySelector("#overlay");
const sideCart = document.querySelector("#side-cart");
const sideWish = document.querySelector("#wishlist-cart");
const body = document.querySelector("body")
let wishlist = [];
let cart = [];
let cat = null;
let products = [];

const loadProduct = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
    showProducts();
}

const loadCategory = async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    data.forEach(
        (d) => {
            const li = document.createElement("li");
            li.classList.add("border", "cursor-pointer", "px-2", "py-3");
            li.addEventListener("click", () => {
                categoryFilter(d);
            })
            li.innerText = d;
            categoryListing.appendChild(li);
        }
    )
}

const categoryFilter = (category_name) => {
    cat = category_name;
    showProducts();
}

const showProducts = () => {
    listing.innerHTML = "";
    products.forEach(
        (d) => {
            if (cat != null) {
                if (d.category != cat) return;
            }
            const box = document.createElement("div");
            box.classList.add("shadow", "bg-white", "text-center", "p-5", "rounded", "group");
            box.innerHTML = `
                <img src="${d.image}"
                class="group-hover:scale-[1.05] p-4 duration-300 w-full h-[300px]" alt="">
                <div class="my-3">
                    <i class="btn fa-solid fa-cart-shopping" onclick="addToCart(${d.id})"></i>
                    <i class="btn fa-solid fa-heart" onclick="addToWishList(${d.id})"></i>
                </div>
                <div class="text-gray-400 group-hover:text-gray-800">${d.title}</div>
            `;
            listing.appendChild(box);
        }
    )
}

const getCartCount = () => {
    cartCountBox.innerText = `( ${cart.length} )`;
    sideCartListing.innerHTML = "";
    const items = products.filter(
        (p) => {
            if (cart.includes(p.id)) return true;
            else return false;
        }
    )
    items.forEach(
        (item) => {
            const box = document.createElement("div");
            box.classList.add("p-3", "border-b", "flex", "gap-4", "text-[12px]", "sm:text-[16px]");
            box.innerHTML = `
                <img src="${item.image}" class="sm:w-[50px] w-[30px]">
                <div class="flex-grow"> ${item.title} </div>
                <div class="w-[100px] text-right"> $ ${item.price} </div>
            `
            sideCartListing.appendChild(box);
        }
    )
}

const getWishListCount = () => {
    wishCountBox.innerText = `( ${wishlist.length} )`;
}

const addToCart = (p_id) => {
    if (!cart.includes(p_id)) cart.push(p_id);
    getCartCount();
}

const addToWishList = (p_id) => {
    if (!wishlist.includes(p_id)) wishlist.push(p_id);
    getWishListCount();
}

const sidePanel = (flag) => {
    if (flag == 1) sideCart.classList.add("open-cart");
    else sideWish.classList.add("open-wish");
    overlay.classList.add("show");
    body.style.overflow = "hidden";

}

const closeSidePanel = () => {
    overlay.classList.remove("show");
    sideWish.classList.remove("open-wish");
    sideCart.classList.remove("open-cart");
    body.style.overflow = "";
}