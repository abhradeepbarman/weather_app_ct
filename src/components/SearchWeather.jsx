import { Search } from "lucide-react";
import Loader from "./Loader";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { config } from "../config/config";
import NotFound from "./NotFound";
import WeatherData from "./WeatherData";

function SearchWeather() {
    const [city, setCity] = useState();
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setNotFound(false);
        setWeatherData(null);

        if (!city) return;

        try {
            setLoading(true);
            const { data } = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.WEATHER_API_KEY}`
            );
            setWeatherData(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error?.status === 404) {
                    setNotFound(true);
                }
            }
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-10 flex flex-col items-center">
            {/* search city section  */}
            <form
                onSubmit={handleSearch}
                className="flex items-center w-full max-w-xl mt-6"
            >
                <input
                    type="text"
                    placeholder="Search for City..."
                    className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-tl-xl rounded-bl-xl outline-none placeholder-white"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    className="bg-blue-500 px-3 py-2 rounded-tr-xl rounded-br-xl"
                    type="submit"
                >
                    <Search />
                </button>
            </form>

            {/* Loader  */}
            {loading && <Loader />}

            {/* Weather Report Data  */}
            {weatherData && <WeatherData data={weatherData} />}

            {/* Not found section  */}
            {notFound && <NotFound />}
        </div>
    );
}

export default SearchWeather;
