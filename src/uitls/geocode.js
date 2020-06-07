const request=require('request');

geocode=(location,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiZGFuaWJ1cmQiLCJhIjoiY2thdjg3ZjYwM2l5eTJ0cDZyNTAzYmI5cyJ9.0Kid5SsaL_-OoPTHSqjQnA&limit=1`;
    request({url,json:true},(error,{body})=>{
        if(error){
                    callback("unable to connect to geoloaction service",undefined);
                }
                else if(body.features.length===0){
                    callback("unable to get coordinates",undefined);
                }
                else{
                callback(undefined,{
                    latitude: body.features[0].center[1],
                     longitude: body.features[0].center[0],
                    location:body.features[0].place_name
                });
                }
    });
};

module.exports=geocode;