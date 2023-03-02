export function secondsToHMS(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursString = hours > 0 ? hours.toString().padStart(1, '0') + ':' : '';
  const minutesString = minutes.toString().padStart(1, '0') + ':';
  const secondsString = remainingSeconds.toString().padStart(2, '0');

  return `${hoursString}${minutesString}${secondsString}`;
}
