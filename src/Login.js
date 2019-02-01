import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';

import firebase from './initializers/firebase';
import { connect } from 'react-redux';
import { saveToken, clearToken } from './initializers/action';

class Login extends Component{
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      userLoggedIn: false,
      photoUrl: ''
    };
  }

componentDidMount(){
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      this.setState({
        userLoggedIn: true,
        photoUrl: user.providerData[0].photoUrl
      })
    }else{
      this.setState({
        userLoggedIn: false,
        photoUrl: ''
      })
    }
  })
}

  login(){
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/photoslibrary.readonly');

    firebase.auth().signInWithPopup(provider).then(result=>{
      let token = result.credential.accessToken;
      this.props.saveToken(token);
    }).catch(err=>{
      console.log(err);
    })
  }

logout(){
   firebase.auth().signOut().then(()=>{
     this.props.clearToken();
   });
}

loginButton(){
  if (this.state.userLoggedIn) return(
    [<Avatar src={this.state.photoUrl} />,(<IconButton color="inherit" onClick={this.logout}><ExitToApp /></IconButton>)]
  );

  return (<Button variant="outlined" color="secondary" onClick={this.login}>
  Iniciar sesión con Google
  </Button>);
}

  render(){
    return(
      <div>
      <p>{this.props.token}</p>
      {this.loginButton()}
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    token: state.token
  }
}

const mapDispatchToProps = {
  saveToken,
  clearToken
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


// withStyles({
//   container:{
//     display: 'flex',
//     flexDirection: 'row'
//   }
// })(Login);
