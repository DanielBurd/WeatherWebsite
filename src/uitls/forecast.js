const request=require('request');
forecast=(lat,long,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=02caa714fef2f242d2d2c5525e737531&query=${lat},${long}&units=m`;
    request({url,json:true},(error,{body})=>{
        if(error){
             callback('unable to connect to weather service',undefined);
        }else if(body.error){
            callback('unable to find locaion',undefined)
        }else{
            callback(undefined,`${body.current.weather_descriptions[0]}, It is ${body.current.temperature} degrees out, It feels like ${body.current.feelslike} degrees out.`);
        }
    });
    
}

module.exports=forecast;