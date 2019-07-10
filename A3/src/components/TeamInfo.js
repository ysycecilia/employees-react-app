import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import axios from "axios";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 300,
        margin: theme.spacing(1),
    },

    SaveButton: {
        padding: theme.spacing(1),
    },
    
    typography: {
        padding: theme.spacing(2)
    },

    formControl: {
        maxWidth: '100%',
        minWidth: 100,
        marginBottom: theme.spacing(2)
    }
}));


export default function TeamInfo(props) {
    const classes = useStyles();
    const [TeamMembers, setTeamMembers] = useState(props.Team.Employees);
    const [TeamLead, setTeamLead] = useState(props.Team.TeamLead);
    const [Projects, setProjects] = useState(props.Team.Projects.map(assignedID => props.Projects.find(prj => prj._id === assignedID)));
    const [anchorEl, setAnchorEl] = useState(null);
    const [updatePopover, savedPopover] = useState(" ");
    const open = Boolean(anchorEl);
    const id = null;

    function handleTeamLeadChange(event) {
        setTeamLead(event.target.value)
    }
    function handleTeamMemberChange(event) {
        setTeamMembers(event.target.value)
    }
    function handleProjectChange(event) {
        setProjects(event.target.value)
    }
    function handleClose(event) {
        setAnchorEl(null);
    }

    function EmployeeName(id) {
        if (Array.isArray(id)) 
            return id.map(_id => props.Employees.find(emp => emp._id === _id)).map(employee => employee.FirstName + ' ' +  employee.LastName).join(', ');
        let locateEmployee = props.Employees.find(emp => emp._id === id);
        if (locateEmployee) 
            return locateEmployee.FirstName + ' ' + locateEmployee.LastName;
        return `The input employee id is invalid. Please enter valid employee id.`;
    }
  
    function ProjectName(id) {
        if (Array.isArray(id)) {
            let assignedProjects = id.map((assignedPrj => props.Projects.find(prj => prj._id === assignedPrj._id)));
            if (assignedProjects) 
                return assignedProjects.map(assignedPrj => assignedPrj.ProjectName).join(', ');

        } else {
            let assignedProject = props.Projects.find(prj => prj._id === id);
            if (assignedProject) 
                return assignedProject.ProjectName;
            return `The project name is invalid. Please enter valid project name.`;
        }
    }
    function handleSave(event) {
        setAnchorEl(event.currentTarget);
        const putData = async () => {
           
            await axios.put(props.Url + 'team/' + props.Team._id,
                {
                    Projects,
                    Employees: TeamMembers,
                    TeamLead
                })
                .then(response => savedPopover(response.data.message));
        };
        putData();
    }

    return (
        <Card className={classes.card}>
            <CardHeader title={props.Team.TeamName}
                        action={
                            <div>
                                <Button variant="outlined" className={classes.button} onClick={handleSave}>
                                Save</Button>
                                
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}>
                                    {updatePopover}
                                </Popover>
                            </div>
                        }>
            </CardHeader>

            <CardContent>
                <FormControl variant="outlined" className={classes.formControl}>
                    <Typography variant="h6" color ="inherit" >Team Lead</Typography>
                    <Select
                        value={TeamLead}
                        onChange={handleTeamLeadChange}
                        variant="outlined"
                        id="team-lead-select"
                        renderValue={selected => EmployeeName(selected)}>
                        {props.Employees.map(emp =>
                                <MenuItem key={emp._id} value={emp._id}>
                                    <ListItemText primary={EmployeeName(emp._id)} />
                                </MenuItem>)
                        }
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                    <Typography variant="h6" color ="inherit" >Team Members</Typography>
                    <Select
                        multiple
                        value={TeamMembers}
                        onChange={handleTeamMemberChange}
                        variant="outlined"
                        id="team-members-select"                       
                        renderValue={selected => EmployeeName(selected)}>
                        {props.Employees.map(emp =>
                            <MenuItem key={emp._id} value={emp._id}>
                                <ListItemText primary={EmployeeName(emp._id)} />
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                    <Typography variant="h6" color ="inherit" >Projects</Typography>
                    <Select
                        multiple
                        value={Projects}
                        onChange={handleProjectChange}
                        variant="outlined"
                        id="projects-select"                        
                        renderValue={selected => ProjectName(selected)}>
                        {Projects.map(prj =>
                            <MenuItem key={prj._id} value={prj._id}>
                                <ListItemText primary={ProjectName(prj._id)} />
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
    );
}

