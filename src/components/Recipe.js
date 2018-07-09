import React, { Component } from 'react';
import '../styles/Recipe.css';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //url : "https://api.edamam.com/search?q=" + this.props.match.params.ingredient + "&app_id=ababbcad&app_key=30b0d3a5b5cc89445d096e0ae2e14943",
      url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + this.props.match.params.ingredient,
      data : null,
      loaded: false,
      redirect : null
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
      .then(data => this.setState({data: data.meals}));
    this.state.data ? this.setState({loaded : true}) : alert("Error, could not find such ingredient");
  }

  redirect(event) {
    var info = this.state.data.find((item) => item.idMeal === event.target.name);
    this.setState({
      redirect: this.props.history.push({
        pathname: '/recipe/' + this.props.match.params.ingredient + '/' + info.strMeal,
        state: {data: info}
      })
    });
  }

  getRecipeList() {
    var recipeList = [];
    for (var i = 0; i < this.state.data.length; i++) {
      recipeList.push(
      <div id="container-arecipe"  key={i}>
        <p> {this.state.data[i].strMeal} </p>
        <div id="recipe-display"> 
          <img name={this.state.data[i].idMeal} src={this.state.data[i].strMealThumb} 
            alt="" onClick={(event) => this.redirect(event)}/>
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
        {this.state.redirect}
      </div>
    );
  }
}

export default Recipe;
