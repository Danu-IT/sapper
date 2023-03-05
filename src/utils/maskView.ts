import React from 'react';

import Fill from '../assets/images/blankd.jpg';
import ceil0 from "../assets/images/ceil0.jpg";
import ceil1 from "../assets/images/ceil1.jpg";
import ceil2 from "../assets/images/ceil2.jpg";
import ceil3 from "../assets/images/ceil3.jpg";
import ceil4 from "../assets/images/ceil4.jpg";
import ceil5 from "../assets/images/ceil5.jpg";
import ceil6 from "../assets/images/ceil6.jpg";
import ceil7 from "../assets/images/ceil7.jpg";
import ceil8 from "../assets/images/ceil8.jpg";
import flag from '../assets/images/flag.jpg'
import question from '../assets/images/question.jpg'
import { Mask } from '../types/Game';

export const maskView: Record<Mask, any> = {
    [Mask.Transparent]: [ceil0,ceil1,ceil2, ceil3,ceil4,ceil5,ceil6,ceil7,ceil8],
    [Mask.Flag]: flag,
    [Mask.Fill]: Fill,
    [Mask.Question]: question,
}