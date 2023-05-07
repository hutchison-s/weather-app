const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

export function convertDateToObject(day) {
    const [year, month, date] = day.split("-");
    let newDate = new Date(year, parseInt(month, 10) - 1, parseInt(date, 10));
    let dayOfWeek = weekDays[newDate.getDay()];
    const dayDate = newDate.toDateString().split(" ");
    return {
      dayOfWeek: dayOfWeek,
      dateString: dayDate
    }
  }

export function timeString(date) {
    let hour = date.getHours() % 12;
    hour == 0 ? hour = 12 : null;
    let min = date.getMinutes();
    min < 10 ? min = "0"+min : null;
    let amPM = date.getHours() >= 12 ? "PM" : "AM"
    return `${hour}:${min} ${amPM}`
}

export function timeToDateObject(time) {
    const [year, month, date] = time.split("T")[0].split("-");
    const [hours, mins] = time.split("T")[1].split(":");
    return new Date(year, month, date, hours, mins)
}

export function convertPrecipChance(percent, code) {
    let chanceWord;
    switch (true) {
      case (percent <= 55 && percent >= 30 && code > 50):
        chanceWord = "Chance of ";
        break;
      case (percent < 30 && code > 50):
        chanceWord = "Possible ";
        break;
      default:
        chanceWord = ""
    }
    return {
      percent: percent,
      chanceWord: chanceWord
    }
}