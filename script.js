const refs = {
  daysEl: document.querySelector('[data-value="days"]'),
  hoursEl: document.querySelector('[data-value="hours"]'),
  minsEl: document.querySelector('[data-value="mins"]'),
  secsEl: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timerId = null;
    this.selector = selector;
    this.targetDate = targetDate;
    this.start();
  }

  start() {
    this.updateClockface(this.getTimeComponents(this.targetDate - Date.now()));

    this.timerId = setInterval(() => {
      const currentDate = Date.now();
      const deltaTime = this.targetDate - currentDate;
      const time = this.getTimeComponents(deltaTime);

      this.updateClockface(time);

      if (deltaTime < 900) {
        this.stop();
        return;
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    const timeComponents = { days, hours, mins, secs };
    return timeComponents;
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  updateClockface(timeComponents) {
    Object.values(refs).forEach((element) => {
      element.textContent = timeComponents[element.dataset.value];
    });
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jun 29, 2021, 5:56 PM"),
});
