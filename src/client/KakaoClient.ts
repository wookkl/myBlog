import fetch from 'node-fetch';
import {Headers} from 'node-fetch';

class KakaoClient {
    contentType = "application/x-www-form-urlencoded;charset=utf-8";
    domain = "kakao.com";
    scheme = 'https'
    sub_domain: string;
    
    constructor() {
    }
    
    getBaseUrl() {
      return `${this.scheme}://${this.sub_domain}.${this.domain}`;
    }
    
    _checkResponse(response){
        this._handleException(response);
        return response;
    }
    
    _getEndpoint(path: string = "", queryParams?){
        let endpoint = this.getBaseUrl() + path;
        let queryParamStr = "";
        queryParams.forEach(key => {
          queryParamStr += `${key}=${queryParams[key]}`;
        });
        return endpoint + queryParamStr;
    }
    
    _handleException(response){
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
      if (responseJson.has('error')){
        errorCode = responseJson.get('error')
        errorMsg = responseJson.get('error_description')
      }
      throw Error(`${response.status_code} - ${errorCode} - ${errorMsg}`);
    }
    
    async _request(url, method, headers?, body?) {
      return this._checkResponse(await fetch(url, {
        method,
        headers,
        body
      }))
    }

    getDefaultHeaders(){
        return new Headers({
          "Content-Type": this.contentType,
          "Accept": "application/json"
        });
    }
    
    requestGet(url, params?) {
      return this._request(url, "GET", this.getDefaultHeaders());
    }
    requestPost(self, url, data?) {
      return this._request(url, "POST", this.getDefaultHeaders(), data);
    }
    
}

class KakaoAuthClient extends KakaoClient{
  constructor() {
    super();
  }
}

export const kakaoAuthClient = new KakaoAuthClient();