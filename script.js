document.addEventListener('DOMContentLoaded', function () {
    const formUsuarioReporte = document.getElementById('formUsuarioReporte');
    const usuarioSeccion = document.getElementById('usuarioSeccion');
    const reporteSeccion = document.getElementById('reporteSeccion');
    const resumenSeccion = document.getElementById('resumenSeccion');
    const finalSeccion = document.getElementById('finalSeccion');
    const ubicacionBtn = document.getElementById('ubicacion');
    const tomarFotoBtn = document.getElementById('tomarFoto');
    const adjuntarFotoBtn = document.getElementById('adjuntarFotoBtn');
    const fotoInput = document.getElementById('foto');
    const adjuntarFotoInput = document.getElementById('adjuntarFoto');
    const previewFoto = document.getElementById('previewFoto');
    const edificioSelect = document.getElementById('edificio');
    const otroEdificioInput = document.getElementById('otroEdificio');
    const instalacionSelect = document.getElementById('instalacion');
    const otraInstalacionInput = document.getElementById('otraInstalacion');
    const plantaSelect = document.getElementById('planta');
    const otraPlantaInput = document.getElementById('otraPlanta');
    const nombreInput = document.getElementById('nombre');
    const matriculaInput = document.getElementById('matricula');
    const telefonoInput = document.getElementById('telefono');
    const errorUsuario = document.getElementById('errorUsuario');
    const errorReporte = document.getElementById('errorReporte');
    const verResumenBtn = document.getElementById('verResumen');
    const editarBtn = document.getElementById('editar');
    const enviarBtn = document.getElementById('enviar');
    const inicioBtn = document.getElementById('inicio');
    const salirBtn = document.getElementById('salir');
    const buttonSound = document.getElementById('buttonSound');

    function playSound() {
        buttonSound.play();
    }

    document.getElementById('continuarReporte').addEventListener('click', function () {
        if (validarUsuario()) {
            playSound();
            usuarioSeccion.style.display = 'none';
            reporteSeccion.style.display = 'block';
        } else {
            errorUsuario.textContent = 'Por favor, completa todos los campos correctamente.';
        }
    });

    function validarUsuario() {
        return nombreInput.checkValidity() && matriculaInput.checkValidity() && telefonoInput.checkValidity();
    }

    edificioSelect.addEventListener('change', function () {
        otroEdificioInput.style.display = this.value === 'Otro' ? 'block' : 'none';
    });

    instalacionSelect.addEventListener('change', function () {
        otraInstalacionInput.style.display = this.value === 'otra' ? 'block' : 'none';
    });

    plantaSelect.addEventListener('change', function () {
        otraPlantaInput.style.display = this.value === 'otra' ? 'block' : 'none';
    });

    ubicacionBtn.addEventListener('click', function () {
        playSound();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const { latitude, longitude } = position.coords;
                ubicacionBtn.textContent = `Ubicación: (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
            }, function (error) {
                console.error('Error obteniendo la ubicación:', error.message);
                ubicacionBtn.textContent = 'Ubicación almacenada con éxito';
            });
        } else {
            console.error('Geolocalización no soportada por este navegador.');
            ubicacionBtn.textContent = 'Geolocalización no soportada';
        }
    });

    tomarFotoBtn.addEventListener('click', function () {
        playSound();
        fotoInput.click();
    });

    adjuntarFotoBtn.addEventListener('click', function () {
        playSound();
        adjuntarFotoInput.click();
    });

    fotoInput.addEventListener('change', function () {
        mostrarPreviewFoto(this);
    });

    adjuntarFotoInput.addEventListener('change', function () {
        mostrarPreviewFoto(this);
    });

    function mostrarPreviewFoto(input) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewFoto.innerHTML = `<img src="${e.target.result}" alt="Foto de la fuga" style="width: 150px; height: auto;">`;
            };
            reader.readAsDataURL(file);
        }
    }

    verResumenBtn.addEventListener('click', function () {
        if (validarReporte()) {
            playSound();
            reporteSeccion.style.display = 'none';
            resumenSeccion.style.display = 'block';
            mostrarResumen();
        } else {
            errorReporte.textContent = 'Por favor, completa todos los campos del reporte correctamente.';
        }
    });

    function validarReporte() {
        const esEdificioValido = edificioSelect.checkValidity() && (edificioSelect.value !== 'Otro' || (edificioSelect.value === 'Otro' && otroEdificioInput.value.trim() !== ''));
        const esInstalacionValido = instalacionSelect.checkValidity() && (instalacionSelect.value !== 'otra' || (instalacionSelect.value === 'otra' && otraInstalacionInput.value.trim() !== ''));
        const esPlantaValido = plantaSelect.checkValidity() && (plantaSelect.value !== 'otra' || (plantaSelect.value === 'otra' && otraPlantaInput.value.trim() !== ''));
        const esFotoValido = fotoInput.files.length > 0 || adjuntarFotoInput.files.length > 0;
        const esObservacionesValido = document.getElementById('observaciones').checkValidity();
        
        return esEdificioValido && esInstalacionValido && esPlantaValido && esFotoValido && esObservacionesValido;
    }

    function mostrarResumen() {
        const resumen = document.getElementById('resumen');
        const nombre = nombreInput.value;
        const matricula = matriculaInput.value;
        const telefono = telefonoInput.value;
        const edificio = edificioSelect.value === 'Otro' ? otroEdificioInput.value : edificioSelect.value;
        const instalacion = instalacionSelect.value === 'otra' ? otraInstalacionInput.value : instalacionSelect.value;
        const planta = plantaSelect.value === 'otra' ? otraPlantaInput.value : plantaSelect.value;
        const ubicacion = ubicacionBtn.textContent;
        const observaciones = document.getElementById('observaciones').value;
        const fotoSrc = previewFoto.querySelector('img').src;
        
        resumen.innerHTML = `
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Matrícula:</strong> ${matricula}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Edificio:</strong> ${edificio}</p>
            <p><strong>Instalación:</strong> ${instalacion}</p>
            <p><strong>Planta:</strong> ${planta}</p>
            <p><strong>Ubicación:</strong> ${ubicacion}</p>
            <p><strong>Observaciones:</strong> ${observaciones}</p>
            <p><strong>Foto de la fuga:</strong></p>
            <img src="${fotoSrc}" alt="Foto de la fuga" style="width: 150px; height: auto;">
            <br><br>
        `;
    }

    editarBtn.addEventListener('click', function () {
        playSound();
        resumenSeccion.style.display = 'none';
        reporteSeccion.style.display = 'block';
    });

    enviarBtn.addEventListener('click', function () {
        playSound();
        formUsuarioReporte.submit();
    });

    formUsuarioReporte.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío del formulario para manejarlo manualmente
        finalSeccion.style.display = 'block';
        resumenSeccion.style.display = 'none';
        document.getElementById('nombreUsuario').textContent = nombreInput.value;
    });

    inicioBtn.addEventListener('click', function () {
        playSound();
        window.location.reload();
    });

    salirBtn.addEventListener('click', function () {
        playSound();
        if (confirm('¿Estás seguro de que deseas salir? Cierra esta ventana manualmente si es necesario.')) {
            window.close();
        }
    });

    document.querySelector('.button-atras').addEventListener('click', function () {
        playSound();
        usuarioSeccion.style.display = 'block';
        reporteSeccion.style.display = 'none';
        resumenSeccion.style.display = 'none';
    });
});
