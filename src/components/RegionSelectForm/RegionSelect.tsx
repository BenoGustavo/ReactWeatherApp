import React, { useState, useEffect } from "react";
import brazilianStates from "../../assets/json/states.json";
import "./style.css";
import { saveOnLocalStorage, loadLocalStorage } from "../../utils/localStorageController";
import { Country, State } from "../../types/types";
import { binarySearch } from "../../utils/binarySearch";

type RegionSelectProps = {
    onRegionChange: (region: string) => void;
    onCityChange: (city: string) => void;
};

export const RegionSelect: React.FC<RegionSelectProps> = ({ onRegionChange, onCityChange }) => {
    const regionJson: Country = brazilianStates;

    // Default values
    const defaultRegion = "SC";
    const defaultCity = "Florianópolis";

    const [selectedRegion, setSelectedRegion] = useState<string>(defaultRegion);
    const [selectedCity, setSelectedCity] = useState<string>(defaultCity);

    useEffect(() => {
        const regionLocalStorage = loadLocalStorage('region');
        const cityLocalStorage = loadLocalStorage('city');

        if (regionLocalStorage && cityLocalStorage) {
            onRegionChange(regionLocalStorage);
            onCityChange(cityLocalStorage);
            setSelectedRegion(regionLocalStorage);
            setSelectedCity(cityLocalStorage);
            return;
        }
        
        onRegionChange(defaultRegion);
        onCityChange(defaultCity);
        saveOnLocalStorage('region', defaultRegion);
        saveOnLocalStorage('city', defaultCity);

    }, [onRegionChange, onCityChange]);

    const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const region = event.target.value;
        onRegionChange(region);
        setSelectedRegion(region);

        const arrPosition = binarySearch(regionJson.estados, region);
        const firstCity = regionJson.estados[arrPosition].cidades[0];
        onCityChange(firstCity);
        setSelectedCity(firstCity);

        saveOnLocalStorage('region', region);
        saveOnLocalStorage('city', firstCity);
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const city = event.target.value;
        onCityChange(city);
        setSelectedCity(city);

        saveOnLocalStorage('city', city);
    };

    return (
        <section className="FormContainer">
            <form>
                <div className="state">
                    <label htmlFor="region">Estados:</label>
                    <select id="region" name="region" value={selectedRegion} onChange={handleRegionChange}>
                        {regionJson.estados.map((region: State) => (
                            <option key={region.sigla} value={region.sigla}>
                                {region.sigla}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="city">
                    <label htmlFor="citie">Cidades:</label>
                    <select id="citie" name="citie" value={selectedCity} onChange={handleCityChange}>
                        {regionJson.estados.find(state => state.sigla === selectedRegion)?.cidades.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </section>
    );
};