import { FC } from "react";
import { numbers } from "../../../utils/number";
import { ImageNum } from "../../GameStyle";
import { TimerNum } from "./TimerStyle";

interface TimerProps {
  time: number;
}

const Timer: FC<TimerProps> = ({ time }) => {
  return (
    <TimerNum>
      {!numbers[+time.toString(10).split("")[2]] ? (
        <ImageNum src={numbers[0]}></ImageNum>
      ) : time >= 100 ? (
        <ImageNum src={numbers[+time.toString(10).split("")[0]]}></ImageNum>
      ) : (
        <ImageNum src={numbers[+time.toString(10).split("")[2]]}></ImageNum>
      )}
      {!numbers[+time.toString(10).split("")[1]] ? (
        <ImageNum src={numbers[0]}></ImageNum>
      ) : time >= 10 ? (
        time >= 100 ? (
          <ImageNum src={numbers[+time.toString(10).split("")[1]]}></ImageNum>
        ) : (
          <ImageNum src={numbers[+time.toString(10).split("")[0]]}></ImageNum>
        )
      ) : (
        <ImageNum src={numbers[+time.toString(10).split("")[1]]}></ImageNum>
      )}
      {!numbers[+time.toString(10).split("")[0]] ? (
        <ImageNum src={numbers[0]}></ImageNum>
      ) : time >= 10 ? (
        time >= 100 ? (
          <ImageNum src={numbers[+time.toString(10).split("")[2]]}></ImageNum>
        ) : (
          <ImageNum src={numbers[+time.toString(10).split("")[1]]}></ImageNum>
        )
      ) : (
        <ImageNum src={numbers[+time.toString(10).split("")[0]]}></ImageNum>
      )}
    </TimerNum>
  );
};

export default Timer;
