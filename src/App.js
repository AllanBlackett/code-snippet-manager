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
        //! Using if/else conditional operator  
        //  When an element from the sidebar is selected, make the editor display
          this.state.selectedSnippet ?
          <EditorComponent selectedSnippet={this.state.selectedSnippet}
          selectedSnippetIndex={this.state.selectedSnippet}
          snippets={this.state.snippets}
          snippetUpdate={this.snippetUpdate}></EditorComponent> :
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
  snippetUpdate = (id, snippetObj) => {
    firebase
      .firestore()
      .collection('snippets')
      .doc(id)
      .update({
        title: snippetObj.title,
        body: snippetObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }
  newSnippet = async (title) => {
    const snippet = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('snippets')
      .add({
        title: snippet.title,
        body: snippet.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      // When the user creates a new snippet, go into firebase and then update the currently selected snippet with the one the user just created
    const newID = newFromDB.id;
    await this.setState({ snippets: [...this.state.snippets, snippet] });
    const newSnippetIndex = this.state.snippets.indexOf(this.state.snippets.filter(_snippet => _snippet.id === newID)[0]);
    this.setState({ selectedSnippet: this.state.snippets[newSnippetIndex], selectedSnippetIndex: newSnippetIndex });
  }

  deleteSnippet = async (snippet) => {
    const snippetIndex = this.state.snippets.indexOf(snippet);
    await this.setState({ snippets: this.state.snippets.filter(_snippet => _snippet !== snippet) });
    if(this.state.selectedSnippetIndex === snippetIndex) {
      this.setState({ selectedSnippetIndex: null, selectedSnippet: null });
    } else {
      //! this.state.snippets.length >=1 ?

      this.state.snippets.length > 1 ?
      // When user delete snippet, deselect the snippet [-1] to prevent server errors.
      this.selectSnippet(this.state.snippets[this.state.selectedSnippetIndex - 1], this.state.selectedSnippetIndex - 1) :
      this.setState({ selectedSnippetIndex: null, selectedSnippet: null });
    }

    firebase
      .firestore()
      .collection('snippets')
      .doc(snippet.id)
      .delete();
  }
  }


export default App;


