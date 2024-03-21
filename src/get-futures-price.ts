import https from 'https';
// Запрос на api.commex
export async function getFuturesPrice (): Promise<any> {
    return new Promise((resolve)=> {
         https.get('https://api.commex.com/fapi/v1/ticker/bookTicker?symbol=BTCUSDT', (response) => {
             let data = '';
         
             // Накапливаем данные по мере получения
             response.on('data', (chunk) => {
             data += chunk;
             });
         
             // Обработка завершения запроса
             response.on('end', () => {
                resolve(JSON.parse(data));
             });
         
         }).on('error', (error) => {
             console.error(`Ошибка при выполнении запроса: ${error.message}`);
         });
     })
 }