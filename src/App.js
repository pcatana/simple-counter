import React from 'react';
import './App.css';
import Counter from './components/Counter';
import { getDeployed } from './contracts/Counter';


class App extends React.Component {
  state = {
    counter: null
  }

  async componentDidMount() {
    const counter = await getDeployed()
    this.setState(
      { counter }
    )
  }

  render() {
    const { counter } = this.state;
    return (
      <div className="App">
        {counter && <Counter contract={counter} />}
      </div>
    )
  }
}

export default App;
