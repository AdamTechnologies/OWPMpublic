const moment = require('moment-timezone');

export function getNextSundayDate() {
  const uaeTimezone = 'Asia/Dubai';
  const now = moment().tz(uaeTimezone);

  if (now.isoWeekday() === 7) {
    // Check if today is Sunday
    return now.format('YYYY-MM-DD'); // Return today's date
  } else {
    const daysUntilSunday = (7 - now.isoWeekday()) % 7;
    const nextSunday = now
      .clone()
      .add(daysUntilSunday, 'days')
      .format('YYYY-MM-DD');
    return nextSunday; // Return next Sunday's date
  }
}


const nextSunday = getNextSundayDate();
console.log(nextSunday);

export function getNextMonthOrToday(uaeTimezone = 'Asia/Dubai') {
  const now = moment().tz(uaeTimezone);
  if (now.date() === 1) {
    return now.format('YYYY-MM-DD');
  } else {
    const nextMonth = now.clone().add(1, 'month').startOf('month');
    return nextMonth.format('YYYY-MM-DD');
  }
}


export function generateOTP(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters.charAt(randomIndex);
  }
  return otp;
}

