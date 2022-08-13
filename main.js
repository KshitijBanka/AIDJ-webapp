leftWristScore=0;
rightWristScore=0;
songStatus1 = '';
songStatus2 = '';

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(420, 260);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('Posenet is initialized');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;

        console.log("Left Wrist X = "+leftWristx+";  Left Wrist Y = "+leftWristy);
        
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;

        console.log("Right Wrist X = "+rightWristx+";  Right Wrist Y = "+rightWristy);
    }
}

leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;

function draw(){
    image(video, 0, 0, 600, 500);

    fill('#FF0000');
    stroke('#FF0000');

    songStatus1 = heat_waves_song.isPlaying();
    console.log(songStatus1);

    songStatus2 = she_knows_it_song.isPlaying();
    console.log(songStatus2);

    if(leftWristScore > 0.2){
        circle(leftWristx, leftWristy, 20);
        she_knows_it_song.stop();
        if(songStatus1==false){
            heat_waves_song.setVolume(0.3);
            heat_waves_song.play();
            document.getElementById('name-song').innerHTML="Song Name - Heatwaves";
        }
    }
    
    if(rightWristScore > 0.2){
        circle(rightWristx, rightWristy, 20);
        heat_waves_song.stop();
        if(songStatus2==false){
            she_knows_it_song.setVolume(0.3);
            she_knows_it_song.play();
            document.getElementById('name-song').innerHTML="Song Name - She Knows It";
        }
    }
}

heat_waves_song="";
she_knows_it_song="";




function preload(){
    heat_waves_song = loadSound('Heatwaves.mp3');
    she_knows_it_song = loadSound('drive-forever.mp3');
  
}