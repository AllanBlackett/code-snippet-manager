import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText } from '@material-ui/core';
//! import ListItemText from '@material-ui/core/ListItemText';
// import DeleteIcon from '@material-ui/icons/Delete';
// import { removeHTMLTags } from '../helpers';

class SidebarElementComponent extends Component {
  render() {
    
    const { _index, _snippet, classes, selectedSnippetIndex } = this.props;

    return(
    <div key={_index}>
      <ListItem
        classname={classes.listItem}
        // If selected snippet index = true, then it will be higlighted
        selected={selectedSnippetIndex === _index}
        alignItems='flex-start'>  
          <div 
            className={classes.textSection}
            onClick={() => this.selecSnippet(_snippet, _index)}>
              <ListItemText
                primary={_snippet.title}
                secondary={_snippet.body.substring(0, 30) + '...'}>
              </ListItemText>
            </div>
      </ListItem>
    </div>
    );
  }

}

export default withStyles(styles)(SidebarElementComponent);