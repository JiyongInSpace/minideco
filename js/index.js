// SNS
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




// json
const onsaleList = document.querySelector(".onsale-list");
const specialList = document.querySelector(".special-list");
const bestList = document.querySelector(".best-list");
const reviewList = document.querySelector(".review-list");
const indexUrl = `https://raw.githubusercontent.com/JiyongInSpace/minideco/main/data/index.json`;

function init(){
    fetch(indexUrl)
    .then(res => res.json())
    .then(data => callback(data));

    function callback(data){
        // onsale
        data.onsale.forEach((items, index) => {
            const div = document.createElement("div");
            div.className = `onsale-item-con${index} onsale-item-con`;
            div.innerHTML += 
            `<figure class="onsale-item">
                <img src="${items.image}" alt="onsale${index}">
                <figcaption> 
                    <h3 class="onsale-percent">${items.percent}%</h3>
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
                    <p><span>${items.priceOnSale}원</span>${items.price}원</p>
                </div>
                <div class="item-tag-content">
                <p>${items.detail}</p>
                </div>
            </div>`;
            onsaleList.appendChild(div);
        })

        // special
        data.special.forEach((items, index) => {
            const div = document.createElement("div");
            div.className = `special-item-con`;
            div.innerHTML =
            `<figure class="special-item">
                <img src="${items.image}" alt="special${index}">
                <figcaption>
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
            specialList.appendChild(div);
        })

        // best
        data.best.forEach((items, index) => {
            const div = document.createElement("div");
            div.className = `best-item-con${index} best-item-con`;
            div.innerHTML +=
            `<figure class="best-item">
                <img src="${items.image}" alt="best${index}">
                <figcaption>
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
            bestList.appendChild(div);
        })

        // review
        data.review.forEach((items, index) => {
            const div = document.createElement("div");
            div.className = `review-item-con${index} review-item-con`;
            div.innerHTML += 
            `<figure class="review-item">
                <img src="${items.image}" alt="review${index}">
                <figcaption>
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
    }
}
window.addEventListener('load', init);

// special slide
const leftBtn = document.querySelector(".slide-left");
const rightBtn = document.querySelector(".slide-right");
const slideBox = document.querySelector(".special-slide")
let slideNum = 0;

function oneSlide(){
    specialList.style.transform = `translateX(-${specialList.offsetWidth/8*slideNum}px)`;
}
function specialSlide(event){
    const specialItem = document.querySelectorAll(".special-list .special-item-con")

    let slideEa = Math.round(8/(specialList.getBoundingClientRect().width/slideBox.getBoundingClientRect().width));
    if(event.target.innerText == "오른쪽" && slideNum < specialItem.length-slideEa ){
        slideNum++;
    } else if(event.target.innerText == "왼쪽" && slideNum > 0){
        slideNum--;
    }
    oneSlide();
}

leftBtn.addEventListener("click", specialSlide)
rightBtn.addEventListener("click", specialSlide)


