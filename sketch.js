//ml5.js
let video;
let handPose;
let hands = [];
let texts = [];
let num = 1;
let hue = 0;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose({ flipped: true });
}
// function mousePressed() {
//   console.log(hands);
// }

function getHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  colorMode(HSB);
  textAlign(CENTER);

  // Create the webcam video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, getHands);
}

function draw() {
  image(video, 0, 0);
  if (hands.length > 1) {
    let leftHand = hands[0];
    let rightHand = hands[1];

    let leftIndex = leftHand.index_finger_tip;
    let rightIndex = rightHand.index_finger_tip;

    let d = dist(leftIndex.x, leftIndex.y, rightIndex.x, rightIndex.y);
    let fontSize = map(d, 0, 400, 0, 60);
    textSize(fontSize);
    if (hue < 360) {
      hue += fontSize/100;
    } else {
      hue = 0;
    }

    fill(`${hue}`, 100, 100);
    console.log(hue);
    // strokeWeight(8);
    // line(leftIndex.x, leftIndex.y, rightIndex.x, rightIndex.y);
    // stroke(255);
    let centerX = (leftIndex.x + rightIndex.x) / 2;
    let centerY = (leftIndex.y + rightIndex.y) / 2;
    for (let i = 0; i < num; i++) {
      texts.push(new Text(centerX, centerY));

      if (texts.length > 2) {
        texts.splice(i, 1);
      }
    }
  }
  for (let i = texts.length - 1; i > 0; i--) {
    texts[i].update();
    texts[i].draw();
  }
}

function windowResized() {
  resizeCanvas(400, 400);
}
