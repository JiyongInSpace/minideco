// index.js

const categoryUrl = `https://raw.githubusercontent.com/JiyongInSpace/minideco/main/data/category.json`;

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
                    <img src="${items.image}" alt="image${index}">
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
            categoryCons.appendChild(div);
        })
    }
}
window.addEventListener('load', init);