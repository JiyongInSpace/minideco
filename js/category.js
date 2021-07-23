// index.js

const categoryUrl = `https://raw.githubusercontent.com/JiyongInSpace/minideco/main/data/category.json`;


const productModal = document.querySelector(".sp-bg");
const productBigPt = document.querySelector(".sp-pt");
const productMiniPt = document.querySelector(".sp-mini-pt");
const productInfo = document.querySelector(".sp-info1");
const productPrice = document.querySelector(".sp-price");

function showProduct(name, detail, price, price2, pt, pt1, pt2, pt3){
    productModal.style.display = "flex";
    productBigPt.style.background = `url("img/${pt}") no-repeat center / cover`;
    productMiniPt.innerHTML = 
    `<div class="sp-mini-pt1" style="background:url("img/${pt1}") no-repeat center / cover"></div>
    <div class="sp-mini-pt2" style="background:url("img/${pt2}") no-repeat center / cover"></div>
    <div class="sp-mini-pt3" style="background:url("img/${pt3}") no-repeat center / cover"></div>`;
    productInfo.innerHTML = `<h2>${name}</h2> ${detail}`;
    productPrice.innerHTML = `<p>${price}원</p><p>${price2}원</p>`
} 

function init(){
    fetch(categoryUrl)
    .then(res => res.json())
    .then(data => callback(data));

    function callback(data){
        const categoryCons = document.querySelector(".category-item-cons");

        data.item.forEach((items, index) => {
            const div = document.createElement("div");
            div.className = "category-item-con";
            div.innerHTML =
            `<figure class="category-item">
                <figcaption>
                    <img src="img/${items.image}" alt="image${index}">
                    <div class="fig-bg">
                        <div class="fig-bt1">
                            <a href=""><div>
                                <span class="material-icons-outlined">
                                    open_in_new
                                    </span></div></a>
                            <a href=""><div>
                                <span class="material-icons-outlined">
                                    add_shopping_cart
                                    </span></div></a>
                            <a href=""><div>
                                <span class="material-icons-outlined">
                                favorite
                                </span></div></a>
                        </div>
                    </div>                  
                </figcaption>
            </figure>
            <div class="item-tag">
                <div class="item-tag-price">
                    <p>${items.name}</p>
                    <p>${items.price}원</p>
                </div>
                <div class="item-tag-content">
                    ${items.detail}
                </div>
            </div>`;
            div.addEventListener("click", event => showProduct(items.name, items.detail, items.price, items.price, items.image, items.firstimage, items.secondimage, items.thirdimage));
            categoryCons.appendChild(div);
        })
    }
}
window.addEventListener('load', init);