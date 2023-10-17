let slider = document.getElementById("slider");
let sliderValue = document.getElementById("sliderValue");
let percentage = (slider.value - slider.min) / (slider.max - slider.min);
let position = percentage * slider.clientWidth;


console.log("Slider position:", position);

slider.disabled = true;

startValue = 20;
document.getElementById("slider").value = startValue;


mittelwertChart.options.plugins.annotation.annotations[0].xMin = startValue;
mittelwertChart.options.plugins.annotation.annotations[0].xMax = startValue;
mittelwertChart.update();

varianzChart.options.plugins.annotation.annotations[0].xMin = startValue;
varianzChart.options.plugins.annotation.annotations[0].xMax = startValue;
varianzChart.update();

const array = [];
const Mittelwerte = [];
const Varianzen = [];
const Frequencies = [];

function berechneWerte(n) {
    const slicedArray = array.slice(0, n);
    let frequencies = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < n; i++) {
        frequencies[slicedArray[i] - 1]++;
    }

    let summe = slicedArray.reduce((acc, currentValue) => acc + currentValue, 0);
    let mittelwert = summe / slicedArray.length;

    let quadrierteAbweichungen = slicedArray.map(x => Math.pow(x - mittelwert, 2));
    let summeQuadrierteAbweichungen = quadrierteAbweichungen.reduce((acc, currentValue) => acc + currentValue, 0);

    let varianz = summeQuadrierteAbweichungen / slicedArray.length;

    let totalNumbersForSlice = slicedArray.length;
    let normalizedFrequenciesForSlice = frequencies.map(freq => freq / totalNumbersForSlice);

    return [mittelwert, varianz, normalizedFrequenciesForSlice];
}

function alleWerteBerechnen() {
    Mittelwerte.length = 0;
    Varianzen.length = 0;
    Frequencies.length = 0;
    for (let i = 0; i < slider.max; i++) {
        const [mittelwert, varianz, frequencies] = berechneWerte(i);
        Mittelwerte.push(mittelwert);
        Varianzen.push(varianz);
        Frequencies.push(frequencies);
    }

    mittelwertChart.data.datasets[0].data = Mittelwerte; // Setzt die Daten auf Mittelwerte
    mittelwertChart.update();

    varianzChart.data.datasets[0].data = Varianzen; // Setzt die Daten auf Mittelwerte
    varianzChart.update();
}

function würfelBerechnen() {
    array.length = 0;
    for (let i = 0; i < slider.max; i++) {
        let randomInt = Math.floor(Math.random() * 6) + 1;
        array.push(randomInt);
    }
    alleWerteBerechnen();
}


function GUI(n) {
    let [mittelwert, varianz, frequencies] = berechneWerte(n);
    const slicedArray = array.slice(0, n);

    let zahlenString = slicedArray.join(', ');

    document.getElementById("Zahlen").textContent = zahlenString;

    myBarChart.data.datasets[0].data = frequencies;
    myBarChart.update();

    myPieChart.data.datasets[0].data = frequencies;
    myPieChart.update();

    document.getElementById("sliderValue").textContent = n.toFixed(0);

    let percentage = (slider.value - slider.min) / (slider.max - slider.min);
    let position = percentage * slider.clientWidth;
    sliderValue.style.left = `${position}px`;

    document.getElementById("Mittelwert").textContent = "Mittelwert: " + mittelwert.toFixed(2);

    // Update for mittelwertChart
    document.getElementById("Varianz").textContent = "Varianz: " + varianz.toFixed(2);
    mittelwertChart.options.plugins.annotation.annotations[0].xMin = n;
    mittelwertChart.options.plugins.annotation.annotations[0].xMax = n;
    mittelwertChart.update();

    // Update for varianzChart
    document.getElementById("Varianz").textContent = "Varianz: " + varianz.toFixed(2);
    varianzChart.options.plugins.annotation.annotations[0].xMin = n;
    varianzChart.options.plugins.annotation.annotations[0].xMax = n;
    varianzChart.update();
}

function changeColor() {
    var button = document.getElementById('calculateButton');
    button.classList.add('clicked');
}

slider.addEventListener("input", function () {
    GUI(Number(slider.value));
});

document.getElementById("calculateButton").addEventListener("click", function () {
    slider.disabled = false;
    sliderValue.textContent = "3";
    sliderValue.style.color = "var(--AccentColor)";
    würfelBerechnen();
    GUI(Number(slider.value));
});