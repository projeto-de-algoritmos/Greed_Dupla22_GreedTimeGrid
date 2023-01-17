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
    const [startDate, setStartDate] = useState(dayjs('2014-08-18T21:11:54'));
    const [endDate, setEndDate] = useState(dayjs('2014-08-18T21:11:54'));
    const [desc, setDesc] = useState("");
    const [eventList, setEventList] = useState([]);
    const [rooms, setRooms] = useState(0);

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

    return (
        <div className='home'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Home" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <div className='one'>
                    <h2>HOME</h2>
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
                    <Box sx={ { m: 1, display: 'flex', justifyContent: 'center' } }>         
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
                        defaultValue="Hello World"
                    />
                </Box>
            </TabPanel>
        </div>
    )

}

export default Home;