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

var connect = require('react-redux').connect;

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
                // fetch.fetchUrl(url [, options], callback)
                if (response.status < 200 || response.status >= 300) {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
                return response;
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                //console.log("third then", data);
                var forecast = data.forecast.simpleforecast.forecastday;
                //console.log('this is forecast', forecast, cityName);
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
        
        state = Object.assign({}, state, {
            cityName: action.cityName,
            forecast: action.forecast
        });
        console.log('->>>', state);
        return state;

    }
    else if (action.type === FETCH_ID_ERROR) {
        console.log('inside error');
        var newCityName = Object.assign({}, state, {
            forecast: action.forecast || 'N/A'
        });
        return before.concat(newCityName, after);
    }
    else{
        return state;
    }
};

//store
var store = createStore(cityReducer, applyMiddleware(thunk));

//component
var GetId = React.createClass({
    componentDidMount: function() {
        // console.log("componentDidMount cityname", this.props.cityName);
        // console.log("componentDidMount stateName", this.props.stateName);
        // console.log("componentDidMount state", this.state);
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
        if (countClicks == 1) {
            return fetchId();
        }
    },
    render: function() {
        
        //validating the this.state before output
        var conditions0 = "";
        var high0 = "";
        var low0 = "";
        var icon_url0 = "https://cdn3.iconfinder.com/data/icons/weather-season/512/cloud-2-512.png";
        var date = "";
        var pop0 = "";
        var windDirection0 = "";
        var windMph0 = "";
        var conditions1 = "";
        var high1 = "";
        var low1 = "";
        var icon_url1 = "https://cdn3.iconfinder.com/data/icons/weather-season/512/cloud-2-512.png";
        var pop1 = "";
        var windDirection1 = "";
        var windMph1 = "";
        var day1 = "";
        var conditions2 = "";
        var high2 = "";
        var low2 = "";
        var icon_url2 = "https://cdn3.iconfinder.com/data/icons/weather-season/512/cloud-2-512.png";
        var pop2 = "";
        var windDirection2 = "";
        var windMph2 = "";
        var day2 = "";
        var conditions3 = "";
        var high3 = "";
        var low3 = "";
        var icon_url3 = "https://cdn3.iconfinder.com/data/icons/weather-season/512/cloud-2-512.png";
        var pop3 = "";
        var windDirection3 ="";
        var windMph3 = "";
        var day3 ="";
        console.log('render my state = ', this.props);
        if (this.props.forecast.length != 0 && this.props != null ){
            conditions0 = this.props.forecast[0].conditions;
            high0 = this.props.forecast[0].high.fahrenheit;
            low0= this.props.forecast[0].low.fahrenheit;
            icon_url0 = this.props.forecast[0].icon_url;
            date = this.props.forecast[0].date.pretty;
            pop0 =  this.props.forecast[0].pop;
            windDirection0 = this.props.forecast[0].avewind.dir;
            windMph0 = this.props.forecast[0].avewind.mph;
            conditions1 = this.props.forecast[1].conditions;
            high1 = this.props.forecast[1].high.fahrenheit;
            low1= this.props.forecast[1].low.fahrenheit;
            icon_url1 = this.props.forecast[1].icon_url;
            pop1 =  this.props.forecast[1].pop;
            windDirection1 = this.props.forecast[1].avewind.dir;
            windMph1 = this.props.forecast[1].avewind.mph;
            day1 = this.props.forecast[1].date.weekday;
            conditions2 = this.props.forecast[2].conditions;
            high2 = this.props.forecast[2].high.fahrenheit;
            low2 = this.props.forecast[2].low.fahrenheit;
            icon_url2 = this.props.forecast[2].icon_url;
            pop2 =  this.props.forecast[2].pop;
            windDirection2 = this.props.forecast[2].avewind.dir;
            windMph2 = this.props.forecast[2].avewind.mph;
            day2 = this.props.forecast[2].date.weekday;
            conditions3 = this.props.forecast[3].conditions;
            high3 = this.props.forecast[3].high.fahrenheit;
            low3= this.props.forecast[3].low.fahrenheit;
            icon_url3 = this.props.forecast[3].icon_url;
            pop3 =  this.props.forecast[3].pop;
            windDirection3 = this.props.forecast[3].avewind.dir;
            windMph3 = this.props.forecast[3].avewind.mph;
            day3 = this.props.forecast[3].date.weekday;
        }
        
        return (
            <div className="weatherSearch">
                <form action="#" className="js-search-form">
                    <h1>WeatherCheck</h1>
                    <h4>Select State and City</h4>
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
                    <input type="text" className="js-query" placeholder="City" ref="cityName"/>
                    <button type="submit" ref="forecastSearch" className="forecastSearch" onClick={this.addCityName}>Search</button>
                </form>
                <div className="show-results">
                    <div className="currentWeather">
                        <h3 className="location">Current Weather</h3>
                        <p>As of {date}</p>
                        <h4>Today</h4>
                        <p><img src={icon_url0}/> {conditions0}</p>
                        <p>H: {high0} L: {low0}</p>
                        <p> chance of rain: {pop0}%</p>
                        <p> Wind: {windDirection0} {windMph0} mph</p>
                    </div>
                    <div className="threeDayContainer">
                        <div className="dayOne">
                            <h4>{day1}</h4>
                            <p><img src={icon_url1}/> {conditions1}</p>
                            <p>H: {high1} L: {low1}</p>
                            <p> chance of rain: {pop1}%</p>
                            <p> Wind: {windDirection1} {windMph1} mph</p>
                        </div>
                        <div className="dayTwo">
                            <h4>{day2}</h4>
                            <p><img src={icon_url2}/> {conditions2}</p>
                            <p>H: {high2} L: {low2}</p>
                            <p> chance of rain: {pop2}%</p>
                            <p> Wind: {windDirection2} {windMph2} mph</p>
                        </div>
                        <div className="dayThree">
                            <h4>{day3}</h4>
                            <p><img src={icon_url3}/> {conditions3}</p>
                            <p>H: {high3} L: {low3}</p>
                            <p> chance of rain: {pop3}%</p>
                            <p> Wind: {windDirection3} {windMph3} mph</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

GetId = connect(function (state) {
    console.log('getid state =', state);
    return {
        forecast: state.forecast
    };
})(GetId);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
            <GetId />
        </Provider>,
        document.getElementById('app')
    );
});
