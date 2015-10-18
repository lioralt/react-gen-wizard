import React from 'react';
import {IconButton} from 'material-ui';

export default class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentComponentIndex: 0, 
                  data: props.data};
  }

  _getComponentsBreadcrumbs() {
    return this.props.components.map((component) => {
      let className = 
        (this.props.components[this.state.currentComponentIndex] === 
         component) ? 'active' : 'inactive';

      return <li className={className}>{component.name}</li>;
    });
  }

  onNextEnded(data) {
    if (this.state.currentComponentIndex === this.props.components.length - 1) {
      this.props.onFinish(this.state.data);
    } else {
      this.state.currentComponentIndex++;
      this.state.data = data;
      this.setState(this.state);
    }
  }

  onPrevEnded(data) {
    this.state.currentComponentIndex--;
    this.state.data = data;
    this.setState(this.state);
  }

  _callOnNext() {
    this.refs.currentComponent.onNext();
  }

  _callOnPrev() {
    this.refs.currentComponent.onPrev();
  }

  render () {
    let nextClass = 'fa fa-';
    nextClass += 
      (this.state.currentComponentIndex 
       !== this.props.components.length - 1) ? 'arrow-right' : 'paper-plane';

    let currentComponent = 
      React.createElement(this.props.components[this.state.currentComponentIndex].component, 
                          {onNextEnded: this.onNextEnded.bind(this),
                           onPrevEnded: this.onPrevEnded.bind(this),
                           data: this.state.data,
                           ref: 'currentComponent'});

    return (
      <div className='react-gen-wizard'>
        <ul className='breadcrumbs'>
          {this._getComponentsBreadcrumbs()}
        </ul>
        <div className='component-wrapper'>
          <div className='current-component'>
            {currentComponent}
          </div>
          <div className='buttons'>
            {(this.state.currentComponentIndex !== 0) &&
              <IconButton className='icon-prev'
                          iconClassName='fa fa-arrow-left'
                          mini={true}
                          onClick={this._callOnPrev.bind(this)} />
            }
            <IconButton className='icon-next'
                        iconClassName={nextClass}
                        mini={true}
                        onClick={this._callOnNext.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}