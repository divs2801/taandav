const modelURL = 'https://teachablemachine.withgoogle.com/models/aTBKW1mDS/';
// the json file (model topology) has a reference to the bin file (model weights)
const checkpointURL = modelURL + "model.json";
// the metatadata json file contains the text labels of your model and additional information
const metadataURL = modelURL + "metadata.json";


const flip = true; // whether to flip the webcam

let model;
let totalClasses;
let myCanvas;

let classification = "None Yet";
let probability = "100";
let poser;
let video;


// A function that loads the model from the checkpoint
async function load() {
  model = await tmPose.load(checkpointURL, metadataURL);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}


async function setup() {
    myCanvas = createCanvas(640, 480);  // Match the container size
    myCanvas.parent("video-feed-container");  // Attach to the correct container
  
    await load();  // Load the model
    video = createCapture(VIDEO, videoReady);  // Capture the video from the webcam
    video.size(640, 480);  // Set video size to match the container
    video.hide();  // Hide the default video element, we’ll draw it on the canvas
}

function draw() {
  background(255);
  if(video) image(video,0,0);
  fill(255,0,0)
  textSize(18);
   if(classification == "Class 1"){
     fill(0,255,0);
     rect(10,10,10);
     
   }
  else{
    fill(255,0,0);
     rect(10,10,10);
  }
  
  text("Result:" + classification, 10, 40);

  //text("Probability:" + probability, 10, 20)
  ///ALEX insert if statement here testing classification against apppropriate part of array for this time in your video

  /*textSize(8);
  if (poser) { //did we get a skeleton yet;
    for (var i = 0; i < poser.length; i++) {
      let x = poser[i].position.x;
      let y = poser[i].position.y;
      ellipse(x, y, 5, 5);
      text(poser[i].part, x + 4, y);
    }
  }*/

}

function videoReady() {
  console.log("Video Ready");
  predict();
}


async function predict() {
  // Prediction #1: run input through posenet
  // predict can take in an image, video or canvas html element
  const flipHorizontal = false;
  const {
    pose,
    posenetOutput
  } = await model.estimatePose(
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
  const sortedPrediction = prediction.sort((a, b) => -a.probability + b.probability);

  //communicate these values back to draw function with global variables
  classification = sortedPrediction[0].className;
  probability = sortedPrediction[0].probability.toFixed(2);
  if (pose) poser = pose.keypoints; // is there a skeleton
  predict();
}