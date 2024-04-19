document.addEventListener("DOMContentLoaded", function() {
    // search 
    document.getElementById('search').addEventListener('submit', function(event) {
        event.preventDefault();
        var searched=document.getElementsByName('search').value;
        const products = getProductsFromStorage().filter(product => product.name===searched);
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        products.forEach((product, index) => {
            const productCard = document.createElement('section');
            productCard.classList.add('product');
            if(document.title.trim() ==="DashBoard"){
                productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="description">${product.description}</p>
                <span class="price">$${product.price}</span>
                <div class="product-actions">
                    <button class="edit-button" data-index="${index}">Edit</button>
                    <button class="delete-button" data-index="${index}">Delete</button>
                </div>
            `;
            productList.appendChild(productCard);
            }
            else {
                productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="description">${product.description}</p>
                <span class="price">$${product.price}</span>
            `;
            productList.appendChild(productCard);
            }
        });
    });
    // Function to retrieve product data from local storage
    function getProductsFromStorage() {
        const productsArray = localStorage.getItem('products');
        return JSON.parse(productsArray) || [];
    }

    // Function to save product data to local storage
    function saveProductsToStorage(products) {
        var jsonArray = JSON.stringify(products)
        localStorage.setItem('products', jsonArray);
    }
    

    // Function to display products from local storage
    function displayProducts() {
        const products = getProductsFromStorage();
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        products.forEach((product, index) => {
            const productCard = document.createElement('section');
            productCard.classList.add('product');
            if(document.title.trim() ==="DashBoard"){
                productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="description">${product.description}</p>
                <span class="price">$${product.price}</span>
                <div class="product-actions">
                    <button class="edit-button" data-index="${index}">Edit</button>
                    <button class="delete-button" data-index="${index}">Delete</button>
                </div>
            `;
            productList.appendChild(productCard);
            }
            else {
                productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="description">${product.description}</p>
                <span class="price">$${product.price}</span>
            `;
            productList.appendChild(productCard);
            }
        });
    }

    // Event listener for edit button
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-button')) {
            const index = event.target.dataset.index;
            const products = getProductsFromStorage();
            const productToEdit = products[index]; // Get the product to edit
    
            // Populate the form fields with the data of the product to edit
            document.getElementById("productName").value = productToEdit.name;
            document.getElementById("productDescription").value = productToEdit.description;
            document.getElementById("productPrice").value = productToEdit.price;
            document.getElementById("productImage").value = productToEdit.image;
    
            // Change the form action to edit mode
            document.getElementById("addProductForm").setAttribute("data-mode", "edit");
            document.getElementById("addProductForm").setAttribute("data-index", index);
    
            // Hide the add product button while in edit mode
            document.getElementById('add-product-button').style.display = 'none';
    
            // Scroll to the top of the form
            document.getElementById('addProductForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    

    // Event listener for delete button
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            const index = event.target.dataset.index;
            const products = getProductsFromStorage();
            products.splice(index, 1); // Remove the product at the specified index
            saveProductsToStorage(products); // Save the updated product list to local storage
            displayProducts(); // Refresh the displayed product list
            alert('Delete button clicked for product at index: ' + index);
        }
    });

    // Event listener for add product button
    if(document.title.trim() === "DashBoard"){
    document.getElementById('add-product-button').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission
        
        const newProduct = document.createElement('div');
        newProduct.classList.add('addProduct');
        newProduct.innerHTML = `
            <form id="addProductForm" enctype="multipart/form-data">
                <label for="productName">Product Name:</label>
                <input type="text" id="productName" name="productName" required>
                
                <label for="productDescription">Description:</label>
                <textarea id="productDescription" name="productDescription" required></textarea>
                
                <label for="productPrice">Price:</label>
                <input type="number" id="productPrice" name="productPrice" step="0.01" required>
                
                <label for="productImage">Product Img URL:</label>
                <input type="text" id="productImage" name="productImage" required>
                
                <button type="submit">Add Product</button>
            </form>
        `;
        document.getElementById('add-product-button').style.display = 'none';
        document.getElementById('aside').appendChild(newProduct);

        // Event listener for form submission
        document.getElementById("addProductForm").addEventListener('submit', () => {
            var products = getProductsFromStorage();
            var product = {
                image: document.getElementById("productImage").value,
                name: document.getElementById("productName").value,
                description: document.getElementById("productDescription").value,
                price: document.getElementById("productPrice").value
            };
            products.push(product);
            saveProductsToStorage(products);
            displayProducts();
            newProduct.remove(); // Remove the form after submission
            document.getElementById('add-product-button').style.display = 'initial';
        });
    });

    // Event listener for delete all products button
    document.getElementById('delete-all-button').addEventListener('click', () => {
        localStorage.removeItem('products'); // Clear all products from local storage
        displayProducts(); // Refresh the displayed product list
        alert('Delete All Products button clicked');
    });
    }

    // Display products when the page loads
    displayProducts();
   

});
if(document.title.trim()==="RBK Shop"){
document.addEventListener("DOMContentLoaded", function() {
    const slideImages = document.querySelectorAll('.carousel-slide img');
    let currentSlide = 0;
  
    // Show initial slide
    slideImages[currentSlide].style.display = 'block';
  
    // Function to move to the next slide
    function nextSlide() {
      slideImages[currentSlide].style.display = 'none';
      currentSlide = (currentSlide + 1) % slideImages.length;
      slideImages[currentSlide].style.display = 'block';
    }
  
    // Function to move to the previous slide
    function prevSlide() {
      slideImages[currentSlide].style.display = 'none';
      currentSlide = (currentSlide - 1 + slideImages.length) % slideImages.length;
      slideImages[currentSlide].style.display = 'block';
    }
  
    // Event listeners for next and previous buttons
    document.querySelector('.next-btn').addEventListener('click', nextSlide);
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);
  });
}