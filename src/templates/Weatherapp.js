function Weatherapp() {
    return (
        <>
            <div className="weather-container">

                {/*HEADER -------------------- */}
                <div className="weather-header">
                    {/*<SearchBar/>*/}

                    <span className="location-details">
            <h2>Bewolkt</h2>
            <h3> </h3>
            <h1>14 &deg;</h1>

            <button type="button">
              Haal data op!
            </button>
          </span>
                </div>

                {/*CONTENT ------------------ */}
                <div className="weather-content">
                    {/*<TabBarMenu/>*/}

                    <div className="tab-wrapper">
                        Alle inhoud van de tabbladen komt hier!
                    </div>
                </div>

                {/*<MetricSlider/>*/}
            </div>
        </>
    );
}