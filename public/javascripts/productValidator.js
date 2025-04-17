const $ = (e) => document.getElementById(e)

const formAddProduct = document.getElementById('formAddProduct')
const inputName = document.getElementById('name')
const inputPrice = document.getElementById('price')
const inputDiscount = document.getElementById('discount')
const inputDescription = document.getElementById('description')
const selectSecction = document.getElementById('section')
const selectBrand = document.getElementById('brand')
const selectCategory = document.getElementById('category')
const selectSubcategory = document.getElementById('subcategory')
const inputImage = document.getElementById('image')
const imagePreview = document.getElementById('image-preview')

inputName.addEventListener('blur', function() {
    switch (true) {
        case this.value.length < 2:
           showError('name', 'El nombre debe tener al menos 2 caracteres')
            break;
        case this.value.length > 100:
          showError('name', 'El nombre debe tener menos de 100 caracteres')
            break;
        default:
           cleanError('name')
            break;
    }
});

inputPrice.addEventListener('blur', function() {
    switch (true) {
        case this.value < 1:
          showError('price', 'El precio debe ser mayor a 0')
            break;
        case this.value > 1000000:
           showError('price', 'El precio debe ser menor a 1.000.000')
            break;
        default:
            cleanError('price')
            break;
    }
})
inputDiscount.addEventListener('blur', function() {
    switch (true) {
        case this.value < 0:
           showError('discount', 'El descuento debe ser mayor a 0')
            break;  
        case this.value > 100:      
           showError('discount', 'El descuento debe ser menor a 100')
            break;  
        default:            
           cleanError('discount')
            break; 
    }
})
inputDescription.addEventListener('blur', function() {
    switch (true) {
        case this.value.length < 20:
            showError('description', 'La descripción debe tener al menos 20 caracteres')
            break;                  
        case this.value.length > 500:
            showError('description', 'La descripción debe tener no más de 500 caracteres')
            break;
        default:    
           cleanError('description')
            break;
    }
});

selectSecction.addEventListener('blur', function() {
    if (this.value == '') {
        showError('section', 'Debes elegir una sección')
    }else {
        cleanError('section')
    }
})
selectBrand.addEventListener('blur', function() {
    if (this.value == '') {
        showError('brand', 'Debes elegir una marca')
    }else {
        cleanError('brand')
    }
})
selectCategory.addEventListener('blur', function() {
    if (this.value == '') {
        showError('category', 'Debes elegir una categoría')
    }else {
        cleanError('category')
    }
})
selectSubcategory.addEventListener('blur', function() {
    if (this.value == '') {
        showError('subcategory', 'Debes elegir una subcategoría')
    }else {
        cleanError('subcategory')
    }
})

inputImage.addEventListener('change', function() {
    let file = this.files[0]
    let type = file.type
    let name = file.name
    let size = file.size
    let extension = name.split('.')[1]
    let extensionsValid = ['png', 'jpg', 'jpeg', 'gif','webp']
    cleanError('image');
    $('box-image-preview').classList.remove('border-danger')
    if (extensionsValid.includes(extension)) {
        if (size <= 1000000) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function(e) {
                let route = e.target.result                
                    imagePreview.setAttribute('src', route);
                    imagePreview.setAttribute('alt', name);
            }
        }else {
            $('box-image-preview').classList.add('border-danger')
            showError('image', 'La imagen debe pesar menos de 1MB')
        }
    }else {
        $('box-image-preview').classList.add('border-danger')
        showError('image', 'La imagen debe ser un archivo con extensión png, jpg, jpeg, webp o gif')
    }
})

const showError = (field, msg) => {
    $(field).classList.remove('is-valid')                    
    $(field).classList.add('is-invalid')
    $(`${field}-error`).innerHTML = msg
}

const cleanError = (field) => {
    $(field).classList.remove('is-invalid')
    $(field).classList.add('is-valid')                    
    $(`${field}-error`).innerHTML = null
}

formAddProduct.addEventListener('submit', function(e) {
    let error = false
    let elementsForm = this.elements
    
    for (let index = 0; index < elementsForm.length - 2; index++) {
        
        if (elementsForm[index].value == '' || elementsForm[index].classList.contains('is-invalid')) {
            elementsForm[index].classList.add('is-invalid')
            error = true
        }
    }

    if (error) {
        e.preventDefault()
        $('form-error').innerHTML = 'Los campos señalados son obligatorios'
    }else {
        this.submit()
    }   
})