// class for dealing with complex numbers and the associated arithmetic

function complex(real,im) {
	this.real = real;
	this.im = im;
}

complex.prototype = {
	real: 0,
	im: 0,
	
	add: function() {
		return new complex(this.real + arguments[0].real, this.im + arguments[0].im);
	},
	
	add_n: function() {
		return new complex(this.real + arguments[0], this.im);
	},
	
	sub: function() {
		return new complex(this.real - arguments[0].real, this.im - arguments[0].im);
	},
	
	sub_n: function() {
		return new complex(this.real - arguments[0], this.im);
	},
	
	mult: function() {
		return new complex(this.real * arguments[0].real - this.im * arguments[0].im, this.real * arguments[0].im + this.im * arguments[0].real);
	},
	
	mult_n: function() {
		return new complex(this.real * arguments[0], this.im * arguments[0]);
	},
	
	conj: function() {
		return new complex(arguments[0].real, -1 * arguments[0].im);
	},
	
	norm: function() {
		return arguments[0].real * arguments[0].real + arguments[0].im * arguments[0].im;
	},
	
	div_n: function() {
		return new complex(this.real / arguments[0], this.im / arguments[0]);
	},
	
	div_c: function() {
		var ans = this.mult(this.conj(arguments[0]));
		return ans.div_n(this.norm(arguments[0]));
	},
	
	mod: function() {
		return Math.sqrt(this.norm(this));
	},
	
	dist: function() {
		var c1 = arguments[0];
		var c2 = arguments[1];
		return (c1.sub(c2)).mod();
	},
	
	pow: function() {
		var t = arguments[0];
		var ans = this;
		
		for(var i = 1;i<t;i++) {
			ans = ans.mult(this);
		}
		
		return ans;
	},
	
	to_str: function() {
		return "(" + this.real + "+" + this.im + "i)";
	}
}