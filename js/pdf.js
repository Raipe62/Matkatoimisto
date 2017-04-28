

function tulosta_pdf() {
	console.log(1111111111111);

	var o = 'VIISUMIHAKEMUS'
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var pv = dd.toString();
	var kk = mm.toString();
	var vv = yyyy.toString();
	var paiva = [pv,kk,vv]
	console.log(pv, kk ,vv);
	
	
    var a = 'Sukunimi:\n' + document.getElementById("suku").value
	var b = 'Etunimi:\n' + document.getElementById("etu").value
	var c = 'Henkilötunnus:\n' + document.getElementById("tunnus").value
	var d = 'Kansalaisuus:\n' + document.getElementById("kansa").value
	var e = 'Sähköposti:\n' + document.getElementById("meili").value
	var f = 'Viesti:\n' + document.getElementById("syy").value
								
 
	var doc = new jsPDF({})
 
			
	
	 doc.rect(8, 8, 180, 50, 1,1,'S')
	 doc.rect(8, 64, 120, 20, 1,1,'S')
	 doc.rect(8, 84, 120, 20, 1,1,'S')
	 doc.rect(8, 104, 120, 20, 1,1,'S')
	 doc.rect(8, 124, 120, 20, 1,1,'S')
	 doc.rect(8, 144, 120, 20, 1,1,'S')
	 doc.rect(8, 164, 120, 80, 1,1,'S')
	 
	 
	 doc.text(pv+'.' + kk+'.' + vv, 10, 55)
	 doc.text(a, 10, 70)
	 doc.text(b, 10, 90)
	 doc.text(c, 10, 110)
	 doc.text(d, 10, 130)
	 doc.text(e, 10, 150)
	 doc.text(f, 10, 170)
	 
	 doc.setFontStyle('bold')
	 doc.setFontSize(36)
	 doc.text(o, 40, 40)

	doc.save('Viisumi.pdf')
}





		 // * @example .lines([[2,2],[-2,2],[1,1,2,2,3,3],[2,1]], 212,110, 10) // line, line, bezier curve, line
		 // * @param {Array} lines Array of *vector* shifts as pairs (lines) or sextets (cubic bezier curves).
		 // * @param {Number} x Coordinate (in units declared at inception of PDF document) against left edge of the page
		 // * @param {Number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page
		 // * @param {Number} scale (Defaults to [1.0,1.0]) x,y Scaling factor for all vectors. Elements can be any floating number Sub-one makes drawing smaller. Over-one grows the drawing. Negative flips the direction.
		 // * @param {String} style A string specifying the painting style or null.  Valid styles include: 'S' [default] - stroke, 'F' - fill,  and 'DF' (or 'FD') -  fill then stroke. A null value postpones setting the style so that a shape may be composed using multiple method calls. The last drawing method call used to define the shape should not have a null style argument.
		 // * @param {Boolean} closed If true, the path is closed with a straight line from the end of the last curve to the starting point.
		 // * @function
		 // * @returns {jsPDF}
		 // * @methodOf jsPDF#
		 // * @name lines
		 // */
		// API.lines = function(lines, x, y, scale, style, closed) {
			// var scalex,scaley,i,l,leg,x2,y2,x3,y3,x4,y4;

			// Pre-August-2012 the order of arguments was function(x, y, lines, scale, style)
			// in effort to make all calls have similar signature like
			//   function(content, coordinateX, coordinateY , miscellaneous)
			// this method had its args flipped.
			// code below allows backward compatibility with old arg order.
			// if (typeof lines === 'number') {
				// tmp = y;
				// y = x;
				// x = lines;
				// lines = tmp;
			// }