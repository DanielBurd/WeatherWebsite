const path=require('path');
const express=require('express');
const hbs=require('hbs');
const app=express();

const port=process.env.PORT || 3000; // || is used for fallback

const geoCode=require('./uitls/geocode');
const forecast=require('./uitls/forecast');
//define paths for express config
const viewsPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'/../templates/partials');

//setting handlesbar engninge to veiws locatoin
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//setup static directory
app.use(express.static(path.join(__dirname,'../public')));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather ',
        name:'Daniel'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Daniel'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        message:"Here you'll be able to get all the help you need",
        title:"Help",
        name:"Daniel"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address must be provided!"
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
             return res.send({error})
        }
        else{
            forecast(latitude,longitude,(error,data2)=>{
                if(error){
                 return   res.send({ error})
                }
                else{
                    res.send({
                        forecast:data2,
                        location
                    })
                }
            })
        }
    })
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You Must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products:[]
    })
});

app.get("/help/*",(req,res)=>{
    res.render('404',{
        page:"Help Article",
        title:404,
        name:'Daniel'
    });
});

app.get('*',(req,res)=>{
   res.render('404',{
       page:'Page',
       title:404,
       name:'Daniel'
   })
});


app.listen(port,()=>{
    console.log('server is running on '+port );
});
