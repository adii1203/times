"use client";

import CountdownTimer from "./countdown";

const Pomodoro = () => {
  return (
    <div className="">
      <div className="">
        <CountdownTimer initialTime={300} />
      </div>
    </div>
  );
};

export default Pomodoro;
