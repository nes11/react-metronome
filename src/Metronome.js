import React, { Component } from 'react';
import './Metronome.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import click1 from './sounds/click1.wav';
import click2 from './sounds/click2.wav';

class Metronome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      time: 4
    }
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }


  handleBpmChange = event => {
    const bpm = event.target.value;
  
    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      this.setState({
        count: 0,
        bpm
      });
    } else {
      this.setState({ bpm });
    }
  };

  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count: 0,
          playing: true,
        },
        this.playClick
      );
    }
  }

  playClick = () => {
    const { count, time } = this.state;
  
    if (count % time === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }
  
    this.setState(state => ({
      count: (state.count + 1) % state.time
    }));
  };
  
  render() {
    const { playing, bpm } = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange} />
        </div>
        <form>
        <TextField
          id="time"
          label="Time"
          margin="normal"
          onChange={event => this.setState({ time: event.target.value, count: 0 })}
        />
        </form>
        <Button variant="contained" onClick={this.startStop}>
          {playing ? 'Stop' : 'Start'}
        </Button>
      </div>
    );
  }
}


export default Metronome;



