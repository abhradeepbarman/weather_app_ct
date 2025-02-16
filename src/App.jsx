import SearchWeather from "./components/SearchWeather";

function App() {
    return (
        <div className="bg-gradient-to-br from-[#112D4e] to-[#3f72af] text-white min-h-screen flex justify-center">
            <div className="w-full max-w-lg p-6">
                <h1 className="text-center text-4xl uppercase font-bold tracking-wide">
                    Weather App
                </h1>

                <SearchWeather />
            </div>
        </div>
    );
}

export default App;
