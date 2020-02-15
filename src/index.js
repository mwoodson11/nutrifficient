import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Title extends React.Component {
  render() {
    return (
      <div> Nutrifficient </div>
    );
  }
}

ReactDOM.render(
  <Title />,
  document.getElementById('root')
);