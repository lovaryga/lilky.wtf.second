function next(ID) {  
  document.getElementById("q" + ID.toString()).style.display = 'none';
  document.getElementById("q" + (ID+1).toString()).style.display = 'block';
  
  return false;
}

function calculate() {
  var answers = new Array();
  answers.push(document.forms[0].q.value);
  answers.push(document.forms[1].q.value);
  answers.push(document.forms[2].q.value);
  answers.push(document.forms[3].q.value);
  answers.push(document.forms[4].q.value);
  answers.push(document.forms[5].q.value);
  answers.push(document.forms[6].q.value);
  answers.push(document.forms[7].q.value);
  var results = frequent(answers);

  hideQuiz();

  console.log(answers);
  console.log(results);

  if (results[0] == "A") {
    showVideo('A');
  }
  if (results[0] == "W") {
    showVideo('W');
  }
  if (results[0] == "E") {
    showVideo('E');
  }
  if (results[0] == "F") {
    showVideo('F');
  }

  return false
}

function frequent(arr) {
  //handle answers containing 2 elements
  for (var i=0; i<arr.length; i++){
    if (arr[i] == 'EF'){
      arr[i] = 'E';
      arr.push('F');
    } else if (arr[i] == 'AW'){
      arr[i] == 'A';
      arr.push('W');
    }
  }
  console.log(arr);

  //count the most frequent element
  var mf = 1;
  var m = 0;
  var item;
  for (var i=0; i<arr.length; i++){
    for (var j=i; j<arr.length; j++){
      if (arr[i] == arr[j])
        m++;
        if (mf<m){
          mf=m; 
          item = arr[i];
        }
      }
    m=0;
  }

  return [item, mf]
}

function hideQuiz() {
  document.getElementById('q8').style.display = 'none';
  document.getElementById('elementalAnimation').style.display = 'none';
}

function showVideo(element) {
  if (element == "A") {
    var source = "4TZo0FL8SXY";
  }
  if (element == "E") {
    var source = "vgWMY0tmPrw";
  }
  if (element == "F") {
    var source = "D3ZOOFRiOBI";
  }
  if (element == "W") {
    var source = "8FX5EILSbX4";
  }

  var video = document.getElementById('video');
  video.style.display = 'block';
  video.style.width = '100%';
  video.style.height = '100%';

  var player = new YT.Player('video', {
    width: '640',
    height: '390',
    videoId: source,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });

  hideElementsMenu();
}

function onPlayerReady(event) {
  event.target.playVideo();
  openFullscreen('video');
}

function onPlayerStateChange(event) {        
  if(event.data === 0) {          
    var video = document.getElementById('video');
    var div = document.createElement('div');
    div.setAttribute('id', "video");
    video.replaceWith(div);
    showElementsMenu();
  }
}

function openFullscreen(element) {
  var elem = document.getElementById(element);
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function showElementsMenu() {
  var em = document.getElementById("elementsMenu");
  em.style.display = "block";
  em.style.width = "100%";
}

function hideElementsMenu() {
  var em = document.getElementById("elementsMenu");
  em.style.display = "none";
  em.style.width = "0";
}

// COUNTDOWN
var countDownDate = new Date("Nov 4, 2020 17:15:00").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var ofset = new Date().getTimezoneOffset();
  var utc = now + ofset*60000;

  var distance = countDownDate - utc;
  if (distance < 0) {
    clearInterval(x);
    document.getElementById('q1').style.display = 'block';
    document.getElementById('elementalAnimation').style.display = 'flex';
    document.getElementById('counter').style.display = 'none';
    document.getElementById('counter').style.height = '0';
    document.getElementById('counter').style.width = '0';
    document.title = 'Lilky.wtf - elemental quiz';
  } else {
    document.getElementById('counter').style.display = 'block';
    document.getElementById('counter').style.width = '100%';
    document.title = 'Lilky.wtf - starting soon!';
  }
    
  // Time calculations for days, hours, minutes and seconds
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById('time').innerHTML = hours + 'h '
  + minutes + 'm ' + seconds + 's ';
}, 1000);
