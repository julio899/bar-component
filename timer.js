var contador = new Vue({
	el:'#timer',
  data: {
    days:0,
    hours:0,
    minutes:3,
    tminutes:0,
    segunds:0,
    tsegunds:0,
    interval:null,
  },
  created: function () {
    console.log('a is: ' + this.days)
  }, 
  mounted: function() {
  	var self = this;
        setInterval(function() {
        //self.segunds++;
        if(self.minutes>0){self.tsegunds=(self.minutes*60);}else{self.tsegunds=self.segunds}
        if(self.hours>0){self.tminutes=(self.hours*60);}else{self.tminutes=self.minutes}
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

        }, 1000);
  },
  ready:function ready(){
  	//this.addTime()
  },
  methods: {
  addTime: function () {	
  	return this.segunds++;
  }
 }
})