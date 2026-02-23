import CountryExpanded from "./CountryExpanded"
import CountrySimple from "./CountrySimple"

const Countries = ({countries, showCountry}) =>{
    if(countries.length > 10){
        return(
            <p>
                Too many matches, specify another filter
            </p>
        )
    }

    if(countries.length === 1){
        return(
            <div>
                <CountryExpanded country={countries[0]}/>
            </div>
        )
        
    }
    
    
    
    return(<div>
          {countries.map(country =>
          <CountrySimple key={country.name.common} country={country} showCountry={() => showCountry(country.name.common)}/>
          )}
      </div>)
    
}




export default Countries