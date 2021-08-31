song="";
LEFTWRISTx=0;
LEFTWRISTy=0;
RIGHTWRISTx=0;
RIGHTWRISTy=0;
scoreRightWrist=0;
scoreLeftWrist=0;

function setup()
{
   canvas=createCanvas(400,300);
   canvas.center();
   video=createCapture(VIDEO);
   video.hide();
   poseNet=ml5.poseNet(video,modelLoaded);
   poseNet.on("pose",gotPoses);

}


function draw()
{
 image(video,0,0,400,300);
 fill("#4COO99");
 stroke("#00FF00");
if(scoreRightWrist>0.2)
{
 circle(RIGHTWRISTx,RIGHTWRISTy,20);
 if(RIGHTWRISTy>=0&&RIGHTWRISTy<=100)
 {
   document.getElementById("speed").innerHTML="speed=0.5x";
   song.rate(0.5);
 }
 else if(RIGHTWRISTy>=100&&RIGHTWRISTy<=200)
 {
   document.getElementById("speed").innerHTML="speed=0.5x";
   song.rate(0.5);
 }
 else if(RIGHTWRISTy>=200&&RIGHTWRISTy<=300)
 {
   document.getElementById("speed").innerHTML="speed=1x";
   song.rate(1);
 }
 else if(RIGHTWRISTy>=300&&RIGHTWRISTy<=400)
 {
   document.getElementById("speed").innerHTML="speed=1.5x";
   song.rate(1.5);
 }
 else if(RIGHTWRISTy>=400&&RIGHTWRISTy<=500)
 {
   document.getElementById("speed").innerHTML="speed=2x";
   song.rate(2);
 }
 else if(RIGHTWRISTy>=500&&RIGHTWRISTy<=600)
 {
   document.getElementById("speed").innerHTML="speed=2.5x";
   song.rate(2.5);
 }

}


 
 if(scoreLeftWrist>0.2)
{

 circle(LEFTWRISTx,LEFTWRISTy,20);
 iNNo=Number(LEFTWRISTy);
 removeDecimals=floor(iNNo);
 volume=removeDecimals/500;
 document.getElementById("volume").innerHTML="volume= "+volume;
 song.setVolume(volume);

}
}


function preload()
{
    song=loadSound("song1.mp3");
}


function play()
{
    song.play();
    console.log("song1 is playing");
    song.setVolume(1)
    song.rate(1)
}

function stop()
{
    song.stop();
}


function modelLoaded()
{
 console.log("poseNet is loaded");
}

function gotPoses(results)
{
    if(results.length>0)
    {
      console.log(results);
      scoreRightWrist=results[0].pose.keypoints[10].score;
      scoreLeftWrist=results[0].pose.keypoints[9].score;
      console.log("scoreLeftWrist= "+scoreLeftWrist);
      console.log("scoreRightWrist= "+scoreRightWrist);
      LEFTWRISTx=results[0].pose.leftWrist.x;
      LEFTWRISTy=results[0].pose.leftWrist.y;

       console.log("LEFTWRISTx= "+LEFTWRISTx);
       console.log("LEFTWRISTy= "+LEFTWRISTy);
    

       RIGHTWRISTx=results[0].pose.rightWrist.x;
       RIGHTWRISTy=results[0].pose.rightWrist.y;
 
        console.log("RIGHTWRISTx= "+RIGHTWRISTx);
        console.log("RIGHTWRISTy= "+RIGHTWRISTy);
    }
}