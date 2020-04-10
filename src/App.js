import React, { Component } from 'react';
import './App.css';
import USAMap from "./react-usa-map";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions_to_ask: 10,
            questions_asked: 0,
            questions_correctly_answered: 0,
            secondsToHelp: 7,
            showStateTooltip: false,
            chosen_state: null,
            us_states: {
                "AL": "Alabama",
                "AK": "Alaska",
                "AZ": "Arizona",
                "AR": "Arkansas",
                "CA": "California",
                "CO": "Colorado",
                "CT": "Connecticut",
                "DE": "Delaware",
                "DC": "District Of Columbia",
                "FL": "Florida",
                "GA": "Georgia",
                "HI": "Hawaii",
                "ID": "Idaho",
                "IL": "Illinois",
                "IN": "Indiana",
                "IA": "Iowa",
                "KS": "Kansas",
                "KY": "Kentucky",
                "LA": "Louisiana",
                "ME": "Maine",
                "MD": "Maryland",
                "MA": "Massachusetts",
                "MI": "Michigan",
                "MN": "Minnesota",
                "MS": "Mississippi",
                "MO": "Missouri",
                "MT": "Montana",
                "NE": "Nebraska",
                "NV": "Nevada",
                "NH": "New Hampshire",
                "NJ": "New Jersey",
                "NM": "New Mexico",
                "NY": "New York",
                "NC": "North Carolina",
                "ND": "North Dakota",
                "OH": "Ohio",
                "OK": "Oklahoma",
                "OR": "Oregon",
                "PA": "Pennsylvania",
                "RI": "Rhode Island",
                "SC": "South Carolina",
                "SD": "South Dakota",
                "TN": "Tennessee",
                "TX": "Texas",
                "UT": "Utah",
                "VT": "Vermont",
                "VA": "Virginia",
                "WA": "Washington",
                "WV": "West Virginia",
                "WI": "Wisconsin",
                "WY": "Wyoming"
            },
            clicked_state: null
        }
    }

    mapHandler = (event) => {
        if (this.state.clicked_state) {return;}

        this.setState({
            clicked_state: event.target.dataset.name,
            questions_asked: this.state.questions_asked + 1,
            questions_correctly_answered: event.target.dataset.name === this.state.chosen_state ?
                this.state.questions_correctly_answered + 1 : this.state.questions_correctly_answered
        });
        setTimeout(this.setNextQuestion, 3500);
    };



    render = () => {
        if (this.state.questions_asked === this.state.questions_to_ask) {
            return (
                <div className="App">
                    <USAMap />
                    <p>You got {this.state.questions_correctly_answered} out of {this.state.questions_asked}</p>
                    <button onClick={() => {window.location.reload();}}>Play Again</button>
                </div>
            )
        }

        return (
            <div className="App">
                <USAMap onClick={this.mapHandler} showStateTooltip={this.state.showStateTooltip}/>

                <p>Click this state: {this.state.us_states[this.state.chosen_state]}</p>

                {this.state.showStateTooltip && <p style={{color: "#888"}}>Hint available</p>}

                {this.state.clicked_state && this.state.clicked_state === this.state.chosen_state &&
                    <img alt="correct" height="100px" src={process.env.PUBLIC_URL + '/green_check.png'}></img>
                }

                {this.state.clicked_state && this.state.clicked_state !== this.state.chosen_state &&
                    <div>
                        <img alt="incorrect" height="100px" src={process.env.PUBLIC_URL + '/red_x.png'}></img>
                        <p>You clicked {this.state.us_states[this.state.clicked_state]}</p>
                    </div>

                }

            </div>
        );
    };

    componentDidMount() {
        this.setNextQuestion();
    }

    setNextQuestion = () => {
        const randomNumber = parseInt(Math.random() * Object.keys(this.state.us_states).length);
        const selectedState = Object.keys(this.state.us_states)[randomNumber];

        this.setState({
            clicked_state: null,
            chosen_state: selectedState,
            showStateTooltip: false
        }, () => {
            window.setTimeout(() => {
                this.setState({showStateTooltip: true});
            }, this.state.secondsToHelp*1000)
        })
    };
}

export default App;
