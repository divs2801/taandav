const modelURL = 'https://teachablemachine.withgoogle.com/models/ceOq9ARBc/';
// the json file (model topology) has a reference to the bin file (model weights)
const checkpointURL = modelURL + "model.json";
// the metatadata json file contains the text labels of your model and additional information
const metadataURL = modelURL + "metadata.json";


let mirror = true;
let video;

let model;
let totalClasses;

// Detected Pose Classification
let classification = "Pose";
let probability = "100";

let keypoints; //pose keypoints
let showKeypoints = false;

let nosePos;


// A function that loads the model from the checkpoint
async function load() {
  model = await tmPose.load(checkpointURL, metadataURL);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}

async function setup() {
  let myCanvas = createCanvas(640, 480);
  myCanvas.parent("video-feed-container");
  // Call the load function, wait until it finishes loading
  await load();
  video = createCapture(VIDEO, videoReady);
  video.size(640, 480);
  video.hide();
}

function draw() {
  background(255);

  push();
  if (mirror) {
    translate(width, 0);
    scale(-1, 1);
  }
  if (video) image(video, 0, 0, width, height);
  pop();

  fill(255, 255, 255);
  textSize(36);
  //result text
  //text("Result:" + classification, 10, 80);
  //text("Probability:" + probability, 10, 40);

  textSize(16);
  
  if(showKeypoints){
  if (keypoints) {
    for (var i = 0; i < keypoints.length; i++) {
      let x = keypoints[i].position.x;
      let y = keypoints[i].position.y;
      ellipse(x, y, 10, 10);
      text("[" + i + "]:" + keypoints[i].part, x + 8, y);
    }
  }
  }

  if (keypoints) { // check if pose is detected
    
    //assign nose position
    nosePos = createVector(
      keypoints[0].position.x,
      keypoints[0].position.y + 20
    );

    push();
    textSize(240);
    textAlign(CENTER);
    
    //where u change the pose related stuff
    if (classification == "Class 1") {
      fill(0,255,0);///text color it rgb!
      textSize(32);
      text("Great Job!"+ "\n Now try holding it for 1 more minute", window.width/2,window.height/4);//text for correct posture
      //rect(0,0,window.width,window.height)
      
      } 
    else if (classification == "Class 2") {
      fill(255,0,0);
      textSize(45);
      text("Try Again!", window.width/2,window.height/4);//text for wrong posture

    } else if (classification == "Class 3") {
      //fill(255,0,0,127);
      //rect(0,0,window.width,window.height);
    }
    pop();
  }
}

function videoReady() {
  console.log("Video Ready");
  predict();
}

async function predict() {
  // Prediction #1: run input through posenet
  // predict can take in an image, video or canvas html element
  const flipHorizontal = mirror;
  const { pose, posenetOutput } = await model.estimatePose(
    video.elt, //webcam.canvas,
    flipHorizontal
  );
  // Prediction 2: run input through teachable machine assification model
  const prediction = await model.predict(
    posenetOutput,
    flipHorizontal,
    totalClasses
  );

  // console.log(prediction);

  // Sort prediction array by probability
  // So the first classname will have the highest probability
  const sortedPrediction = prediction.sort(
    (a, b) => -a.probability + b.probability
  );

  //communicate these values back to draw function with global variables
  classification = sortedPrediction[0].className;
  probability = sortedPrediction[0].probability.toFixed(2);
  if (pose) keypoints = pose.keypoints; // is there a skeleton
  predict();
}