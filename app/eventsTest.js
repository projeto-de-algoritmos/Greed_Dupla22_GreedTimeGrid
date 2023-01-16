const {Event, Events} = require('./utils/event');
const {Schedule} = require('./utils/schedule');
console.log("Greater?", 'Date 1: ', new Date('2022-05-12T11:40:00'), 'Date 2:', new Date('2022-05-12T11:42:00'),
'Ans: ', new Date('2022-05-12T11:40:00') < new Date('2022-05-12T11:42:00'))

const events = new Events([new Event(new Date(Date.now()), new Date(Date.now() + 50000.0), 'Apresentação') ]);

events.add(new Event(new Date('2022-05-12T06:45:00'), new Date('2022-05-12T07:45:00'), 'Aula de esgrima'));
events.add(new Event(new Date('2022-05-12T07:45:00'), new Date('2022-05-12T09:45:00'), 'Propostas de extensão'));
events.add(new Event(new Date('2022-05-12T10:45:00'), new Date('2022-05-12T11:45:00'), 'Palestra de inclusão'));
events.add(new Event(new Date('2022-05-12T11:40:00'), new Date('2022-05-12T11:42:00'), 'Aula de balé'));

events.orderByStart();
events.orderByEnd();

const schedule = new Schedule(events);
console.log(schedule.computeNeededRooms());
schedule.computeSchedulesPartitionByDate();
console.log(schedule.schedulesByDate);
// console.log(schedule.notSelected);


