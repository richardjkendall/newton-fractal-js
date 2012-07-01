importScripts("cn.js");

// function to get messages
self.onmessage = function(e) {
	var f = e.data[0];
	var w = e.data[1];
	var h = e.data[2];
	var mnx = e.data[3];
	var mxx = e.data[4];
	var mny = e.data[5];
	var mxy = e.data[6];
	var mxi = e.data[7];
	var tol = e.data[8];
	var step = e.data[9];
	var o_w = e.data[10];
	var o_h = e.data[11];
	var o_ww = e.data[12];
	var o_hh = e.data[13];
	
	postMessage(calc_fractal(w,h,mnx,mxx,mny,mxy,mxi,tol,step,f,o_w,o_h,o_ww,o_hh));
}

function f_c(z, f) {
	return eval(f + ";");
	//return z.pow(3).sub_n(2);
}

function calc_fractal(w, h, min_x, max_x, min_y, max_y, max_it, tol, step, f, w_offset, h_offset, c_width, c_height) {	
	var roots = new Array();		// list of roots that have been found
	var fdata = new Array();		// data representing the fractal
	var c = 0;
	var im;
	var real;
	var stepc = new complex(step,step);
	
	var root_found;
	var root;
	var z;
	var dz;
	var z0;
	
	for(var y = h_offset;y < c_height;y++) {
		im = y * ((max_y - min_y) / h) + min_y;
		for(var x = w_offset;x < c_width;x++) {
			fdata[(w*(y-h_offset))+(x-w_offset)] = new Array();
			real = x * ((max_x - min_x) / w) + min_x;
			
			root_found = -1;
			z = new complex(real,im);
			
			for(var i = 0;i < max_it;i++) {
				// derivative				
				dz = (f_c(z.add(stepc),f).sub(f_c(z,f))).div_c(stepc);

				// newton iteration
				z0 = z.sub(f_c(z,f).div_c(dz));
				
				// test to see if a root has been found
				if((z0.sub(z)).mod() < tol) {
					// has this root been found before?
					for(var r = 0;r<roots.length;r++) {
						if((z0.sub(roots[r])).mod() < tol) {
							root_found = r;
							root = roots[r];
						}
					}
					if(root_found == -1) {
						// this is a new root
						root_found = roots.push(z0);
						root = z0;
					}
					break;
				}
				z = z0;
			}
			// store pixel data
			// first 16 bits are the root number
			// second 16 bits are the number of iterations used to find the root
			fdata[(w*(y-h_offset))+(x-w_offset)] = (i << 16) | root_found;
		}
	}
	
	// make roots printable
	for(var j = 0;j<roots.length;j++) {
		roots[j] = [roots[j].real,roots[j].im];
	}
		
	return [fdata, roots, w_offset, h_offset];
}