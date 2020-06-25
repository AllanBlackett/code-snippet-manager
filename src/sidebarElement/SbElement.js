import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText } from '@material-ui/core';
//! import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

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
                secondary={removeHTMLTags(_snippet.body.substring(0, 30)) + '...'}>
              </ListItemText>
            </div>
            <DeleteIcon onClick={() => this.deleteSnippet(_snippet)}
              className={classes.deleteIcon}>

            </DeleteIcon>
      </ListItem>
    </div>
    );
  }
  selectSnippet = (n, i) => this.props.selectSnippet(n, i);
  deleteSnippet = (snippet) => {
    // To send a warning to the user if they want to delete the note
    if(window.confirm(`Are you sure you want to delete: ${snippet.title}?`)) {
      this.props.deleteSnippet(snippet);
    }
  }
}

export default withStyles(styles)(SidebarElementComponent);