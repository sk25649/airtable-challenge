import getTime from "date-fns/getTime";
import isBefore from 'date-fns/isBefore'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import differenceInMonths from 'date-fns/differenceInMonths';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import setDate from 'date-fns/setDate';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import addDays from 'date-fns/addDays';

const MONTH_LABELS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

export const getMinMaxRange = (timelines) => {
    let minStart = Number.MAX_SAFE_INTEGER;
    let maxEnd = Number.MIN_SAFE_INTEGER;

    timelines.forEach(timeline => {
        const { start, end } = timeline;
        const startInMill = getTime(new Date(start));
        const endInMill = getTime(new Date(end));
        minStart = Math.min(minStart, startInMill);
        maxEnd = Math.max(maxEnd, endInMill);
    });

    // // add a month buffer on each end
    minStart = setDate(new Date(minStart), 1);
    maxEnd = setDate(new Date(maxEnd), 31);

    return {
       start: getTime(minStart),
       end: getTime(maxEnd),
       numOfMonths: differenceInMonths(new Date(maxEnd), new Date(minStart)),
    };
};

export const getMonthLabels = (start, numOfMonths) => {
    let labels = [];
    let curMonth = getMonth(start); // month isn't 0 based
    let curYear = getYear(start);
    for (let i = 0; i < numOfMonths; i++) {
        labels.push(`${MONTH_LABELS[curMonth]} ${curYear}`);
        if (curMonth === 11) {
            curMonth = 0;
            curYear++;
        } else {
            curMonth++;
        }
    }
    return labels;
}

export const getDaysInMonths = (start, numOfMonths) => {
    let days = [];
    let curMonth = getMonth(start); // month isn't 0 based
    let curYear = getYear(start);
    for (let i = 0; i < numOfMonths; i++) {
        days.push(getDaysInMonth(new Date(curYear, curMonth)));
        if (curMonth === 11) {
            curMonth = 0;
            curYear++;
        } else {
            curMonth++;
        }
    }
    return days;
}

class TimelineRow {
    constructor(item) {
        this.endDate = new Date(item.end);
        this.items = [item];
    }

    getEndDate() {
        return this.endDate;
    }

    addItem(item) {
        this.items.push(item);
        this.endDate = new Date(item.end);
    }

    getItems() {
        return this.items;
    }
}

export const constructTimelineRows = (timelines) => {
    let rows = [new TimelineRow(timelines[0])];
    for (let i = 1; i < timelines.length; i++) {
        const curTimeline = timelines[i];
        let merged = false;
        for (let j = 0; j < rows.length; j++) {
            const curRow = rows[j];
            // check interval
            if (isBefore(curRow.getEndDate(), new Date(curTimeline.start))) {
                curRow.addItem(curTimeline);
                merged = true;
                break;
            }
        }
        if (!merged) {
            rows.push(new TimelineRow(curTimeline));
        }
    }

    return rows;
}

export const calculateOffset = (row, start) => {
    const { items } = row;
    let prev = start;
    for (let i = 0; i < items.length; i++) {
        // let's say each day is 6px wide
        const curItem = items[i];
        const curEndDate = new Date(curItem.end);
        const curStartDate = new Date(curItem.start);
        
        // cannot be negative
        const dateDiff = Math.max(differenceInCalendarDays(curStartDate, prev), 0);

        // 1 day difference should be "touching"
        // Time is converting from UTC to PST
        curItem.offset = dateDiff === 1 ? 0 : dateDiff; 

        // count the last day as well
        curItem.numOfDays = differenceInCalendarDays(curEndDate, curStartDate) + 1;
        prev = curEndDate;
    }

    return row;
};