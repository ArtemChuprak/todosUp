import React, { Component } from "react";
import PropTypes from "prop-types";


export default class NewTaskForm extends Component {
  state = {
    value: ""
  };

  componentDidMount() {
    this.InputComponent.focus();
  }

  onLabelChange = (el) => {
    this.setState({
      value: el.target.value,
    });
  };


  onSubmit = (el) => {
    el.preventDefault();
    const { onItemAdded } = this.props;
    const { value} = this.state;

    if (value !== "") {
      onItemAdded(value);
      this.setState({
        value: '',
       
      });
    }
  };

  render() {
    const { value} = this.state;

    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          ref={(comp) => {
            this.InputComponent = comp;
          }}
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={value}
        />
       
       
        <input type="submit" hidden />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};