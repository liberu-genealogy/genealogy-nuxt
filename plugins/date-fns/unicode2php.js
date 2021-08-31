const map = [
    { replace: 'Y', with: 'yyyy' }, // 1999
    { replace: 'y', with: 'yy' }, // 99
    { replace: 'Y', with: 'y' }, // 1999
    { replace: 'F', with: 'MMMM' }, // January
    { replace: 'M', with: 'MMM' }, // Jan
    { replace: 'm', with: 'MM' }, // 01
    { replace: 'd', with: 'dd' }, // 19
    { replace: 'j', with: 'd' }, //
    { replace: 'l', with: 'EEEE' }, // Tuesday
    { replace: 'D', with: 'EEE' }, // Tue
    { replace: 'D', with: 'EE' }, // Tue
    { replace: 'a', with: 'a' }, // Am/PM
    { replace: 'p', with: 'p' }, // Am/PM
    { replace: 'H', with: 'HH' }, // 24-hour with leading zeros
    { replace: 'G', with: 'H' }, // 24-hour without leading zeros
    { replace: 'h', with: 'h' }, // 12-hour with leading zeros
    { replace: 'g', with: 'K' }, // 12-hour without leading zero
    { replace: 'i', with: 'mm' }, // Minutes with leading zeros
    { replace: 's', with: 'ss' }, // Seconds, with leading zeros
    { replace: 'T', with: 'zz' }, // Timezone abbreviation
    { replace: 'e', with: 'zzzz' }, // Timezone
];


const segments = formatStr => formatStr
    .split(new RegExp([' ', '-', '/', ':', ',', '[.]'].join('|'), ''))
    .sort((a, b) => b.length - a.length); // ASC -> a - b; DESC -> b - a

const mapping = segment => map
    .find(({ replace }) => replace === segment).with;

const unicode2PHP = formatStr => segments(formatStr)
    .reduce((string, segment) => string
        .replace(segment, mapping(segment)) || '', formatStr);

export default unicode2PHP;
