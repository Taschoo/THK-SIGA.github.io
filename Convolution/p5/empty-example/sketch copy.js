let xMin = -5;
let xMax = 5;
let yMin = -4;
let yMax = 6;

let t0 = 0;
let t02 = 0;
let T = 1;
let T2 = 1;

let a1 = t02 - T2/2;
let b1 = t0 + T/2;
let a2 = t0 - T/2;
let b2 = t02 + T2/2; 

let impuls1 = rectImpuls;
let impuls2 = pralbolaImpuls;

let formula = '';
let canvas;

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');

  slidert0 = createSlider(xMin, xMax, 0, 0.1);
  slidert0.style('width', '300px')
  sliderT = createSlider(1, 3, 1, 1);
  stroke(0);
  noFill();
}

document.getElementById('submit-button').addEventListener('click', () => {
  formula = document.getElementById('formula-input').value;
});

function draw() {
  background(255);
  t0 = slidert0.value();
  b1 = t0 + T/2;
  a2 = t0 - T/2;
  T = sliderT.value();

  drawImpuls(impuls1, t0, T);
  drawImpuls(impuls2, t02, T2);

  stroke(255,0,0);
  beginShape();
  for (let x = xMin; x <= t0; x += 0.01) {
    let y = 0;
    //y = borders();
    y = convolution2(impuls1, impuls2, x);
    //point(t0, y);
    point(map(x, xMin, xMax, 0, width), map(y, yMin, yMax, height, 0));
  }
  endShape();
  stroke(0);

  text('a1', map(a1, xMin, xMax, 0, width), 390);
  text('b1', map(b1, xMin, xMax, 0, width), 370);
  text('a2', map(a2, xMin, xMax, 0, width), 370);
  text('b2', map(b2, xMin, xMax, 0, width), 390);
}


function rectImpuls(t) {
  if(abs(t)<=0.5){
    return 1;
  }
  return 0;
}

function triangularImpuls(t) {
  if(abs(t) <= 1) {
    return (1-abs(t));
  }
  else {
    return 0;
  }
}

function pralbolaImpuls(t) {
  if(abs(t)<=0.5){
    return (t-.5)*(t-.5);
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

function convolution2(impuls1, impuls2, time) {
  let a = a1;
  let b = b1;
  let x1, x2, y1, y2;
  let dx = 0.001;
  let sum = 0;

  x1 = a;
  x2 = a + dx;

  for (let i = a; i < b; i+= dx) {
    // y1 = f1(x1) * f2(time-x1);
    // y2 = f1(x2) * f2(time-x2);
    y1 = impuls1( (x1 ) / T) * impuls2( ((time-x1) ) / T);
    y2 = impuls1( (x2 ) / T) * impuls2( ((time-x2) ) / T2);

    //calculating the area of a sub rectangle
    sum += dx * (y1 + y2) / 2;
    x1 = x2;
    x2 = x1 + dx;
  }

  return sum;
}

function convolution(signal1, signal2, time) {
  let result = 0;
  // for (let tau = -time; tau <= time; tau += 0.01) {
  //   result += signal1(tau) * signal2(time - tau);
  // }

  if(a1 > b1) {
    result = integralConvo(signal1, signal2, a2, b1, time); 
    text('first', 200, 410);
  } 
  if(b1 >= a1) {
    //result = integral(impuls1, a1, b1) * integral(impuls2, a1, b1);
    //result = integral(convoFunc(time),a1, b1); //Ich muss noch mal verstehen wie die Faltung rechnerisch wirklich funktioniert.
    result = integralConvo(signal1, signal2, a1, b1, time);
    text('second', 200, 410);
  } 
  // else if(b2 > b1) {
  //   //result = integral(impuls1, a2, b1) * integral(impuls2, a2, b1);
  //   //result = integral(convoFunc(time),a2, b1);
  //   result = integralConvo(signal1, signal2, a2, b1, time);
  // } 
  // else if(b2 > a2) {
  //   //result = integral(impuls1, a2, b2) * integral(impuls2, a2, b2);
  //   result = integralConvo(signal1, signal2, a2, b2, time);
  // } 
  // else if(a2 > b2) {
  //   result = 0;
  // }
  // else{
  //   result = 0;
  // }
  
  return result;
}

function borders() {
  let y = 0;
  if(a1 > b1) {
   y = 0 
  } else if(a1 > b2) {
    y = integral(impuls1, a1, b1) * integral(impuls2, a1, b1);
  } else if(b2 > b1) {
    y = integral(impuls1, a2, b1) * integral(impuls2, a2, b1);
  } else if(b2 > a2) {
    y = integral(impuls1, a2, b2) * integral(impuls2, a2, b2);
  }  else if(a2 > b2) {
    y = 0;
  }
  return y;
}



// calculating the integral of a function f in range of [a; b]
function integral(f, a, b) {
  
  let x1, x2, y1, y2;
  let dx = 0.01;
  let sum = 0;

  x1 = a;
  x2 = a + dx;

  for (let i = a; i < b; i+= dx) {
    y1 = f(x1);
    y2 = f(x2);
    sum += (x2 - x1) * (y1 + y2) / 2;
    x1 = x2;
    x2 = x1 + dx;
  }

  return sum;
}

function integralConvo(f1, f2, a, b, time) {
  
  let x1, x2, y1, y2;
  let dx = 0.001;
  let sum = 0;

  x1 = a;
  x2 = a + dx;

  for (let i = a; i < b; i+= dx) {
    // y1 = f1(x1) * f2(time-x1);
    // y2 = f1(x2) * f2(time-x2);
    y1 = f1( (x1 ) / T) * f2( ((time-x1) ) / T);
    y2 = f1( (x2 ) / T) * f2( ((time-x2) ) / T2);

    //calculating the area of a sub rectangle
    sum += dx * (y1 + y2) / 2;
    x1 = x2;
    x2 = x1 + dx;
  }

  return sum;
}