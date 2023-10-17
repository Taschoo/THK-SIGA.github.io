let w;
let sinusAmplituden = [];
let cosinusAmplituden = [];

let randBreite = 30; // Breite des Randes an den Seiten
let randHoehe = 30; // Höhe des Randes oben und unten

let slider; // Unser neuer Slider

function setup() {
    let containerCanvas = document.getElementById('canvasContainerFunktionen');
    containerCanvas.style.display = 'flex';
    containerCanvas.style.justifyContent = 'center';
    containerCanvas.style.alignItems = 'center';
    containerCanvas.style.height = '100%';

    let cnvEinheitskreis = createCanvas(600 + randBreite * 2, 400 + randHoehe * 2).parent(containerCanvas);
    w = (width - randBreite * 2) / TWO_PI;

    for (let i = 0; i < width - randBreite * 2 + 1; i++) {
        sinusAmplituden[i] = -sin(i / w) * 150;
        cosinusAmplituden[i] = -cos(i / w) * 150;
    }

    // Zugriff auf den HTML Slider mit der ID "phiInput"
    slider = document.getElementById('phiInput');
}

function draw() {
    background(220);

    translate(randBreite, height / 2);

    textAlign(CENTER, CENTER); // Zentriert den Text horizontal und vertikal

    // x-Achse zeichnen
    stroke(150);
    line(0, 0, width - randBreite * 2, 0);

    // y-Achse zeichnen
    line(0, -height / 2 + randHoehe, 0, height / 2 - randHoehe);

    // Beschriftungen für die y-Achse hinzufügen
    fill(0); // Schwarze Farbe für den Text
    noStroke(); // Entfernt den Strich um den Text
    text("1", -10, -150); // 150 ist die Amplitude der Sinuswelle
    text("0", -10, 0); // Die Mitte
    text("-1", -10, 150); // -150 ist die negative Amplitude der Sinuswelle

    // Linien entlang der y-Achse alle 30 Pixel
    stroke(150);
    for (let y = 0; y < height / 2 - randHoehe; y += 30) {
        line(-5, y, 5, y);
        line(-5, -y, 5, -y);
    }

    // Linien entlang der x-Achse alle PI/8 und Beschriftungen hinzufügen
    
    for (let x = 0; x < width - randBreite * 2; x += (w * PI) / 8) {
        line(x, -5, x, 5);
        // Beschriftungen hinzufügen
        fill(0); // Schwarze Farbe für den Text
        if (abs(x - (w * PI) / 2) < 1) {
            text("π/2", x, 20);
        } else if (abs(x - w * PI) < 1) {
            text("π", x, 20);
        } else if (abs(x - (w * 3 * PI) / 2) < 1) {
            text("3π/2", x, 20);
        } else if (abs(x - w * 2 * PI) < 1) {
            text("2π", x, 20);
        }
    }

    // Sinuskurve zeichnen
    stroke(50);
    noFill();
    beginShape();
    for (let i = 0; i < width - randBreite * 2; i++) {
        vertex(i, sinusAmplituden[i]);
    }
    endShape();

    // Cosinuskurve zeichnen
    stroke(255, 0, 0);
    beginShape();
    for (let i = 0; i < width - randBreite * 2; i++) {
        vertex(i, cosinusAmplituden[i]);
    }
    endShape();

    // Punkt auf Sinus- und Cosinus-Kurve zeichnen basierend auf dem Slider-Wert
    let sliderVal = parseInt(slider.value);

    // Linien an Sinus-Kurve
    stroke(50, 50, 50, 100);
    line(0, sinusAmplituden[sliderVal], sliderVal, sinusAmplituden[sliderVal]); // Linie zur y-Achse
    line(sliderVal, 0, sliderVal, sinusAmplituden[sliderVal]); // Linie zur x-Achse

    // Linien an Cosinus-Kurve
    stroke(255, 0, 0, 100);
    line(0, cosinusAmplituden[sliderVal], sliderVal, cosinusAmplituden[sliderVal]); // Linie zur y-Achse
    line(sliderVal, 0, sliderVal, cosinusAmplituden[sliderVal]); // Linie zur x-Achse
    // Punkte auf Kurven
    stroke(50);
    fill(50);
    ellipse(sliderVal, sinusAmplituden[sliderVal], 8);
    stroke(255, 0, 0);
    fill(255, 0, 0);
    ellipse(sliderVal, cosinusAmplituden[sliderVal], 8);
}