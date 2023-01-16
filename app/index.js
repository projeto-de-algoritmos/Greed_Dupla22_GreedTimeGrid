const {Event, Events} = require('./utils/event');

const events = new Events([new Event(new Date(Date.now()), new Date(Date.now() + 50000.0), 'Apresentação') ]);

const heap = new Heap();

events.add(new Event(new Date('2022-05-12T06:45:00'), new Date('2022-05-12T07:45:00'), 'Aula de esgrima'));
events.add(new Event(new Date('2022-05-12T07:45:00'), new Date('2022-05-12T09:45:00'), 'Propostas de extensão'));
events.add(new Event(new Date('2022-05-12T10:45:00'), new Date('2022-05-12T11:45:00'), 'Palestra de inclusão'));
events.add(new Event(new Date('2022-05-12T11:40:00'), new Date('2022-05-12T11:42:00'), 'Aula de balé'));


// heap.add(2);
// heap.remove();
// heap.remove();
// heap.remove();
// heap.remove();
// heap.remove();


events.orderByStart();
events.orderByEnd();
