import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const getRelativeTime = (timestamp) => {
  return dayjs(timestamp).fromNow();
};

export default getRelativeTime;
