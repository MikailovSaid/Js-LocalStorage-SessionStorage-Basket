import { getProductCount } from "./common.js"

let table = document.getElementById("table");
let countElem = document.querySelector("sup");
let clearBtn = document.getElementById("clear-btn")

let products = [];
if (JSON.parse(localStorage.getItem("products")) != null) {
    products = JSON.parse(localStorage.getItem("products"));
}

getProductList(products);

function getProductList(list) {
    for (const product of list) {
        table.lastElementChild.innerHTML += `<tr>
        <th data-id="${product.Id}">
            <img src="${product.img}" style="height:100px" alt="">
        </th>
        <td style="padding-top: 45px">${product.name}</td>
        <td style="padding-top: 45px; padding-left: 25px;">${product.count}</td>
        <td id="x-button" style="padding-top: 45px; padding-left: 20px; cursor: pointer;"><i class="fas fa-times"></i></td>
        </tr>`;
    }
}
let xBtn = document.querySelectorAll("#x-button");
xBtn.forEach(btn=>{
    btn.onclick = function () {
        for (const product of products) {
            let id = this.parentNode.firstElementChild.getAttribute("data-id");
            products.splice(product,1);
            localStorage.setItem("products", JSON.stringify(products));
        }
        btn.parentNode.innerHTML="";
        countElem.innerText = getProductCount(products);

    }
})
// for (const item of xBtn) {
//     item.addEventListener("click", function () {
//         for (let product = 0; product < products.length; product++) {
//             products.splice(product,1)
//             localStorage.setItem('product-info',  JSON.stringify(product));
//         }
//         // let productName = product.name;
//         // localStorage.removeItem('product-info');
//         document.location.reload(true);

//     })
// }

clearBtn.addEventListener("click", function () {
    localStorage.removeItem("products");
    document.location.reload(true);
})

countElem.innerText = getProductCount(products);