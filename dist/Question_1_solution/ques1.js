"use strict";
function check(ip1, ip2) {
    return ip1[1] >= ip2[0] || ip1[1] >= ip2[1];
}
function solve(bookings) {
    bookings.sort((a, b) => a[0] - b[0]);
    let answer = [bookings[0]];
    for (let i = 1; i < bookings.length; i++) {
        let currInterval = bookings[i];
        let lastInterval = answer[answer.length - 1];
        if (check(lastInterval, currInterval)) {
            lastInterval[0] = lastInterval[0];
            lastInterval[1] = Math.max(lastInterval[1], currInterval[1]);
        }
        else
            answer.push(currInterval);
    }
    return answer;
}
;
const ip1 = [[9, 10], [11, 12], [13, 14]];
console.log('Non-overlapping bookings');
console.log('INPUT ', ip1);
console.log('OUTPUT', solve(ip1));
const ip2 = [[9, 10], [10, 11], [11, 12]];
console.log('Non-overlapping bookings');
console.log('INPUT ', ip2);
console.log('OUTPUT', solve(ip2));
const ip3 = [[9, 12], [12, 15], [15, 18]];
console.log('Already merged bookings');
console.log('INPUT ', ip3);
console.log('OUTPUT', solve(ip3));
const ip4 = [[]];
console.log('Empty list of bookings');
console.log('INPUT ', ip4);
console.log('OUTPUT', solve(ip4));
const ip5 = [[9, 11], [10, 12], [13, 14], [15, 17]];
console.log('Mixed bookings');
console.log('INPUT ', ip5);
console.log('OUTPUT', solve(ip5));
