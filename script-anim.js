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
    Object.values(refs).forEach((element) => {
      element.innerHTML = `<span class="value previous">${
        this.getTimeComponents(this.targetDate - Date.now())[
          element.dataset.value
        ]
      }</span>
      <span class="value current">${
        this.getTimeComponents(this.targetDate - Date.now())[
          element.dataset.value
        ]
      }</span>`;
    });

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
      const prevEl = element.querySelector(".previous");
      const curEl = element.querySelector(".current");

      prevEl.classList.remove("active");
      curEl.classList.remove("active");

      curEl.textContent = prevEl.textContent;
      prevEl.textContent = timeComponents[element.dataset.value];

      setTimeout(() => {
        if (prevEl.textContent !== curEl.textContent) {
          prevEl.classList.add("active");
          curEl.classList.add("active");
        }
      }, 1);
    });
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jun 27, 2021, 10:55 PM"),
});
