"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

export async function createBookmarkApi(propertyId: string){
 
    const accessToken = await isAccessTokenExist();
    


    const response = await fetch(`${process.env.BACKEND_API_URL}/api/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
        "Authorization": `Bearer ${accessToken}` 
      },
      body: JSON.stringify( {propertyId} ),
    });



    return await response.json();

}
