const CoinGecko = require('coingecko-api');

const coinGeckoClient = new CoinGecko();

const moment = require('moment');


const DIVISAS = {
    bitcoin:{
        symbol: 'btc',
        name: 'Bitcoin',
        image: {
            thumb: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
            small: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
            large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
        }
    },
    ethereum:{
        symbol: 'eth',
        name: 'Ethereum',
        image: {
            thumb: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
            small: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
            large: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880'
        }
    },
    polkadot:{
        symbol: 'dot',
        name: 'Polkadot',
        image: {
            thumb: 'https://assets.coingecko.com/coins/images/12171/thumb/aJGBjJFU_400x400.jpg?1597804776',
            small: 'https://assets.coingecko.com/coins/images/12171/small/aJGBjJFU_400x400.jpg?1597804776',
            large: 'https://assets.coingecko.com/coins/images/12171/large/aJGBjJFU_400x400.jpg?1597804776'
        }
    },
    cardano:{
        symbol: 'ada',
        name: 'Cardano',
        image: {
            thumb: 'https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860',
            small: 'https://assets.coingecko.com/coins/images/975/small/cardano.png?1547034860',
            large: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860'
        }
    },
    ripple:{
        symbol: 'xrp',
        name: 'XRP',
        image: {
            thumb: 'https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png?1605778731',
            small: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731',
            large: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731'
        }
    },
    uniswap:{
        symbol: 'uni',
        name: 'Uniswap',
        image: {
            thumb: 'https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604',
            small: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604',
            large: 'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png?1600306604'
        }
    },
    litecoin:{
        symbol: 'ltc',
        name: 'Litecoin',
        image: {
            thumb: 'https://assets.coingecko.com/coins/images/2/thumb/litecoin.png?1547033580',
            small: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png?1547033580',
            large: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580'
        }
    },
    chainlink:{
        symbol: 'link',
        name: 'Chainlink',
        image: {
            thumb: 'https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png?1547034700',
            small: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700',
            large: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700'
        }
    }

};

module.exports = {

    async init(funcionesSocket){

        funcionesSocket.setDivisas(DIVISAS);

        let ids = Object.keys(DIVISAS);

        for(let i = 0; i < ids.length; i++){
            let id = ids[i];
            let precios = await this.getUltimas24H(id);

            if(precios !== false){
                let emitirAviso = (i+1)===ids.length;
                funcionesSocket.setPrecios(id,precios,emitirAviso);
            }
            //todo hacer algo cuando es false

        }

        setInterval(()=>{

            this.getAhora(ids).then((precios)=>{

                if(precios!==false){
                    funcionesSocket.actualizarPrecios(precios);
                }
                //todo hacer algo para cuando ha ocurrido un error
            }).catch(err => {
               console.log("ERROR API COINGECKO catch");
               console.log(err);
            });

        },30000);

    },

    async getUltimas24H(id){

        let respuesta = await coinGeckoClient.coins.fetchMarketChartRange(id, {
            from: moment().subtract(1,"days",).unix(),
            to: moment().unix(),
            vs_currency: 'eur'
        });

        if(respuesta.success && respuesta.code === 200){
            return respuesta.data.prices;
        }

        console.log("ERROR API COINGECKO getUltimas24H");
        console.log(respuesta);

        return false;

    },

    async getAhora(idsDivisas){

        let respuesta = await coinGeckoClient.simple.price({
            ids:idsDivisas,
            vs_currencies:'eur',
            include_last_updated_at:true
        });

        if(respuesta.success && respuesta.code === 200){
            return respuesta.data;
        }

        console.log("ERROR API COINGECKO getAhora");
        console.log(respuesta);

        return false;

    }

}