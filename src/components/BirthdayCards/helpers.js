export const weekDays = [
  {
    key: 0,
    value: 'Sun',
  },
  {
    key: 1,
    value: 'Mon',
  },
  {
    key: 2,
    value: 'Tue',
  },
  {
    key: 3,
    value: 'Wed',
  },
  {
    key: 4,
    value: 'Thu',
  },
  {
    key: 5,
    value: 'Fri',
  },
  {
    key: 6,
    value: 'Sat',
  },
];

export const colorCodes = ["#696969", "#bada55", "#407294", "#cbcba9", "#daa520", "#133337", "#ffc0cb", "#008080", "#ff7373", "#003366", "#468499", "#088da5"]

export const getNameSplit = nameString => {
  const split = nameString.split(' ');
  let displayLabel = '';
  split.length > 1 ? displayLabel = split[0].charAt(0) + split[1].charAt(0) : displayLabel = split[0].charAt(0);
  return displayLabel.toUpperCase();
}