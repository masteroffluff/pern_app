const base64UrlDecode = (base64Url) => {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decoded = atob(base64);
  return JSON.parse(decoded);
};

const decodeJwtToken = (token) => {
  const [header, payload] = token.split('.'); // JWT parts are separated by a dot
  const decodedHeader = base64UrlDecode(header);
  const decodedPayload = base64UrlDecode(payload);
  
  return { header: decodedHeader, payload: decodedPayload };
};

export const isTokenExpired = (token) => {
  try{
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
  const decodedToken = decodeJwtToken(token); // Assume you have a function to decode the JWT token

  if (decodedToken && decodedToken.payload.exp) {
    return decodedToken.payload.exp < currentTimestamp;
  }
  }catch(err){
    ////console.log('token decoding error')
    //console.log(err)
    //console.log(`token=${token}`)
  }
  return true; // Token is considered expired if expiration claim is missing or invalid
};

export default decodeJwtToken