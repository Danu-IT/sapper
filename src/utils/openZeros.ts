import { Mask } from "../types/Game"

export const openZeros = (x: number, y: number, size: number, open: [number, number][], mask: Mask[]) => {
    if (x >= 0 && x < size && y >= 0 && y < size) {
        if(mask[y * size + x] === Mask.Transparent) return
        
        open.push([x, y])
    }
}