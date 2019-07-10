import React, {useState, useEffect} from 'react'
import axios from 'axios'
import TeamInfo from './components/TeamInfo'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const url = "https://siyi-web422-assignment.herokuapp.com/";

const TitleTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#cabaea',
      contrastText: 'black',
    },
    }});

  export default function TeamApp() {
    const [Teams, loadTeams] = useState([]);
    const [Employees, loadEmployees] = useState([]);
    const [Projects, loadProjects] = useState([]);
    const [LoadStatus, setLoadStatus] = useState(false);

    useEffect( () => {
      const fetchData = async () => {
        const tms = await axios.get(url + 'teams-raw');
        loadTeams(tms.data);
        const emp = await axios.get(url + 'employees');
        loadEmployees(emp.data);
        const prj = await axios.get(url + 'projects');
        loadProjects(prj.data);
        setLoadStatus(true);
      };
      fetchData();
    }, []);

  return (
      <MuiThemeProvider theme={TitleTheme}>
      <Container>
        <AppBar position="relative"> 
          <Toolbar >
            <Link to="#" variant="h5" color="textPrimary">Assignment 3 - Team Details</Link>
          </Toolbar>
        </AppBar>
       
          <Box display="flex"
               alignContent="flex-start"
               flexDirection="row"
               flexWrap="wrap">

          { LoadStatus ? Teams.map(team =>
                    <TeamInfo
                        key={team._id}
                        Team={team}
                        Employees={Employees}
                        Projects={Projects}
                        Url={url}/>) : (<p>Program is loading</p>)}
            </Box>
      </Container>
    </MuiThemeProvider>
    );
}