/**
 * This function give a date in format like 11 juin 2020, with seconds value given
 * @param seconds   {int}:      number of seconds from a timestamp
 * @return          {string}:   date in format => 11 juin 2020
 */
export const getDate = (seconds) => {
    let date = new Date(parseInt(seconds) * 1000);
    let options = {month: 'long'};
    let month = new Intl.DateTimeFormat('fr-FR', options).format(date);
    return date.getDate() + " " + month + " " + date.getUTCFullYear();
};


/**
 * This function give a date in format like 11 juin 2020, with milliseconds value given
 * @param milliseconds  {int}:      number of milliseconds from a timestamp
 * @return              {string}:   date in format => 11 juin 2020
 */
export const getDateFromMilli = (milliseconds) => {
    let date = new Date(parseInt(milliseconds));
    let options = {month: 'long'};
    let month = new Intl.DateTimeFormat('fr-FR', options).format(date);
    return date.getDate() + " " + month + " " + date.getUTCFullYear();
};


/**
 * This function give a date in format like June 11, 2020.
 * used for firestore date, with milliseconds value given
 * @param milliseconds  {int}:      number of milliseconds from a timestamp
 * @return              {string}:   date in format => June 11, 2020
 */
export const getDateToFirestore = (milliseconds) => {
    let date = new Date(parseInt(milliseconds));
    let options = {month: 'long'};
    let month = new Intl.DateTimeFormat('en-EN', options).format(date);
    return month + " " + date.getDate() + ", " + date.getUTCFullYear();
};


/**
 * This function give a date in format like June 11, 2020, 10:15:00.
 * used for firestore date, with milliseconds value given
 * @param milliseconds  {int}:      number of milliseconds from a timestamp
 * @return              {string}:   date in format => June 11, 2020, 10:15:00.
 */
export const getDateWithHourMnSeconds = (milliseconds) => {
    let date = new Date(parseInt(milliseconds));
    let options = {month: 'long'};
    let month = new Intl.DateTimeFormat('en-EN', options).format(date);
    return month + " " + date.getDate() + ", " + date.getUTCFullYear() + ", " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};


/**
 * This function give a date in format like  11/6/2020, 10:15.
 * @param seconds   {int}:      number of seconds from a timestamp
 * @return          {string}:   date in format => 11/6/2020, 10:15.
 */
export const getDateWithHourMn = (seconds) => {
    let date = new Date(parseInt(seconds)* 1000);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getUTCFullYear() + " " +
        date.getHours() + ":" + date.getMinutes();
};


export const getRemainingDate = (d) => {
    const lastDate = d ;
    let dateNow = new Date(Date.now())
    dateNow = dateNow.getTime() / 1000
    let seconds = Math.floor((lastDate - dateNow));
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
    if (days === 0 && hours === 0 && minutes === 0) return `L'annonce va se finir`;
    return `Il vous reste ${days === 0 ? "" : `${days}j`} ${
        hours === 0 ? "" : `${hours}h`
    } ${minutes}min`;
};


