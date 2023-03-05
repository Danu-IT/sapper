import { Dispatch, FC, SetStateAction } from "react";
import { Box, Icon } from "./CeilStyle";
import { Mask } from "../../../types/Game";
import { maskView } from "../../../utils/maskView";
import { openZeros } from "../../../utils/openZeros";
import bomb from "../../../assets/images/bomb.jpg";
import { createField } from "../../../utils/createField";

interface CeilProps {
  y: number;
  x: number;
  size: number;
  field: Mask[];
  mask: Mask[];
  Mine: number;
  setMask: Dispatch<SetStateAction<Mask[]>>;
  setLose: Dispatch<SetStateAction<boolean>>;
  setMineCount: Dispatch<SetStateAction<number>>;
  setTime: Dispatch<SetStateAction<number>>;
  setField: Dispatch<SetStateAction<number[]>>;
  lose: boolean;
  win: boolean;
  time: number;
  mineCount: number;
  start: boolean;
  setStart: Dispatch<SetStateAction<boolean>>;
  setActivated: Dispatch<SetStateAction<boolean>>;
}

const Ceil: FC<CeilProps> = ({
  field,
  mask,
  size,
  x,
  y,
  Mine,
  setMask,
  setLose,
  lose,
  win,
  setMineCount,
  setTime,
  time,
  mineCount,
  start,
  setStart,
  setField,
  setActivated,
}) => {
  const openCeil = () => {
    if (lose || win) return;
    if (time === 0) {
      setTime((prev) => prev + 1);
    }
    if (!start && field[y * size + x] === Mine) {
      console.log("start");
      setField(() => createField(size, Mine));
      return;
    }
    setStart(true);
    if (mask[y * size + x] === Mask.Transparent) return;
    setMask((prev) => [...prev]);

    const open: [number, number][] = [];
    openZeros(x, y, size, open, mask);

    while (open.length) {
      const [x, y] = open.pop()!!;
      mask[y * size + x] = Mask.Transparent;
      if (field[y * size + x] !== 0) {
        continue;
      }

      openZeros(x + 1, y, size, open, mask);
      openZeros(x - 1, y, size, open, mask);
      openZeros(x, y + 1, size, open, mask);
      openZeros(x, y - 1, size, open, mask);
    }

    if (field[y * size + x] === Mine) {
      mask.forEach((el, i) => {
        if (field[i] === Mine) {
          mask[i] = Mask.Transparent;
          setLose(true);
        }
      });
    }

    setMask((prev) => [...prev]);
  };

  const assumption = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (time === 0) {
      setTime((prev) => prev + 1);
    }
    if (lose || win) return;
    if (mask[y * size + x] === Mask.Transparent) return;
    if (mask[y * size + x] === Mask.Fill) {
      if (mineCount !== 0) {
        mask[y * size + x] = Mask.Flag;
        setMineCount((prev) => prev - 1);
      }
    } else if (mask[y * size + x] === Mask.Flag) {
      mask[y * size + x] = Mask.Question;
      setMineCount((prev) => prev + 1);
    } else if (mask[y * size + x] === Mask.Question) {
      mask[y * size + x] = Mask.Fill;
    }

    setMask((prev) => [...prev]);
  };

  const activate = () => {
    setActivated(true);
  };

  const noActivate = () => {
    setActivated(false);
  };

  return (
    <Box
      onContextMenu={(e) => assumption(e)}
      onMouseDown={activate}
      onMouseUp={noActivate}
      onClick={openCeil}>
      {mask[y * size + x] !== Mask.Transparent ? (
        <Icon src={maskView[mask[y * size + x]]} />
      ) : field[y * size + x] === Mine ? (
        <Icon src={bomb}></Icon>
      ) : (
        <Icon src={maskView[mask[y * size + x]][field[y * size + x]]} />
      )}
    </Box>
  );
};

export default Ceil;
