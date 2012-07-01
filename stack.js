function stack() {
	this.s = new Array();
	this.top = 0;
}

stack.prototype = {
	s: [],
	top: 0,
	
	push: function() {
		this.s[this.top] = arguments[0];
		this.top++;
	},
	
	pop: function() {
		if(this.top == 0) {
			throw "Stack is empty";
		} else {
			var t = this.s[this.top-1];
			this.top--;
			return t;
		}
	},
	
	peek: function() {
		return this.s[this.top - 1];
	},
	
	count: function() {
		return this.top;
	}
}