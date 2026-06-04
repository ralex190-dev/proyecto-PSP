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

            // Lógica de cálculo simplificada de ración diaria recomendada (pienso/croqueta seca)
            // Base en gramos según peso y etapa
            let baseGramsPerKg = 15; // Adulto estándar
            
            if (ageStage === 'cachorro') {
                baseGramsPerKg = 25; // Los cachorros necesitan más energía y nutrientes por kilo
            } else if (ageStage === 'senior') {
                baseGramsPerKg = 12; // Los perros mayores necesitan menos calorías
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

            // Umbrales de seguridad mínimos
            if (finalGrams < 40) {
                finalGrams = 40;
            }

            // Mostrar el resultado con animación
            gramsValue.textContent = finalGrams;
            calcResult.classList.remove('hidden');
        });
    }
});
