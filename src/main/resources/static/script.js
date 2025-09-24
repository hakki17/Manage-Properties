const API_URL = 'http://localhost:8080/api/properties';
let editingId = null;

// Cargar propiedades cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    loadProperties();
    
    // Manejar envío del formulario
    document.getElementById('property-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProperty();
    });
    
    // Manejar cancelar edición
    document.getElementById('cancel-btn').addEventListener('click', function() {
        cancelEdit();
    });
});

// Cargar y mostrar propiedades
async function loadProperties() {
    try {
        const response = await fetch(API_URL);
        const properties = await response.json();
        
        const tbody = document.getElementById('properties-list');
        tbody.innerHTML = '';
        
        properties.forEach(property => {
            tbody.innerHTML += `
                <tr>
                    <td>${property.id}</td>
                    <td>${property.address}</td>
                    <td>${property.price}</td>
                    <td>${property.size} m²</td>
                    <td>${property.description || 'N/A'}</td>
                    <td>
                        <button onclick="editProperty(${property.id})" class="action-btn edit-btn">
                            Editar
                        </button>
                        <button onclick="deleteProperty(${property.id})" class="action-btn delete-btn">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });
        
        document.getElementById('loading').style.display = 'none';
        document.getElementById('properties-table').style.display = 'table';
        
    } catch (error) {
        alert('Error al cargar propiedades');
    }
}

// Guardar o actualizar propiedad
async function saveProperty() {
    const address = document.getElementById('address').value;
    const price = document.getElementById('price').value;
    const size = document.getElementById('size').value;
    const description = document.getElementById('description').value;
    
    const property = {
        address: address,
        price: parseFloat(price),
        size: parseFloat(size),
        description: description
    };
    
    try {
        if (editingId) {
            // Actualizar propiedad existente
            await fetch(`${API_URL}/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(property)
            });
            alert('Propiedad actualizada exitosamente');
        } else {
            // Crear nueva propiedad
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(property)
            });
            alert('Propiedad creada exitosamente');
        }
        
        cancelEdit();
        loadProperties();
        
    } catch (error) {
        alert('Error al guardar propiedad');
    }
}

// Editar propiedad
async function editProperty(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const property = await response.json();
        
        // Llenar formulario con los datos
        document.getElementById('address').value = property.address;
        document.getElementById('price').value = property.price;
        document.getElementById('size').value = property.size;
        document.getElementById('description').value = property.description || '';
        
        // Cambiar estado del formulario
        editingId = id;
        document.getElementById('form-title').textContent = 'Editar Propiedad';
        document.getElementById('submit-btn').textContent = 'Actualizar Propiedad';
        document.getElementById('cancel-btn').style.display = 'inline-block';
        
    } catch (error) {
        alert('Error al cargar propiedad');
    }
}

// Cancelar edición
function cancelEdit() {
    editingId = null;
    document.getElementById('property-form').reset();
    document.getElementById('form-title').textContent = 'Agregar Nueva Propiedad';
    document.getElementById('submit-btn').textContent = 'Agregar Propiedad';
    document.getElementById('cancel-btn').style.display = 'none';
}

// Eliminar propiedad
async function deleteProperty(id) {
    if (confirm('¿Eliminar esta propiedad?')) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            alert('Propiedad eliminada');
            loadProperties();
            
        } catch (error) {
            alert('Error al eliminar');
        }
    }
}