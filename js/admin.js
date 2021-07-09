
function toggleAddModel(event){

    let open = true;
    if(event.target.className.includes("closemodel")){
        open=false;
    }else{
        open=true;
    }

    let model = document.getElementById('add_model');
    open===true?model.style.display="flex":model.style.display="none";
}

function toggleAlertModel(event){

    let open = true;
    if(event.target.className.includes("exit")){
        open=false;
    }else{
        open=true;
    }

    let model = document.getElementById('alert');
    open===true?model.style.display="flex":model.style.display="none";
}

let productToUpdate;
let indexToUpdate;

function toggleUpdateModel(event,index=null){

    let open = true;
    if(event.target.className.includes("closemodel")){
        open=false;
    }else{
        open=true;
    }

    let model = document.getElementById('update_model');
    open===true?model.style.display="flex":model.style.display="none";

    if(index!==null){
        indexToUpdate=index;
        productToUpdate = products[index];
        document.getElementById('update_name').value = productToUpdate.name;
        document.getElementById('update_color').value = productToUpdate.color;
        document.getElementById('update_price').value = productToUpdate.price;
        document.getElementById('update_category').value = productToUpdate.category;
        document.getElementById('update_imageurl').value = productToUpdate.imageurl;
        document.getElementById('update_side_imageurl').value = productToUpdate.side_imageurl;
    }
}


let products=[];

if(localStorage.getItem('products')===null){
    localStorage.setItem('products', JSON.stringify(products));
}else{
    products = JSON.parse(localStorage.getItem('products'));
}

function updateProduct(){
   

    productToUpdate.name=document.getElementById('update_name').value;
    productToUpdate.color=document.getElementById('update_color').value;
    productToUpdate.price=document.getElementById('update_price').value;
    productToUpdate.category=document.getElementById('update_category').value;
    productToUpdate.imageurl=document.getElementById('update_imageurl').value;
    productToUpdate.side_imageurl=document.getElementById('update_side_imageurl').value;
    productToUpdate.noofrating=0;

    var alert =document.getElementsByClassName('alert');
    if(productToUpdate!==null){
        products[indexToUpdate] = productToUpdate;
        localStorage.setItem('products',JSON.stringify(products));
        displayProducts(products);
        alert[0].style.display='flex';
        alert[1].style.display='flex';
        

    }else{
        
    }
    
}
 



function addProduct(){
    let product={rating:0,noofrating:0};

    product.name=document.getElementById('add_name').value;
    product.color=document.getElementById('add_color').value;
    product.price=document.getElementById('add_price').value;
    product.category=document.getElementById('add_category').value;
    product.imageurl=document.getElementById('add_imageurl').value;
    product.side_imageurl=document.getElementById('side_imageurl').value;

    document.getElementById('clear_form').reset();
    if(product!==null){
        alert("Product added successfully")
        products.push(product);

        localStorage.setItem('products',JSON.stringify(products));
    
        displayProducts(products);
    }else{
        localStorage.setItem('products',JSON.stringify(products));
    }
    
}

function deleteProduct(index){
    let conform =  confirm("Do you want to delete?");
    if(conform===true){
        products.splice(index,1);
        displayProducts(products);
    localStorage.setItem('products',JSON.stringify(products));
    }else{
        displayProducts(products);
    localStorage.setItem('products',JSON.stringify(products));
    }
    
    
}




function displayProducts(productArray){
    
    let productString= "";

    productArray.forEach(function(product,index){
        
        const {name,color,price,category,rating} = product;

          productString+=  `
          <tr>
            <td>${index+1}</td>
            <td>${name}</td>
            <td>${color}</td>
            <td>${price}</td>
            <td>${category}</td>
            <td>${rating}</td>
            <td>
             <button class="btn1" onclick="toggleUpdateModel(event,${index})">Update</button>
             <button class="btn2" onclick="deleteProduct(${index})">Delete</button>
             </td>
          </tr>
          
          `;
    });
    

    document.getElementById('data').innerHTML = productString;
}

displayProducts(products);


