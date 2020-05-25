import React from "react";
import "./_weatherCard.scss";
const WeatherCard = ({
  air_pressure,
  applicable_date,
  humidity,
  min_temp,
  max_temp,
  visibility,
  weather_state_name,
}) => (
  <div className="weather-card">
    <h2>{applicable_date}</h2>
    <p>Weater state : {weather_state_name}</p>
    <p>Min: {parseInt(min_temp)} °C</p>
    <p>Max: {parseInt(max_temp)} °C</p>
    <p>Visibility: {parseInt(visibility)} miles</p>
    <p>Air pressure: {air_pressure}mb</p>
    <p>Humidity: {humidity} %</p>
  </div>
);
export default WeatherCard;
