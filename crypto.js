function allClick(e) {
    e.preventDefault();

    let url = "https://api.coinpaprika.com/v1/coins";
    fetch(url)
        .then(function(response) {
            if (response.status != 200) {
                return {
                    text: "Error calling the crypto API service: " + response.statusText
                }
            }
            return response.json();  
        }).then(function(json) {
            console.log(json);
            let results = document.getElementById('results');
            results.innerHTML = "";
            let headerRow = document.createElement('div');
            headerRow.className = 'row';

            let nameRow = document.createElement('div');
            nameRow.className = 'header';
            let nameHeader = document.createElement('h2');
            nameHeader.innerHTML = "Name";
            nameRow.appendChild(nameHeader);
            headerRow.appendChild(nameRow);

            let symbol = document.createElement('div');
            symbol.className = 'header';
            let symbolHeader = document.createElement('h2');
            symbolHeader.innerHTML = "Symbol";
            symbol.appendChild(symbolHeader);
            headerRow.appendChild(symbol);

            let id = document.createElement('div');
            id.className = 'header';
            let idHeader = document.createElement('h2');
            idHeader.innerHTML = "ID";
            id.appendChild(idHeader);
            headerRow.appendChild(id);

            results.appendChild(headerRow);

            for (let i = 0; i < 50; i++) {
                let div = document.createElement('div');
                div.className = "row";

                nameRow = document.createElement('div');
                nameRow.className = 'entry';
                coinName = document.createElement('h3');
                coinName.innerHTML = json[i].name;
                nameRow.appendChild(coinName);
                div.appendChild(nameRow);

                symbol = document.createElement('div');
                symbol.className = 'entry';
                let coinSymbol = document.createElement('h3');
                coinSymbol.innerHTML = json[i].symbol;
                symbol.appendChild(coinSymbol);
                div.appendChild(symbol);

                id = document.createElement('div');
                id.className = 'entry';
                let coinId = document.createElement('h3');
                coinId.innerHTML = json[i].id;
                id.appendChild(coinId);
                div.appendChild(id);

                results.appendChild(div);
            }
        });
    
}

function onClick(e) {
    e.preventDefault();

    let coin = document.getElementById('ticker').value;
    if (coin === "") {
        coin = 'btc-bitcoin';
    }
    let amount = document.getElementById('amount').value;
    if (amount === "") {
        amount = 0.00;
    }

    let url = "https://api.coinpaprika.com/v1/tickers/" + coin;

    fetch(url)
    .then(function(response) {
        if (response.status != 200) {
            return {
                text: "Error calling the crypto API service: " + response.statusText
            }
        }
        return response.json();  
    }).then(function(json) {
        console.log(json);
        let results = document.getElementById('results');
        results.class = 'conversion';
        results.innerHTML = "";
        let headerRow = document.createElement('div');
        headerRow.className = 'rowConv';

        let nameRow = document.createElement('div');
        nameRow.className = 'header';
        let nameHeader = document.createElement('h2');
        nameHeader.innerHTML = "Name";
        nameRow.appendChild(nameHeader);
        headerRow.appendChild(nameRow);

        let symbol = document.createElement('div');
        symbol.className = 'header';
        let symbolHeader = document.createElement('h2');
        symbolHeader.innerHTML = "Symbol";
        symbol.appendChild(symbolHeader);
        headerRow.appendChild(symbol);

        let supply = document.createElement('div');
        supply.className = 'header';
        let supplyHeader = document.createElement('h2');
        supplyHeader.innerHTML = "Circulating Coins";
        supply.appendChild(supplyHeader);
        headerRow.appendChild(supply);

        let price = document.createElement('div');
        price.className = 'header';
        let priceHeader = document.createElement('h2');
        priceHeader.innerHTML = "Price per coin in USD";
        price.appendChild(priceHeader);
        headerRow.appendChild(price);

        let conversion = document.createElement('div');
        conversion.className = 'header';
        let conversionHeader = document.createElement('h2');
        conversionHeader.innerHTML = "$" + amount + " in " + json.name;
        conversion.appendChild(conversionHeader);
        headerRow.appendChild(conversion);

        results.appendChild(headerRow);

        let div = document.createElement('div');
        div.className = 'rowConv';

        nameRow = document.createElement('div');
        nameRow.className = 'entry';
        nameHeader = document.createElement('h3');
        nameHeader.innerHTML = json.name;
        nameRow.appendChild(nameHeader);
        div.appendChild(nameRow);

        symbol = document.createElement('div');
        symbol.className = 'entry';
        symbolHeader = document.createElement('h3');
        symbolHeader.innerHTML = json.symbol;
        symbol.appendChild(symbolHeader);
        div.appendChild(symbol);

        supply = document.createElement('div');
        supply.className = 'entry';
        supplyHeader = document.createElement('h3');
        supplyHeader.innerHTML = json.circulating_supply;
        supply.appendChild(supplyHeader);
        div.appendChild(supply);

        price = document.createElement('div');
        price.className = 'entry';
        priceHeader = document.createElement('h3');
        priceHeader.innerHTML = (json.quotes.USD.price).toFixed(2);
        price.appendChild(priceHeader);
        div.appendChild(price);

        conversion = document.createElement('div');
        conversion.className = 'entry';
        conversionHeader = document.createElement('h3');
        conversionHeader.innerHTML = (amount / (json.quotes.USD.price)).toFixed(5) + " coins";
        conversion.appendChild(conversionHeader);
        div.appendChild(conversion);

        results.appendChild(div);
    });
}


document.getElementById('all').addEventListener('click', allClick);
document.getElementById('crypto').addEventListener('click', onClick);