// define
var CounterComponent = Vue.extend({
	props:['tdia','hours','segunds','thours','tminutes','classMinutes','globalSegunds'],
  	template: '<span class="cb-time-area js-timer-color countdown-color-yellow"><div class="cb-time-text cb-hour inactive"><span class="js-cb-day">{{Math.trunc(globalSegunds/86400)}}</span><div class="cb-time-label">days</div></div><div class="time-separator invisible">:</div><div class="cb-time-text cb-hour inactive"><span class="js-cb-hour">{{thours}}</span><div class="cb-time-label">hrs</div></div>                        <div class="time-separator invisible">:</div>                        <div :class="classMinutes"><span class="js-cb-minute">{{tminutes}}</span><div class="cb-time-label">mins</div></div>   <div class="time-separator invisible">:</div>  <div class="cb-time-text cb-hour"><span class="js-cb-second">{{segunds}}</span><div class="cb-time-label">secs</div></div></span>',
  	//template:'<span>{{globalSegunds}} D:{{tdia}} h:{{thours}} m:{{tminutes}} s:{{segunds}}</span>',
})
// register
Vue.component('contador', CounterComponent)

var contador = new Vue({
	el:'#timer',
  data: {
    days:0,
    tdia:0,
    hours:0,
    thours:0,
    minutes:0,
    tminutes:0,
    classMinutes:'cb-time-text cb-hour',
    segunds:0,
    tsegunds:0,
    interval:null,
    globalSegunds:null,
    
  },
  created: function () {
  	this.getTime();
  }, 
  mounted: function() {
  	var self = this;
        setInterval(function() {
        if(self.globalSegunds>0){
        	self.globalSegunds--;
        	if(Math.trunc(self.globalSegunds/86400)>0)
        		self.tdia=Math.trunc(self.globalSegunds/86400);
        	if(Math.trunc(self.globalSegunds/3600)>0)
        		self.thours=Math.trunc(self.globalSegunds/3600);
			
			//Cantidad de Dias
			//Math.trunc(self.globalSegunds/86400);        	
        	//Cantidad de Horas self.thours=Math.trunc(self.globalSegunds/3600);
        	//Cantidad de Horas self.tminutes=Math.trunc(Math.trunc(self.globalSegunds/60)/60);
        	//Cantidad de Minutos 
        	//Math.trunc(self.globalSegunds/60)


        	
        	var porcentaje24h=100;	
        	//var horas_seg=self.hours*3600;
        	if(self.tdia>0){
	        	porcentaje24h=self.getDecimal((self.globalSegunds/86400)/self.tdia);
        		self.thours=Math.trunc(((porcentaje24h)*24)/100);
        	}else{
        		self.thours=Math.trunc(self.hours);
        	}
        	// 100% -> 24h
        	// 	99% -> ?
		    var cantidadMinutes=0;
        	if(self.thours>0)
        		var cantidadMinutes=Math.trunc(Math.trunc(Math.trunc(self.globalSegunds/60)))-(self.thours*60);
        	
        	cantidadMinutes=Math.trunc(cantidadMinutes);
        	
        	//console.log('H:'+self.thours+' -m->'+(self.thours*60)+' *toS:'+(((self.globalSegunds/60)-(self.thours*60))/60)+' G:'+(self.globalSegunds/60))
        	//console.log( (self.thours*60)-cantidadMinutes );
        	//59min -> 100%
			
			//*********************************************
			//MINUTOS
			self.minutes=Math.trunc(self.globalSegunds/60);
			//DIAS ***
			self.days=Math.trunc(Math.trunc(Math.trunc(self.globalSegunds/60)/60)/24);
			// /60 /24 dan los dias si quedan decimales son minutos restantes
			// dias decimales ((self.minutes/60)/24)
			//console.log(((self.minutes/60)/24)-self.days);
			//24h -> 100%
			//?   -> 0.99
			//HORAS ***
			self.thours=self.getDecimal(( (((self.minutes/60)/24)-self.days )*24)/100);
			

			//console.log( 't minutes '+self.minutes );
			//[MINUTOS]
			if((((self.minutes*60)-self.globalSegunds)*-1)==0){
				console.log( ((self.minutes*60)-self.globalSegunds)*-1 );
				console.log((self.minutes)+' h:'+(self.thours) +' D:'+self.days)
				console.log( self.minutes - ((self.thours*60) + ((self.days*24)*60))  )
				self.tminutes=(self.minutes - ((self.thours*60) + ((self.days*24)*60)));
				//solventar min 0
				if(self.tminutes==0){
					//if(self.tminutes==0&&self.globalSegunds>59){
					if(self.tminutes==0 && self.globalSegunds>59){
						self.tminutes=59;
					}else{
								console.log('tmin'+self.tminutes+'  '+self.minutes)
						if (self.minutes<60){

								console.log('zero min')
						}else{
								self.tminutes=0;
							}
					}
				}else{self.tminutes=self.tminutes-1;}
			}

			self.tdia=self.days;

			
			dec=((this.globalSegunds/60)-this.tminutes)*100;
			this.segunds=Math.trunc( (dec*60)/100 );

  				if(self.segunds>0)
				{
					self.segunds--;
				}else{
							self.segunds=59;
			           		if(self.globalSegunds>60){
			           			self.segunds=59;						        
			           		}else{
			           			self.segunds=self.globalSegunds;
			           		}
							/*sincronizamos los minutos*/	
							console.log('hora:'+self.thours +' minutes:'+self.minutes );
							if(self.minutes==59)
								self.tminutes=59;
			        }
	
        	}
        }, 1000);
  },
  ready:function ready(){
  	
  },
  methods: {
  getDecimal(numero){
  	var a = Math.floor(numero * 100) / 100;
  	 return (a.toFixed(2))*100;
  	//return ((numero-Math.trunc(numero)).toFixed(2) )*100;
  },
  getTime: function () {	
  	//buscar el total general de segundos
  	//con ese valor se desglosaran los demas valores
  	this.globalSegunds=3605*2;//86405*2;
  	if(Math.trunc(this.globalSegunds/60)>0)
  		this.minutes=Math.trunc(this.globalSegunds/60);
  	
  	this.hours=Math.trunc(this.minutes/60);
  	this.days=Math.trunc(this.hours/24);
  	this.tsegunds=this.globalSegunds;

  	//validacion de Minutos
  	var decimalMinutos=(this.globalSegunds/this.minutes);
	decimalMinutos=(decimalMinutos-(Math.trunc(decimalMinutos)))*10;
	this.tminutes=Math.trunc(decimalMinutos);
	// --- MINUTES --- //
	console.log('minutes '+this.minutes)
	console.log(this.globalSegunds/this.minutes)
	// /60 /24 dan los dias si quedan decimales son minutos restantes 


  	var decimalHora=(this.globalSegunds/3600);
  	decimalHora=decimalHora/24;
  	decimalHora=decimalHora-Math.trunc(decimalHora);
  	this.thours=Math.trunc(decimalHora*10);

  	
  	if(this.globalSegunds>60&&this.minutes>0)
	{		
			dec=((this.globalSegunds/60)-this.minutes)*100;
			this.segunds=Math.trunc( (dec*60)/100 );
	  	
    }else{
    	this.segunds=this.globalSegunds;
    }
	console.log( this.thours );
  },
 }
})