peter_pan = "";
harry_potter = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
status_1 = "";
scoreRightWrist = 0;
status_2 = "";
function preload() {
peter_pan = loadSound("PeterPan.mp3");
harry_potter = loadSound("HarryPotter.mp3");
}
function setup() {
canvas = createCanvas(600, 500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', getPoses);
}
function draw() {
image(video, 0, 0, 600, 500);
status_1 = false;
status_2  = false;
fill("#FF0000");
stroke("#FF0000");
if(scoreLeftWrist > 0.2) {
circle(leftWristX, leftWristY, 20);
status_2 = false;
harry_potter.stop()
if(status_1 == false) {
status_1 = true;
peter_pan.stop();
peter_pan.play();
document.getElementById("song_name").innerHTML = "Song Name = Peter Pan";
}
}
if(scoreRightWrist > 0.2) {
circle(rightWristX, rightWristY, 20);
status_1 = false;
peter_pan.stop()
if(status_2 == false) {
status_2 = true;
harry_potter.stop();
harry_potter.play();
document.getElementById("song_name").innerHTML = "Song Name = Harry Potter";
}
}
}
function modelLoaded() {
console.log('PoseNet Is Initialized');
}
function getPoses(results) {
if(results.length > 0) {
console.log(results);
scoreLeftWrist = results[0].pose.keypoints[9].score;
scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("scoreLeftWrist = " + scoreLeftWrist + ", scoreRightWrist = " + scoreRightWrist);
leftWristX = floor(results[0].pose.leftWrist.x);
leftWristY = floor(results[0].pose.leftWrist.y);
rightWristX = floor(results[0].pose.rightWrist.x);
rightWristY = floor(results[0].pose.rightWrist.y);
console.log("leftWristX = " + leftWristX + ", leftWristY = " + leftWristY);
console.log("rightWristX = " + rightWristX + ", rightWristY = " + rightWristY);
}
}