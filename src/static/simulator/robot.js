class Robot {
    constructor(factor, _x = 0, _y = 0, _width = 50, _height = 75, _angle = 0) {
        this.factor = factor;
        // x and y represent the center of the robot
        this.x = _x;
        this.y = _y;
        this.angle = _angle;
        this.width = _width*2;
        this.height = _height*2;
    }
  
    show() {
        push();
        const canvasX = this.x * this.factor;
        const canvasY = this.y * this.factor;
        translate(canvasX, canvasY);
        rotate(this.angle);
    
        // Draw the rectangle (robot body)
        stroke("#ff6f61");
        fill("#ff6f61"); // Optional: Add some transparency for better visualization
        rectMode(CENTER);
        rect(0, 0, this.height, this.width);
    
        // Draw the triangle (robot "direction")
        stroke("#ff6f61");
        fill("#ff6f61");
        const h = (Math.sqrt(3) / 2) * (this.width / 3); // Height of the triangle
        const triangleXOffset = this.height / 2 + h; // Offset to place the triangle outside the rectangle
        triangle(
            triangleXOffset, 0, // Tip of the triangle (front)
            triangleXOffset - h, -this.width / 6, // Bottom-left corner
            triangleXOffset - h, this.width / 6   // Bottom-right corner
        );
        // ellipse eyes
        stroke("#ffffff");
        fill("#ffffff");
        ellipse(this.height / 4, this.width / 4, 10, 10);
        ellipse(this.height / 4, -this.width / 4, 10, 10);
    
        pop();
    }
    
  
    turn(angle){
        this.angle += angle;
        if(this.angle<0){
            this.angle += 360;
        } else if (this.angle >= 360){
            this.angle -= 360;
        }
    }

    move(dist){
        let anglecos = cos(this.angle);
        let anglesin = sin(this.angle);
        this.x += anglecos*dist;
        this.y += anglesin*dist;
    }

    side(dist){
        let anglecos = cos(this.angle);
        let anglesin = sin(this.angle);
        this.x += -anglesin*dist;
        this.y += anglecos*dist;
    }
  }