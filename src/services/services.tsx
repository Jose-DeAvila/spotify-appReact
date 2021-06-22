import { env } from "config/config";

declare global {
  type Dictionary<T> = { [key: string]: T};
}

const limit = 10;

const getUrlParams = ():string => {
  const searchQuery:string = window.location.search;
  const searcher = new URLSearchParams(searchQuery);
  return searcher.get("code") || searcher.get("error") || '';
};

const getAccessCode = ():void => {
  const AuthURI:string = `https://accounts.spotify.com/authorize?client_id=${
    env.CLIENT_ID
  }&response_type=code&redirect_uri=${encodeURIComponent(
    env.REDIRECT_URI
  )}&scope=${env.CLIENT_SCOPES.join("%20")}&state=34fFs29kd09`;

  window.location.href = AuthURI;
};

const getAccessToken = async (code:string):Promise<void> => {

    const URI:string = 'https://accounts.spotify.com/api/token';
    
    const data:Dictionary<string> = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': env.REDIRECT_URI
    }

    const bodyEncoded:string = Object.keys(data).map(
      (key:string) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join('&');
    
    const response = await fetch(URI, {
        body: bodyEncoded,
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(env.CLIENT_ID + ":" + env.CLIENT_SECRET)}`
        }
    });

    const tokenInfo:Dictionary<string> = await response.json();
    localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));

    getUserInfo(tokenInfo['access_token']);
}

const getUserInfo = async (accessToken:string):Promise<void> => {

  const getInfoURI = 'https://api.spotify.com/v1/me';
  const response = await fetch(getInfoURI, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const userInfo:Dictionary<string> = await response.json();
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  
  window.location.href = "/";
}

const getUserPlaylists = async (accessToken:string) => {
  
  try{
    const {refresh_token} = JSON.parse(localStorage.getItem('tokenInfo') || '{"error":"Token info is not provided"}');

    const getPlaylistsURI:string = 'https://api.spotify.com/v1/me/playlists';
    const response = await fetch(getPlaylistsURI, {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const PlayListInfo = await response.json();

    if(PlayListInfo.error?.status === 401){
      if(refresh_token){
        getRefreshToken(refresh_token);
      }
      else{
        signOutSession();
      }
    }
    
    return PlayListInfo;
  }
  catch(error){
    console.log(error);
    return {}
  }

}

const getPlaylistItems = async (accessToken:string, playlist_id:string, page:number) => {
  
  try{
    const {refresh_token} = JSON.parse(localStorage.getItem('tokenInfo') || '{"error":"Token info is not provided"}');

    const getPlaylistsURI:string = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?market=ES&limit=${limit}&offset=${limit * page}`;

    const response = await fetch(getPlaylistsURI, {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const PlayListInfo = await response.json();
    if(PlayListInfo.error?.status === 401){
      if(refresh_token){
        getRefreshToken(refresh_token);
      }
      else{
        signOutSession();
      }
    }
    
    return PlayListInfo;
  }
  catch(error){
    console.log(error);
    return {error};
  }

}

const getRefreshToken = async (refreshToken:string):Promise<object> => {
  try{
    const URI:string = 'https://accounts.spotify.com/api/token';
    
    const data:Dictionary<string> = {
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
    }

    const bodyEncoded:string = Object.keys(data).map(
      (key:string) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join('&');
    
    const response = await fetch(URI, {
        body: bodyEncoded,
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(env.CLIENT_ID + ":" + env.CLIENT_SECRET)}`
        }
    });

    const tokenInfo:Dictionary<string> = await response.json();
    localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));

    getUserInfo(tokenInfo['access_token']);

    return await response.json();
  }
  catch(error){
    console.log(error);
    return {error};
  }
}

const signOutSession = () => {
  localStorage.clear();
  window.location.href = "/";
}

const getFavoritesSongs = async (access_token:string, page:number) => {
  try{

    const {refresh_token} = JSON.parse(localStorage.getItem('tokenInfo') || '{"error":"Token info is not provided"}');

    const URI:string = 	`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${limit * page}`;
    const response = await fetch(URI, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    });

    const FavoritesInfo = await response.json();
    if(FavoritesInfo.error?.status === 401){
      if(refresh_token){
        getRefreshToken(refresh_token);
      }
      else{
        signOutSession();
      }
    }
    return FavoritesInfo;
  }
  catch(error){
    console.log(error);
    return {}
  }
}

const addToFavorite = async (access_token:string, id:string):Promise<any> => {
  try{
    const URI = `https://api.spotify.com/v1/me/tracks?ids=${id}`;
    const response = await fetch(URI, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    });

    return response;

  }
  catch(error){
    return {"Error": "Error to remove item from saved", "Message": error}
  }
}

const removeFromFavorite = async (access_token:string, id:string):Promise<any> => {
  try{

    const {refresh_token} = JSON.parse(localStorage.getItem('tokenInfo') || '{"error":"Token info is not provided"}');

    const URI = `https://api.spotify.com/v1/me/tracks?ids=${id}`;
    const response:any = await fetch(URI, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    });

    if(response.error?.status === 401){
      if(refresh_token){
        getRefreshToken(refresh_token);
      }
      else{
        signOutSession();
      }
    }

    return response;

  }
  catch(error){
    return {"Error": "Error to remove item from saved", "Message": error}
  }
}

const checkInFavorites = async (access_token:string, id:string[]) => {
  try{
    const URI = `https://api.spotify.com/v1/me/tracks/contains?ids=${id.join('%2C')}`;
    const {refresh_token} = JSON.parse(localStorage.getItem('tokenInfo') || '{"error":"Token info is not provided"}');

    const response:any = await fetch(URI, {
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      }
    });

    if(response.error?.status === 401){
      if(refresh_token){
        getRefreshToken(refresh_token);
      }
      else{
        signOutSession();
      }
    }

    const favorites = await response.json();
    return favorites;
  }
  catch(error){
    return {"Error": "Error to search favorites", "Message": error}
  }

}

const removePlaylist = async (access_token:string, playlist_id:string): Promise<any> => {
  try{
    const URI = `https://api.spotify.com/v1/playlists/${playlist_id}/followers`;
    const {refresh_token} = JSON.parse(localStorage.getItem('tokenInfo') || '{"error":"Token info is not provided"}');

    const response:any = await fetch(URI, {
      method: 'DELETE',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      }
    });

    if(response.error?.status === 401){
      if(refresh_token){
        getRefreshToken(refresh_token);
      }
      else{
        signOutSession();
      }
    }

    console.log(response);
    return response;
  }
  catch(error){
    return error
  }
}

const searchKeyword = async (access_token:string, keyword:string, page:number) => {
  try{
    const {refresh_token} = JSON.parse(localStorage.getItem('tokenInfo') || '{"error":"Token info is not provided"}');
    const URI:string = `https://api.spotify.com/v1/search?q=${keyword}&type=track&limit=${limit}&offset=${limit*page}`;

    const response:any = await fetch(URI, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      }
    });

    const SearchResult = await response.json();

    if(response.error?.status === 401){
      if(refresh_token){
        getRefreshToken(refresh_token);
      }
      else{
        signOutSession();
      }
    }

    return SearchResult.tracks;
  }
  catch(error){
    return {
      "Error": error
    }
  }
}

export { getUrlParams, getAccessCode, getAccessToken, getUserInfo, getUserPlaylists, getPlaylistItems, signOutSession, getFavoritesSongs, addToFavorite, removeFromFavorite, checkInFavorites, removePlaylist, searchKeyword};