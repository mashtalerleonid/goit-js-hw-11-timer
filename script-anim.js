class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timerId = null;
    this.targetDate = targetDate;

    this.selector = document.querySelector(selector);
    this.daysEl = this.selector.querySelector('[data-value="days"]');
    this.hoursEl = this.selector.querySelector('[data-value="hours"]');
    this.minsEl = this.selector.querySelector('[data-value="mins"]');
    this.secsEl = this.selector.querySelector('[data-value="secs"]');

    this.start();
  }

  initClockSection(element) {
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
  }

  start() {
    this.initClockSection(this.daysEl);
    this.initClockSection(this.hoursEl);
    this.initClockSection(this.minsEl);
    this.initClockSection(this.secsEl);

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

  updateClockSection(element, value) {
    const prevEl = element.querySelector(".previous");
    const curEl = element.querySelector(".current");

    prevEl.classList.remove("active");
    curEl.classList.remove("active");

    curEl.textContent = prevEl.textContent;
    prevEl.textContent = value;

    setTimeout(() => {
      if (prevEl.textContent !== curEl.textContent) {
        prevEl.classList.add("active");
        curEl.classList.add("active");
      }
    }, 1);
  }

  updateClockface({ days, hours, mins, secs }) {
    this.updateClockSection(this.daysEl, days);
    this.updateClockSection(this.hoursEl, hours);
    this.updateClockSection(this.minsEl, mins);
    this.updateClockSection(this.secsEl, secs);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-2",
  targetDate: new Date("Jul 27, 2021, 10:55 PM"),
});
