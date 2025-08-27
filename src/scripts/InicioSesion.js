document.querySelector('.login-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Evita recargar la página

        // Tomar los valores del formulario
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Crear el objeto a enviar
        const loginData = {
            username: username,
            password: password
        };

        // Enviar la solicitud al backend
        fetch('http://localhost:8080/loguear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(async response => {
            if (response.ok) {
                const responseData = await response.json();

                // Guardar token o datos si tu backend lo devuelve
                // localStorage.setItem('token', responseData.token);

                alert('Inicio de sesión exitoso');

                // Redirigir a la página principal o dashboard
                window.location.href = '../pages/NavegarHechos.html';
            } else {
                const error = await response.text();
                alert('Error al iniciar sesión: ' + error);
            }
        })
        .catch(error => {
            console.error('Error al conectar:', error);
            alert('No se pudo conectar al servidor.');
        });
    });