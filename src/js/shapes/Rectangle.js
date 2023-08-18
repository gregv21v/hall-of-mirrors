/**
 * Rectangle - a rectangle whose position starts at the top left corner
 */

import { rotatePoints } from "./Point";
import { overlap, project } from "../util";
import Shape from "./Shape";

export default class Rectangle extends Shape {
	/**
	 * constructor()
	 * @description constructs the Rect
	 * @param {Point} position the position of the Rect, top left corner
	 * @param {Number} width the width of the rect
	 * @param {Number} height the height of the rect
	 */
	constructor(position={x: 0, y: 0}, width=0, height=0) {
        super(position);
		this._width = width;
		this._height = height;
	}


    draw(context) {
        super.draw(context);
        context.fillRect(this._position.x, this._position.y, this._width, this._height);
        context.strokeRect(this._position.x, this._position.y, this._width, this._height);
    }


	/**
	 * clone()
	 * @description clones the Rect 
	 * @returns {Rect} a clone of the Rect
	 */
	clone() {
		let clone = new Rectangle(
			this._layer, this._position, this._width, this._height
		)

		clone._fill = {...this._fill};
		clone._stroke = {...this._stroke};

		return clone;
	}

	/**
	 * getAxes()
	 * @description gets the axes for the rectangle
	 * @returns the axes for the rectangle
	 */
	getAxes() { 
		let vertices = this.toPoints();
		let axes = [];
		// loop over the vertices
		for (let i = 0; i < vertices.length; i++) {
			// get the current vertex
			let p1 = vertices[i];
			// get the next vertex
			let p2 = vertices[i + 1 == vertices.length ? 0 : i + 1];
			// subtract the two to get the edge vector
			let edge = {
				x: p1.x - p2.x,
				y: p1.y - p2.y
			}
			
			// get either perpendicular vector
			let normal = {
				x: -edge.y,
				y: edge.x
			}
			// the perp method is just (x, y) =&gt; (-y, x) or (y, -x)
			axes.push(normal)
		}	
		return axes;
	}

	intersect(rect) {
		// use the SAT 
	  let axes1 = this.getAxes();
	  let axes2 = rect.getAxes();
	  
	  // loop over the axes1
	  for (let i = 0; i < axes1.length; i++) {
		let axis = axes1[i];
		// project both shapes onto the axis
		let p1 = project(this, axis);
		let p2 = project(rect, axis);
		// do the projections overlap?
		if (!overlap(p1, p2)) {
		  // then we can guarantee that the shapes do not overlap
		  return false;
		}
	  }
	  // loop over the axes2
	  for (let i = 0; i < axes2.length; i++) {
		let axis = axes2[i];
		// project both shapes onto the axis
		let p1 = project(this, axis);
		let p2 = project(rect, axis);
		// do the projections overlap?
		if (!overlap(p1, p2)) {
		  // then we can guarantee that the shapes do not overlap
		  return false;
		}
	  }
	  // if we get here then we know that every axis had overlap on it
	  // so we can guarantee an intersection
	  return true;
	}

	/**
	 * contains()
	 * @description checks whether the specifed point is contained within the rect
	 * @param {Point} point the point to check for 
	 * @returns true if the point is contained within the rect 
	 * 			false otherwise
	 */
	contains (point) {
		return (
				(this._position.x <= point.x
		 && this._position.x + this._width >= point.x)
		 && (this._position.y <= point.y
		 && this._position.y + this._height >= point.y)
	 );
	}

	/**
	 * withinYRange()
	 * @description checks whether this rectangle is within the y range 
	 *  of another rectangle
	 * @param {Rect} rect the other rectangle
	 */
	withinYRange(rect) {
		return (
			(
				this.position.y < rect.position.y && 
				this.position.y + this.height > rect.position.y
			) || (
				this.position.y < rect.position.y + rect.height &&
				this.position.y + this.height > rect.position.y + rect.height
			)
		)
	}

	
	/**
	 * fromPoints()
	 * @description creates a rectangle from two points
	 * @param {Point} point1 the first point of the rectangle
	 * @param {Point} point2 the second point of the rectangle
	 */
	fromTwoPoints(point1, point2) {
		if(point1.x < point2.x) {
			this._position.x = point1.x;
		} else {
			this._position.x = point2.x;
		}

		if(point1.y > point2.y) {
			this._position.y = point1.y;
		} else {
			this._position.y = point2.y;
		}

		this._width = Math.abs(point1.x - point2.x);
		this._height = Math.abs(point1.y - point2.y);
	};


