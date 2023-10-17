let scale = 500;
let radius = scale * 0.8 * 0.5;

centerX = scale / 2;
centerY = scale / 2;

let phi = 90;
let sin = sinDegrees(phi);
let cos = cosDegrees(phi);
let x = centerX + cos * radius;
let y = centerY - sin * radius;

function setup() {
    let style = getComputedStyle(document.body);
    AccentColor = style.getPropertyValue('--AccentColor').trim();
    BGcolor = style.getPropertyValue('--BGcolor').trim();

    let containerEinheitskreis = document.getElementById('canvasContainerEinheitskreis');

    let cnvEinheitskreis = createCanvas(scale, scale);
    cnvEinheitskreis.parent(containerEinheitskreis);
    ellipseMode(CENTER);

    slider = document.getElementById('phiInput');
    slider.value = phi;
    slider.addEventListener('input', updatePhi)

    updatePhi();
}

function draw() {
    let angleEnd = 0;
    let angleStart = angleEnd - radians(phi);
    stroke(0);
    strokeWeight(1);
    background(255);
    fill(255);
    ellipse(scale / 2, scale / 2, radius * 2, radius * 2);
    stroke(200);
    line(0, scale / 2, scale, scale / 2);
    line(scale / 2, 0, scale / 2, scale);
    stroke(0);
    fill(addAlpha(AccentColor, 0.8));
    arc(centerX, centerY, 0.3 * scale, 0.3 * scale, angleStart, angleEnd);
    line(scale / 2, scale / 2, scale / 2 + 0.15 * scale, scale / 2);
    

    stroke(103, 0, 112);
    strokeWeight(2);
    line(centerX, centerY - sinDegrees(phi) * radius, x, y);

    stroke(0, 112, 56);
    strokeWeight(2);
    line(centerX + cosDegrees(phi) * radius, centerY, x, y);

    stroke(0);
    strokeWeight(1);
    fill(112, 0, 0);
    line(centerX, centerY, x, y);
    ellipse(x, y, scale * 0.02, scale * 0.02);

    // TEXT
    textSize(12);  // Setzt die Textgröße
    textStyle(NORMAL);
    textAlign(CENTER, CENTER); 

    const labels = [
        { angle: 0,   text: "0° \n(360°)", xOffset:  0.45 * scale, yOffset: 0 },
        { angle: 90,  text: "90°",         xOffset: 0,             yOffset: -0.45 * scale },
        { angle: 180, text: "180°",         xOffset: -0.45 * scale, yOffset: 0 },
        { angle: 270, text: "270°",         xOffset: 0,             yOffset:  0.45 * scale }
    ];
    
    let phiMod = phi % 360;

    for (const label of labels) {
        let color = label.angle === phiMod ? AccentColor : [0];
        stroke(color);
        fill(color);
        text(label.text, centerX + label.xOffset, centerY + label.yOffset);
    }
}

function updatePhi() {
    phi = parseFloat(slider.value);
    let sin = sinDegrees(phi);
    let cos = cosDegrees(phi);
    x = centerX + cos * radius;
    y = centerY - sin * radius;

    document.getElementById('sin').innerText = "Sinus: " + sin.toFixed(3);
    document.getElementById('cos').innerText = "Cosinus: " + cos.toFixed(3);
    document.getElementById('phi').innerHTML = "&phi;: " + phi.toFixed(0);
}

function sinDegrees(angleDegrees) {
    return Math.sin(angleDegrees*Math.PI/180);
}

function cosDegrees(angleDegrees) {
    return Math.cos(angleDegrees*Math.PI/180);
}

function addAlpha(rgbColor, alpha) {
    // Entfernen Sie "rgb(" am Anfang und ")" am Ende
    let colorsOnly = rgbColor.substring(4, rgbColor.length - 1);
    
    // Konvertieren Sie die Farbwerte in ein Array von Zahlen
    let colors = colorsOnly.split(", ").map(Number);
    
    // Rückgabe der neuen RGBA-Farbe
    return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${alpha})`;
}