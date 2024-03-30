window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("productid");
  console.log("params", myParam);
  //call api load lên giao diện

  // hàm lấy thông tin sản phẩm
  function getDataItemDetail() {
    var promise = axios({
      method: "GET",
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${myParam}`,
    });
    promise
      .then(function (result) {
        renderDataItemDetail(result.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getDataItemDetail();

  // hiển thị lên giao diện
  function renderDataItemDetail(arr) {
    var content = "";
    console.log(arr);
    content += `
    <div class="content_detail">
    <div class="left_content">
      <div class="img_top">
        <img src="${arr.image}" alt="">
      </div>
  
    </div>
    <div class="right_content">
      <h2>${arr.name}</h2>
      <div class="start_reviews">
        <div class="start">
          <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
        </div>
        <div class="reviews">
          <p>Reviews</p>
        </div>
      </div>
      <div class="price">
        <i class="fa-solid fa-dollar-sign"></i>${arr.price}.00
      </div>
      <div class="size_detail">
        ${arr.size
          .map((item) => {
            return `<div class="size">${item}</div>`;
          })
          .join("")}
      </div>
      <div class="description">
        <p>${arr.shortDescription}</p>
      </div>
      <div class="add">
        <button class="add_to_cart">Add To Cart</button>
      </div>
      <div class="social">
        <div class="social_fb">
          <i class="fa-brands fa-facebook-f"></i>
          <p>Like</p>
        </div>
        <div class="social_tw">
          <i class="fa-brands fa-twitter"></i>
          <p>Tweet</p>
        </div>
        <div class="social_S">
          <i class="fa-brands fa-pinterest"></i>
          <p>Save</p>
        </div>
        <div class="social_gg">
          <i class="fa-brands fa-google-plus-g"></i>
          <p>Share</p>
        </div>
      </div>
    </div>
  </div>
        `;
    document.querySelector(".demo_detail_vinh").innerHTML = content;
  }
};
let arrItem = [];

// hàm lấy danh sách sản phẩm
function getDataItem() {
  var promise = axios({
    method: "GET",
    url: "https://shop.cyberlearn.vn/api/Product",
  });
  promise
    .then(function (result) {
      arrItem = result.data.content;
      renderDataItem(result.data.content);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getDataItem();

// hiển thị lên giao diện
function renderDataItem(arr) {
  var content = "";

  for (let i = 0; i < arr.length; i++) {
    var item_SP = arr[i];
    content += `
    <div class="col-xl-3 col-lg-4 col-sm-6">
    <div class="item_product-gallery">
      <!-- call api -->
      <div class="item">
        <div class="item_top">
        <a href="./../pages/detail.html?productid=${item_SP.id}"><img src="${item_SP.image}" alt=""></a>
        </div>
        <div class="product_group">
          <div class="name_item">
            <h3>${item_SP.name}</h3>
          </div>
          <div class="price_shop">
            <div class="price">
              <p><i class="fa-solid fa-dollar-sign"></i>${item_SP.price}.00</p>
            </div>
            <div class="shopping">
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        <div class="ratings_buy">
          <div class="ratings">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <div class="buy">
            <a href="./../pages/detail.html?productid=${item_SP.id}">Buy now</a>
          </div>
        </div>
        </div>
        
      </div>
      </div>
      
    </div>
        `;
  }
  document.querySelector(".gallery_product-gallery").innerHTML = content;
}
