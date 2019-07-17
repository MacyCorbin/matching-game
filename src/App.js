import React, { Component } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Footer from "./components/Footer";
import cards from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    if (this.state.score === 12) {
      this.setState({ highscore: this.state.score }, function () {
        console.log(this.state.highscore);
        alert(`You Won! Click to replay! \nscore:  ${this.state.highscore}`);
      });
      this.state.cards.forEach(card => {
        card.count = 0;
      });
      this.setState({ score: 0 });
      this.setState({ highscore: 0 });
      return true;
    } else {
      this.setState({ highscore: this.state.score }, function () {
        console.log(this.state.highscore);
      });
      this.state.cards.forEach(card => {
        card.count = 0;
      });
      alert(`Game Over \nscore:  ${this.state.score}`);

      this.setState({ score: 0 });
      return true;
    }
  }


  clickCount = id => {
    this.state.cards.find((o, i) => {
      if (o.id === id) {
        if (cards[i].count === 0) {
          cards[i].count = cards[i].count + 1;
          this.setState({ score: this.state.score + 1 }, function () {
            console.log(this.state.score);
          });
          this.state.cards.sort(() => Math.random() - 0.5)
          return true;
        }
        else if (cards[i].count === 8) {

          this.setState({ score: this.state.score }, function () {
            console.log("you won!");
          });
          this.state.cards.sort(() => Math.random() - 0.5)
          return true;
        }
        else {
          this.gameOver();

        }

      }
    });
  }

  // Map over this.state.cards and render a card component for each card object
  render() {
    return (
      <div className="contents">
        <Header score={this.state.score} highscore={this.state.highscore}>Marvel Match</Header>
        <div className="container">
          {this.state.cards.map(card => (
            <Card
              clickCount={this.clickCount}
              id={card.id}
              key={card.id}
              image={card.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
