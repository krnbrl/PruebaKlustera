import {Injectable} from "@angular/core";
import { HttpClientModule, HttpClient, HttpResponse, HttpHeaders, HttpParams}    from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Users } from './../model/users';
import { element } from 'protractor';
import { GLOBAL } from './golbal';
import { access } from 'fs';

@Injectable()


export class UserService{
    public identity;
    public token: string;
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    singUp(to_login):Observable<any>{
          
        let json = JSON.stringify(to_login);

        let params = json;
        
        var user_sing = to_login.usuario;
        var pass_sing = to_login.password;

        let header = new HttpHeaders().set('Authorization',' Basic '+ btoa(user_sing+":"+ pass_sing) );

        return this._http.get(this.url+"/login", {params: {name: user_sing, password: pass_sing}, 
        headers: header});

    }

    getIdent(){
        let identity = localStorage.getItem('identity');

        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;

    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token != "undefined"|| token!=null){
            this.token = token;
        }else{
            this.token = null;
            console.log(token)
        }

        return this.token;
    }


    public getkpis(token,dates)
    {
       let full= JSON.stringify(dates.date1);
       let date1= full.split("\"");
       
       let full2= JSON.stringify(dates.date2);
       let date2= full.split("\"");
        

        let headert = new HttpHeaders().set('x-access-token', token);

        console.log(headert)

        return this._http.get(this.url+"/get_kpis/1159/"+date1[1]+"/"+date2[1]+"/"+dates.hour1+"/"+dates.hour2, {headers:headert});

    }

    public getFoot(token, dates){
        let headert = new HttpHeaders().set('x-access-token', token);
        return this._http.get(this.url+"/fetch_daily_footprint/1159/"+dates.date1+"/"+dates.date2+"/"+dates.hour1+"/"+dates.hour2, {headers: headert});
    }

}
