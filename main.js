Status = "";
object =[];
function setup(){
    canvas = createCanvas(600,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640,420);
    video.hide();
}

function start(){
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("status").value;
}
function modelLoaded(){
    console.log("Model_Loaded");
    Status = true;
}

function preload(){
    song= loadSound("danger_sms.mp3");
}
function draw(){
    image(video,0,0,640,420);
    if(Status != ""){
        object_Detector.detect(video, gotResults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input){
                video.stop();
                object_Detector.detect(gotResults);
                document.getElementById("status").innerHTML ="Baby  Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance( "Baby Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML = "Baby not Found";
                song.play("danger_sms.mp3");
            }
            if(object[i].length<0){
                document.getElementById("status").innerHTML = "Baby not Found";
                song.play("danger_sms.mp3");
            }
        }
    }
}