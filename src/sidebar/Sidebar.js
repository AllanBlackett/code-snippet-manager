import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
// import SidebarElementComponent from '../sidebarElement/SidebarElement';

class SidebarComponent extends Component {
  constructor() {
    super();
    this.state = {
      addingSnippet: false,
      title: null
    };    
  }
  render() {

    const { snippets, classes, selectedSnippetIndex } = this.props;
    
    return(
    <div className={classes.sidebarContainer}>
      <Button
        onClick={this.newSnippetBtnClick}
        className={classes.newSnippetBtn}>New Snippet</Button>
        {
          this.state.addingSnippet ? 
          <div>
            <input type= 'text'
            className={classes.newSnippetInput}
            placeholder='Enter Snippet title'
            onKeyUp={(e) => this.updateTitle(e.target.value)}>
            </input>
          </div> :
          null
        }
    </div>
    );
  }
  newSnippetBtnClick = () => {
    // Whatever this.setState is, become the opposite (if true, become false. if false, become true)
    this.setState({ title: null, addingSnippet: !this.state.addingSnippet });
  }
  updateTitle = (txt) => {
    console.log('Here it is', txt)
  }
} 

export default withStyles(styles)(SidebarComponent);