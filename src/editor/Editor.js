import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
// import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import { debounce } from '@material-ui/core';

class EditorComponent extends Component {
  constructor() {
    super();
    this.state = {
    text: '',
    title: '',
    id: ''
    };   
  }
  render() {
    // Access to the classes variables from this.props
    const { classes } = this.props;

    return(
      // Whatever the text: '', is from this.state object is going to be the value property of react-quill.
      // this.updateBody is going to be a function that is going to be asyncronous
        // that's going to set some state, and once the state updates, call the update function.   
    <div className={classes.editorContainer}>
      <ReactQuill
        value={this.state.text} 
        onChange={this.updateBody}>

      </ReactQuill>
    </div>
    );
  }
  update = async (val) => {
    // Wait for the state to update
    await this.setState({ text: val });
    // once state is update then call the update() method
    this.update();
  };
  // Everytime a user types a letter or character, etc, it's going to keep making http request to the database. 
  // debounce() prevents the database from updating everytime the value changes to allow the app to be more efficient.
  // debounce() wait for the user to stop typing for 1 1/2 secounds before the call to the database. 
  update = debounce(() => {
    console.log('Updating Database');
  }, 1500);
}

export default withStyles(styles)(EditorComponent);