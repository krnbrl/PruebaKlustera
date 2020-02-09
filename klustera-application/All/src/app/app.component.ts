import { Component, OnInit } from '@angular/core';
import { Users } from './model/users';
import { Dates } from './model/grafica';
import { HttpClient } from '@angular/common/http';
import { UserService } from './services/user.service';
import { ChartsModule } from 'ng2-charts';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import * as CanvasJS from './../assets/js/canvasjs.min';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  tittle = 'Prueba Tecnica Klustera :)';
  public User: Users;
  public identity;
  public token;
  public message_err;
  public dates: Dates;
  public kpis;
  public foot;
  public dat:Array<any>=[];
  public vis:Array<any>=[];
  public pass:Array<any>=[];
  public messageInfo:boolean=false;

  constructor(private http: HttpClient, private _userService : UserService){
    this.User = new Users();
    this.dates= new Dates();
  }

  ngOnInit(){
    localStorage.clear();
    localStorage.setItem('token', null);
  }
 
  onSubmit(){
    console.log(this.User);

    var message_err;

    this._userService.singUp(this.User).subscribe(
      Response => {

        this.identity=true;
          this.User= JSON.parse(JSON.stringify(Response));
          //Token para mostrar el resto de la información.
          this.token= this.User.token;
          localStorage.setItem('token', JSON.stringify(this.token));
          localStorage.setItem('identity', JSON.stringify(this.identity));
          console.log(this.identity);  

          message_err = null; 
          console.log(Response);
      }, error => {
          message_err = <any>error;

          if(message_err != null){
            console.log(error);
            this.message_err = error;
            localStorage.setItem('token', null);

          }
      }
    );
  }

  logOut(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    console.log(this.token);
  }

  public avg_stay:string;
  public clients:string;
  public frecuency;
  public impacts:string;
  public loyals:string;
  public potencial_clients;
  public registers:string;
  public visits:string;
  
  public obtenerDatos(dates)
  {
    console.log(localStorage.getItem("token"))
    if(dates.date1!=null ||dates.date2!=null||dates.hour1!=null||dates.hour2!=null)
    {
      this.messageInfo=false;
      this._userService.getkpis(this.token, dates).subscribe(
        res=>
        {
         
          this.kpis= JSON.parse(JSON.stringify(res));
          this.avg_stay= this.kpis.kpis.avg_stay;
          this.clients= this.kpis.kpis.clients;
          this.frecuency= this.kpis.kpis.frequency;
          this.impacts= this.kpis.kpis.impacts;
          this.loyals= this.kpis.kpis.loyals;
          this.potencial_clients=this.kpis.kpis.potential_clients;
          this.registers= this.kpis.kpis.registers;
          this.visits= this.kpis.kpis.visits; 
        },
        err=>
        {
          let mensaje= err.error.message;
          if(mensaje=="Token is missing!")
          {
            alert("Tu sesión ha expirado, por favor vuelve a iniciar sesión.");
            this.identity=false
            localStorage.clear();
            localStorage.setItem('token', null);
          }
        });
        
        this.llenadoGrafica(dates);
    }
    else
    {
      this.messageInfo=true;
    }

  }

  public llenadoGrafica(date)
  {
    this._userService.getFoot(this.token, date).subscribe(
      res=>
      {
        let result = JSON.parse(JSON.stringify(res));
        this.foot= result;
        let dat:Array<any>=this.foot.results.visitors_daily;
        let len;
        
        if(this.dat!=[]||this.vis!=[]|| this.pass!=[])
        {
          this.reinicioGrafica();
          for(let i=0; i<=this.foot.results.visitors_daily.length; i++)
        {
          this.dat.push(dat[i][0]);
          this.vis.push(dat[i][1]);
          this.pass.push(dat[i][2]);
        }
        }
        else
        {
          for(let i=0; i<=this.foot.results.visitors_daily.length; i++)
        {
          this.dat.push(dat[i][0]);
          this.vis.push(dat[i][1]);
          this.pass.push(dat[i][2]);
        }
        }
      },
      err=>
      {
        let mensaje= err.error.message;

        if(mensaje=="Token is missing!")
        {
          alert("Tu sesión ha expirado, por favor vuelve a iniciar sesión.");
          this.identity=false
          localStorage.clear();
          localStorage.setItem('token', null);
          console.log(localStorage.getItem('token'))
        }
      });
  }
  public reinicioGrafica()
  {
    this.vis.splice(0, this.vis.length);
    this.dat.splice(0, this.dat.length);
    this.pass.splice(0, this.pass.length);
  }

  //Grafica
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = this.dat;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: this.vis, label: 'Visits ' },
    { data: this.pass, label: 'Passersby' }
  ];
}
