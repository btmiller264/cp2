//GET https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD

function onClick(e) {
    e.preventDefault();

    let amount = document.getElementById('amount').value;
    if (amount === "") {
        amount = 0.00;
    }
    let from = document.getElementById('from').value;
    if (from === "") {
        from = "USD";
    }
    let to = document.getElementById('to').value;

    let url = "https://v6.exchangerate-api.com/v6/230be4d621b49e770c74d9b5";
    if (to === "") {
        url += "/latest/" + from;
    } else {
        url += "/pair/" + from + "/" + to;
    }
    fetch(url)
        .then(function(response) {
            if (response.status != 200) {
                return {
                    text: "Error calling the exhange rate API service: " + response.statusText
                }
            }
            return response.json();  
        }).then(function(json) {
            if (to === "") {
                let currency = Object.keys(json.conversion_rates);
                let values = Object.values(json.conversion_rates);
                let results = document.getElementById('results');
                results.innerHTML = "";
                let headerRow = document.createElement('div');
                headerRow.className = 'row';
    
                let nameRow = document.createElement('div');
                nameRow.className = 'header';
                let nameHeader = document.createElement('h2');
                nameHeader.innerHTML = "Country";
                nameRow.appendChild(nameHeader);
                headerRow.appendChild(nameRow);
    
                let symbol = document.createElement('div');
                symbol.className = 'header';
                let symbolHeader = document.createElement('h2');
                symbolHeader.innerHTML = "Exhange Rate";
                symbol.appendChild(symbolHeader);
                headerRow.appendChild(symbol);
                results.appendChild(headerRow);
           
                for (let i = 0; i < currency.length; i++) {
                    let div = document.createElement('div');
                    div.className = "row";
                    let country = document.createElement('div');
                    country.className = "entry";
                    let code = document.createElement('h3');
                    code.innerHTML = currency[i];
                    country.appendChild(code);
                    div.appendChild(country);
                    let conversion = document.createElement('div');
                    conversion.className = "entry";
                    conversion.id = "conversion";
                    let rate = document.createElement('h3');
                    let exhangeRate = values[i] * amount;
                    rate.innerHTML = exhangeRate.toFixed(2);
                    conversion.appendChild(rate);
                    div.appendChild(conversion);
                    results.appendChild(div);
                }
            } else {
                let results = document.getElementById('results');
                results.innerHTML = "";
                let headerRow = document.createElement('div');
                headerRow.className = 'row';
    
                let nameRow = document.createElement('div');
                nameRow.className = 'header';
                let nameHeader = document.createElement('h2');
                nameHeader.innerHTML = "Country";
                nameRow.appendChild(nameHeader);
                headerRow.appendChild(nameRow);
    
                let symbol = document.createElement('div');
                symbol.className = 'header';
                let symbolHeader = document.createElement('h2');
                symbolHeader.innerHTML = "Exhange Rate";
                symbol.appendChild(symbolHeader);
                headerRow.appendChild(symbol);
                results.appendChild(headerRow);

                let div = document.createElement('div');
                div.className = "row";
                let country = document.createElement('div');
                country.className = "entry";
                let code = document.createElement('h3');
                code.innerHTML = json.base_code;
                country.appendChild(code);
                div.appendChild(country);
                let conversion = document.createElement('div');
                conversion.className = "entry";
                let rate = document.createElement('h3');
                rate.innerHTML = parseFloat(amount).toFixed(2);
                conversion.appendChild(rate);
                div.appendChild(conversion);
                results.appendChild(div);

                div = document.createElement('div');
                div.className = 'row';
                country = document.createElement('div');
                country.className = "entry";
                code = document.createElement('h3');
                code.innerHTML = json.target_code;
                country.appendChild(code);
                div.appendChild(country);
                conversion = document.createElement('div');
                conversion.className = "entry";
                rate = document.createElement('h3');
                rate.innerHTML = (amount * json.conversion_rate).toFixed(2);
                conversion.appendChild(rate);
                div.appendChild(conversion);
                results.appendChild(div);
            }
    
        });
}

document.getElementById('exchange').addEventListener('click', onClick);