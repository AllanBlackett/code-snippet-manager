import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarElementComponent from '../sidebarElement/SbElement';

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
    
    // If notes is not null, then execute the return statement else, return an empty div.
    if(snippets) {
      return(
        <div className={classes.sidebarContainer}>
          <Button
            onClick={this.newSnippetBtnClick}
            // When user clicks on 'new notes' change to 'cancel'
            className={classes.newSnippetBtn}>{this.state.addingSnippet ? 'Cancel' : 'New snippet'}</Button>
            {
              this.state.addingSnippet ? 
              <div>
                <input type= 'text'
                className={classes.newSnippetInput}
                placeholder='Enter Snippet title'
                onKeyUp={(e) => this.updateTitle(e.target.value)}>
                </input>
                <Button 
                className={classes.newSnippetSubmitBtn}
                onClick={this.newSnippet}>Submit Snippet</Button>
              </div> :
              null
            }
            <List>
              {
                snippets.map((_snippet, _index) => {
                  return(
                    <div key={_index}>
                      <SidebarElementComponent
                        _snippet={_snippet}
                        _index={_index}
                        selectedSnippetIndex={selectedSnippetIndex}
                        selectSnippet={this.selectSnippet}
                        deleteSnippet={this.deleteSnippet}>
                      </SidebarElementComponent>
                      <Divider></Divider>
                    </div>
                  )
                })
              }
            </List>
        </div>
        );
      } else {
       return(<div></div>);
     }
  }
  newSnippetBtnClick = () => {
    // Whatever this.setState is, become the opposite (if true, become false. if false, become true)
    this.setState({ title: null, addingSnippet: !this.state.addingSnippet });
  }
  updateTitle = (txt) => {
    this.setState({ title: txt })
  }
  newSnippet = () => {
    console.log(this.state);
  }
  selectSnippet = (n, i) => this.props.selectSnippet(n, i);
  deleteSnippet = () => console.log('delete snippet');

} 

export default withStyles(styles)(SidebarComponent);