import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Spinner from "./Spinner"
import Message from "./Message"
import { useCities } from '../context/CitiesContext'

export function CountryList() {
    const { cities, isLoading } = useCities();
    if (isLoading) return <Spinner />

    if (!cities.length) return <Message message="Add your first coutry by clicking on the map" />

    const coutries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }
        , []);

    return (
        <ul className={styles.countryList}>
            {coutries.map(country => <CountryItem country={country} key={country} />)}
        </ul>
    )
}

