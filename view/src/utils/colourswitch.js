


export default function colourSwitch(colour){
    const colourMap ={
       "sandy":{
                main_text_color: '#54341e',
                main_text_color_button: '#54341e',
                popup_text_color: '#54341e',
                main_background_color: '#d9b88c',
                main_background_color_alt: '#d5c7ae',
                popup_background_color:'#d5c7ae',
                main_background_image_URL:process.env.PUBLIC_URL + '/images/gustavo-CEeoDFpVxxw-unsplash.jpg',
            },
        "forest": {
                main_text_color: 'palegoldenrod',
                main_text_color_button:'palegoldenrod',
                popup_text_color: '#55633c',
                main_background_color: '#55633c',
                main_background_color_alt: '#72864a',
                popup_background_color:'palegoldenrod',
                main_background_image_URL:process.env.PUBLIC_URL + '/images/marc-pell-oWRVjFQIwAY-unsplash.jpg',
            },
        "ocean":{
                main_text_color: '#e0f6fc' ,
                main_text_color_button:'#e0f6fc',
                popup_text_color: '#01615d',
                main_background_color: '#4da9cb',
                main_background_color_alt:'#24aaac',
                popup_background_color:'#e0f6fc',
                main_background_image_URL:process.env.PUBLIC_URL + '/images/jeremy-bishop-TI_3eaoMyjo-unsplash.jpg'
            },
        "pinky":{
                main_text_color: 'deeppink' ,
                main_text_color_button:'deeppink',
                popup_text_color: '#a33b64',
                main_background_color: 'pink',
                main_background_color_alt:'#f395ad' ,
                popup_background_color:'#f395ad',
                main_background_image_URL:process.env.PUBLIC_URL + '/images/meiying-ng-OrwkD-iWgqg-unsplash.jpg'
            },
        "contrast": {
                main_text_color: 'white' ,
                main_text_color_button:'black',
                popup_text_color: 'black',
                main_background_color: 'black',
                main_background_color_alt:'yellow',
                popup_background_color:'white',
                main_background_image_URL:'',
            },
        "dark":{
                main_text_color: 'darkgrey' ,
                main_text_color_button:'darkgrey',
                popup_text_color: '#1b012d',
                main_background_color: '#1b012d',
                main_background_color_alt:'#474747' ,
                popup_background_color:'darkgray',
                main_background_image_URL:process.env.PUBLIC_URL + '/images/joshua-woroniecki-3mXIZP6_6zY-unsplash.jpg',
            }

    }
    return colourMap[colour]
}