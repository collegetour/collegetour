import '../lib/environment'
import weather from 'openweather-apis'

weather.setAPPID(process.env.OPEN_WEATHER_KEY)

weather.setLang('en')

weather.setCity('Ithaca, NY')

const processor = async () => {

  const forecast = await Promise.promisify(weather.getWeatherForecastForDays)(5)

  console.log(forecast)

}

processor().then(process.exit)
