


export default function colourSwitch(colour){
    switch(colour){
        case "sandy":
            return {
                main_text_color: 'saddlebrown',
                popup_text_color: 'saddlebrown',
                main_background_color: 'burlywood',
                main_background_color_alt: 'wheat',
                popup_background_color:'wheat',
                main_background_image_URL:process.env.PUBLIC_URL + '/images/gustavo-CEeoDFpVxxw-unsplash.jpg',
            }
        case "forest":
            return {
                main_text_color: 'palegoldenrod',
                popup_text_color: 'darkolivegreen',
                main_background_color: 'darkolivegreen',
                main_background_color_alt: 'olivedrab',
                popup_background_color:'palegoldenrod',
                main_background_image_URL:process.env.PUBLIC_URL + '/images/marc-pell-oWRVjFQIwAY-unsplash.jpg',
            }
        case "ocean":
            return {
                main_text_color: 'azure' ,
                popup_text_color: 'darkcyan',
                main_background_color: 'darkcyan',
                main_background_color_alt:'aquamarine',
                popup_background_color:'aquamarine',
                main_background_image_URL:process.env.PUBLIC_URL + '/images/jeremy-bishop-TI_3eaoMyjo-unsplash.jpg'
            }        
        case "pinky":
            return {
                main_text_color: 'deeppink' ,
                popup_text_color: 'pink',
                main_background_color: 'pink',
                main_background_color_alt:'hotpink' ,
                popup_background_color:'deeppink',
                main_background_image_URL:process.env.PUBLIC_URL + '/images/meiying-ng-OrwkD-iWgqg-unsplash.jpg'
            }
        case "contrast":
            return {
                main_text_color: 'white' ,
                popup_text_color: 'black',
                main_background_color: 'black',
                main_background_color_alt:'yellow',
                popup_background_color:'white',
                main_background_image_URL:'',
            }
        case "dark":
            return {
                main_text_color: 'darkgrey' ,
                popup_text_color: '#1b012d',
                main_background_color: '#1b012d',
                main_background_color_alt:'#474747' ,
                popup_background_color:'darkgray',
                main_background_image_URL:process.env.PUBLIC_URL + '/images/joshua-woroniecki-3mXIZP6_6zY-unsplash.jpg',
            }
        default:
            return {
                main_text_color: 'antiquewhite',
                popup_text_color: 'burlywood',
                main_background_color: 'burlywood',
                main_background_color_alt: 'wheat',
                popup_background_color:'antiquewhite',
                main_background_image_URL:process.env.PUBLIC_URL + '/images/gustavo-CEeoDFpVxxw-unsplash.jpg'
            }
    }
}