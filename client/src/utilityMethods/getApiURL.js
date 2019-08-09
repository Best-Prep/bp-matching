function getApiURL(){
    if(process.env.NODE_ENV === 'production'){
        return("https://bp-matching-backend.azurewebsites.net")
    }else{
        return("")
    }
}

export default getApiURL;