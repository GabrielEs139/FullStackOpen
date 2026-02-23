
const CountrySimple = ({country, showCountry}) =>{
    console.log(country);
    return(
        <p> {country.name.common} <button onClick={showCountry}>Show</button></p>
    )
}

export default CountrySimple