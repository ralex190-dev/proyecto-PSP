document.addEventListener('DOMContentLoaded', () => {
    const calculatorForm = document.getElementById('calculator-form');
    const calcResult = document.getElementById('calc-result');
    const gramsValue = document.getElementById('grams-value');

    if (calculatorForm) {
        calculatorForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtener valores del formulario
            const weight = parseFloat(document.getElementById('pet-weight').value);
            const ageStage = document.getElementById('pet-age').value;
            const activity = document.getElementById('pet-activity').value;

            if (isNaN(weight) || weight <= 0) {
                alert('Por favor, ingresa un peso válido para tu mascota.');
                return;
            }

            // Lógica de cálculo simplificada de ración diaria recomendada
            let baseGramsPerKg = 15; // Adulto estándar
            
            if (ageStage === 'cachorro') {
                baseGramsPerKg = 25; 
            } else if (ageStage === 'senior') {
                baseGramsPerKg = 12; 
            }

            let baseGrams = weight * baseGramsPerKg;

            // Factor de ajuste por nivel de actividad
            let activityFactor = 1.0;
            if (activity === 'baja') {
                activityFactor = 0.85;
            } else if (activity === 'alta') {
                activityFactor = 1.25;
            }

            // Calcular total y redondear
            let finalGrams = Math.round(baseGrams * activityFactor);

            if (finalGrams < 40) {
                finalGrams = 40;
            }

            // Mostrar el resultado con animación
            gramsValue.textContent = finalGrams;
            calcResult.classList.remove('hidden');

            // ==========================================================================
            // NUEVO: RENDERIZAR DIAGRAMA DE TORTA (HTML5 CANVAS)
            // ==========================================================================
            const canvas = document.getElementById('nutri-chart');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar gráficos anteriores

                // Definiciones del gráfico
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = Math.min(centerX, centerY) - 10;

                // Distribución porcentual típica (Proteína: 25%, Grasa: 15%, Carbohidratos: 60%)
                const data = [0.25, 0.15, 0.60];
                const colors = ['#e67e22', '#f1c40f', '#34495e']; // Tonos acorde a tu paleta
                
                let startAngle = 0;

                for (let i = 0; i < data.length; i++) {
                    const sliceAngle = data[i] * 2 * Math.PI;

                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
                    ctx.closePath();

                    ctx.fillStyle = colors[i];
                    ctx.fill();

                    startAngle += sliceAngle;
                }
            }
        });
    }
});
