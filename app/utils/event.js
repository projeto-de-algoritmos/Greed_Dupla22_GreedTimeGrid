'use strict';

class Event {
  constructor(start, end, desc) {
    this.dayOfMonth = start.getDate();
    this.month = start.getMonth();
    this.year = start.getFullYear();
    this.start = start;
    this.end = end;
    this.desc = desc;
  }
}

/*
 * Events in rooms:
 * {'dateAsId': [
*     [Event1, ..., EventN],   //room 1
*     [EventN+1, ..., EventZ]  //room 2
*     ...
*  ]}-> Each event happenning in the room}
*/
class Events {
  rooms = 0;
  eventArray = [];
  eventsDates  = {};
  dates = [];
  constructor(events = [], rooms = 0) {
    this.eventArray = events.copyWithin(-1, 0);
    this.rooms = rooms;
    this.setDates(events);
  }

  add(ev) {
    this.eventArray.push(ev);
    this.addDate(ev);
  }

  addDate(ev) {
    const dateEv = [ev.year, ev.month + 1, ev.dayOfMonth].join('-');
    if (!this.dates.find((_t, d) => d === dateEv)) {
      console.log('Not found');
      this.dates.push(dateEv)
      this.eventsDates [dateEv] = []
      console.log(this.dates);
      console.log(this.eventsDates );
    }
  }

  setRooms(rooms) {this.rooms = rooms}

  setDates(events) {
    this.dates = events.map((ev) => {
      return [ev.year, ev.month + 1, ev.dayOfMonth].join('-');
    })
    let temp = [];
    this.dates = this.dates.filter((date) => {
      if (!temp.find((_t, d) => d === date) ){
        temp.push(date);
        return true;
      }

      return false;
    });

    this.dates.forEach((date) => this.eventsDates [date] = []);
    console.log(this.dates);
    console.log(this.eventsDates );
  }

  orderByStart() {
    console.log('orderByStart');
    this.eventArray.sort((e1, e2) => e1.start - e2.start);
    console.log(this.eventArray);
  }

  orderByEnd() {
    console.log('orderByEnd');
  }
}

module.exports = {Event,Events}
