let google_api_key;

export async function getCoordsFromAddress(address){

    const urlAddress=encodeURI(address)//converts whitespaces to + and so on,makes it URL friendly

    const response=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${google_api_key}`)

    if(!response.ok){
        throw new Error(`Failed to Fetch Coordinates,Please Try Again.`)
    }
    const data=await response.json();

    if(data.error_message){
        throw new Error(data.error_message);
    }

    const coordinates=data.results[0].geometry.location;
    return coordinates;
}