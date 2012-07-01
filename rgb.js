function rgbcol(r, g, b) {
	this.red = r;
	this.green = g;
	this.blue = b;
}

rgbcol.prototype = {
	red: 0,
	green: 0,
	blue: 0,
	
	alter_intensity: function() {
		var p = arguments[0];
		var i = arguments[1];
		
		if(i == 1) {
			return new rgbcol((this.red*i)-this.red*p, (this.green*i)-this.green*p, (this.blue*i)-this.blue*p);
		} else {
			return new rgbcol(this.red*p, this.green*p, this.blue*p);
		}
	},
	
	get_r: function() {
		return this.red;
	},
	
	get_g: function() {
		return this.green;
	},
	
	get_b: function() {
		return this.blue;
	},
	
	pad: function() {
		var p = "";
		for(var i = 0;i<2-arguments[0].length;i++) {
			p += "0";
		}
		return p + arguments[0];
	},
	
	to_hex: function() {
		return "#" + this.pad(this.red.toString(16)) + this.pad(this.green.toString(16)) + this.pad(this.blue.toString(16));
	},
	
	set_all: function() {
		this.red = arguments[0],
		this.green = arguments[1];
		this.blue = arguments[2];
	}
}