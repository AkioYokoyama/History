import React from 'react';
import ReactDOM from 'react-dom/client';

class OptionsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: localStorage['number'] ? localStorage['number'] : 100,
      term: localStorage['term'] ? localStorage['term'] : 7,
    }
    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleUrlChange = this.handleUrlChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this)
  }

  handleNumberChange(e) {
    this.setState({number: e.target.value})
  }

  handleTermChange(e) {
    this.setState({term: e.target.value})
  }

  handleUrlChange(e) {
    this.setState({url: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    localStorage['number'] = this.state.number
    localStorage['term'] = this.state.term
  }

  handleFilterSubmit(e) {
    e.preventDefault()

    let filters = []
    if (localStorage['filters']) {
      filters = JSON.parse(localStorage['filters'])
    }
    filters.push(this.state.url)
    localStorage['filters'] = JSON.stringify(filters)
  }

  render() {
    return (
      <div>
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

        <form onSubmit={this.handleFilterSubmit}>
          <div>
            <label>filter</label>
            <input type="text" onChange={this.handleUrlChange} />
            <div><input type="submit" value="追加" /></div>
          </div>
        </form>
        <FilterList />
      </div>
    )
  }
}

function FilterList(props) {
  let filters = []
  if (localStorage['filters']) {
    filters = JSON.parse(localStorage['filters'])
  }
  return (
    <ul>
      {filters.map((filter) => {
        return <FilterItem filter={filter} />
      })}
    </ul>
  )
}

function FilterItem(props) {
  return (
    <li>{props.filter}</li>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <OptionsForm />
);
