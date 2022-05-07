import React from 'react';
import ReactDOM from 'react-dom/client';

class OptionsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: localStorage['number'] ? localStorage['number'] : 100,
      term: localStorage['term'] ? localStorage['term'] : 7
    }
    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNumberChange(e) {
    this.setState({number: e.target.value})
  }

  handleTermChange(e) {
    this.setState({term: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    localStorage['number'] = this.state.number
    localStorage['term'] = this.state.term
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            表示する履歴の数
            <input type="text" value={this.state.number} onChange={this.handleNumberChange} />
          </label>
        </div>

        <div>
          <label>
            表示する履歴の期間
            <input type="text" value={this.state.term} onChange={this.handleTermChange} />
          </label>
        </div>
        <div><input type="submit" value="保存" /></div>
      </form>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <OptionsForm />
);
