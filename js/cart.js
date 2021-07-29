const categoryUrl = `https://raw.githubusercontent.com/JiyongInSpace/minideco/main/data/category.json`;

const likedTbody = document.querySelector(".liked-tbody");
const cartTbody = document.querySelector(".cart-tbody");
let likedItems, cartItems;
if(localStorage.liked === null || localStorage.liked === '' || localStorage.liked === undefined){
} else {
    likedItems = localStorage.getItem("liked").split(",").map(Number);
} 
if(localStorage.cart === null || localStorage.cart === '' || localStorage.cart === undefined){
    cartItems = [];
} else {
    cartItems = localStorage.getItem("cart").split(",").map(Number);
} 

// 좋아요한 상품 카트넣기, 삭제
function clickOption(e){
    if(e.target.innerText === "delete"){
        this.remove();
        likedItems = likedItems.filter(likedItem => likedItem !== parseInt(e.target.id));
        localStorage.setItem("liked", likedItems);
        likedTbody.innerHTML = '';
        inLiked();
    } else if(e.target.innerText === "add_shopping_cart"){
        if(cartItems.includes(parseInt(e.target.id))){
            e.target.parentElement.nextSibling.innerHTML = "이미<br>있어요!";
        } else {
        cartItems.push(parseInt(e.target.id));
        localStorage.cart = cartItems;
        }
        inCart();
    }
}
// 장바구니 상품 옵션
function scdClickOption(e){
    if(e.target.innerText === "delete"){
        this.remove();
        cartItems = cartItems.filter(cartItem => cartItem !== parseInt(e.target.id));
        localStorage.setItem("cart", cartItems);
        cartTbody.innerHTML = '';
        inCart();
    }
}

// 좋아요한상품 JSON
function inLiked(){
    fetch(categoryUrl)
    .then(res => res.json())
    .then(data => callback(data));

    function callback(data){
        if(localStorage.liked === null || localStorage.liked === '' || localStorage.liked === undefined){
            const tr = document.createElement("tr");
            tr.innerHTML = 
            `<td></td>
            <td class="cart-info">
                내가 좋아한 상품이 없습니다.
            </td>
            <td></td>
            <td></td>`;
            likedTbody.appendChild(tr);
        } else {
            likedItems.forEach((likedItem, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = 
            `<td>${index+1}</td>
            <td class="cart-info">
                <figure class="cart-pt1" style="background-image: url(img/${data.item[likedItem].image})"></figure>
                <div>
                    <div>${data.item[likedItem].name}<p>${data.item[likedItem].detail}</p></div>
                    <div>금액: ${data.item[likedItem].price}원<br>
                    <span id="${likedItem}" class="material-icons-outlined">add_shopping_cart</span> <span id="${likedItem}" class="material-icons-outlined">delete</span></div>
                </div>
            </td>
            <td>${data.item[likedItem].price}원</td>
            <td><span id="${likedItem}" class="material-icons-outlined">add_shopping_cart</span> <span id="${likedItem}" class="material-icons-outlined">delete</span></td><td>-</td>`;
            likedTbody.appendChild(tr);
            tr.addEventListener("click", clickOption);
            })
        }
    }
}
window.addEventListener('load', inLiked);

// 금액 관련
const total = document.querySelector(".total-money");
const totalPlus = document.querySelector(".total-money2");

//  장바구니 JSON
function inCart(){
    fetch(categoryUrl)
    .then(res => res.json())
    .then(data => callback(data));

    function callback(data){
        cartTbody.innerHTML = '';
        if(localStorage.cart === null || localStorage.cart === '' || localStorage.cart === undefined){
            const tr = document.createElement("tr");
            tr.innerHTML = 
            `<td></td>
            <td class="cart-info">
               장바구니에 담긴 상품이 없습니다.
            </td>
            <td></td>
            <td></td>`;
            cartTbody.appendChild(tr);
        } else {
            let totalMoney = 0;
            cartItems.forEach((cartItem, index) => {
            const tr = document.createElement("tr");
            totalMoney += parseInt(data.item[cartItem].price.replace(/,/g,""));
            tr.innerHTML = 
            `<td>${index+1}</td>
            <td class="cart-info">
                <figure class="cart-pt1" style="background-image: url(img/${data.item[cartItem].image})"></figure>
                <div>
                    <div>${data.item[cartItem].name}, ${data.item[cartItem].price}원<p>(${data.item[cartItem].detail})</p></div>
                    <div>수량 : ${1}<br>
                    금액: ${data.item[cartItem].price}원<br>
                    <span class="material-icons-outlined">delete</span></div>
                </div>
            </td>
            <td>1</td>
            <td>${data.item[cartItem].price}원</td>
            <td><span id="${cartItem}" class="material-icons-outlined">delete</span></td><td>-</td>`;
            cartTbody.appendChild(tr);
            tr.addEventListener("click", scdClickOption);
            })
            total.innerText = totalMoney.toLocaleString();
            totalPlus.innerText = (totalMoney+3000).toLocaleString();
        }
    }
}
window.addEventListener('load', inCart);


