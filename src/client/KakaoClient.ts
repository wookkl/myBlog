import fetch from 'node-fetch';
import {Headers} from 'node-fetch';


class KakaoClient {
  contentType = "application/x-www-form-urlencoded;charset=utf-8";
  domain = "kakao.com";
  scheme = 'https'
  subDomain: string;
  
  constructor() {
  }
  
  _checkResponse(response) {
    this._handleException(response);
    return response;
  }
  
  _handleException(response) {
    switch (response.statusCode) {
      case 200:
        return response;
      case 401:
        throw Error();
      case 400:
        throw Error();
    }
    const responseJson = response.json();
    let errorCode = responseJson.get('code');
    let errorMsg = responseJson.get('message');
    if (responseJson.has('error')) {
      errorCode = responseJson.get('error')
      errorMsg = responseJson.get('error_description')
    }
    throw Error(`${response.status_code} - ${errorCode} - ${errorMsg}`);
  }
  
  getBaseUrl() {
    return `${this.scheme}://${this.subDomain}.${this.domain}`;
  }
  
  getEndpoint(path: string = "", queryParams?) {
    let endpoint = this.getBaseUrl() + path;
    let queryParamStr = "";
    queryParams.forEach(key => {
      queryParamStr += `${key}=${queryParams[key]}`;
    });
    return endpoint + queryParamStr;
  }
  
  getDefaultHeaders() {
    return new Headers({
      "Content-Type": this.contentType,
      "Accept": "application/json"
    });
  }
  
  async request(method, url, headers?, body?) {
    return this._checkResponse(await fetch(url, {
      method,
      headers,
      body
    }))
  }
}

class KakaoAuthClient extends KakaoClient {
  clientId = process.env.KAKAO_REST_API_KEY;
  clientSecret = process.env.KAKAO_SECURITY_KEY;
  subDomain = 'kauth';
  
  constructor() {
    super();
  }
  
  async requestToken(code: string, redirect_url: string) {
    const url = this.getEndpoint("/oauth/token");
    const body = {
      "grant_type": "authorization_code",
      "client_id": this.clientId,
      "client_secret": this.clientSecret,
      "redirect_uri": redirect_url,
      "code": code
    }
    const headers = this.getDefaultHeaders();
    const response = await this.request("POST", url, headers, body);
    
    return response.json();
  }
  
  async refreshToken(refreshToken: string) {
    const url = this.getEndpoint("/oauth/token")
    const body = {
      "grant_type": "refresh_token",
      "client_id": this.clientId,
      "client_secret": this.clientSecret,
      "refresh_token": refreshToken
    }
    const headers = this.getDefaultHeaders();
    const response = await this.request("POST", url, headers, body);
    
    return response.json();
  }
}


class KakaoAPIClient extends KakaoClient {
  subDomain = 'kapi'
  
  async requestUserInfo(accessToken: string) {
    const queryParams = {
      'secure_resource': 'true'
    }
    const url = this.getEndpoint("/v2/user/me", queryParams);
    let headers = this.getDefaultHeaders();
    headers.append("Authorization", `Bearer ${accessToken}`)
    const response = await this.request("POST", url, headers);
    
    return response.json();
  }
}

export const kakaoAuthClient = new KakaoAuthClient();
export const kakaoAPIClient = new KakaoAPIClient();