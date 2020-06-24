import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
// import SidebarElementComponent from '../src/sidebar-element/sidebarElement';

class SidebarComponent extends Component {
  constructor() {
    super();
    this.state = {
      addingSnippet: false,
      title: null
    };    
  }
  render() {

    const { notes, classes, selectedSnippetIndex } = this.props;
    return(
    <div className={classes.sidebarContainer}>
      <Button
        onClick={this.newSnippetBtnClick}
        className={classes.newSnippetBtn}>New Snippet</Button>
    </div>
    );
  }

  newSnippetBtnClick = () => {
    console.log('Button clicked');
  }
} 

export default withStyles(styles)(SidebarComponent);