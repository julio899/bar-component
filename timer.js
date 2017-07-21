var contador = new Vue({
	el:'#timer',
  data: {
    days:0,
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
	           if(self.segunds>0)
	           {
	           		self.segunds--;
	           }else{
	           		if(self.globalSegunds>60){
	           			self.segunds=60;	
					    //self.minutes--;
				        
	           		}else{
	           			self.segunds=self.globalSegunds;
	           		}
	           }

           if(self.globalSegunds>0&&self.segunds>0){self.globalSegunds--;}

	       //if(self.globalSegunds<60&&self.minutes>0){self.minutes--;}
	       //if(self.globalSegunds<3600&&self.hours>0){self.hours--;}
	       if(Math.trunc( self.globalSegunds/60 )< self.minutes && self.minutes>0){ self.minutes--; self.tminutes--; }
	       if(Math.trunc( self.globalSegunds/3600 )< self.hours && self.hours>0)
	       { 
	       		self.hours--; 
	       		if(self.days>0){self.thours=Math.trunc(self.hours/self.days); }else{self.thours=self.hours;}
	       	}
	       if(Math.trunc( self.globalSegunds/(3600*24) )< self.days && self.days>0){ self.days--; }
/**
        if(self.hours>0)
        {
        	self.tminutes=(self.hours*60);
        }else{
        	self.tminutes=self.minutes
        }

        //self.segunds++;
        
        if(self.minutes>0)
        {
        	self.tsegunds=(self.minutes*60);
        }else{
        	self.tsegunds=self.segunds; 
        	if(self.tminutes<1)
        	{
	        	self.minutes='00';
	        	self.classMinutes='cb-time-text cb-hour inactive';
        	}

        }


	        if(self.tsegunds<1){
	           self.segunds=0;
	        }else{
	        	if(self.segunds==0)
	        	{
	           		if(self.minutes>0){self.minutes--;}
	           		self.segunds=60;
	        	}
	           self.segunds--;
	           self.tsegunds--;
	        }
*/
        }, 1000);
  },
  ready:function ready(){
  	
  },
  methods: {
  getTime: function () {	
  	//buscar el total general de segundos
  	//con ese valor se desglosaran los demas valores
  	this.globalSegunds=86401*1;
  	this.minutes=Math.trunc(this.globalSegunds/60);
  	this.hours=Math.trunc(this.minutes/60);
  	this.days=Math.trunc(this.hours/24);
  	this.tsegunds=this.globalSegunds;

  	this.tminutes=Math.trunc(this.minutes/this.hours);


  	var decimalHora=(this.globalSegunds/this.days);
  	decimalHora=((decimalHora/24)-3600)*10;
  	this.thours=Math.trunc( (decimalHora*24)/100   );


  	
  	if(this.globalSegunds>60&&this.minutes>0)
	{		
			dec=((this.globalSegunds/60)-this.minutes)*100;
			this.segunds=Math.trunc( (dec*60)/100 );
	  	
    }else{
    	this.segunds=this.globalSegunds;
    }
  	console.log(this.globalSegunds);
  }
 }
})