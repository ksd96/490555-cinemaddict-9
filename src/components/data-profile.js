import {historyCount} from './data-filter.js';

let numberWatched;

if (historyCount().length === 0) {
  numberWatched = ``;
} else if (historyCount().length >= 1 && historyCount().length <= 10) {
  numberWatched = `Fan`;
} else if (historyCount().length >= 11 && historyCount().length <= 20) {
  numberWatched = `Fan`;
} else if (historyCount().length >= 21) {
  numberWatched = `Movie buff`;
}

export const getProfile = () => ({
  rank: numberWatched,
});
