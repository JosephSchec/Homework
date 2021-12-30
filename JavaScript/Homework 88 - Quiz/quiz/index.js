(async function () {
    "use strict";

    const countryOne = $('#countryOne');
    const countryTwo = $('#countryTwo');
    const conversion1 = $('#conversion1');
    const conversion2 = $('#conversion2');
    const convert = $('#convert');
    const symbol1 = $('#symbol1');
    const howMany = $('#howMany');
    const symbol2 = $('#symbol2');
    const convertedValue = $('#convertedValue');


    class Data {
        constructor(jsonData) {
            this.jsonData = jsonData;
        }
        get dataNeeded() {
            return Object.keys(this.jsonData.results).map((key) => [{ "currencyId": this.jsonData.results[key].currencyId, "currencyName": this.jsonData.results[key].currencyName, "name": this.jsonData.results[key].name, "currencySymbol": this.jsonData.results[key].currencySymbol }]);
        }
    }

    async function loadCountries() {
        try {
            const countries = await fetch('https://free.currconv.com/api/v7/countries?apiKey=ae8838c86963cbd6d944');
            if (!countries.ok) {
                throw new Error('Countries not Found');
            }
            return countries.json();
        } catch (error) {
            console.error(error);
        }
    }

    async function loadCurrency(curIdOne, curIdTwo) {
        try {
            const currency = await fetch(`https://free.currconv.com/api/v7/convert?q=${curIdOne}_${curIdTwo},${curIdTwo}_${curIdOne}&compact=ultra&apiKey=ae8838c86963cbd6d944`);
            if (!currency.ok) {
                throw new Error('Currency not Found');
            }
            return currency.json();
        } catch (error) {
            console.error(error);
        }
    }

    async function loadDetails() {
        const countryOneCurId = country.dataNeeded.find(el => el[0].name === countryOne.val().split(' - ')[0])[0];
        const countryTwoCurId = country.dataNeeded.find(e => e[0].name === countryTwo.val().split(' - ')[0])[0];

        const conversionRate = await loadCurrency(countryOneCurId.currencyId, countryTwoCurId.currencyId);
        const convertLeft2Right = conversionRate[Object.keys(conversionRate)[0]];
        const convertRight2Left = conversionRate[Object.keys(conversionRate)[1]];

        // Question 1
        console.log(conversionRate);

        //Question 2 
        conversion1.text(`${countryOneCurId.currencySymbol} 1 = > ${countryTwoCurId.currencySymbol} ${convertLeft2Right}`);
        conversion2.text(` ${countryOneCurId.currencySymbol} ${convertRight2Left} < = 1 ${countryTwoCurId.currencySymbol}`);

        // EC 1
        convert.toggleClass('d-none', 'd-block');
        symbol1.text(countryOneCurId.currencySymbol);
        symbol2.text(countryTwoCurId.currencySymbol);
        howMany.val('1')
        convertedValue.val(convertLeft2Right);
        howMany.change(() => {
            convertedValue.val(howMany.val() * convertLeft2Right)
        });
    }

    /* 
    **************BEFORE  data class  was made************

        const country = await loadCountries();
        const arr = Object.keys(country.results).map((key) => country.results[key]);
        arr.forEach(el => {
            countryOne.append(`<option>${el.name} - ${el.currencyName}</option>`);
            countryTwo.append(`<option>${el.name} - ${el.currencyName}</option>`);
        });
    */

    const country = new Data(await loadCountries());

    country.dataNeeded.forEach(el => {
        el = el[0];
        // Question 3
        console.log(el);

        countryOne.append(`<option>${el.name} - ${el.currencyName}</option>`);
        countryTwo.append(`<option>${el.name} - ${el.currencyName}</option>`);
    });

    countryOne.change(async () => {
        if (countryOne.val() !== countryTwo.val() && countryTwo.val() !== 'hidden2') {
            await loadDetails();
        }
    });
    countryTwo.change(async () => {
        if (countryOne.val() !== countryTwo.val() && countryTwo.val() !== 'hidden1') {
            await loadDetails();
        }
    });

}());