
/* let listProduct = [
    {
        name: "I Phone 5",
        price: "3000000",
        image: "image/anh1.jpg",
        id: 1,
    },
    {
        name: "I Phone 6",
        price: "3000000",
        image: "image/anh2.jpg",
        id: 2,
    },
    {
        name: "I Phone 7",
        price: "3000000",
        image: "image/anh1.jpg",
        id: 3,
    },
    {
        name: "I Phone 8",
        price: "3000000",
        image: "image/anh4.jpg",
        id: 4,
    },
    {
        name: "I Phone 9",
        price: "3000000",
        image: "image/anh5.jpg",
        id: 5,
    },
]
localStorage.setItem("listProducts", JSON.stringify(listProduct)); */

let listProduct = JSON.parse(localStorage.getItem("listProducts"));
function renderListProducts(listProductAll){
    let data='';
    
    console.log("listProductAll", listProductAll);
    for (let i = 0; i<listProductAll.length; i++) {
        data+= `
            <div class="product">
                <img src="${listProductAll[i].image}" alt="">
                <p> ${listProductAll[i].name} </p>
                <label for="price"> ${listProductAll[i].price} </label> <br>
                <div>
                    <input type="number" value="1">
                    <i onclick="addToCart(${listProductAll[i].id})"
                     class="fa-solid fa-cart-shopping"></i>
                </div>
            </div>
        `
    }
    document.getElementById("showProduct").innerHTML=data;
}
renderListProducts(listProduct);
// function add to cart
function addToCart(id) {
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    // console.log("listProduct", listProducts);
    // console.log("id",id);
    // lấy list product khi add vào giỏ hàng.
    // key listProductCart là giỏ hàng của mình
   let listProductCart= localStorage.getItem("listProductCart");
   if(listProductCart==null){
    // trường hợp khách hàng chưa  mua hàng .
        listProductCart=[];
    // lấy thông tin sản phẩm mà khách hàng mua.
       for (let i = 0; i < listProducts.length; i++) {
                if(listProducts[i].id==id){
                    listProductCart.push(listProducts[i]);
                    localStorage.setItem("listProductCart",
                    JSON.stringify(listProductCart));
                    break;
                }
        }
        // listProduct.push();
   }else{
    // trường hợp trong giỏ hàng đã có sản phẩm rồi add thêm sản phẩm .
    /* 
        1. sản phẩm đã tồn tại trong giỏ hàng.
        2. sản phẩm chưa tồn tại trong giỏ hàng.
     */
       let  listProductAddCart = JSON.parse(listProductCart);
       for (let i = 0; i < listProducts.length; i++) {
        let flag=false;
           if (listProducts[i].id == id) {
               for (let j = 0; j < listProductAddCart.length; j++) {
                   if (listProductAddCart[j].id==id){  
                        flag=true;
                        break;
                   }else{
                       flag=false;
                   }
                }
                if(flag==true){
                    console.log("sản phẩm đã có trong giỏ hàng!");
                }else{
                    listProductAddCart.push(listProducts[i]);
                    localStorage.setItem("listProductCart",
                     JSON.stringify(listProductAddCart));
                }
           }
       }
   }
}
function searchProduct() {
    let listRender = [];
    let valueInput = document.getElementById("search").value.toUpperCase();
    for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].name.toUpperCase().indexOf(valueInput) != -1){
            console.log("11111");
            listRender.push(listProduct[i])
        }
  }
    renderListProducts(listRender);
}
