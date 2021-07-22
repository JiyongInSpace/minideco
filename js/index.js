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


// special json
const specialList = document.querySelector(".special-list")

function init(){
    fetch('../data/index.json')
    .then(res => res.json())
    .then(data => callback(data));

    function callback(data){
        const specialList = document.querySelector(".special-list");

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
                    <p>${items.price}</p>
                </div>
                <div class="item-tag-content">
                    ${items.detail}
                </div>
            </div>`;
            specialList.appendChild(div);
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


