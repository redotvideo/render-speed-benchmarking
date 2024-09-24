import {makeProject} from '@revideo/core';

import example from './scenes/example?scene';
import data from './argil_scaled_60s.json';

import './fonts.css';

export default makeProject({
  scenes: [example],
  variables: data
});
