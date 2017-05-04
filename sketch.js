var timeleft = 10;
var ding;
var interval = false;

// Convert seconds to min:sec
function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  var hour = floor(min / 60);
  var minute = min % 60
	min = minute
  var day = floor(hour / 24)
  var hourer = hour % 24
	hour = hourer
  var week = floor(day / 7)
  var dayer = day % 7
	day = dayer
  if(timeleft - currentTime > 604799) {
	return nf(week, 2) + ':' + nf(day, 2) + ':' + nf(hour, 2) + ':' + nf(min, 2) + ':' + nf(sec, 2);
  }
  else if(timeleft - currentTime > 86399) {
	return nf(day, 2) + ':' + nf(hour, 2) + ':' + nf(min, 2) + ':' + nf(sec, 2);
  }
  else if(timeleft - currentTime > 3599) {
	return nf(hour, 2) + ':' + nf(min, 2) + ':' + nf(sec, 2);
  }
  else {
	return nf(min, 2) + ':' + nf(sec, 2);
  }
  if(timeleft - currentTime > 604799 && checked==true) {
	return nf(week, 2) + 'w ' + nf(day, 2) + 'd ' + nf(hour, 2) + 'h ' + nf(min, 2) + 'm ' + nf(sec, 2) + 's';
  }
  else if(timeleft - currentTime > 86399 && checked==true) {
	return nf(day, 2) + 'd ' + nf(hour, 2) + 'h ' + nf(min, 2) + 'm ' + nf(sec, 2) + 's';
  }
  else if(timeleft - currentTime > 3599 && checked==true) {
	return nf(hour, 2) + 'h ' + nf(min, 2) + 'm ' + nf(sec, 2) + 's';
  }
  else if(checked==true) {
	return nf(min, 2) + 'm ' + nf(sec, 2) + 's';
  }
}


function preload() {
	ding = loadSound("ding.mp3");
}

// Set value of the DOM element
function timerText(text) {
	var timer = select('#timer');
	timer.html(text);
}

// Stop the timer
function stopTimer() {
	clearInterval(interval);
	interval = false;
}

function setup() {
	noCanvas();

	// Process URL ?minute=
	var params = getURLParams();
	if (params.minute) {
		var min = params.minute;
		timeleft = min * 60;
	}

	// Set initial value for DOM element
	timerText(convertSeconds(timeleft) + ' (paused)');

	// Timer interval
	function timeIt() {
		timeleft--;
		timerText(convertSeconds(timeleft));

		// Time's up
		if (timeleft <= 0) {
			// Ding spam
			var dingcount = 0;
			var dinginterval = setInterval(function() {
				ding.play();
				dingcount++;
				if(dingcount == 10) clearInterval(dinginterval);
			}, 100);
			//ding.play();
			stopTimer();
		}
	}

	// Set timer button
	timerbtn = createButton('set timer');
	timerbtn.mousePressed(setTimer);

	// Pause button
	pausebtn = createButton('pause/resume');
	pausebtn.mousePressed(pause);

	// Function when set timer btn is pressed
	function setTimer() {
		var entered = prompt('Enter the amount of minutes');

		if(!isNaN(entered) && entered >= 1) {
			stopTimer();
			timeleft = entered * 60;
			timerText(convertSeconds(timeleft) + ' (paused)');
		}
	}

	// When pause btn is pressed
	function pause() {
		if(!interval) {
			if(timeleft <= 0) return alert('No time set!');

			timerText(convertSeconds(timeleft));
			interval = setInterval(timeIt, 1000);
		}
		else
		{
			timerText(convertSeconds(timeleft) + ' (paused)');
			stopTimer();
		}
	}
}
