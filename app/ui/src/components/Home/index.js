import { Box, Tabs, Tab, TextField, Typography, Button, InputLabel, Container } from "@mui/material"
import { React, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Events, Event } from '../../utils/event'
import { Schedule } from '../../utils/schedule'
import './style.css'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function Home() {

    const [value, setValue] = useState(0);
    const [startDate, setStartDate] = useState(dayjs('2022-08-18T21:11:54'));
    const [endDate, setEndDate] = useState(dayjs('2022-08-18T21:11:54'));
    const [desc, setDesc] = useState("");
    const [eventList, setEventList] = useState([]);
    const [rooms, setRooms] = useState(0);

    const [startDate1, setStartDate1] = useState(dayjs('2022-08-18T21:11:54'));
    const [endDate1, setEndDate1] = useState(dayjs('2022-08-18T21:11:54'));
    const [desc1, setDesc1] = useState("");
    const [eventList1, setEventList1] = useState([]);
    const [rooms1, setRooms1] = useState(0);
    const [numberOfRooms, setNumberOfRooms] = useState(0);


    // useEffect(() => {
    //     // setEndDate(endDate);
    //     // setStartDate(startDate);
    //     // setEventList(eventList);
    //     console.log("EventList: ", eventList);
    // }, [startDate]);



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const textChange = (event) => {
        setDesc(event.target.value);
    };

    function addEvent() {
        let event = new Event(startDate.toDate(), endDate.toDate(), desc);
        setEventList((old) => [...old, event]);
    }
    function calculaSalas() {
        let events = new Events(eventList);
        let calcula = new Schedule(events);
        setRooms(calcula.computeNeededRooms());
    }

    const textChange1 = (event) => {
        setDesc1(event.target.value);
    };

    const numberChange = (event) => {
        setNumberOfRooms(event.target.value);
    };

    function addEvent1() {
        let event = new Event(startDate.toDate(), endDate.toDate(), desc);
        setEventList1((old) => [...old, event]);
    }
    function calculaSalas1() {
        let events = new Events(eventList, numberOfRooms);
        let calcula = new Schedule(events);
        calcula.computeSchedulesPartitionByDate();
        console.log("Oie", calcula.schedulesByDate);

    }

    return (
        <div className='home'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Home" />
                    <Tab label="Item 1" />
                    <Tab label="Item 2" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <div className='one'>
                    <h2>Agendador de Eventos</h2>
                    <h3> Item 1: Responsável por responder quantas salas são necessárias para determinada grade de eventos.</h3>
                    <h3> Item 2: Monta uma agenda para o usuário de acordo com a quantidade de salas informadas.</h3>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className='two'>
                    <h2>Cadastre seu evento</h2>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            required
                            id="outlined-required"
                            label="Descrição"
                            defaultValue="Evento"
                            value={desc}
                            onChange={textChange}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Data de início"
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DateTimePicker
                                label="Data de término"
                                value={endDate}
                                onChange={(newValue) => {
                                    setEndDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                    </Box>
                    <Box >
                        <Button onClick={addEvent} variant="contained" className="button"> Adicionar Evento </Button>
                        <Button onClick={calculaSalas} className="button" variant="contained"> Verificar salas necessárias </Button>
                    </Box>
                    {rooms != 0 ?
                        <InputLabel variant="filled" className='formControl' htmlFor="uncontrolled-native">
                            Quantidade de quartos: {rooms}
                        </InputLabel>
                        : <> </>}

                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div className='three'>
                    <h2>Cadastre seu evento</h2>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            required
                            id="outlined-required"
                            label="Descrição"
                            defaultValue="Evento"
                            value={desc1}
                            onChange={textChange1}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Data de início"
                                value={startDate1}
                                onChange={(newValue) => {
                                    setStartDate1(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DateTimePicker
                                label="Data de término"
                                value={endDate1}
                                onChange={(newValue) => {
                                    setEndDate1(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                    </Box>
                    <Box sx={{ m: 1, display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={addEvent1} variant="contained" className="button"> Adicionar Evento </Button>
                        
                    </Box>
                    <TextField
                            required
                            id="outlined-required"
                            label="Quantidade de salas"
                            defaultValue="Evento"
                            type="number"
                            value={numberOfRooms}
                            onChange={numberChange}
                        />
                        <Button onClick={calculaSalas1} className="button" variant="contained"> Verificar </Button>
                    {rooms1 != 0 ?
                        <InputLabel variant="filled" className='formControl' htmlFor="uncontrolled-native">
                            Quantidade de quartos: {rooms1}
                        </InputLabel>
                        : <> </>}

                </div>
            </TabPanel>
        </div>
    )

}

export default Home;