import React, { Component } from 'react';
import '../styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: null,
      redirect : null
    };
  }

  handleChange(event) {
    this.setState({ingredient : event.target.value});
  }

  handleSubmit(event) {
    this.setState({redirect: this.props.history.push("/recipe/" + this.state.ingredient)});
    event.preventDefault();
  }  

  render() {
    return (
      <div className="home-container">
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input type="text" placeholder="Enter main ingredient" onChange={(event) => this.handleChange(event)}/>
          <input type="submit" value="Search" /> 
        </form>
        {this.state.redirect}
      </div>
    );
  }
}

export default Home;
