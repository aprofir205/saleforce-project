import { LightningElement, track, wire, api } from 'lwc';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

const FIELDS = [
    'Account.Name',
    'Account.BillingAddress',
];
export default class WeatherForAccountLocation extends LightningElement {
    
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS  })
    account;

    get name() {
        return this.account.data.fields.Name.value;
    }
    get billingAddress() {
        return this.account.data.fields.BillingAddress.value;
    }
    @track accountWeather;

    getAccountWeather() {
       const calloutURI = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=356fd12630ec910c569a42f8e93d1417';
        fetch(calloutURI, {
            method: "GET"
        }).then((response) => response.json())
            .then((accountWeather) => {
                console.log("This is the account weather",accountWeather)
                this.accountWeather = accountWeather["weather"][0]["description"];
                console.log("This is the account weather description",this.accountWeather);
            });
    }

}