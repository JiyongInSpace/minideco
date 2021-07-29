// SNS 버튼
const snstab = document.querySelector(".sns");
const topBtn = document.querySelector(".scroll-top");
const hiddenBtn = document.querySelector(".sns-hidden");
const showBtn = document.querySelector(".sns-show")

function hiddenSns(){
    if(pageYOffset < window.innerHeight || !showBtn.classList.contains("handle-hidden")){
        snstab.style.transform = "translateX(100%)";
    } else{
        snstab.style.transform = "translateX(0)";
    }
}
function scrollToTop(){
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
}
function handleHiddenSns(){
    snstab.style.transform = "translateX(100%)";
    showBtn.classList.toggle("handle-hidden");
}
function showSns(){
    snstab.style.transform = "translateX(0)";
    showBtn.classList.toggle("handle-hidden");
}

window.addEventListener("scroll", hiddenSns);
topBtn.addEventListener("click", scrollToTop);
hiddenBtn.addEventListener("click", handleHiddenSns);
showBtn.addEventListener("click", showSns)
hiddenSns();

// 스크롤 효과
const scrollEffectItems = document.querySelectorAll(".scroll-effect");

function scrollEffect(){
    scrollEffectItems.forEach((item) => {
    if(item.getBoundingClientRect().y <= window.innerHeight * 4/5){
        item.classList.remove("scroll-effect");
        }
    })
}

window.addEventListener("scroll", scrollEffect);


// json

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

const onsaleList = document.querySelector(".onsale-list");
const specialList = document.querySelector(".special-list");
const bestList = document.querySelector(".best-list");
const reviewList = document.querySelector(".review-list");
const categoryUrl = `https://raw.githubusercontent.com/JiyongInSpace/minideco/main/data/category.json`;

// 호버
function hoverProduct(e){
    e.preventDefault();
    const productId = e.target.id;
    
    if(e.target.innerText === "add_shopping_cart"){
        if(cartItems.includes(productId)){
            cartItems = cartItems.filter(cartItem => cartItem !== productId);
            localStorage.setItem("cart", cartItems);
            this.classList.remove("cart")
        } else {
            cartItems.push(productId);
            localStorage.setItem("cart", cartItems);
            this.classList.add("cart")
        }
    } else if (e.target.innerText === "favorite"){
        if(likeItems.includes(productId)){
            likeItems = likeItems.filter(likeItem => likeItem !== productId);
            localStorage.setItem("liked", likeItems);
            this.classList.remove("liked")
        } else {
            likeItems.push(productId);
            localStorage.setItem("liked", likeItems);
            this.classList.add("liked")
        }
    }
}


// 상품 json

function inSpecial(){
    fetch(categoryUrl)
    .then(res => res.json())
    .then(data => callback(data));

    function callback(data){
        // review
        data.review.forEach((items, index) => {
            const div = document.createElement("div");
            div.className = `review-item-con${index} review-item-con`;
            div.innerHTML += 
            `<figure class="review-item">
                <img src="${items.image}" alt="review${index}">
            </figure>
            <div class="item-tag">
                <div class="item-tag-price">
                    <div class="review-star"></div>
                    <p>${items.username}</p>
                </div>
                <h2>${items.reviewTitle}</h2>
                <div class="item-tag-content">
                    ${items.reviewDetail}
                </div>
            </div>`;
            reviewList.appendChild(div);
        })

         // onsale
        for(let i=1; i<5; i++){
            const div = document.createElement("div");
            div.className = `onsale-item-con${i} onsale-item-con`;
            if(likeItems.includes((i*17).toString())){
                div.classList.add("liked");
            };
            if(cartItems.includes((i*17).toString())){
                div.classList.add("cart");
            };
            div.innerHTML += 
            `<figure class="onsale-item">
                <img src="img/${data.item[i*17].image}" alt="onsale${i}">
                <h3 class="onsale-percent">20%</h3>
                <div class="fig-bg">
                    <div class="fig-bt1">
                        <a href=""><div>
                            <span class="material-icons-outlined" id="${i*17}">
                                add_shopping_cart
                                </span></div></a>
                        <a href=""><div>
                            <span class="material-icons-outlined" id="${i*17}">
                            favorite
                            </span></div></a>
                    </div>
                </div>
                <figcaption>
                    <span class="material-icons-outlined">
                                add_shopping_cart</span>
                    <span class="material-icons-outlined">
                                favorite</span>
                </figcaption>  
            </figure>
            <div class="item-tag">
                <div class="item-tag-price">
                    <p>${data.item[i*17].name}</p>
                    <p><span>${data.item[i*17].price}원</span>${data.item[i*17].price}원</p>
                </div>
                <div class="item-tag-content">
                <p>${data.item[i*17].detail}</p>
                </div>
            </div>`;
            div.addEventListener("click", hoverProduct)
            onsaleList.appendChild(div);
        }


        for(let i=0; i<8; i++){
            const div = document.createElement("div");
            div.className = `special-item-con`;
            if(likeItems.includes((i*14).toString())){
                div.classList.add("liked");
            };
            if(cartItems.includes((i*14).toString())){
                div.classList.add("cart");
            };
            div.innerHTML =
            `<figure class="special-item">
                <img src="img/${data.item[i*14].image}" alt="special${i}">
                <div class="fig-bg">
                    <div class="fig-bt1">
                        <a href=""><div>
                            <span class="material-icons-outlined" id="${i*14}">
                                add_shopping_cart
                            </span></div></a>
                        <a href=""><div>
                            <span class="material-icons-outlined" id="${i*14}">
                                favorite
                            </span></div></a>
                    </div>
                </div>
                <figcaption>
                    <span class="material-icons-outlined">
                                add_shopping_cart</span>
                    <span class="material-icons-outlined">
                                favorite</span>
                </figcaption>                  
            </figure>
            <div class="item-tag">
                <div class="item-tag-price">
                    <p>${data.item[i*14].name}</p>
                    <p>${data.item[i*14].price}원</p>
                </div>
                <div class="item-tag-content">
                ${data.item[i*14].detail}
                </div>
            </div>`;
            div.addEventListener("click", hoverProduct)
            specialList.appendChild(div);
        }
    }
}
window.addEventListener('load', inSpecial);


