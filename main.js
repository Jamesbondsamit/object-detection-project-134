img="";
object=[];
status="";

function preload(){
    img=loadImage('market.jpg');
}

function setup(){
    canvas=createCanvas(640,450);
    canvas.center();
    video=createCapture(VIDEO);
   objectDetector=ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML="Status: detecting object";
   video.size(640,450);
   video.hide();
}
function modelLoaded(){
    console.log("Model loaded");
    status=true;
    
}

function gotresult(error,results){
    if(error){
        console.log(error)
    }else{
        console.log(results);
        object=results;
    }
}
function draw(){
image(video,0,0,640,450);
if(status !="")
{
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotresult);
for(i=0;i<object.length;i++){
    document.getElementById("status").innerHTML="status: object detected";
    document.getElementById('number_of_objects').innerHTML="Number of objects detected are  "+object.length;
    fill(r,g,b);
 percent=floor(object[i].confidence*100);
 text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
 stroke(r,g,b);
noFill();
rect(object[i].x,object[i].y,object[i].width,object[i].height);
}
}
}