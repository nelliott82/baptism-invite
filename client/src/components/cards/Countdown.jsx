import React from 'react';

const Countdown = () => {
    (function() {
      const endTime = new Date("8/26/2023 00:00:00 GMT-0400").getTime();

      function getRemainingTime(deadline) {
        const currentTime = new Date().getTime();
        return deadline - currentTime;
      }

      function pad(value) {
        return ('0' + Math.floor(value)).slice(-2);
      }

      function showTime() {
        const remainingTime = getRemainingTime(endTime);
        const seconds = pad((remainingTime / 1000) % 60);
        const minutes = pad((remainingTime / (60 * 1000)) % 60);
        const hours = pad((remainingTime / (60 * 60 * 1000)) % 24);
        const days = pad(remainingTime / (24 * 60 * 60 * 1000));

        document.getElementById('days').innerText = days,
        document.getElementById('hours').innerText = hours,
        document.getElementById('minutes').innerText = minutes,
        document.getElementById('seconds').innerText = seconds;

        if (remainingTime >= 1000) {
          requestAnimationFrame(showTime);
        } else {
          document.getElementById("countdown").style.display = "none";
          document.getElementById("done").style.display = "block";
        }
      }

      requestAnimationFrame(showTime);
    })();

  return (
    <>
      <div id="countdown">
        <ul className="flex flex-row flex-wrap justify-evenly content-evenly">
          <li><span id="days"></span>Days</li>
          <li><span id="hours"></span>Hrs</li>
          <li><span id="minutes"></span>Mins</li>
          <li><span id="seconds"></span>Secs</li>
        </ul>
      </div>
      <div id="done"
           className="text-5xl flex flex-row flex-wrap justify-evenly content-evenly"
           style={{"display": "none", "margin": "1rem"}}>
        <span>💒</span>
        <span>👰🏻‍♀️🤵🏻</span>
        <span>🎉</span>
        <span>🎂</span>
      </div>
    </>
  )
}

export default Countdown;