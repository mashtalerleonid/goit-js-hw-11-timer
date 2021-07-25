function handleTickInit(tick) {
  // get timer offset (if not found, set to today)
  var offset = new Date("Aug 23, 2021, 9:16 PM");

  // var offset = new Date(localStorage.getItem("countdown-offset") || new Date());

  // store the offset (not really necessary but saves some if statements)
  // localStorage.setItem("countdown-offset", offset);

  // time in hours the timer will run down
  // var timeDuration = Tick.helper.duration(24, "hours");
  // var timeDuration = 0;

  // add 24 hours to get final deadline
  // var deadline = new Date(
  //   offset.setMilliseconds(offset.getMilliseconds() + timeDuration)
  // );

  // create counter
  var counter = Tick.count.down(offset, { format: ["d", "h", "m", "s"] });

  // update tick with the counter value
  counter.onupdate = function (value) {
    tick.value = value;
  };

  counter.onended = function () {
    // redirect, uncomment the next line
    // window.location = 'my-location.html'
    // hide counter, uncomment the next line
    // tick.root.style.display = 'none';
    // show message, uncomment the next line
    // document.querySelector(".tick-onended-message").style.display = "";
  };
}
