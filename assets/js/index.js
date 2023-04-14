var productName = document.getElementById("ProductNameInput");
var productPrice = document.getElementById("ProductPriceInput");
var productCategory = document.getElementById("ProductCategoryInput");
var productDescription = document.getElementById("ProductDescriptionInput");
var btnProduct = document.getElementById("btnProduct");
var currentIndex = 0;
var products = [];
if(localStorage.getItem("store") != null)
{
  products = JSON.parse(localStorage.getItem("store"));
  displayProduct();
}

function addProduct()
{
  if(validateProduct() ==true)
  {
    if(btnProduct.innerHTML == "Add Product")
    {
      var oneProduct = 
      {
        pName : productName.value,
        pPrice : productPrice.value,
        pCate : productCategory.value,
        pDesc : productDescription.value,
      }
        products.push(oneProduct);
        clearProductInputs();
        localStorage.setItem("store",JSON.stringify(products));
        displayProduct();
    }
    else
    {
      updateProduct();
    }

    }  
    else
    {
      alert("error")
    }

  }

function displayProduct()
{
  var cartona = "";
  for(var i = 0 ; i < products.length ; i++)
  {
    cartona += `
      <tr>
      <td>${i+1}</td>
      <td>${products[i].pName}</td>
      <td>${products[i].pPrice}</td>
      <td>${products[i].pCate}</td>
      <td>${products[i].pDesc}</td>
      <td><button onclick="getData(${i})" class="btn btn-warning">Update</button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
      </tr>
    `
  }
  document.getElementById("productTable").innerHTML = cartona;
}

function clearProductInputs()
{
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = null;
}

function deleteProduct(index)
{
  products.splice(index,1);
  localStorage.setItem("store",JSON.stringify(products));
  displayProduct();
} 

function getData(index)
{
  currentIndex = index;
  productName.value = products[index].pName;
  productPrice.value = products[index].pPrice;
  productCategory.value = products[index].pCate;
  productDescription.value = products[index].pDesc;
  btnProduct.innerHTML = "Update Product"
}

function updateProduct()
{
  var oneProduct = 
  {
    pName : productName.value,
    pPrice : productPrice.value,
    pCate : productCategory.value,
    pDesc : productDescription.value,
  }
  products[currentIndex] = oneProduct;
  localStorage.setItem("store",JSON.stringify(products));
  btnProduct.innerHTML = "Add Product"
  clearProductInputs();
  displayProduct();
}
function searchProduct(term)
{
  var cartona = "";
  for(var i = 0 ; i < products.length ; i++)
  {
    if(products[i].pName.toLowerCase().includes(term.toLowerCase()) == true)
    {
      cartona += `
      <tr>
      <td>${i+1}</td>
      <td>${products[i].pName}</td>
      <td>${products[i].pPrice}</td>
      <td>${products[i].pCate}</td>
      <td>${products[i].pDesc}</td>
      <td><button onclick="updateproduct(${i})" class="btn btn-warning">Update</button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
      </tr>
    `
    }
  }
  document.getElementById("productTable").innerHTML = cartona;
}

function validateProduct(term)
{
  var regex = /^([A-Z]|[a-z]){3,15}$/
  if(regex.test(productName.value) == true)
  {
    return true;
  }
  else
  {
    return false;
  }
}
