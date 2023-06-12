
//Variables
const nameInput = document.getElementById("name-input");
const ProductInput = document.getElementById("product-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const updateNameInput = document.getElementById("update-name-input");
const updateProductInput = document.getElementById("update-product-input");
const updatePriceInput = document.getElementById("update-price-input");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let users = JSON.parse(localStorage.getItem("users")) || [];
if (!Array.isArray(users)) {
  users = [];
}
let currentUserID =null;
//const validRegex =/^[a-zA-Z0-9.!#$%&'*+'*+,-./=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-z0-9]+)*$/;

 //Functions

function  renderTable(){
    tableBody.innerHTML = "";
    for(let i=0; i < users.length; i++){
        const user = users[i];
        const tr = document.createElement("tr");
        const idTd = document.createElement("td");
        const nameTd = document.createElement("td");
        const productTd = document.createElement("td");
        const priceTd = document.createElement("td");
        const actionsTd = document.createElement("td");
        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        idTd.innerText = user.id;
        nameTd.innerText = user.name;
        productTd.innerText = user.product;
        priceTd.innerText = user.price;
        editBtn.innerText = "Edit";
        deleteBtn.innerText = "Delete";
        document.getElementById("update-container").style.display = "none";
        editBtn.addEventListener("click",() =>{
            showUpdateForm(user.id);
        });
        deleteBtn.addEventListener("click",() =>{
            deleteUser(user.id);
           
    });
    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);
    tr.appendChild(idTd);
    tr.appendChild(nameTd);
    tr.appendChild(productTd); 
    tr.appendChild(priceTd);
    tr.appendChild(actionsTd);
   
    tableBody.appendChild(tr);


}

 }

 ////////////////////////////////////////////////////////////////

 function addUser() {
    const name = nameInput.value.trim();
    const product = ProductInput.value.trim();
    const price = parseFloat(priceInput.value.trim());
    //if (product.match(validRegex)) {
        if (name && product != null) {
            var id = 1;
            var val = users.map(function (x) { return x.id; }).indexOf(id);
            while (val != -1) {
                id++;
                val = users.map(function (x) { return x.id; }).indexOf(id);
            }

            const user = {
                id: id,
                name: name,
                product: product,
                price: price.toLocaleString() // Agregar el separador de miles
            };

            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            nameInput.value = "";
            ProductInput.value = "";
            priceInput.value = "";

            renderTable();
       // } else {
           // alert("Name is Required");
       // }
    } else {
        alert("invalid product address!");
    }
}

function updateUser() {
    const name = updateNameInput.value;
    const product = updateProductInput.value;
    const price = parseFloat(updatePriceInput.value.trim());
   // if (product.match(validRegex)) {
        const index = users.findIndex((user) => user.id === currentUserID);
        if (index !== -1) {
            users[index].name = name;
            users[index].product = product;
            users[index].price = price.toLocaleString(); // Agregar el separador de miles
            localStorage.setItem('users', JSON.stringify(users));
            hideUpdateForm();
            renderTable();
            showAlert("Elemento actualizado exitosamente", 5000);
        }
   // } else {
     //   alert("Invalid product address!");
   // }
}

function showAlert(message, duration) {
    const alertContainer = document.createElement("div");
    alertContainer.className = "alert";
    alertContainer.textContent = message;
    document.body.appendChild(alertContainer);

    setTimeout(() => {
        alertContainer.remove();
    }, duration);
}

 ////////////////////////////////////////////////////////////////

 function showUpdateForm(userId){
    const user = users.find((user)=> user.id === userId);
    
    if(user){
        updateNameInput.value = user.name;
        updateProductInput.value = user.product;
        updatePriceInput.value = user.price;
        currentUserID = user.id;
        updateBtn.addEventListener("click", updateUser);
        cancelBtn.addEventListener("click", hideUpdateForm);
        document.getElementById("update-container").style.display = "block";
    }
 }

 function hideUpdateForm(){
    updateNameInput.value = "";
    updateProductInput.value = "";
   updatePriceInput.value = "";
    currentUserID = null;   
    updateBtn.removeEventListener("click", updateUser);
    cancelBtn.removeEventListener("click", hideUpdateForm);
    document.getElementById("update-container").style.display = "none";
 }

 function deleteUser(userId){
    users = users.filter((user) => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(users)); 
    if(users.length == 0){
       hideUpdateForm();
    };
    renderTable();
 }

 addBtn.addEventListener("click", addUser);

 //Initialize table
 renderTable();
