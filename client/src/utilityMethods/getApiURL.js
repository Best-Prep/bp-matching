function getApiURL(){
    if(process.env.NODE_ENV === 'production'){
        return("https://bp-azf.azurewebsites.net/")
    }else{
        return("")
    }
}

export default getApiURL;