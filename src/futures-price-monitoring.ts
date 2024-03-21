interface info {
    price: number,
    time: number
} 

/**
 * Класс для маниторига цены фьючерса на рынке 
 */
export class FuturesPriceMonitoring {

    //Хранилище информации о фьючерсах
    readonly listFuturesInfo: {time: number, price: number}[] = [];

    //Хранит максимальное и минимальное значение для каждого отрезка времени.
    readonly cacheList: {[key: number]: {max: info, min: info}} = {};

    /**
     * Добавляет цену 
     * @param time 
     * @param price 
     */
    public addPrice (time: number, price: number) {
        const maxTime = 86400000;
        //добавляет в хранилище
        this.listFuturesInfo.unshift({time, price});

        //обновление кеша
        for (let key in this.cacheList){
            let cache = this.cacheList[key];
           
            if(cache.max.price < price ) {
                cache.max = {price, time};
            }

            if(cache.min.price > price ) {
                cache.min = {price, time};
            }
        }

        // проверка на данные не дольше 24 часа, и их удаление.
        while((new Date().getTime() - this.listFuturesInfo[this.listFuturesInfo.length - 1].time) > maxTime){
            this.listFuturesInfo.pop();
        }
    }
     
    public getMaxAndMiinPrice(time: number): {max?: number, min?: number} {
        let priceMax: info | undefined;
        let priceMin: info | undefined;
        const nowTime = new Date().getTime(); 

        if(this.cacheList[time] && nowTime - this.cacheList[time].max.time < time && nowTime - this.cacheList[time].min.time < time) {
            return {max: this.cacheList[time].max.price, min:  this.cacheList[time].min.price};
        }

        for (let futuresInfo of this.listFuturesInfo){
            if((nowTime - futuresInfo.time) > time){
                break;
            }
            if((!priceMax) || priceMax.price < futuresInfo.price){
                priceMax = futuresInfo;
            }

            if((!priceMin) || priceMin.price > futuresInfo.price){
                priceMin = futuresInfo;
            }   
        }

        if(priceMax && priceMin){
            this.cacheList[time] = {max: priceMax, min: priceMin};
        }
        
        return {max: priceMax?.price, min: priceMin?.price};
    }
}