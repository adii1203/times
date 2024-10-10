"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { AddMode } from "./add-mode";

const modes = [
  {
    name: "focus",
    duration: 300,
  },
  {
    name: "break",
    duration: 10,
  },
];

interface Mode {
  name: string;
  duration: number;
}

const CountdownTimer = ({ initialTime }: { initialTime: number }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const [activeMode, setActiveMode] = useState<Mode>({
    name: "focus",
    duration: 300,
  });
  const [localModes, setLocalModes] = useState<Mode[]>([...modes]);
  const [name, setName] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  const addMode = () => {
    // set mode to local storage
    if (!name || !duration) {
      return;
    }
    setLocalModes([...localModes, { name, duration }]);
    if (localStorage.getItem("modes")) {
      const modes = JSON.parse(localStorage.getItem("modes") || "[]");

      localStorage.setItem(
        "modes",
        JSON.stringify([
          ...modes,
          {
            name,
            duration,
          },
        ])
      );
    } else {
      localStorage.setItem(
        "modes",
        JSON.stringify([
          {
            name,
            duration,
          },
        ])
      );
    }
  };

  useEffect(() => {
    setLocalModes([
      ...localModes,
      ...JSON.parse(localStorage.getItem("modes") || "[]"),
    ]);
  }, []);

  useEffect(() => {
    // start the countdown
    if (isStarted && !isPaused) {
      interval.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            clearInterval(interval.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (isStarted && timeLeft === 0) {
      console.log("isStarted: Time's up!");
      setTimeLeft(initialTime);
      setIsStarted(false);
      setIsPaused(false);
    }

    // cleanup
    return () => clearInterval(interval.current!);
  }, [isPaused, isStarted, timeLeft, initialTime, localModes]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    if (hours === 0)
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {localModes.map((mode, idx) => {
          return (
            <Button
              key={idx}
              onClick={() => {
                setTimeLeft(mode.duration);
                setIsPaused(false);
                setIsStarted(false);
                setActiveMode(mode);
              }}
              className={cn(
                "rounded-full w-20 h-7 text-xs",
                activeMode.name === mode.name && "bg-accent"
              )}
              size={"sm"}
              variant={"outline"}>
              {mode.name}
            </Button>
          );
        })}

        <AddMode
          addMode={addMode}
          duration={duration}
          name={name}
          setName={setName}
          setDuration={setDuration}
        />
      </div>
      <div className="text-9xl font-bold">{formatTime(timeLeft)}</div>
      {isStarted ? (
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => {
              setIsPaused(!isPaused);
            }}
            size={"sm"}
            variant={"outline"}
            className="rounded-xl h-7 w-20">
            {
              // pause or resume the timer
              isPaused ? "Resume" : "Pause"
            }
          </Button>
          <Button
            onClick={() => {
              // reset the timer
              setTimeLeft(activeMode.duration);
              setIsStarted(false);
              setIsPaused(false);
            }}
            size={"sm"}
            variant={"outline"}
            className="rounded-xl h-7 w-20">
            Reset
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Button
            onClick={() => {
              setIsStarted(true);
            }}
            size={"sm"}
            variant={"outline"}
            className="rounded-xl h-7 w-20">
            Start
          </Button>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
