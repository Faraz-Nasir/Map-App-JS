import {Modal} from "./UI/Modal"
import {Map} from "./UI/Map"
import {getCoordsFromAddress} from "./Utility/Location"

class PlaceFinder{
    constructor(){
        const addressForm=document.querySelector(`form`);
        const locateUserBtn=document.getElementById(`locate-btn`);
        
        locateUserBtn.addEventListener(`click`,this.locateUserHandler.bind(this))
        addressForm.addEventListener(`submit`,this.findAddressHandler.bind(this))
    }

    selectPlace(coordinates){
        if(this.map){
            this.map.render(coordinates);
        }else{
            this.map=new Map(coordinates);
        }
    }
    
    locateUserHandler(){
        if(!navigator.geolocation){
            alert(`Location Feature is not avaiable in your browser - please use a modern browser or manually enter an address.`)
            return;
        }

        const modal=new Modal(`loading-modal-content`,`loading location -please wait!`)

        modal.show();

        navigator.geolocation.getCurrentPosition(successResult=>{
            modal.hide();
            const coordinates={
                lat:successResult.coords.latitude,
                lng:successResult.coords.longitude
            }
            this.selectPlace(coordinates)
            console.log(coordinates)
        },error=>{
            modal.hide();
            alert(`Could not locate you unfortunately. Please Enter an Address manually!`)
        });
        
    }

    async findAddressHandler(event){
        event.preventDefault();
        const address=event.target.querySelector(`input`);

        if(!address || address.length===0){
            alert(`Invalid Address entered - please try again!`);
            return;
        }
        const modal=new Modal(`loading-modal-content`,`Loading location - please wait!`);
        modal.show();

        try{
            const coordinates=await getCoordsFromAddress(address);
            this.selectPlace(coordinates);
        }catch(error){
            alert(error.message);
        }
        modal.hide();
        
    }
}

const placeFinder=new PlaceFinder();