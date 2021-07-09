
let products=[];

if(localStorage.getItem('products')===null){
    localStorage.setItem('products', JSON.stringify(products));
}else{
    products = JSON.parse(localStorage.getItem('products'));
}

let productRatingIndex;
function viewProduct(index){
productRatingIndex = index;

    document.getElementById('view_product').style.display="flex";
    let product = products[index];

    document.getElementById('single_img').src = product.imageurl;
    document.getElementById('single_name').innerText = product.name;
    document.getElementById('single_price').innerText = product.price;
    document.getElementById('single_category').innerText = product.category;
    document.getElementById('noofrating').innerHTML= `(${product.noofrating}) ratings`;

    document.getElementById('gold-star-rate').style.width="0px";
    if(product.noofrating>0){
        let rating = product.rating/product.noofrating;
        document.getElementById('gold-star-rate').style.width=(rating*20)+"%";
    }

    let side_Image = product.side_imageurl.split(',');
    let imageString = "";
    side_Image.forEach((image,index)=>{
        imageString+= `<img class="sideimg" onclick="onChange('${image}')" src='${image}' />`;
    });

    document.getElementById('side_image_display').innerHTML= imageString;

}


function onChange(url){
 document.getElementById('single_img').src= url;
}


function closeProduct(){
    document.getElementById('view_product').style.display="none";
}


function userRate(rating){

    let stars= document.getElementsByClassName('user-rate');

    for(let i=0;i<5;i++){
        stars[i].style.color="gray";
    }

    for(let i=0; i<rating;i++){
        stars[i].style.color="gold";
    }

}

function clearStar(){
    let stars= document.getElementsByClassName('user-rate');
    for(let i=0;i<5;i++){
        stars[i].style.color="gray";
    }

}

function selectRating(rating){
    clearStar()
    let stars= document.getElementsByClassName('user-rate');
    for(let i=0; i<rating;i++){
        stars[i].style.color="gold";
    }
}

function rateProduct(rating){
    let product = products[productRatingIndex];
    
    product.rating += rating;
    product.noofrating+=1;

    products[productRatingIndex]=product;
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts(products);
    if(product.noofrating>0){
        let rating = product.rating/product.noofrating;
        document.getElementById('gold-star-rate').style.width=(rating*20)+"%";
    }
    document.getElementById('noofrating').innerHTML= `(${product.noofrating}) ratings`;
    clearStar()

}


function displayProducts(productArray){
    
    let productString= "";

    productArray.forEach(function(product,index){
        
        const {name,color,price,category,rating,imageurl,noofrating} = product;

          productString+=  `
          <div class="product_parent" onclick="viewProduct(${index})">
          <div class="image">
              <img src="${imageurl}"/>
          </div>
          <div class="content">
              <div class="rate-title">
                  <h2>${name}</h2>
                  <div class="rating">
                    <div class="gray_star">
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </div>  
                    <div class="gold_star" style="width:${noofrating>0?(rating/noofrating)*20:0*20}%">
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </div>  
                  </div>
              </div>
              
              <p style="color:gray;font-family: 'Segoe UI';"> &#x20B9; ${price}</p>
              <p style="color:gray;font-family: 'Segoe UI';">Lorem ipsum dolor, sit amet consectet adipisicing elit. Expedita optio, quod provident voluptate aperiam nemo temporibus.</p>

              <button><i class="fa fa-baby-carriage"></i> Add to cart</button>
          </div>
      </div>
      
          
          `;
    });
    

    document.getElementById('product_display').innerHTML = productString;
}

displayProducts(products);