	/**
	 * fromFourPoints()
	 * @description creates a rectangle from 4 points
	 * @param {Array[Points]} points the array of 4 points
	 */
	fromFourPoints(points) {
		var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
		for (var i = 0; i < points.length; i++) {
		  var point = points[i];
		  minX = Math.min(minX, point.x);
		  minY = Math.min(minY, point.y);
		  maxX = Math.max(maxX, point.x);
		  maxY = Math.max(maxY, point.y);
		}
		this._width = maxX - minX;
		this._height = maxY - minY;
		this._position.x = minX;
		this._position.y = minY;
	}

	/**
	 * toPoints()
	 * @description converts this rectangle to points
	 * @returns the points that make up this rectangle
	 */
	toPoints() {
		return [
			{...this.position},
			{x: this.position.x + this.width, y: this.position.y},
			{x: this.position.x + this.width, y: this.position.y + this.height},
			{x: this.position.x, y: this.position.y + this.height}
		]
	}


	




	/**
	 * create()
	 * @description creates the rect
	 */
	create() {
		
	}



	/**
	 * update()
	 * @description updates the attributes of the svg shape
	 */
	update() {
		
	}

	/**
	 * destroy()
	 * @description destroys the svg
	 */
	destroy() {
		this._group.remove()
	}


	/**
     * moveBy() 
     * @description moves the rectangle by a delta x, and y
     * @param {Number} deltaX the difference in x to move the rectangle
     * @param {Number} deltaY the difference in y to move the rectangle
     */
    moveBy(deltaX, deltaY) {
        this._position.x += deltaX;
        this._position.y += deltaY;
    }


	/**
	 * moveTo()
	 * @description moves to a specific position
	 * @param {Number} x the x value of the position
	 * @param {Number} y the y value of the position
	 */
	moveTo(x, y) {
		let points = this.toPoints(x, y);
		let center = this.center
		for (const point of points) {
			let delta = {
				x: x - center.x,
				y: y - center.y
			}

			point.x += delta.x
			point.y += delta.y
		}
		this.fromFourPoints(points);
	}


	/**
	 * rotateAroundCenter()
	 * @description rotates this rectangle around its center
	 */
	rotateAroundCenter(angle) {
		var cx = this.position.x + this.width / 2; // center x coordinate
		var cy = this.position.y + this.height / 2; // center y coordinate
		var points = this.toPoints()
		var rotatedPoints = rotatePoints(points, {x: cx, y: cy}, angle);
		this.fromFourPoints(rotatedPoints);
	}


	/**
	 * rotateAroundPoint() 
	 * @description rotates the rectangle around a point
	 * @param {Point} point the point to rotate the rectangle around
	 * @param {Degrees} angle the angle to rotate the rectangle by in degrees
	 */
	rotateAroundPoint(center, angle) {
		var points = this.toPoints()
		this.fromFourPoints(rotatePoints(points, center, angle));
	}

	/**
	 * getAreaOfIntersection()
	 * @description get the area of intersection of two rectangles
	 * @param {Rect} the rect to get the area of intersection with
	 * @returns the area of intersection
	 */
	getAreaOfIntersection(otherRect) {  
		return Math.max(
				0, 
			Math.min(this.position.x + this.width, otherRect.position.x + otherRect.width)
			- Math.max(this.position.x, otherRect.position.x)
		 ) * Math.max(
			  0, 
			Math.min(this.position.y + this.height, otherRect.position.y + otherRect.height) 
			- Math.max(this.position.y, otherRect.position.y)
		 )
	}


	/**
	 * scale()
	 * @description scales the rectangle by the given amount
	 * @param {Number} amount the amount to scale the rectangle by
	 */
	scale(amount) {
		let newPoints = this.toPoints().map(point => {
			return {
				x: amount * (point.x - this.center.x) + this.center.x,
				y: amount * (point.y - this.center.y) + this.center.y,
			}
		})

		this.fromFourPoints(newPoints);
	}


	/**
	 * scaleHeight()
	 * @description scales the height by the given amount
	 * @param {Number} amount the amount to scale the height by
	 */
	scaleHeight(amount) {
		this._height *= amount;
	}

	/**
	 * scaleWidth()
	 * @description scales the width by the given amount
	 * @param {Number} amount the amount to scale the width by
	 */
	scaleWidth(amount) {
		this._width *= amount;
	}



	

	/**
	 * get center()
	 * @returns the center point of the rectangle
	 */
	get center() {
		return {
			x: this._position.x + this._width / 2,
			y: this._position.y + this._height / 2
		}
	}
	

	

	/**
	 * get width()
	 * @returns the width of the rect
	 */
	get width() {
		return this._width;
	}

	/**
	 * set width()
	 * @description set the width
	 * @param {Number} value the value to set width to
	 */
	set width(value) {
		this._width = value;
	}

	/**
	 * get height()
	 * @returns the height of the rect
	 */
	get height() {
		return this._height;
	}

	/**
	 * set height()
	 * @description set the width
	 * @param {Number} value the value to set width to
	 */
	set height(value) {
		this._height = value;
	}

	
}
