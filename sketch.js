let gs;
let img;

function preload() {
  img = loadImage("img.jpg");
}

function setup() {
  img.resize(1280, 720);
  createCanvas(img.width, img.height);
  gs = new GridScrambler();
}

function draw() {
  image(img, 0, 0, img.width, img.height);
  gs.update();
  gs.show();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      gs.addRow();
      break;
    case DOWN_ARROW:
      gs.removeRow();
      break;
    case RIGHT_ARROW:
      gs.addCol();
      break;
    case LEFT_ARROW:
      gs.removeCol();
      break;
    case ENTER:
      save(img, "out", "png");
      break;
  }
}

function mousePressed() {
  gs.scramble(); 
}

class GridScrambler {
   constructor() {
     this.height = height / 3;
     this.width = width / 3;
     this.numRows = 3;
     this.numCols = 3;
     this.x = width / 2;
     this.y = height / 2;
   }
  
  update() {
    this.x = mouseX;
    this.y = mouseY;
    
    if (keyIsPressed) {
      switch(key) {
        case "d":
          this.width = min(this.width + 1, width);
          break;
        case "a":
          this.width = max(this.width - 1, 0);
          break;
        case "w":
          this.height = min(this.height + 1, height);
          break;
        case "s":
          this.height = max(this.height - 1, 0);
          break;
      }
    }
  }
  
  addRow() {
    this.numRows++;
  }
  
  removeRow() {
    this.numRows--;
  }
  
  addCol() {
    this.numCols++;
  }
  
  removeCol() {
    this.numCols--;
  }
  
  scramble() {
    const top =  (this.y - this.height / 2);
    const left = (this.x - this.width / 2);
    const deltaX = this.width / this.numCols;
    const deltaY = this.height / this.numRows;
    let corners = [];
    let shuffled;
    
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        corners.push([left + j * deltaX, top + i * deltaY]);
      }
    }
    shuffled = shuffle(corners);
    for (let i = 0; i < shuffled.length; i++) {
      let temp = createImage(deltaX, deltaY);
      temp.copy(img, corners[i][0], corners[i][1], deltaX, deltaY, 0, 0, deltaX, deltaY);
      img.copy(shuffled[i][0], shuffled[i][1], deltaX, deltaY, corners[i][0], corners[i][1], deltaX, deltaY);
      img.copy(temp, 0, 0, deltaX, deltaY, shuffled[i][0], shuffled[i][1], deltaX, deltaY);
    }
  }
  
  show() {
    push();
    rectMode(CENTER);
    stroke(255);
    noFill();
    rect(this.x, this.y, this.width, this.height);
    const top =  (this.y - this.height / 2);
    const left = (this.x - this.width / 2);
    for (let i = 0; i < this.numRows; i++) {
      line(left, top + i * (this.height / this.numRows), left + this.width, top + i * (this.height / this.numRows));
    }
    for (let i = 0; i < this.numCols; i++) {
      line(left + i * (this.width / this.numCols), top, left + i * (this.width / this.numCols), top + this.height);
    }
    pop();
  }
}
