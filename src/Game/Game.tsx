import { useState, useMemo, useEffect } from "react";
import { createField } from "../utils/createField";
import Cell from "./Components/Ceil";
import {
  Bloor,
  CountBomb,
  Down,
  DownHead,
  Field,
  Head,
  Image,
  ImageNum,
  Left,
  LeftDown,
  LeftDownHeadSircle,
  LeftHead,
  LeftHeadSircle,
  Replay,
  Right,
  RightDown,
  RightDownHeadSircle,
  RightHead,
  RightHeadSircle,
  Screen,
  UpHead,
} from "./GameStyle";
import { Mask } from "../types/Game";
import smile from "../assets/images/smile.jpg";
import surprise from "../assets/images/surprise.jpg";
import death from "../assets/images/death.jpg";
import respect from "../assets/images/respect.jpg";
import { numbers } from "../utils/number";
import Timer from "./Components/Timer/Timer";

const Game = () => {
  const Mine = -1;
  const size = 16;
  const dimension = new Array(size).fill(null);

  const [mineCount, setMineCount] = useState<number>(40);
  const [field, setField] = useState<number[]>(() => createField(size, Mine));
  const [mask, setMask] = useState<Mask[]>(
    new Array(size * size).fill(Mask.Fill)
  );
  const [time, setTime] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);

  const [lose, setLose] = useState<boolean>(false);
  const win = useMemo(
    () =>
      !field.some(
        (el, i) =>
          el !== Mine &&
          (mask[i] !== Mask.Flag || el !== Mine) &&
          mask[i] !== Mask.Transparent
      ),
    [field, mask]
  );
  const [activated, setActivated] = useState<boolean>(false);

  const replay = () => {
    setField(() => createField(size, Mine));
    setMask(new Array(size * size).fill(Mask.Fill));
    setMineCount(40);
    setLose(false);
    setTime(0);
    setStart(false);
  };

  useEffect(() => {
    if (time !== 0) {
      if (!lose && !win) {
        const timeout = setTimeout(() => {
          setTime((prev) => prev + 1);
        }, 1000);

        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [time]);

  return (
    <Screen>
      <LeftHeadSircle></LeftHeadSircle>
      <UpHead></UpHead>
      <RightHeadSircle></RightHeadSircle>
      <LeftHead></LeftHead>
      <Head>
        <CountBomb>
          <ImageNum src={numbers[0]}></ImageNum>
          {mineCount < 10 ? (
            <ImageNum src={numbers[0]}></ImageNum>
          ) : (
            <ImageNum
              src={numbers[+mineCount.toString(10).split("")[0]]}></ImageNum>
          )}
          {mineCount < 10 ? (
            <ImageNum
              src={numbers[+mineCount.toString(10).split("")[0]]}></ImageNum>
          ) : (
            <ImageNum
              src={numbers[+mineCount.toString(10).split("")[1]]}></ImageNum>
          )}
        </CountBomb>
        <Replay onClick={replay}>
          <Image
            src={lose ? death : win ? respect : activated ? surprise : smile}
            alt=""
          />
        </Replay>
        <Timer time={time}></Timer>
      </Head>
      <RightHead></RightHead>
      <LeftDownHeadSircle></LeftDownHeadSircle>
      <DownHead></DownHead>
      <RightDownHeadSircle></RightDownHeadSircle>
      <Left></Left>
      {dimension.map((elY, y) => (
        <Field key={y}>
          {dimension.map((elX, x) => (
            <Cell
              key={x}
              Mine={Mine}
              y={y}
              x={x}
              field={field}
              mask={mask}
              setMask={setMask}
              size={size}
              setLose={setLose}
              lose={lose}
              win={win}
              setMineCount={setMineCount}
              setTime={setTime}
              time={time}
              setField={setField}
              mineCount={mineCount}
              start={start}
              setStart={setStart}
              setActivated={setActivated}></Cell>
          ))}
        </Field>
      ))}
      <Right></Right>
      <RightDown></RightDown>
      <Down></Down>
      <LeftDown></LeftDown>
      <Bloor></Bloor>
    </Screen>
  );
};

export default Game;
