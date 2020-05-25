import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import "./_home.scss";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherInfo: "",
      loading: true,
    };
  }
  loadData() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/924938/"
      )
      .then((response) =>
        this.setState({
          weatherInfo: response.data,
          loading: false,
        })
      );
  }
  componentDidMount() {
    this.loadData();
    console.log(navigator);
  }
  render() {
    const { weatherInfo, loading } = this.state;
    return (
      <>
        {loading && <Loader />}

        <div className="cards-holder">
          {weatherInfo &&
            weatherInfo.consolidated_weather.map(
              ({
                id,
                air_pressure,
                applicable_date,
                humidity,
                min_temp,
                max_temp,
                visibility,
                weather_state_name,
              }) => (
                <WeatherCard
                  key={id}
                  air_pressure={air_pressure}
                  applicable_date={applicable_date}
                  humidity={humidity}
                  min_temp={min_temp}
                  max_temp={max_temp}
                  visibility={visibility}
                  weather_state_name={weather_state_name}
                />
              )
            )}
        </div>
      </>
    );
  }
}
export default Home;
