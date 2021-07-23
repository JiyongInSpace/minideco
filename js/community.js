const noticeList = document.getElementById("notice-list")
const reviewList = document.getElementById("review-list")
const boardUrl = `https://raw.githubusercontent.com/JiyongInSpace/minideco/main/data/board.json`;
const boardTitle = document.querySelector(".board-cap")


function showBoardItem(){
    const activeNow = document.querySelectorAll(".active");
    activeNow.forEach((actives) => {
        actives.classList.toggle("active");
    })
    this.childNodes[2].childNodes.forEach((child) => {
        if(child.nodeName == "FIGURE" || child.nodeName == "DIV"){
            child.classList.toggle("active");
        }
    })
}

function init(){
    fetch(boardUrl)
    .then(res => res.json())
    .then(data => callback(data));

    function callback(data){
        // review
        if(boardTitle.innerText === "REVIEW"){
        data.review.forEach((items, index) => {
            let tr = document.createElement("tr");
            tr.innerHTML = 
            `<td>${items.number}</td>
            <td class="board-content">
                <figure class="board-pt" style="background-image: url(img/${items.photo})"></figure>
                <div>
                    <div>${items.username} | 작성일: ${items.date}</div>
                    <figure class="board-star"></figure>
                    <div class="board-title">${items.title} </div>
                    <div class="board-comment">${items.detail}</div>
                </div>
            </td>
            <td>${items.username}</td>
            <td>${items.date}</td>`;
            tr.addEventListener("click", showBoardItem)
            reviewList.appendChild(tr);
        })
        } else { //notice
        data.notice.forEach((items, index) => {
            let tr = document.createElement("tr");
            tr.innerHTML = 
            `<td>${items.number}</td>
            <td class="board-content">
                <div>
                    <div>${items.username} | 작성일: ${items.date}</div>
                    <div class="board-title">${items.title} </div>
                    <div class="board-comment">${items.detail}</div>
                </div>
            </td>
            <td>${items.username}</td>
            <td>${items.date}</td>`;
            tr.addEventListener("click", showBoardItem)
            noticeList.appendChild(tr);
        })
    }

    }}

window.addEventListener('load', init);


