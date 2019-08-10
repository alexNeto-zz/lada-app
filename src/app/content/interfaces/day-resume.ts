export interface DayResume {
    weatherCondition: string;
    currentWeather: number;
    maximumTemperature: number;
    minimumTemperature: number;
    rainProbability: number;
    source: string;
    sourceLogo: string;
    link: Link;
}

interface Link {
    site?: Uri;
    api?: Uri;
}

interface Uri {
    address: string;
    params: string;
}