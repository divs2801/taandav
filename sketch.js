const modelURL = 'https://teachablemachine.withgoogle.com/models/MOLJifbHz/';
// the json file (model topology) has a reference to the bin file (model weights)
const checkpointURL = modelURL + "model.json";
const metadataURL = modelURL + "metadata.json";

let model, video, webcamElement;
let classification = "None Yet"; // Default classification
let poser;

// Load the model
async function loadModel() {
    model = await tmPose.load(checkpointURL, metadataURL);
}

// Start the webcam and pose detection
async function startPoseNet() {
    webcamElement = document.getElementById('webcam');
    video = await navigator.mediaDevices.getUserMedia({
        video: true
    });
    webcamElement.srcObject = video;

    loadModel();
    predict();
}

// Pose prediction function
async function predict() {
    const flipHorizontal = false;

    const { pose, posenetOutput } = await model.estimatePose(webcamElement, flipHorizontal);
    const prediction = await model.predict(posenetOutput);

    // Get the classification result with the highest probability
    classification = prediction[0].className;

    // Update the status indicators based on the classification
    updateStatus(classification);

    requestAnimationFrame(predict); // Continuously predict
}

// Update the status indicators based on the detected pose
function updateStatus(classification) {
    const wrongPosture = document.querySelector('.wrong-posture');
    const correctPosture = document.querySelector('.correct-posture');

    if (classification === "Class 1") { // Assuming Class 1 is correct posture
        correctPosture.style.display = 'inline';
        wrongPosture.style.display = 'none';
    } else {
        correctPosture.style.display = 'none';
        wrongPosture.style.display = 'inline';
    }
}