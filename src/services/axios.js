import axios from 'axios';

const YummlyApplicationID = "80ccaca4";
const YummlyApplicationKey = "37f4844b2feabb08158c902a3f739c4c";

export const HTTP = axios.create({
  baseURL: 'http://api.yummly.com/v1/api/recipes?_app_id=' + YummlyApplicationID + '&_app_key=' + YummlyApplicationKey + '&maxResult=20&start=0'
})

//http://api.yummly.com/v1/api/recipe/Easy-Homemade-Pizza-Sauce-2063902?_app_id=80ccaca4&_app_key=37f4844b2feabb08158c902a3f739c4c