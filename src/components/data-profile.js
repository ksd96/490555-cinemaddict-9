import {historyCount} from './data-filter.js';

let numberWatched;

if (historyCount().length >= 1 && historyCount().length <= 10) {
  numberWatched = `Novice`;
} else if (historyCount().length >= 11 && historyCount().length <= 20) {
  numberWatched = `Fan`;
} else if (historyCount().length >= 21) {
  numberWatched = `Movie buff`;
} else {
  numberWatched = ``;
}

export const getProfile = () => ({
  rank: numberWatched,
});
