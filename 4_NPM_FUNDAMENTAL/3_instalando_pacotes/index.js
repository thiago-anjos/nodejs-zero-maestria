const _ = require("lodash");

const a = [1, 2, 3, 4, 5, 8];
const b = [1, 2, 3, 4, 7, 6];

const diff = _.difference(a, b);

console.log(diff);
