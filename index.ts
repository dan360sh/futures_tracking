import { FuturesPriceMonitoring } from './src/futures-price-monitoring';
import { getFuturesPrice } from './src/get-futures-price';

 const timeList = [
    {time: 300000, name: '5 мин'}, 
    {time: 900000, name: '15 мин'},
    {time: 3600000, name: '1 час'},
    {time: 14400000, name: '4 часа'},
    {time: 86400000, name: '24 часа'}
];
 async function main () {
     const futuresPriceMonitoring = new FuturesPriceMonitoring();
     //Вызов каждые 5s.
     setInterval(async () => {
         const futuresPrice = await getFuturesPrice();
         futuresPriceMonitoring.addPrice(futuresPrice.time, futuresPrice.bidPrice);
         timeList.forEach(time => {
            const info = futuresPriceMonitoring.getMaxAndMiinPrice(time.time);
            console.log(`максимальное значение: ${info.max}, минимальное значение: ${info.min} за  ${time.name}`);
         })
     }, 5000);
 }

 main ();