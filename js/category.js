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


const numSum = document.querySelectorAll(".sum");

function showProduct(name, detail, price, price2, pt, pt2, pt3, num){
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
const likeBtn = document.querySelector(".like-bt");
let likeItems;
if(localStorage.liked == null){
    likeItems = [];
} else {
    likeItems = localStorage.liked.split(',');
}


function iLikeIt(event){
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


// 상품 json

function init(){
    fetch(categoryUrl)
    .then(res => res.json())
    .then(data => callback(data));

    function callback(data){
        const categoryCons = document.querySelector(".category-item-cons");
        categoryCons.innerHTML = '';
        for(let i=0; i<12; i++){
            const div = document.createElement("div");
            if(likeItems.includes((i).toString())){
                div.className = "category-item-con liked";
            } else {
                div.className = "category-item-con";
            }
            div.innerHTML =
            `<figure class="category-item" id="${i}">
                <img src="img/${data.item[i].image}" alt="image${i}">
                <span class="material-icons-outlined hiddenHT">
                            favorite</span>
            </figure>
            <div class="item-tag">
                <div class="item-tag-price">
                    <p>${data.item[i].name}</p>
                    <p>${data.item[i].price}원</p>
                </div>
                <div class="item-tag-content">
                    ${data.item[i].detail}
                </div>
            </div>`;
            div.addEventListener("click", event => showProduct(data.item[i].name, data.item[i].detail, data.item[i].price, data.item[i].price, data.item[i].image, data.item[i].secondimage, data.item[i].thirdimage, i));
            categoryCons.appendChild(div);
            
        }
    }
}
window.addEventListener('load', init);

// 상품 바꾸기
const category = document.querySelectorAll(".category-nav li a");

function changeCategory(e){
    e.preventDefault();
    let j = parseInt(this.dataset.num) * 12;
    fetch(categoryUrl)
    .then(res => res.json())
    .then(data => callback(data));
    function callback(data){
        const categoryCons = document.querySelector(".category-item-cons");
        categoryCons.innerHTML='';
        for(let i=0; i<12; i++){
            const div = document.createElement("div");
            if(likeItems.includes((i+j).toString())){
                div.className = "category-item-con liked";
            } else {
                div.className = "category-item-con";
            }
            div.innerHTML =
            `<figure class="category-item" id="${j+i}">
                <img src="img/${data.item[j+i].image}" alt="image${i}">
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





// 사진바꾸기
const bigPhoto = document.querySelector(".sp-pt");
const smallPhoto = document.querySelector(".sp-mini-pt");
function testtest(e){
    if(!e.target.classList.contains("sp-mini-pt")){     
        bigPhoto.style.background = e.target.style.background;
    }
}
smallPhoto.addEventListener("click", testtest);

