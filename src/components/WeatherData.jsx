/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function WeatherData({ data }) {
    const convertKelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

    const [weatherInfo, setWeatherInfo] = useState({
        name: "",
        description: "",
        temp: "",
        humidity: "",
        cloud: "",
        windspeed: "",
    });

    useEffect(() => {
        if (data) {
            setWeatherInfo({
                name: data?.name,
                description: data?.weather[0]?.description,
                temp: `${convertKelvinToCelsius(data?.main?.temp)} °C`,
                humidity: `${data?.main?.humidity}%`,
                cloud: `${data?.clouds?.all}%`,
                windspeed: `${data?.wind?.speed} m/s`,
            });
        }
    }, [data]);

    console.log(data);

    return (
        <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mt-8">
                <p className="text-2xl font-semibold">{weatherInfo.name}</p>
                <img
                    className="w-6 h-6"
                    src={`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`}
                />
            </div>
            <p className="text-lg capitalize">{weatherInfo.description}</p>
            <img
                className="w-24 h-24"
                src={`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`}
            />
            <p className="text-4xl font-bold">{weatherInfo.temp}</p>

            {/* Cards section  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center bg-white bg-opacity-20 px-6 py-4 rounded-xl">
                    <img src="assets/wind.png" className="w-20 h-20" />
                    <p className="text-xl font-semibold">Windspeed</p>
                    <p>{weatherInfo.windspeed}</p>
                </div>
                <div className="flex flex-col items-center bg-white bg-opacity-20 px-6 py-4 rounded-xl">
                    <img src="assets/humidity.png" className="w-20 h-20" />
                    <p className="text-xl font-semibold">Humidity</p>
                    <p>{weatherInfo.humidity}</p>
                </div>
                <div className="flex flex-col items-center bg-white bg-opacity-20 px-6 py-4 rounded-xl">
                    <img src="assets/cloud.png" className="w-20 h-20" />
                    <p className="text-xl font-semibold">Cloudiness</p>
                    <p>{weatherInfo.cloud}</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherData;
