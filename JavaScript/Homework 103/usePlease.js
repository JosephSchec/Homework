module.exports=(req,res,next)=>{
    const baseUrl = 'http://' + req.headers.host;
    const url = new URL(req.url, baseUrl);
    
    if(url.searchParams.get('magicWord')==='please'){
        req.mySearchParams = url.searchParams;
        next();
    }
    else{
       throw { statusCode: 404, message: 'Whats the magic word' };
    }
}