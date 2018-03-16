let Record = (function() {
    let id = -1
    class Record{
        constructor(temperature, humidity, pressure, windSpeed) {
            this.temperature = temperature
            this.humidity = humidity
            this.pressure = pressure
            this.windSpeed = windSpeed
            this.id = ++id
        }

        get weatherStatus(){
            return this.temperature < 20 && (this.pressure < 700 || this.pressure > 900) && this.windSpeed > 25 ? 'Stormy' : 'Not stormy'
        }

        toString(){
            return `Reading ID: ${this.id}
Temperature: ${this.temperature}*C
Relative Humidity: ${this.humidity}%
Pressure: ${this.pressure}hpa
Wind Speed: ${this.windSpeed}m/s
Weather: ${this.weatherStatus}`
        }
    }

    return Record
}())

let record1 = new Record(32, 66, 760, 12);
let record2 = new Record(5, 2, 563, 62)
console.log(record2.id);
console.log(record2.toString())

