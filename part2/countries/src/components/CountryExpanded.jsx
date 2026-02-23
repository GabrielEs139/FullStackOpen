import Capital from "./Capital"
import Weather from "./Weather"
const CountryExpanded = ({country}) =>{
    return(
        <div>
            <div>
                <h1>{country.name.common}</h1>
                <Capital capitals ={country.capital}/>
                <p>Area {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map((lang, index) => (
                        <li key={index}>{lang}</li>
                    ))}
                </ul>
                <img src={country.flags.png}></img>
                <div>
 {
                    country.capital.map(
                        cap => <Weather key={cap} cap={cap}/>
                    )
                }
                </div>
               
             </div>
        </div>
    )
}




export default CountryExpanded