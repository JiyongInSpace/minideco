const categoryUrl = `https://raw.githubusercontent.com/JiyongInSpace/minideco/main/data/category.json`;


// modal
const productModal = document.querySelector(".sp-bg");
const productModalBlock = document.querySelector(".sp-modal")
const productBigPt = document.querySelector(".sp-pt");
const productMiniPt = document.querySelector(".sp-mini-pt");
const productInfo = document.querySelector(".sp-info1");
const productPrice = document.querySelector(".sp-price");
const productExit = document.querySelector(".modal-exit")
let totalPrice = document.querySelector(".total-price");
let productNum;
let productPriceSum;


const numSum = document.querySelectorAll(".sum");

function showProduct(name, detail, price, price2, pt, pt2, pt3){
    productModal.style.display = "flex";
    productBigPt.style.background = `url("img/${pt}") no-repeat center / cover`;
    productMiniPt.innerHTML = 
    `<div class="sp-mini-pt1" style="background: url('img/${pt}') no-repeat center / cover"></div>
    <div class="sp-mini-pt2" style="background: url('img/${pt2}') no-repeat center / cover"></div>
    <div class="sp-mini-pt3" style="background: url('img/${pt3}') no-repeat center / cover"></div>`;
    productInfo.innerHTML = `<h2>${name}</h2> ${detail}`;
    productPrice.innerHTML = `<p>${price}원</p><p>${price2}원</p>`
    productNum = 1;
    document.querySelector(".sp-pm div:nth-child(2)").innerHTML = productNum;
    productPriceSum = price2;
    totalPrice.innerText = `총 ${price2}원`;
} 
function exitProduct(e){
    if(e.target.className === "sp-bg" || e.target.className === "modal-exit"){
    this.style.display = "none"};
}
productModal.addEventListener("click", exitProduct)
productModal.addEventListener("click", exitProduct)


// product calculate

function removeComma(num){
    let n = parseInt(num.replace(",",""));
    return n;
}
function calculate(){
    if(this.innerText === "-" && productNum > 0){
        productNum -= 1;
    } else if(this.innerText === "+"){
        productNum += 1;
    }
    document.querySelector(".sp-pm div:nth-child(2)").innerHTML = productNum;
    totalPrice.innerText = `총 ${(removeComma(productPriceSum) * productNum).toLocaleString()}원`;
}
numSum.forEach((sign) => {
    sign.addEventListener("click", calculate)
})




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
                <img src="img/${items.image}" alt="image${index}">
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
            div.addEventListener("click", event => showProduct(items.name, items.detail, items.price, items.price, items.image, items.secondimage, items.thirdimage));
            categoryCons.appendChild(div);
        })
    }
}
window.addEventListener('load', init);


