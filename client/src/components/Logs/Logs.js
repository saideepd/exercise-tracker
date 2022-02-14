import React from 'react'
import './Logs.css';
import { Alert, Button, debounce, Paper, TextField } from '@mui/material';
import { styled } from "@mui/material/styles";
import axios from 'axios';
import { green } from '@mui/material/colors';

const CssTextField = styled(TextField)({
    '& label.MuiInputLabel-root': {
        color: '#0026ca',
    },
    '& label.Mui-focused': {
        color: 'red',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#0026ca',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#7a7cff',
            border: '2px solid #7a7cff',
            color: green
        },
        '&:hover fieldset': {
            borderColor: '#304ffe',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0026ca'
        },
    },
});

const ColorButton = styled(Button)({
    backgroundColor: '#304fff',
    '&:hover': {
        backgroundColor: '#0026ca'
    }
});

let isUserLogRequested = false;
let usernameResponse;
let userLogsResponse;
let userFound = false;

const Logs = ({ baseUrl, submitLogs, setSubmitLogs, userLogs, setUserLogs, userData, setUserData, logsFormData, setLogsFormData }) => {

    // Get the user by username
    const getUserByUsername = async () => {
        console.log(`Inside getByUsername: ${logsFormData.username}`);
        await axios.get(`${baseUrl}/api/username/${logsFormData.username}`)
            .then((response) => {
                setUserData(response.data)
                usernameResponse = response.data;
                userFound = true;
            })
            .catch((error) => {
                userFound = false;
                console.log(`Error in getByUsername: ${error}, username: ${logsFormData.username}`);
            })

    };

    // API to Get User's Logs by username
    const getUserLogs = async () => {
        console.log(`Called getUserLogs() method: ${logsFormData.username}`);
        await getUserByUsername();

        if (userFound) {
            console.log(`getByUsername Response: ${JSON.stringify(userData)}, usernameResponse: ${JSON.stringify(usernameResponse)}`);
            await axios.get(`${baseUrl}/api/users/${usernameResponse._id}/logs?from=${logsFormData.fromDate}&to=${logsFormData.toDate}&limit=${logsFormData.limit}`)
                .then((response) => {
                    setUserLogs(response.data)
                    userLogsResponse = response.data;
                    console.log(`getUserLogs Response Data: ${JSON.stringify(userLogs)}, Only Logs: ${JSON.stringify(userLogs.log)}, userLogsResponse: ${JSON.stringify(userLogsResponse.log)}`);
                })
                .catch((error) => {
                    console.log(`Error in getUserLogs: ${error}, username: {username}`);
                })
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // Setting submit to true in 0.1s
        setTimeout(() => {
            console.log('Called HandleSubmit to true')
            // Set isUserLogRequested & userFound to false 
            // to remove the Alerts & old data from UI
            isUserLogRequested = false;
            userFound = false;

            setSubmitLogs(true);
            isUserLogRequested = true;

            console.log("You've submitted Logs form");
        }, 100);

        // Setting submit to false in next 3s
        setTimeout(async () => {

            // Call get user log method
            await getUserLogs();

            console.log('called getUserLogs()');

            // Set submitted to false after 3s
            setSubmitLogs(false);
            console.log('Called HandleSubmit to false');
        }, 3000);
    };

    const handleChange = (event) => {
        setLogsFormData({
            name: event.target.name,
            value: event.target.value
        });
        // console.log(`Logs name: ${event.target.name}, value: ${event.target.value}, userLogs: ${logsFormData.username}`);
    }

    const handleUserLogs = debounce((event) => {
        console.log("Inside handleUserLogs")
        handleChange(event);
    }, 500);


    // console.log(`Inside json2table: ${JSON.stringify(userLogsResponse)}, typeof: ${typeof userLogsResponse}`)
    const tableData = userLogsResponse !== undefined && userLogsResponse.log.map((logItem) => {
        return (
            <tr key={logItem.description + logItem.date + Math.random().toFixed(2)}>
                <td>{logItem.description}</td>
                <td>{logItem.duration}</td>
                <td>{logItem.date}</td>
            </tr>
        )
    })


    return (
        <div className="logs-component">
            <form onSubmit={handleSubmit}>
                <Paper
                    elevation={3}
                    className="logs-paper"
                    style={{ backgroundColor: '#c0cfff', paddingTop: '0.5em' }}
                >
                    <h3>Find Exercise Logs</h3>
                    <p className="endpoint logs-endpoint">GET /api/users/:_id/logs</p>
                    <CssTextField
                        required
                        id="outlined-required"
                        label="Username"
                        name="username"
                        placeholder="Username"
                        className="user-input"
                        size="small"
                        margin="dense"
                        title="Enter your username"
                        onChange={handleUserLogs}
                        disabled={submitLogs}
                    />
                    <CssTextField
                        id="outlined-required"
                        label="From Date"
                        name="fromDate"
                        placeholder="From Date (yyyy-mm-dd)"
                        className="user-input"
                        size="small"
                        margin="dense"
                        title="Enter from date"
                        onChange={handleUserLogs}
                        disabled={submitLogs}
                    />
                    <CssTextField
                        id="outlined-required"
                        label="To Date"
                        name="toDate"
                        placeholder="To Date (yyyy-mm-dd)"
                        className="user-input"
                        size="small"
                        margin="dense"
                        title="Enter to date"
                        onChange={handleUserLogs}
                        disabled={submitLogs}
                    />
                    <CssTextField
                        id="outlined-required"
                        label="Number of logs"
                        name="limit"
                        placeholder="Limit"
                        className="user-input"
                        size="small"
                        margin="dense"
                        title="Enter number to limit logs"
                        type="number"
                        onChange={handleUserLogs}
                        disabled={submitLogs}
                    />
                    <ColorButton
                        variant="contained"
                        id="get-exerciselog-btn"
                        color="primary"
                        type="submit"
                        disabled={submitLogs}
                    >
                        Submit
                    </ColorButton>
                </Paper>
                {submitLogs &&
                    <div>
                        <br />
                        <Alert variant="filled" severity="info" color="info">
                            Fetching data...
                        </Alert>
                    </div>
                }
                {/* Only display error alert when logs are requested and user is not found */}
                {isUserLogRequested && !userFound &&
                    <div>
                        <br />
                        <Alert variant="filled" severity="error" color="error">
                            Uh-oh... User "{logsFormData.username}" not found!
                        </Alert>
                    </div>
                }
                {isUserLogRequested && userFound &&
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Duration</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData}
                            </tbody>
                        </table>
                    </div>
                }
            </form>

        </div>
    )
}

export default Logs