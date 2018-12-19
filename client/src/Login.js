import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Username"
                    floatingLabelText="Username"
                    onChange = {(event, newValue) => this.setState({username:newValue})}
                />
                <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    onChange = {(event, newValue) => this.setState({password:newValue})}
                />
                <RaisedButton
                    label="Login"
                    primary={true}
                    onClick= {(event) => this.handleClick(event)}
                />
            </div>
        );
    }
}

export default Login;