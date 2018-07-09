import React, { Component } from 'react';
import '../styles/Meal.css';
import YouTube from 'react-youtube';

class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : this.props.location.state.data
    };
  }

  goBack(event) {
    window.history.back();
  }

  render() {

    var ingredients = [];
    for (var i = 1; i < 21; i++) {
      if (this.state.data["strIngredient" + i] !== "" && this.state.data["strIngredient" + i] !== null) {   
        ingredients.push(
          <ul key={i}>
            <li> {this.state.data["strMeasure" + i] + " " + this.state.data["strIngredient" + i]} </li>
          </ul>
        );
      }
    }

    var instructions = [];
    var instructionsArray = this.state.data.strInstructions.split("\n");
    for (var j = 0; j < instructionsArray.length ; j++) {
      instructions.push(
          <p key={j}> {j + 1} - {instructionsArray[j]} </p>
      );
    }

    const opts = {
      height: '380',
      width: '600'
    };

    var video = (
      <YouTube
        videoId={this.state.data.strYoutube.split("v=")[1]}
        opts={opts}
      />
    );

    return (
      <div className="meal-container">
        <div id="title"> {this.state.data.strMeal}</div>
        <u onClick={(event) => this.goBack(event)}>Back </u>
        <div id="top" > 
          <img src={this.state.data.strMealThumb} alt=""/>
          {video}
        </div>
        <div id="bottom" >
          <div id="ingredients">
            <h1> Ingredients: </h1>
            {ingredients}
          </div>
          <div id="instructions">
            <h1> Instructions: </h1>
            {instructions} 
          </div>
        </div>
      </div>
    );
  }
}

export default Meal;