// Best
const bestCategory = document.querySelectorAll(".best-category-list li a");
let j = 0;

function changeCategory(e){
    e.preventDefault();
    if(this.nodeName !== "A"){
        
    }else {
        j = parseInt(this.dataset.num) * 12;
    }
    fetch(categoryUrl)
    .then(res => res.json())
    .then(data => callback(data));

    
    function callback(data){
        bestList.innerHTML = 
        `<div class="list-title-best">
            <span class="list-title1">BEST</span>
            <span class="list-title2">인기상품</span>
            <div>
                <select id="category-select">
                    <option>DIY미니어처</option>
                    <option>룸박스/케이스</option>
                    <option>나무제품</option>
                    <option>주방용품</option>
                    <option>가구완제품</option>
                    <option>소품류</option>
                    <option>금속제품/조명</option>
                    <option>천/레이스</option>
                    <option>벽지/기타재료</option>
                    <option>핸드메이드</option>
                </select>
            </div>
            <label for="category-select">category</label>
        </div>`;
        
        for(let i=0; i<6; i++){
            const div = document.createElement("div");
            div.className = `best-item-con${i} best-item-con`;
            if(likeItems.includes((i+j).toString())){
                div.classList.add("liked");
            };
            if(cartItems.includes((i+j).toString())){
                div.classList.add("cart");
            };
            div.innerHTML =
            `<figure class="best-item">
                <img src="img/${data.item[j+i].image}" alt="best${i}">
                    <div class="fig-bg">
                    <div class="fig-bt1">
                        <a href=""><div>
                            <span class="material-icons-outlined" id="${j+i}">
                                add_shopping_cart
                                </span></div></a>
                        <a href=""><div>
                            <span class="material-icons-outlined" id="${j+i}">
                            favorite
                            </span></div></a>
                    </div>
                </div>
                <figcaption>
                    <span class="material-icons-outlined">
                                add_shopping_cart</span>
                    <span class="material-icons-outlined">
                                favorite</span>
                </figcaption>
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
            div.addEventListener("click", hoverProduct)
            bestList.appendChild(div);
        }
    }
}
window.addEventListener('load', changeCategory);
bestCategory.forEach((category) => {
    category.addEventListener("click", changeCategory)
})



// special slide
const leftBtn = document.querySelector(".slide-left");
const rightBtn = document.querySelector(".slide-right");
const slideBox = document.querySelector(".special-slide")
let slideNum = 0;

function oneSlide(){
    const specialItem = document.querySelectorAll(".special-list .special-item-con");
    specialList.style.transform = `translateX(-${specialList.offsetWidth/specialItem.length*slideNum}px)`;
}

function specialSlide(event){
    const specialItem = document.querySelectorAll(".special-list .special-item-con");
    let slideEa = Math.round(specialItem.length/(specialList.getBoundingClientRect().width/slideBox.getBoundingClientRect().width));
    if(event.target.innerText == "arrow_forward_ios" && slideNum < specialItem.length-slideEa ){
        slideNum++;
    } else if(event.target.innerText == "arrow_back_ios" && slideNum > 0){
        slideNum--;
    }
    oneSlide();
}

function autoSlide(){
    const specialItem = document.querySelectorAll(".special-list .special-item-con");
    let slideEa = Math.round(specialItem.length/(specialList.getBoundingClientRect().width/slideBox.getBoundingClientRect().width));
    if(slideNum < specialItem.length-slideEa){
        slideNum++;
    } else {
        slideNum = 0;
    }
    oneSlide();
}
const autoSlideTimer = setInterval(autoSlide, 2500);



leftBtn.addEventListener("click", specialSlide)
rightBtn.addEventListener("click", specialSlide)


