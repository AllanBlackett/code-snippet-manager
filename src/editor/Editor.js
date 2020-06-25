import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
// import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      title: '',
      id: ''
    };   
  }

  // When componentDidMount is mounted, its going to set the state
  componentDidMount = () => {
    this.setState({
      text: this.props.selectedSnippet.body,
      title: this.props.selectedSnippet.title,
      id: this.props.selectedSnippet.id
    });
  }

  // If user selects different note, we want the react quill (Editor) to be able to update
  componentDidUpdate = () => {
    // If the id of the one snippet the user selected is different from the one that is displaying, then call this.setState() method again
    if(this.props.selectedSnippet.id !== this.state.id) {
      this.setState({
        text: this.props.selectedSnippet.body,
        title: this.props.selectedSnippet.title,
        id: this.props.selectedSnippet.id
      });
    }
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

  updateBody = async (val) => {
    // Wait for the state to update
    await this.setState({ text: val });
    // once state is update then call the update() method
    this.update();
  };

  updateBody = async (txt) => {
    // Wait for the state to update
    await this.setState({ text: txt });
    // once state is update then call the update() method
    this.update();
  };




  // Everytime a user types a letter or character, etc, it's going to keep making http request to the database. 
  // debounce() prevents the database from updating everytime the value changes to allow the app to be more efficient.
  // debounce() wait for the user to stop typing for 1 1/2 secounds before the call to the database. 
  update = debounce(() => {
    this.props.snippetUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    })
  }, 1500);
}

export default withStyles(styles)(EditorComponent);