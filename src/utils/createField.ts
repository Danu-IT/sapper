export const createField = (size: number, mine: number): number[] => {
    const field: number[] = new Array(size * size).fill(0);

    function increment(x: number, y: number) {
      if (x >= 0 && x < size && y >= 0 && y < size) {
        if (field[y * size + x] === mine) {
          return;
        }
        field[y * size + x] += 1;
      }
    }

    for (let i = 0; i < 4; ) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);

      if (field[y * size + x] === mine) {
        continue;
      }

      field[y * size + x] = mine;

      i++;

      increment(x + 1, y);
      increment(x - 1, y);
      increment(x, y + 1);
      increment(x, y - 1);
      increment(x + 1, y - 1);
      increment(x - 1, y - 1);
      increment(x + 1, y + 1);
      increment(x - 1, y + 1);
    }

    return field;
  };