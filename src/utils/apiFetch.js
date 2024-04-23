//const apiUrl = process.env.REACT_APP_API_URL

export default async function apiFetch(endPoint, options, rejectionCallback){
    try{
        //options['headers']['Access-Control-Allow-Origin']= apiUrl
        const response = await fetch(endPoint,options);
        //console.log(response)

        if(response.ok){
            
            const data = await response.json();
            console.log(endPoint+ ' success')
            try{
            return JSON.parse(data)  // trap them tricksy double encoded replies
            }
            catch(error){            // this simply passes throuch anything JSON.parse doesn't like
                return data
            }
        }else{
            //console.log({response})
            console.log(endPoint+ ' failed')
            try{
            const message = await response.json()
            return rejectionCallback({status:response.status, message})
            }
            catch(e){
                rejectionCallback(e)
            }
            
        }

        }catch(e){
            
            return rejectionCallback(e)
        }
}

