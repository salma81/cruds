// getTotal Function
var price=document.getElementById('price');
var ads=document.getElementById('ads');
var taxes=document.getElementById('taxes');
var discount=document.getElementById('discount');
var total=document.getElementById('total');
var count=document.getElementById('count');
var create=document.getElementById('create');
var title=document.getElementById('title');
var category=document.getElementById('category');
var searchInput =document.getElementById("search")
var tableBody=document.getElementById("tableBody")
var tmp;
var mood='Create';
function getTotal(){

    if(price.value !=''){
       var result=(+price.value + +ads.value + +taxes.value) - +discount.value;
       total.innerHTML=result;
       total.style.backgroundColor='#040';
    }else{
        total.innerHTML=' ';
        total.style.backgroundColor='#a00d02';
    }
}
// create product function
   var products=[];
   if(localStorage.product != null){
    products= JSON.parse(localStorage.product);

   }else{
    products=[];
   }
  
  create.onclick=function createProduct(){
    var newProduct={
        title:title.value,
        price:price.value,
        ads:ads.value,
        taxes:taxes.value,
        price:price.value,
        discount:discount.value,
        total:total.innerHTML,
        category:category.value,
        count:count.value
    }
    products.push(newProduct);
    localStorage.setItem('product' ,JSON.stringify(products));
    // count product 
    if(mood==='Create'){
        if(newProduct.count>1){
            for(var i=0;i<newProduct.count;i++){
                products.push(newProduct);
    
            }
    
        }else{
            products.push(newProduct);
        }
    }else{
        products[tmp]=newProduct;
        mood='Create'
        create.innerHTML='Create';
        count.style.display='block';

    }
    

    clearData();
    readData();
}
// clear data function 
function clearData(){
     title.value='';
     price.value='';
     ads.value='';
     taxes.value='';
     discount.value='';
     total.innerHTML='';
     count.value='';
     category.value='';
}
// read data function 
function readData(){
      var table='';
      for(var i=0;i<products.length;i++){
           table+= `
           <tr>
           <td>${i}</td>
           <td>${products[i].title}</td>
           <td>${products[i].price}</td>
           <td>${products[i].taxes}</td>
           <td>${products[i].ads}</td>
           <td>${products[i].discount}</td>
           <td>${products[i].total}</td>
           <td>${products[i].category}</td>
           <td><button onclick='updateData(${i})'>update</button></td>
           <td><button onclick='Delete(${i})'>delete</button></td>
          </tr>
           `
      }

      tableBody.innerHTML=table;
      var btn=document.getElementById("deleteAll");
      if(products.length>0){
         btn.innerHTML=`
         <button onclick='DeleteAll()'>delete All</button>
         `
        
}else{
 btn.innerHTML='';}}
readData();
// delete row function 
function Delete(i){
     products.splice(i,1);
     localStorage.product=JSON.stringify(products);
     readData();
}
// DeleteAll function
function DeleteAll(){
    localStorage.clear();
    products.splice(0);
    readData();

}
// update function 
function updateData(i){
    title.value=products[i].title;
    price.value=products[i].price;
    taxes.value=products[i].taxes;
    ads.value=products[i].ads;
    discount.value=products[i].discount;
    category.value=products[i].category;
    create.innerHTML='update'
    getTotal();
   count.style.display='none'; 
   mood='update'; 
   tmp=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}
// search function 
function search() {
  // Assuming 'search' is an input element
  var searchItem = searchInput.value;
  var table = '';

  for (var i = 0; i < products.length; i++) {
    if (products[i].title.toLowerCase().includes(searchItem.toLowerCase())) {
      table += `
        <tr>
          <td>${i}</td>
          <td>${products[i].title}</td>
          <td>${products[i].price}</td>
          <td>${products[i].taxes}</td>
          <td>${products[i].ads}</td>
          <td>${products[i].discount}</td>
          <td>${products[i].total}</td>
          <td>${products[i].category}</td>
          <td><button onclick='updateData(${i})'>update</button></td>
          <td><button onclick='Delete(${i})'>delete</button></td>
        </tr>
      `;
    }
  }

  // Assuming 'tableBody' is the ID of the tbody element
  document.getElementById('tableBody').innerHTML = table;

}


   


  
        

     
     
     
     


