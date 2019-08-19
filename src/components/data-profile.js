import {historyCount} from './data-filter.js';

// eslint-disable-next-line consistent-return
const numberWatched = () => {
  if (historyCount().length === 0) {
    return ``;
  } else if (historyCount().length >= 1 && historyCount().length <= 10) {
    return `Novice`;
  } else if (historyCount().length >= 11 && historyCount().length <= 20) {
    return `Fan`;
  } else if (historyCount().length >= 21) {
    return `Movie buff`;
  }
};

export const getProfile = () => ({
  rank: numberWatched(),
});
