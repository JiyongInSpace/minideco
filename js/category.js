const categoryUrl = `https://raw.githubusercontent.com/JiyongInSpace/minideco/main/data/category.json`;






// modal
const productModal = document.querySelector(".sp-bg");
const productModalBlock = document.querySelector(".sp-modal")
const productBigPt = document.querySelector(".sp-pt");
const productMiniPt = document.querySelector(".sp-mini-pt");
const productInfoCon = document.querySelector(".sp-info")
const productInfo = document.querySelector(".sp-info1");
const productPrice = document.querySelector(".sp-price");
const productExit = document.querySelector(".modal-exit")
let totalPrice = document.querySelector(".total-price");
let productNum;
let productPriceSum;

const likeBtn = document.querySelector(".like-bt");
let likeItems;
if(localStorage.liked === null || localStorage.liked === '' || localStorage.liked === undefined){
    likeItems = [];
} else {
    likeItems = localStorage.liked.split(',');
}
const cartBtn = document.querySelector(".cart-bt");
let cartItems;
if(localStorage.cart === null || localStorage.cart === '' || localStorage.cart === undefined){
    cartItems = [];
} else {
    cartItems = localStorage.cart.split(',');
}


const numSum = document.querySelectorAll(".sum");

function showProduct(name, detail, price, price2, pt, pt2, pt3, num, num2){
    productModal.style.display = "flex";
    productBigPt.style.background = `url("img/${pt}") no-repeat center / cover`;
    productMiniPt.innerHTML = 
    `<div class="sp-mini-pt1" style="background: url('img/${pt}') no-repeat center / cover"></div>
    <div class="sp-mini-pt2" style="background: url('img/${pt2}') no-repeat center / cover"></div>
    <div class="sp-mini-pt3" style="background: url('img/${pt3}') no-repeat center / cover"></div>`;
    productInfo.innerHTML = `<h2>${name}</h2> ${detail} `;
    productInfoCon.id = `${num}`;
    productPrice.innerHTML = `<p>${price}원</p><p>${price2}원</p>`
    productNum = 1;
    document.querySelector(".sp-pm div:nth-child(2)").innerHTML = productNum;
    productPriceSum = price2;
    totalPrice.innerText = `총 ${price2}원`;
    
    if(cartItems.includes(num.toString())){
        cartBtn.classList.add("cart");
    } else {
        cartBtn.classList.remove("cart");
    }

    if(likeItems.includes(num.toString())){
        likeBtn.classList.add("liked");
    } else {
        likeBtn.classList.remove("liked");
    }
} 
function exitProduct(e){
    if(e.target.className === "sp-bg" || e.target.className === "modal-exit"){
    this.style.display = "none"};
}
productModal.addEventListener("click", exitProduct);


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


// 좋아요
function iLikeIt(){
    const productId = this.parentElement.parentElement.id;
    const productCon = this.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.childNodes[productId%12];
    
    if(!likeBtn.classList.contains("liked")){
        likeBtn.classList.add("liked");
        productCon.classList.add("liked");
        likeItems.push(productId);
    } else {
        likeBtn.classList.remove("liked");
        for(let i=0;i<likeItems.length;i++){
            if(likeItems[i] === productId){
                likeItems.splice(i, 1);
                productCon.classList.remove("liked");
            }
        }
    };
    localStorage.setItem("liked", likeItems);
} 
likeBtn.addEventListener("click", iLikeIt)

// 장바구니에 담기
function putCart(){
    const productId = this.parentElement.parentElement.id;
    const productCon = this.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.childNodes[productId%12];
    if(cartItems.includes(productId)){
        cartItems = cartItems.filter(cartItem => cartItem !== productId);
        localStorage.setItem("cart", cartItems);
        cartBtn.classList.remove("cart");
        productCon.classList.remove("cart");
    } else {
        cartItems.push(productId);
        localStorage.setItem("cart", cartItems);
        cartBtn.classList.add("cart");
        productCon.classList.add("cart");
    }
};
cartBtn.addEventListener("click", putCart);


const categoryHeader = document.querySelector(".category-header h2");
const categoryPages = document.querySelector(".pages")

// 상품 json
const category = document.querySelectorAll(".category-nav li a");
let j = 0;
function changeCategory(e){
    e.preventDefault();
    if(this.nodeName !== "A"){
        categoryHeader.innerText = 'DIY미니어처';
    }else {
        j = parseInt(this.dataset.num) * 12;
        categoryHeader.innerText = this.innerText;
    }
    fetch(categoryUrl)
    .then(res => res.json())
    .then(data => callback(data));
    function callback(data){
        const categoryCons = document.querySelector(".category-item-cons");
        categoryCons.innerHTML='';
        for(let i=0; i<12; i++){
            const div = document.createElement("div");
            div.className = "category-item-con";
            if(likeItems.includes((i+j).toString())){
                div.classList.add("liked");
            };
            if(cartItems.includes((i+j).toString())){
                div.classList.add("cart");
            };
            div.innerHTML =
            `<figure class="category-item" id="${j+i}">
                <img src="img/${data.item[j+i].image}" alt="image${i}">
                <span class="material-icons-outlined">
                            add_shopping_cart</span>
                <span class="material-icons-outlined">
                            favorite</span>

            </figure>
            <div class="item-tag">
                <div class="item-tag-price">
                    <p>${data.item[j+i].name}</p>
                    <p>${data.item[j+i].price}원</p>
                </div>
                <div class="item-tag-content">
                    ${data.item[j+i].detail}
                </div>
            </div>`;
            div.addEventListener("click", event => showProduct(data.item[j+i].name, data.item[j+i].detail, data.item[j+i].price, data.item[j+i].price, data.item[j+i].image, data.item[j+i].secondimage, data.item[j+i].thirdimage, j+i));
            categoryCons.appendChild(div);
        }
    }
}
category.forEach((category) => {
    category.addEventListener("click", changeCategory)
})
window.addEventListener('load', changeCategory);




// 사진바꾸기
const bigPhoto = document.querySelector(".sp-pt");
const smallPhoto = document.querySelector(".sp-mini-pt");
function testtest(e){
    if(!e.target.classList.contains("sp-mini-pt")){     
        bigPhoto.style.background = e.target.style.background;
    }
}
smallPhoto.addEventListener("click", testtest);

