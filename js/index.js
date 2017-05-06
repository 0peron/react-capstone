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

var connect = require('react-redux').connect

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
    // console.log('hello');
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
                // console.log("first then", response);
                // fetch.fetchUrl(url [, options], callback)
                if (response.status < 200 || response.status >= 300) {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
                return response;
            })
            .then(function(response) {
                // console.log("second then", response);
                return response.json();
            })
            .then(function(data) {
                // console.log("third then", data);
                var forecast = data.forecast.simpleforecast.forecastday;
                console.log('this is forecast', forecast, cityName);
                return dispatch(
                    fetchIdSuccess(cityName, forecast)
                );
            })
            .catch(function(error) {
                console.log('catch', error);
                return dispatch(
                    fetchIdError(cityName, error)
                );
            });
    };
};

var FETCH_ID_SUCCESS = 'FETCH_ID_SUCCESS';
var fetchIdSuccess = function(cityName, forecast) {
    return {
        type: FETCH_ID_SUCCESS,
        cityName: cityName,
        forecast: forecast
    };
};

var FETCH_ID_ERROR = 'FETCH_ID_ERROR';
var fetchIdError = function(cityName, error) {
    return {
        type: FETCH_ID_ERROR,
        cityName: cityName,
        error: error
    };
};



//reducer
var initialWeatherState = {
    forecast: []
};

var cityReducer = function(state, action) {
    state = state || initialWeatherState;
    if (action.type === ADD_ID) {
        return state.concat({
            cityName: action.cityName,
            forecast: action.forecast
        });
    }
    else if (action.type === FETCH_ID_SUCCESS) {
        console.log('inside success');
        state = Object.assign({}, state, {
            cityName: action.cityName,
            forecast: action.forecast
        });
        console.log(state);
        return state;

    }
    else if (action.type === FETCH_ID_ERROR) {
        console.log('inside error');
        var newCityName = Object.assign({}, state, {
            forecast: action.forecast || 'N/A'
        });
        return before.concat(newCityName, after);
    }
    return state;
};

//store
var store = createStore(cityReducer, applyMiddleware(thunk));

//component
var GetId = React.createClass({
    componentDidMount: function() {
        // console.log("componentDidMount cityname", this.props.cityName);
        // console.log("componentDidMount stateName", this.props.stateName);
        if (this.props.cityName != undefined && this.props.stateName != undefined) {
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
        if (cityName != undefined && stateName != undefined) {
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
        console.log(this.state);
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
                <div className="show-results">
                {this.props.cityName} - {this.props.forecast}
                </div>
            </div>
        );
    }
});

GetId = connect(state => ({
    forecast: state.forecast
}))(GetId);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
            <GetId />
        </Provider>,
        document.getElementById('app')
    );
});
