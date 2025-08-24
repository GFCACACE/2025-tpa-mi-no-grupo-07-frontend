document.addEventListener('DOMContentLoaded', function() {
            // Elementos del DOM
            const uploadForm = document.getElementById('uploadForm');
            const logoUpload = document.getElementById('logoUpload');
            const logoInput = document.getElementById('logoInput');
            const logoPreview = document.getElementById('logoPreview');
            const multimediaUpload = document.getElementById('multimediaUpload');
            const multimediaInput = document.getElementById('multimediaInput');
            const uploadedFiles = document.getElementById('uploadedFiles');
            const browseLink = document.querySelector('.browse-link');
            const openMapBtn = document.getElementById('openMapBtn');
            const mapModal = document.getElementById('mapModal');
            const closeMapModal = document.getElementById('closeMapModal');
            const confirmLocationBtn = document.getElementById('confirmLocationBtn');
            const locationInput = document.getElementById('fact-location');
            
            // Cargar logo
            logoUpload.addEventListener('click', function() {
                logoInput.click();
            });
            
            logoInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const file = this.files[0];
                    
                    // Validar que sea una imagen
                    if (!file.type.startsWith('image/')) {
                        alert('Por favor, selecciona un archivo de imagen válido.');
                        return;
                    }
                    
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        logoPreview.innerHTML = `
                            <div class="preview-item">
                                <img src="${e.target.result}" alt="Vista previa del logo">
                                <button type="button" class="remove-preview" onclick="removeLogo()">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        `;
                    }
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // Función global para eliminar el logo (necesaria para el onclick)
            window.removeLogo = function() {
                logoPreview.innerHTML = '';
                logoInput.value = '';
            };
            
            // Cargar multimedia
            multimediaUpload.addEventListener('click', function(e) {
                if (!e.target.classList.contains('browse-link')) {
                    multimediaInput.click();
                }
            });
            
            browseLink.addEventListener('click', function(e) {
                e.stopPropagation();
                multimediaInput.click();
            });
            
            multimediaInput.addEventListener('change', function() {
                handleFiles(this.files);
            });
            
            // Permitir arrastrar y soltar archivos
            multimediaUpload.addEventListener('dragover', function(e) {
                e.preventDefault();
                multimediaUpload.classList.add('dragover');
            });
            
            multimediaUpload.addEventListener('dragleave', function() {
                multimediaUpload.classList.remove('dragover');
            });
            
            multimediaUpload.addEventListener('drop', function(e) {
                e.preventDefault();
                multimediaUpload.classList.remove('dragover');
                
                if (e.dataTransfer.files.length) {
                    handleFiles(e.dataTransfer.files);
                }
            });
            
            // Función para manejar los archivos seleccionados
            function handleFiles(files) {
                const currentFiles = uploadedFiles.querySelectorAll('.uploaded-file').length;
                
                if (currentFiles + files.length > 10) {
                    alert('Solo puedes subir un máximo de 10 archivos.');
                    return;
                }
                
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    
                    // Validar tipo de archivo
                    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
                        alert(`El archivo "${file.name}" no es una imagen o video válido.`);
                        continue;
                    }
                    
                    const fileElement = createFileElement(file);
                    uploadedFiles.appendChild(fileElement);
                }
            }
            
            // Función para crear un elemento de archivo
            function createFileElement(file) {
                const fileElement = document.createElement('div');
                fileElement.className = 'uploaded-file';
                
                const fileIcon = document.createElement('i');
                fileIcon.className = 'fas fa-file';
                
                // Determinar el icono según el tipo de archivo
                if (file.type.startsWith('image/')) {
                    fileIcon.className = 'fas fa-file-image';
                } else if (file.type.startsWith('video/')) {
                    fileIcon.className = 'fas fa-file-video';
                }
                
                const fileName = document.createElement('span');
                fileName.className = 'file-name';
                fileName.textContent = file.name;
                
                const fileSize = document.createElement('span');
                fileSize.className = 'file-size';
                fileSize.textContent = formatFileSize(file.size);
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-file';
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.addEventListener('click', function() {
                    fileElement.remove();
                });
                
                fileElement.appendChild(fileIcon);
                fileElement.appendChild(fileName);
                fileElement.appendChild(fileSize);
                fileElement.appendChild(removeBtn);
                
                return fileElement;
            }
            
            // Función para formatear el tamaño del archivo
            function formatFileSize(bytes) {
                if (bytes === 0) return '0 Bytes';
                
                const k = 1024;
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                
                return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
            }
            
            // Mapa modal
            openMapBtn.addEventListener('click', function() {
                mapModal.style.display = 'flex';
            });
            
            closeMapModal.addEventListener('click', function() {
                mapModal.style.display = 'none';
            });
            
            confirmLocationBtn.addEventListener('click', function() {
                // Simular la selección de una ubicación
                locationInput.value = 'Avenida Principal 123, Ciudad';
                mapModal.style.display = 'none';
            });
            
            // Cerrar modal al hacer clic fuera del contenido
            window.addEventListener('click', function(e) {
                if (e.target === mapModal) {
                    mapModal.style.display = 'none';
                }
            });
            
            // Manejar el envío del formulario
            uploadForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validaciones básicas
                if (!logoInput.files || !logoInput.files[0]) {
                    alert('Por favor, sube un logo para el hecho.');
                    return;
                }
                
                if (!locationInput.value) {
                    alert('Por favor, selecciona una ubicación en el mapa.');
                    return;
                }
                
                // Simular envío exitoso
                fetch('http://localhost:8030/hecho', {
                    method: 'POST',
                    // headers y body según tu backend
                    body: JSON.stringify({
                        titulo: document.getElementById('fact-title').value,
                        descripcion: document.getElementById('fact-description').value,
                        categoria: document.getElementById('fact-category').value,
                        ubicacion: document.getElementById('fact-location').value,
                        contenidoMultimedia: document.getElementById('fact-multimedia').value,
                        fechaDelhecho: document.getElementById('fact-date').value,
                        horaDelhecho: document.getElementById('fact-time').value,
                        etiquetas: document.getElementById('fact-tags').value.split(',').map(tag => tag.trim())


                    })
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error al subir el hecho.');
                    }
                })
                .then(data => {
                    alert('Hecho subido exitosamente.');
                    // Limpiar el formulario
                    uploadForm.reset();
                    // logoPreview.innerHTML = '';
                    // uploadedFiles.innerHTML = '';
                    // locationInput.value = '';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Hubo un error al subir el hecho. Por favor, intenta nuevamente.');
                });
                
                // Redirigir después de enviar (simulado)
                setTimeout(function() {
                    window.location.href = 'navegarHechos.html';
                }, 1500);
            });
            
            // Manejar cancelación
            const cancelBtn = document.querySelector('.cancel-btn');
            cancelBtn.addEventListener('click', function() {
                if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
                    window.location.href = 'navegarHechos.html';
                }
            });
        });

        let map;
        let marker;
        let selectedLatLng = null;

        function initMap() {
            if (map) return; // No volver a inicializar si ya está creado

            map = L.map('map').setView([0, 0], 2);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            map.on('click', function (e) {
                selectedLatLng = e.latlng;

                if (marker) {
                    marker.setLatLng(e.latlng);
                } else {
                    marker = L.marker(e.latlng).addTo(map);
                }
            });
        }

        // Abrir el modal y mostrar mapa
        document.getElementById('mapModal').addEventListener('show', function () {
            initMap();
            setTimeout(() => {
                map.invalidateSize(); // Soluciona errores de tamaño cuando el mapa está en un modal
            }, 200);
        });

        // Confirmar ubicación seleccionada
        document.getElementById('confirmLocationBtn').addEventListener('click', function () {
            if (selectedLatLng) {
                alert("Ubicación seleccionada:\nLat: " + selectedLatLng.lat.toFixed(6) + "\nLng: " + selectedLatLng.lng.toFixed(6));
                // Podés guardar estas coordenadas donde necesites
                // Ejemplo: document.getElementById("inputLat").value = selectedLatLng.lat;
                // Luego cerrar el modal
                document.getElementById('mapModal').style.display = 'none';
            } else {
                alert("Por favor seleccioná una ubicación en el mapa.");
            }
        });

        // Abrir/Cerrar el modal manualmente (si no tenés ya esto implementado)
        document.getElementById('closeMapModal').addEventListener('click', function () {
            document.getElementById('mapModal').style.display = 'none';
        });