let xMin = -4;
let xMax = 4;
let yMin = -3;
let yMax = 5;

let t0 = 0;
let t02 = 0;
let T = 1;
let T2 = 1;

let a1 = t02 - T2/2;
let b1 = t0 + T/2;
let a2 = t0 - T/2;
let b2 = t02 + T2/2; 

let functionInput;

let impuls1 = rectImpuls;
let impuls2 = randomFunction;


function setup() {
  createCanvas(600, 600);

  slidert0 = createSlider(xMin, xMax, -2, 0.05);
  slidert0.style('width', '300px')
  sliderT = createSlider(.5, 2, .5, .5);

  functionInput = createInput("x*x");
  functionInput.position(20,20);

  stroke(0);
  noFill();
}

function draw() {
  background(255);

  t0 = slidert0.value();
  b1 = t0 + T/2;
  a2 = t0 - T/2;
  T = sliderT.value();

  drawImpuls(impuls1, t0, T);
  drawImpuls(impuls2, t02, T2);

  stroke(255,0,0);
  strokeWeight(2);

  drawConvolution(impuls1, impuls2);

  strokeWeight(1);
  stroke(0);

  // text('a1', map(a1, xMin, xMax, 0, width), 390);
  // text('b1', map(b1, xMin, xMax, 0, width), 370);
  // text('a2', map(a2, xMin, xMax, 0, width), 370);
  // text('b2', map(b2, xMin, xMax, 0, width), 390);

}


function rectImpuls(t) {
  if(abs(t)<=1/2){
    return 1;
  }
  return 0;
}

function triangularImpuls(t) {
  if(abs(t) <= 1) {
    return 1-abs(t);
  }
  else {
    return 0;
  }
}

function randomFunction(t) {
  return rectImpuls(1, t) + rectImpuls(.5, t-1);
}

function paralbolaFunction(t) {
  if(abs(t)<=0.5){
    return 2*(t+.5)*(t+1);
  }
  return 0;
}

// trying to do a lifetime function Input
function evalFunction(x) {
  let f = functionInput.value();

  if(abs(x)<=0.5){
    return eval(f);
  }
  return 0;

}

function drawImpuls(impuls, t0, T) {
  beginShape();
  for (let x = xMin; x <= xMax; x += 0.01) {
    let y = impuls((x-t0)/T);
    vertex(map(x, xMin, xMax, 0, width), map(y, yMin, yMax, height, 0));
  }
  endShape();
}

function drawConvolution(impuls1, impuls2) {
  let y = 0;
  beginShape();
  for (let x = xMin; x <= t0; x += 0.01) {
    y = convolution(impuls1, impuls2, x);
    vertex(map(x, xMin, xMax, 0, width), map(y, yMin, yMax, height, 0));
  }
  endShape();
}

function convolution(impuls1, impuls2, t) {
  let a = a1-T/2;
  let b = b2+T/2;
  let tau1, tau2, y1, y2;
  let dtau = 0.001;
  let result = 0;

  tau1 = a;
  tau2 = a + dtau;

  // making sub rectangles for approximatin overlapping area
  for (let i = a; i < b; i+= dtau) {

    // continous convolution
    y1 = impuls1(T, tau1) * impuls2(T2, (t-tau1));
    y2 = impuls1(T, tau2) * impuls2(T2, (t-tau2));

    // calculating the area of a sub rectangle
    result += dtau * (y1 + y2) / 2;
    tau1 = tau2;
    tau2 = tau1 + dtau;
  }

  return result;
}