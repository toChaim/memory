// logic and store for game
import React, {Component} from 'react';

export default class Game extends Component {
  constructor() {
    super();
    this.state = localStorage['memory'] || {
      : []
    };
  }
  render() {
    return (
      <div className="Game">
        
      </div>
    );
  }
}

// for now board, card, and controles will be hosed here

