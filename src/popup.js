import React from 'react';
import ReactDOM from 'react-dom/client';
import TruncateTitle from './truncateTitle'
import './popup.scss'

class Popup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {histories: []}
    this.buildHistory()
  }
  buildHistory() {
    const microsecondsPerTerm = 1000 * 60 * 60 * 24 * 7;
    const term = (new Date()).getTime() - microsecondsPerTerm;

    const reactObject = this
    chrome.history.search({'text': '', 'startTime': term}, (historyItems) => {
      const histories = historyItems.sort((a, b) => {
        return (a.visitCount < b.visitCount) ? 1 : -1;
      })
      reactObject.setState({histories: histories})
    });
  }

  render() {
    return (
      <ul className="history">
        {this.state.histories.map((history) => {
          return <HistoryItem history={history} />
        })}
      </ul>
    )
  }
}

function Favicon(props) {
  const domain = props.url.match(/^[httpsfile]+:\/{2,3}([0-9a-zA-Z\.\-:]+?):?[0-9]*?\//i);
  const faviconEndpoint = 'http://www.google.com/s2/favicons?domain=';
  let favicon = ''
  if (domain) {
    favicon = faviconEndpoint + domain[1];
  }
  return (
    <img className="history__items--favicon" src={favicon} alt="" />
  )
}

function HistoryItem(props) {
  return (
    <li className="history__items">
      <Favicon url={props.history.url} />
      <a className="history__items--link" href={props.history.url} target="_blank" rel="noreferrer">{TruncateTitle.truncateTitle(props.history.title, 13)}</a>
      <DeleteIcon />
    </li>
  )
}

function DeleteIcon(prpps) {
  return (
    <img className="history__items--delete" src="img/cross16.svg" alt="x" />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Popup />);
