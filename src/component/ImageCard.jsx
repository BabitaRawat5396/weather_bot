import React from "react";
import forecast_video from "../asset/weather_forecast.mp4";
import weather_icon from "../asset/wind_storm.png";

const ImageCard = () => {
  const [month, day] = new Date()
    .toLocaleDateString(undefined, { month: "short", day: "numeric" })
    .split(" ");

  return (
    <div className="image-card">
      <video autoPlay muted loop className="video-background">
        <source src={forecast_video} type="video/mp4" />
      </video>
      <div className="text-scroll">
        <div className="text-scroll__heading">
          <p>
            Weather <br /> forecast
          </p>
          <p>
            {day} <br />
            {month}
          </p>
        </div>
        <img src={weather_icon} />
        <div className="text-scroll__info">
          <div className="info-temp">
            <p>Temperature</p>
            <p>-21°C</p>
          </div>
          <div className="info-additional">
            <p>Participation: 1%</p>
            <p>Humidity: 64%</p>
            <p>Wind: 13km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
