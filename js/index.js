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


// special slide
const leftBtn = document.querySelector(".slide-left");
const rightBtn = document.querySelector(".slide-right");
const slideBox = document.querySelector(".special-slide")
const specialList = document.querySelector(".special-list")
const specialItem = document.querySelectorAll(".special-list .special-item-con")

let slideNum = 0;

function oneSlide(){
    specialList.style.transform = `translateX(-${specialList.offsetWidth/8*slideNum}px)`;
}
function specialSlide(event){
    let slideEa = Math.round(8/(specialList.getBoundingClientRect().width/slideBox.getBoundingClientRect().width));
    if(event.target.innerText == "오른쪽" && slideNum < specialItem.length-slideEa ){
        slideNum++;
        oneSlide();
        console.log()
        console.log()
    } else if(event.target.innerText == "왼쪽" && slideNum > 0){
        slideNum--;
        oneSlide();
    }
}

leftBtn.addEventListener("click", specialSlide)
rightBtn.addEventListener("click", specialSlide)


