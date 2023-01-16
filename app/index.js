const {Event, Events} = require('./utils/event');

const events = new Events([new Event(new Date(Date.now()), new Date(Date.now() + 50000.0), 'Apresentação') ]);

events.add(new Event(new Date('2022-05-12T06:45:00'), new Date('2022-05-12T07:45:00'), 'Aula de esgrima'));
events.add(new Event(new Date('2022-05-12T07:45:00'), new Date('2022-05-12T09:45:00'), 'Aula de esgrima'));
events.add(new Event(new Date('2022-05-12T10:45:00'), new Date('2022-05-12T11:45:00'), 'Aula de esgrima'));

events.orderByStart();
