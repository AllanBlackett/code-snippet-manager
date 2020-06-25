import React, { Component } from 'react';
import SidebarComponent from './sidebar/Sidebar';
import EditorComponent from './editor/Editor';
import './App.css';

const firebase = require('firebase');

class App extends Component {
  constructor () {
    super();
    // Initial State
    this.state = {
      selectedSnippetIndex: null,
      selectedSnippet: null,
      snippets: null
    }
    
  }

  render() {
    return (
      <div className="app-container">
        <SidebarComponent 
        // Adding props
          selectedSnippetIndex={this.state.selectedSnippetIndex}
          snippets={this.state.snippets}
          deleteSnippet={this.deleteSnippet}
          selectSnippet={this.selectSnippet}
          newSnippet={this.newSnippet}></SidebarComponent>
        {
        // When an element from the sidebar is selected, make the editor display
          this.state.selectedSnippet ?
          <EditorComponent selectedSnippet={this.state.selectedSnippet}
          selectedSnippetIndex={this.state.selectedSnippet}
          snippets={this.state.snippets}>
          snippetUpdate={this.snippetUpdate}</EditorComponent> :
          null
        }
      </div>
    );
  }

  //   
  componentDidMount = () => {
    // onSnapshot() is going to automatically gets called whenever the .collection('snippets') is updated inside firebase
    // the function that I passed into onSnapshot() will get called as an argument  
    firebase
      .firestore()
      .collection('snippets')
      .onSnapshot(serverUpdate => {
        const snippets = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log(snippets);
        this.setState({ snippets: snippets });
      });
  }
    
  selectSnippet = (snippet, index) => this.setState({ selectedSnippetIndex: index, selectedSnippet: snippet });

  }


export default App;


