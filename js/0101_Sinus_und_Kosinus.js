let sketch1 = function (p) {
    let scale = 500;
    let radius = scale * 0.8 * 0.5;

    let centerX = scale / 2;
    let centerY = scale / 2;

    let phi = 90;
    let sin, cos; // Nur deklarieren, nicht initialisieren
    let x, y; // Nur deklarieren

    let slider;
    let AccentColor;

    p.setup = function () {
        let style = getComputedStyle(document.body);
        AccentColor = style.getPropertyValue('--AccentColor').trim();

        let containerEinheitskreis = document.getElementById('canvasContainerEinheitskreis');
        let cnvEinheitskreis = p.createCanvas(scale, scale);
        cnvEinheitskreis.parent(containerEinheitskreis);
        p.ellipseMode(p.CENTER);

        slider = document.getElementById('phiInput');
        slider.value = phi;
        slider.addEventListener('input', p.updatePhi);

        sin = p.sinDegrees(phi); // Initialisiere hier
        cos = p.cosDegrees(phi); // Initialisiere hier
        x = centerX + cos * radius;
        y = centerY - sin * radius;

        p.updatePhi();
    };

    p.draw = function () {
        let angleEnd = 0;
        let angleStart = angleEnd - p.radians(phi);
        p.stroke(0);
        p.strokeWeight(1);
        p.background(255);
        p.fill(255);
        p.ellipse(scale / 2, scale / 2, radius * 2, radius * 2);
        p.stroke(200);
        p.line(0, scale / 2, scale, scale / 2);
        p.line(scale / 2, 0, scale / 2, scale);
        p.stroke(0);
        p.fill(p.addAlpha(AccentColor, 0.8));
        p.arc(centerX, centerY, 0.3 * scale, 0.3 * scale, angleStart, angleEnd);
        p.line(scale / 2, scale / 2, scale / 2 + 0.15 * scale, scale / 2);
        p.stroke(0);
        p.strokeWeight(2);
        p.line(centerX, centerY - p.sinDegrees(phi) * radius, x, y);
        p.stroke(0);
        p.strokeWeight(2);
        p.line(centerX + p.cosDegrees(phi) * radius, centerY, x, y);
        p.stroke(0);
        p.strokeWeight(1);
        p.fill(112, 0, 0);
        p.line(centerX, centerY, x, y);
        p.ellipse(x, y, scale * 0.02, scale * 0.02);


        // TEXT
        p.textSize(12);  // Setzt die Textgröße
        p.textStyle(p.NORMAL);
        p.textAlign(p.CENTER, p.CENTER);

        const labels = [
            { angle: 0, text: "0° \n(360°)", xOffset: 0.45 * scale, yOffset: 0 },
            { angle: 90, text: "90°", xOffset: 0, yOffset: -0.45 * scale },
            { angle: 180, text: "180°", xOffset: -0.45 * scale, yOffset: 0 },
            { angle: 270, text: "270°", xOffset: 0, yOffset: 0.45 * scale }
        ];

        let phiMod = phi % 360;

        for (const label of labels) {
            let color = label.angle === phiMod ? AccentColor : [0];
            p.stroke(color);
            p.fill(color);
            p.text(label.text, centerX + label.xOffset, centerY + label.yOffset);
        };
    };

    p.updatePhi = function () {
        phi = parseFloat(slider.value);
        let sin = p.sinDegrees(phi); // Verwende den Präfix 'p.'
        let cos = p.cosDegrees(phi); // Verwende den Präfix 'p.'
        x = centerX + cos * radius;
        y = centerY - sin * radius;

        document.getElementById('sin').innerText = "Sinus: " + sin.toFixed(3);
        document.getElementById('cos').innerText = "Cosinus: " + cos.toFixed(3);
        document.getElementById('phi').innerHTML = "&phi;: " + phi.toFixed(0);
    }

    p.sinDegrees = function (angleDegrees) {
        return Math.sin(angleDegrees * Math.PI / 180);
    }

    p.cosDegrees = function (angleDegrees) {
        return Math.cos(angleDegrees * Math.PI / 180);
    }

    p.addAlpha = function (rgbColor, alpha) {
        // Entfernen Sie "rgb(" am Anfang und ")" am Ende
        let colorsOnly = rgbColor.substring(4, rgbColor.length - 1);

        // Konvertieren Sie die Farbwerte in ein Array von Zahlen
        let colors = colorsOnly.split(", ").map(Number);

        // Rückgabe der neuen RGBA-Farbe
        return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${alpha})`;
    }

}
let sketch2 = function (p) {
    
    let AccentColor;

    let w;
    let sinusAmplituden = [];
    let cosinusAmplituden = [];

    let randBreite = 30; // Breite des Randes an den Seiten
    let randHoehe = 30; // Höhe des Randes oben und unten

    let slider; // Unser neuer Slider
    p.setup = function () {
        let style = getComputedStyle(document.body);
        AccentColor = style.getPropertyValue('--AccentColor').trim();
        let containerCanvas = document.getElementById('canvasContainerFunktionen');

        let cnvEinheitskreis = p.createCanvas(600 + randBreite * 2, 400 + randHoehe * 2).parent(containerCanvas);
        w = (p.width - randBreite * 2) / p.TWO_PI;

        for (let i = 0; i < p.width - randBreite * 2 + 1; i++) {
            sinusAmplituden[i] = -p.sin(i / w) * 150;
            cosinusAmplituden[i] = -p.cos(i / w) * 150;
        }

        // Zugriff auf den HTML Slider mit der ID "phiInput"
        slider = document.getElementById('phiInput');
    };

    p.draw = function () {
        p.background(255);

        p.translate(randBreite, p.height / 2);

        p.textAlign(p.CENTER, p.CENTER); // Zentriert den Text horizontal und vertikal

        // x-Achse zeichnen
        p.stroke(150);
        p.line(0, 0, p.width - randBreite * 2, 0);

        // y-Achse zeichnen
        p.line(0, -p.height / 2 + randHoehe, 0, p.height / 2 - randHoehe);

        // Beschriftungen für die y-Achse hinzufügen
        p.fill(0); // Schwarze Farbe für den Text
        p.noStroke(); // Entfernt den Strich um den Text
        p.text("1", -10, -150); // 150 ist die Amplitude der Sinuswelle
        p.text("0", -10, 0); // Die Mitte
        p.text("-1", -10, 150); // -150 ist die negative Amplitude der Sinuswelle

        // Linien entlang der y-Achse alle 30 Pixel
        p.stroke(150);
        for (let y = 0; y < p.height / 2 - randHoehe; y += 30) {
            p.line(-5, y, 5, y);
            p.line(-5, -y, 5, -y);
        }

        // Linien entlang der x-Achse alle PI/8 und Beschriftungen hinzufügen

        for (let x = 0; x < p.width - randBreite * 2; x += (w * p.PI) / 8) {
            p.line(x, -5, x, 5);
            // Beschriftungen hinzufügen
            p.fill(0); // Schwarze Farbe für den Text
            if (p.abs(x - (w * p.PI) / 2) < 1) {
                p.text("π/2", x, 20);
            } else if (p.abs(x - w * p.PI) < 1) {
                p.text("π", x, 20);
            } else if (p.abs(x - (w * 3 * p.PI) / 2) < 1) {
                p.text("3π/2", x, 20);
            } else if (p.abs(x - w * 2 * p.PI) < 1) {
                p.text("2π", x, 20);
            }
        }

        // Sinuskurve zeichnen
        p.stroke(50);
        p.noFill();
        p.beginShape();
        for (let i = 0; i < p.width - randBreite * 2; i++) {
            p.vertex(i, sinusAmplituden[i]);
        }
        p.endShape();

        // Cosinuskurve zeichnen
        p.stroke(p.addAlpha(AccentColor, 0.8));
        p.beginShape();
        for (let i = 0; i < p.width - randBreite * 2; i++) {
            p.vertex(i, cosinusAmplituden[i]);
        }
        p.endShape();

        // Punkt auf Sinus- und Cosinus-Kurve zeichnen basierend auf dem Slider-Wert
        let sliderVal = parseInt(slider.value);
        let mappedValue = Math.round(p.map(sliderVal, 0, 360-0.5, 0, p.width - randBreite * 2 - 1));


        // Linien an Sinus-Kurve
        p.stroke(50, 50, 50, 100);
        p.line(0, sinusAmplituden[mappedValue], mappedValue, sinusAmplituden[mappedValue]); // Linie zur y-Achse
        p.line(mappedValue, 0, mappedValue, sinusAmplituden[mappedValue]); // Linie zur x-Achse

        // Linien an Cosinus-Kurve
        p.stroke(p.addAlpha(AccentColor, 0.8));
        p.line(0, cosinusAmplituden[mappedValue], mappedValue, cosinusAmplituden[mappedValue]); // Linie zur y-Achse
        p.line(mappedValue, 0, mappedValue, cosinusAmplituden[mappedValue]); // Linie zur x-Achse
        // Punkte auf Kurven
        p.stroke(50);
        p.fill(50);
        p.ellipse(mappedValue, sinusAmplituden[mappedValue], 8);
        p.stroke(p.addAlpha(AccentColor, 0.8));
        p.fill(p.addAlpha(AccentColor, 0.8));
        p.ellipse(mappedValue, cosinusAmplituden[mappedValue], 8);
    };

    p.addAlpha = function (rgbColor, alpha) {
        // Entfernen Sie "rgb(" am Anfang und ")" am Ende
        let colorsOnly = rgbColor.substring(4, rgbColor.length - 1);

        // Konvertieren Sie die Farbwerte in ein Array von Zahlen
        let colors = colorsOnly.split(", ").map(Number);

        // Rückgabe der neuen RGBA-Farbe
        return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${alpha})`;
    }
};

new p5(sketch1);
new p5(sketch2);