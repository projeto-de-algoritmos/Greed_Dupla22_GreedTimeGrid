'use strict'
const {Heap} = require('./heap');
class Schedule {
  schedulesByDate = {};
  // notSelected = [];
  constructor(events) {
    this.events = events ;
    this.heapManager = new Heap();
    [... new Set(this.events.dates)].forEach(date => this.schedulesByDate[date] = []);
  } 

  removeFromHeap(list) {
    if (list.length == 1) return null;
    if (list.length == 2) return list.pop();
    const prevRoot = list[1];
    list[1] = list.pop();
    this.heapManager.heapifyDown(list);
    console.log("Numero Removido: ", prevRoot);
    return prevRoot;

  }

  computeNeededRooms() {
    this.events.orderByStart();
    this.events.splitByDate();
    const dates = this.events.eventsByDate;
    let rooms = 1;
    for (const date of Object.keys(dates) ){
      let heap = [-1];
      console.log('Heap start: ', heap);
      let auxRooms = 1;
      for(const event of dates[date]) {
        let start = event.start;
        let timeConflict = false;

        if (heap.length === 1) heap.push(event);
        else {
          const ev = heap[1];
          console.log(ev);
          if(start >= ev.end) {
            this.removeFromHeap(heap);
            heap.push(event);
            if(heap.length > 1) this.heapManager.heapifyUp(heap);
          } else {
            console.debug('----------------------------')
            console.debug('Conflict !!!!')
            console.debug(event, 'vs', ev)
            console.debug('----------------------------')

            ++auxRooms;
            heap.push(event);
            if(heap.length > 1) this.heapManager.heapifyUp(heap);
          }
        }
        /**
        if (start.getTime() < ev.end.getTime()) {
            console.debug('----------------------------')
            console.debug('Conflict !!!!')
            console.debug(event, 'vs', ev)
            console.debug('----------------------------')
            timeConflict  = true;
            break;
          }

        if(timeConflict) {
          ++auxRooms;
          heap.push(event);
          this.heapManager.heapifyUp(heap)
        }
        */
      }
      rooms = Math.max(rooms, auxRooms);
      //heap = [];
    }

    this.events.rooms = rooms;
    return rooms;
  }

  /*
  * Events in rooms:
  * {'dateAsId': [
  *     [Event1, ..., EventN],   //room 1
  *     [EventN+1, ..., EventZ]  //room 2
  *     ...
  *  ]}-> Each event happenning in the room}
  */
  computeSchedulesPartitionByDate() {
    console.debug('Schedules by date: ', this.schedulesByDate);
    let rooms = this.events.rooms;
    this.events.orderByEnd();
    this.events.splitByDate();

    console.debug('Events by date: ', this.events.eventsByDate);

    for (const date of Object.keys(this.schedulesByDate)) {
      let roomForDate = 0;
      let scheduleCount = 0;
      while (rooms--) {
        if (this.events.eventsByDate[date].length <= scheduleCount) break;
        this.schedulesByDate[date].push([]);
        scheduleCount += this.partitionForRoom(roomForDate, date);
        ++roomForDate;
      }
      rooms = this.events.rooms;
    }
  }

  partitionForRoom(room, date) {
    let scheduleCount = 0;
    this.schedulesByDate[date][room] = [];
    console.log('Empty schedules: ', this.schedulesByDate[date][room] );
    this.events.eventsByDate[date].forEach((ev, ind) => {
      let conflict = false;
      if (!ev.scheduled) {
        for (const processedEv of this.schedulesByDate[date][room]) {
          if (ev.start.getTime() < processedEv.end.getTime()) {
            conflict = true;
            break;
          }
        }

        if (!conflict) {
          this.schedulesByDate[date][room].push(ev);
          ev.scheduled = true;
          ++scheduleCount;
        }
      }
    });

    console.debug('Already scheduled events: ', this.schedulesByDate[date]);
    console.log('Schedules done: ', scheduleCount)
    return scheduleCount;
  }
}

module.exports = {Schedule};
