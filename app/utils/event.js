'use strict';

class Event {
  constructor(start, end, desc) {
    this.dayOfMonth = start.getDate();
    this.month = start.getMonth();
    this.year = start.getFullYear();
    this.start = start;
    this.end = end;
    this.desc = desc;
    this.scheduled = false;
  }
  setScheduled() {this.scheduled = true;}
}


class Events {
  rooms = 0;
  eventArray = [];
  eventsByDate  = {}
  dates = [];
  // heap = [];
  constructor(events = [], rooms = 0) {
    this.eventArray = events.copyWithin(-1, 0);
    this.rooms = rooms;
    this.setDates(events);
    // this.heap = [-1, 5, 10, 20, 14, 16, 24, 26];
  }

  add(ev) {
    this.eventArray.push(ev);
    this.addDate(ev);
  }

  addDate(ev) {
    const dateEv = [ev.year, ev.month + 1, ev.dayOfMonth].join('-');
    if (!this.dates.find((v) => v === dateEv)) {
      console.log('Not found');
      this.dates.push(dateEv)
      this.eventsByDate[dateEv] = []
    }
  }

  setRooms(rooms) {this.rooms = rooms}

  setDates(events) {
    this.dates = events.map((ev) => {
      return [ev.year, ev.month + 1, ev.dayOfMonth].join('-');
    })
    let uniqueDates = [... new Set(this.dates)];
    uniqueDates.forEach((date) => this.eventsByDate[date] = []);
    this.splitByDate();
    console.log(this.dates);
    console.log(this.eventsByDate );
  }

  orderByStart() {
    this.eventArray = this.eventArray.sort((e1, e2) => e1.start.getTime() - e2.start.getTime());
  }

  orderByEnd() {
    this.eventArray = this.eventArray.sort((e1, e2) => e1.end.getTime() - e2.end.getTime());
  }

  splitByDate() {
    Object.keys(this.eventsByDate).forEach((date) => { 
      this.eventsByDate[date] = [];
    })
    this.eventArray.forEach((date) => {
      let dateString = [date.year, date.month + 1, date.dayOfMonth].join('-');
      this.eventsByDate[dateString].push(date);
    })
  }

  // IntervalPartitioning() {
  //   for (let index = 1; index < eventArray.length; index++) {
  //     if(eventArray[index].start <= this.heap[1]) { 
  //       // addEventInRoom(); // Atualizar Heap (Data de final) e adicionar evento na room
  //     } else {
  //       // addEventInNewRoom(); // Criar nova room e adicionar evento nela, adicionar nova classe na Heap(Data de final)
  //     }
      
  //   }
  // }
}

module.exports = {Event,Events}
