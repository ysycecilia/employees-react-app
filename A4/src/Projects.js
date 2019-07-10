
import React, {Component} from 'react'
import MainContainer from './MainContainer';
import moment from 'moment';

class Projects extends Component{
    constructor(props){
        super(props);
        this.state={
            projects:[]
        };
    }

    componentDidMount(){
        fetch("https://siyi-web422-assignment.herokuapp.com/projects")
        .then(res=>res.json())
        .then(returnedData=>{
            this.setState({
                projects: returnedData
            })
        }).catch(err=>{
            console.log(err);
        });
    }

    render(){
        return(
            <MainContainer sidebar="Projects">
                <h1 className="page-header">Projects</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <td><b>Name</b></td>
                            <td><b>Description</b></td>
                            <td><b>Start Date</b></td>
                            <td><b>End Date</b></td>
                        </tr>        
                    </thead>
                        
                    <tbody>
                        {this.state.projects.map(project=>{
                            let projectEndDate = project.ProjectEndDate ? project.ProjectEndDate : "n/a";
                            return(
                                <tr key={project._id}>
                                    <td>{project.ProjectName}</td>
                                    <td>{project.ProjectDescription}</td>
                                    <td>{moment(project.ProjectStartDate).utc().format('LL')}</td>
                                    <td>{projectEndDate}</td>
                                </tr>           
                            );
                        })} 
                    </tbody>
                </table>
            </MainContainer>
        );
    }
}

export default Projects;