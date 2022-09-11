import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  timerShow: document.querySelector('.timer'),
  days: document.querySelector('[data-days'),
  hours: document.querySelector('[data-hours'),
  minutes: document.querySelector('[data-minutes'),
  seconds: document.querySelector('[data-seconds'),
  endTime: null,
};

refs.startBtn.setAttribute('disabled','');

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      clearInterval(timer);
      window.alert('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
      refs.endTime = selectedDates[0];
    }
  },
};

class Timer {
  constructor({ onTick }) {
    this.intervalId = null,
    this.isActive = false,
    this.onTick = onTick;
    this.init();
  }

  init() {
    const time = this.convertMs(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = refs.endTime - startTime;
      this.onTick(this.convertMs(deltaTime));
      if (deltaTime <= 1000) {
        clearInterval(this.intervalId);
      }
      const { days, hours, minutes, seconds } = this.convertMs(deltaTime);
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );
    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  onTick: timerShow,
});

function timerShow({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

flatpickr(document.querySelector('#datetime-picker'), options);