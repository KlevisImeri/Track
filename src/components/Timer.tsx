import { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

interface TimerProps {
  studyDuration: number;
  restDuration: number;
  goal: number;
}

function Timer({ studyDuration: studyDurationProp, restDuration: restDurationProp, goal: goalProp }: TimerProps) {
  const studyDuration = studyDurationProp * 60;
  const restDuration = restDurationProp * 60;
  const goal = goalProp * 60 * 60;

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isStudyPhase, setIsStudyPhase] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeDone, setTimeDone] = useState(0);
  

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  // const resetTimer = () => {
  //   setIsRunning(false);
  //   setTimeElapsed(0);
  //   setProgress(0);
  //   setIsStudyPhase(true);
  // };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateTimer = () => {
      if (isRunning) {
        if (isStudyPhase && timeElapsed < studyDuration) {
          setProgress(timeElapsed / studyDuration);
        } else if (!isStudyPhase && timeElapsed < restDuration) {
          setProgress(timeElapsed / restDuration);
        } else {
          setIsStudyPhase((prevIsStudyPhase) => !prevIsStudyPhase);
          setTimeElapsed(0);
        }
      }
    };

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
        if(isStudyPhase){
          setTimeDone((prevTimeDone) => prevTimeDone+1);
        }
      }, 10); 
    }

    updateTimer();

    return () => {
      clearInterval(intervalId);
    };
  }, [studyDuration, restDuration, timeElapsed, isStudyPhase, isRunning, timeDone]);

  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  let offset = circumference - progress * circumference;
  // let timeString = `${Math.floor(timeElapsed / 60).toString().padStart(2, '0')}:${(timeElapsed % 60).toString().padStart(2, '0')}`;
  let widthBar = `${(timeDone/(goal))*100}%`
  let timeDoneHours = `${parseFloat(`${timeDone/3600}`).toFixed(1)}`

  return (
    <div className="bg-gray-700 rounded-lg relative">
      <div className="bg-green-100 h-6 w-full rounded flex">
        <div className="bg-green-300 rounded" style={{ width: `${widthBar}` }}></div>
      </div>
      <div>
        <svg className="w-80 h-80 m-3">
          <circle
            stroke={isStudyPhase ? '#fee2e2' : '#dbeafe'}
            strokeWidth="30"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <circle
            stroke={isStudyPhase ? '#f87171' : '#7dd3fc'}
            strokeWidth="30"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 0.35s',
            }}
          />
        </svg>
        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-gray-300 text-2xl mt-5">{isStudyPhase ? 'Study' : 'Rest'}</p>
          <p className="text-gray-300 text-6xl mb-8">{timeDoneHours}</p>
          <button className="" onClick={isRunning ? stopTimer : startTimer}>
            {isRunning ? <FaPause className="text-gray-300 text-4xl"/> : <FaPlay className="text-gray-300 text-4xl"/>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
