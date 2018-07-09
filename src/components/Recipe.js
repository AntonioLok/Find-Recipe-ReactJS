import React, { Component } from 'react';
//import { Home } from './home'
import '../styles/Recipe.css';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url : "https://api.edamam.com/search?q=" + this.props.match.params.ingredient + "&app_id=ababbcad&app_key=30b0d3a5b5cc89445d096e0ae2e14943",
      data : null,
      loaded: false
    };
  }

	async componentWillMount() {
		await fetch(this.state.url)
			.then((response) => {
				if (response.status === 400) {
					throw new Error("ERROR");
				}
				return response.json()}
			)
			.then(data => this.setState({data: data.hits}));
		this.setState({loaded : true});
  }

  getRecipeList() {
    var recipeList = [];
    for (var i = 0; i < this.state.data.length; i++) {
      recipeList.push(
      <div id="container-arecipe">
        <p> {this.state.data[i].recipe.label} </p>
        <div id="recipe-display" key={i}> 
          <img src={this.state.data[i].recipe.image} alt=""/>
        </div>
      </div>
      );
    }
    return recipeList;
  }

  render() {

    return (
      <div className="recipe-container">
        <div id="title"> Showing recipes for {this.props.match.params.ingredient}</div>
        <div id="display-container" >
            {this.state.loaded ? this.getRecipeList() : null }
        </div>
      </div>
    );
  }
}

export default Recipe;
