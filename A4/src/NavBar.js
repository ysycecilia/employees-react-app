import React, {Component} from 'react';

class NavBar extends Component{
    render(){
        return (
            <nav className ="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fliuid">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="/">WEB422 - Project Portal (Siyi Yuan)</a>

                    </div>
                </div>
            </nav>
        )
    }
}
export default NavBar;