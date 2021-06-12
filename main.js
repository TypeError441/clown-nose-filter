let canvas;
let video;
let poseNet;
let noseX = 0, noseY = 0;
let clownnose;

function preload() {
    clownnose = loadImage("https://i.postimg.cc/7ZBcjDqp/clownnose.png");
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", getPoses);
}
function modelLoaded () { console.log("poseNet initialized"); }

function getPoses(results) {
    if(results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x - 15;
        noseY = results[0].pose.nose.y - 15;
        console.log(`noseX: ${noseX}`);
        console.log(`noseY: ${noseY}`);
    }
}

function draw() {
    image(video, 0, 0, 300, 300);
    image(clownnose, noseX, noseY, 30, 30);
}

function takeImage() {
    save('filter-image.png');
}