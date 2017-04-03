require('babel-polyfill');
require('isomorphic-fetch');

//https://github.com/github/fetch
require('whatwg-fetch');

var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;

var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;

//actions
var ADD_ID = 'ADD_ID';
var addId = function(stateName, cityName) {
    return {
        type: ADD_ID,
        stateName: stateName,
        cityName: cityName
    };
};

var fetchId = function(stateName, cityName) {
    console.log('hello');
    return function(dispatch) {
        var apiKey = '070d4f7d9e1206a5';
        var query = (stateName + "/" + cityName);
        var url = "https://api.wunderground.com/api/" + apiKey + "/forecast/q/" + query + ".json";
        console.log(url);
        return fetch(url, {
                method: 'GET',
                headers: 'Access-Control-Allow-Origin',
                dataType: "json"
            })
            .then(function(response) {
                console.log("first then", response);
                // fetch.fetchUrl(url [, options], callback)
                if (response.status < 200 || response.status >= 300) {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
                return response;
            })
            .then(function(response) {
                console.log("second then", response);
                return response.json();
            })
            .then(function(data) {
                console.log("third then", data);
                var description = data.description;
                return dispatch(
                    fetchIdSuccess(stateName, cityName, description)
                );
            })
            .catch(function(error) {
                console.log('catch', error);
                return dispatch(
                    fetchIdError(stateName, cityName, error)
                );
            });
    };
};

var FETCH_ID_SUCCESS = 'FETCH_ID_SUCCESS';
var fetchIdSuccess = function(stateName, cityName, description) {
    return {
        type: FETCH_ID_SUCCESS,
        stateName,
        cityName: stateName,
        cityName,
        description: description
    };
};

var FETCH_ID_ERROR = 'FETCH_ID_ERROR';
var fetchIdError = function(stateName, cityName, error) {
    return {
        type: FETCH_ID_ERROR,
        stateName,
        cityName: stateName,
        cityName,
        error: error
    };
};



//reducer
var initialWeatherState= [];

var cityReducer = function(state, action) {
    state = state || initialWeatherState;
    // console.log(state);
    if (action.type === ADD_ID) {
        return state.concat({
            cityName: action.cityName,
            stateName: action.stateName
        });
    }
       else if (action.type === stateName) {
        // Find the index of the matching repository
        var index = -1;
        for (var i=0; i<state.length; i++) {
            var fetchIdState = state[i];
            if (fetchIdState.stateName === action.fetchIdState) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            throw new Error('Could not find repository');
        }

        var before = state.slice(0, i);
        var after = state.slice(i + 1);
        var newFetchIdState = Object.assign({}, fetchIdState, {stateName: action.stateName});
        return before.concat(newFetchIdState, after);
    } 
    else if (action.type === FETCH_ID_SUCCESS) {
        // Find the index of the matching stateName, cityName
        var index = -1;
        for (var i = 0; i < state.length; i++) {
            var fetchIdState = state[i];
            console.log(fetchIdState);
            if (fetchIdState.cityName === action.cityName) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            throw new Error('Error line 116');
        }

        var before = state.slice(0, i);
        var after = state.slice(i + 1);
        var newCityName = Object.assign({}, action.cityName, {
            description: action.description || 'N/A'
        });
        return before.concat(newCityName, after);
    }
    else if (action.type === FETCH_ID_ERROR) {
        // Find the index of the matching stateName, cityName
        var index = -1;
        for (var i = 0; i < state.length; i++) {
            var fetchIdState = state[i];
            if (fetchIdState.cityName === action.cityName) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            throw new Error('Error line 139');
        }

        var before = state.slice(0, i);
        var after = state.slice(i + 1);
        var newCityName = Object.assign({}, action.cityName, {
            description: action.description || 'N/A'
        });
        return before.concat(newCityName, after);
    }

    return state;
};

//store
var store = createStore(cityReducer(state, action), applyMiddleware(thunk));

//component
var GetId = React.createClass({
    componentDidMount: function() {
        // console.log("componentDidMount cityname", this.props.cityName);
        // console.log("componentDidMount stateName", this.props.stateName);
        if(this.props.cityName != undefined && this.props.stateName != undefined) {
            store.dispatch(
                fetchId(this.props.cityName, this.props.stateName)
            );
        }
    },
    addCityName: function() {
        var cityName = this.refs.cityName.value;
        // console.log("cityname", cityName);
        var stateName = this.refs.stateName.value;
        // console.log("statename", stateName);
        var cityNameMod = cityName.replace(/\s/g, "_");
        // console.log(cityNameMod);
        // TODO: Add the repository to the state
        if(cityName != undefined && stateName != undefined) {
            store.dispatch(
                fetchId(stateName, cityName)
            );
        }
        // this.props.dispatch(
        //     this.addCityName(cityNameMod)
        // );
        this.searchCount();
    },
    searchCount: function() {
        var countClicks = 0;
            countClicks++;
            this.refs.forecastSearch.onClick = countClicks;
        if (countClicks == 0) {
            return fetchId();
        }
    },
    render: function() {
        return (
            <div className="weatherSearch">
                <form action="#" className="js-search-form">
                    <label form="query"></label>
                    <select ref="stateName">
                    	<option value="AL">Alabama</option>
                    	<option value="AK">Alaska</option>
	                    <option value="AZ">Arizona</option>
	                    <option value="AR">Arkansas</option>
	                    <option value="CA">California</option>
	                    <option value="CO">Colorado</option>
                    	<option value="CT">Connecticut</option>
                    	<option value="DE">Delaware</option>
	                    <option value="DC">District Of Columbia</option>
	                    <option value="FL">Florida</option>
	                    <option value="GA">Georgia</option>
	                    <option value="HI">Hawaii</option>
	                    <option value="ID">Idaho</option>
	                    <option value="IL">Illinois</option>
                    	<option value="IN">Indiana</option>
	                    <option value="IA">Iowa</option>
                    	<option value="KS">Kansas</option>
                    	<option value="KY">Kentucky</option>
	                    <option value="LA">Louisiana</option>
	                    <option value="ME">Maine</option>
	                    <option value="MD">Maryland</option>
                    	<option value="MA">Massachusetts</option>
	                    <option value="MI">Michigan</option>
                    	<option value="MN">Minnesota</option>
                    	<option value="MS">Mississippi</option>
                    	<option value="MO">Missouri</option>
                    	<option value="MT">Montana</option>
	                    <option value="NE">Nebraska</option>
	                    <option value="NV">Nevada</option>
	                    <option value="NH">New Hampshire</option>
	                    <option value="NJ">New Jersey</option>
	                    <option value="NM">New Mexico</option>
	                    <option value="NY">New York</option>
                    	<option value="NC">North Carolina</option>
                    	<option value="ND">North Dakota</option>
                    	<option value="OH">Ohio</option>
                    	<option value="OK">Oklahoma</option>
                    	<option value="OR">Oregon</option>
                    	<option value="PA">Pennsylvania</option>
                    	<option value="RI">Rhode Island</option>
                    	<option value="SC">South Carolina</option>
                    	<option value="SD">South Dakota</option>
                    	<option value="TN">Tennessee</option>
                    	<option value="TX">Texas</option>
                    	<option value="UT">Utah</option>
                    	<option value="VT">Vermont</option>
                    	<option value="VA">Virginia</option>
                    	<option value="WA">Washington</option>
                    	<option value="WV">West Virginia</option>
                    	<option value="WI">Wisconsin</option>
                    	<option value="WY">Wyoming</option>
                    </select>
                    <input type="text" className="js-query" placeholder="City" ref="cityName" />
                    <button type="submit" ref="forecastSearch" className="forecastSearch" onClick={this.addCityName}>Search</button>
                </form>
                
            </div>
        );
    }
});

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
            <GetId />
        </Provider>,
        document.getElementById('app')
    );
});