(function(global) {
  class SToneInc extends NIN.Node {
    constructor(id, options) {
      super(id, {
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      this.output = new THREE.VideoTexture(this.canvas);
      this.output.minFilter = THREE.LinearFilter;
      this.output.magFilter = THREE.LinearFilter;
    }

    resize() {
      this.canvas.width = 16 * GU;
      this.canvas.height = 9 * GU;
      this.ctx.globalCompositeOperation = 'xor';
    }

    update(frame) {
      this.frame = frame;
    }

    renderShape(ctx, shape) {
      ctx.fill();
    }

    render(renderer) {
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.clearRect(0, 0, 16 * GU, 9 * GU);

      this.circleEndSize = smoothstep(0, 1, (this.frame - 827) / (996 - 827));
      
      var colors = {
                    orange: "#DC6837", 
                    red: "#8F343B", 
                    white: "#F4F1E8"};
      
      // Das Background      
      const skyline = 3.5; 
      this.ctx.fillStyle = colors.white;
      this.ctx.fillRect(0,0,16*GU, skyline*GU);
      this.ctx.fillStyle = colors.orange;
      this.ctx.fillRect(0, skyline*GU, 16*GU, (9-skyline)*GU);
      
      
      // Ball shadow
      const ballRad = 1.5;
      this.ctx.fillStyle = colors.white;
      this.ctx.fillRect(4*GU, (skyline)*GU, 16*GU, 2*ballRad*GU);
      
      // Ball, the one and only the rest are shoes ofc
      this.ctx.strokeStyle = colors.red;
      this.ctx.fillStyle = colors.red;
      this.ctx.beginPath();
      this.ctx.ellipse(
        4 * GU,
        (skyline + ballRad) * GU,
        ballRad * GU,
        ballRad * GU,
        1, 0, Math.PI * 2);
      this.ctx.lineWidth = 0.5 * GU ;
      //this.ctx.stroke();
      this.ctx.fill();

      // Top Shoe
      this.ctx.fillStyle = colors.red;
      this.ctx.fillRect(0, (skyline - ballRad)*GU, (16-ballRad*0.9)*GU, ballRad*GU);
      this.ctx.strokeStyle = colors.red;
      this.ctx.beginPath();
      this.ctx.ellipse(
        (16 - ballRad*0.9) * GU,
        (skyline - ballRad) * GU,
        ballRad * GU,
        ballRad * GU,
        1, 0, Math.PI * 2);
      this.ctx.lineWidth = 0.5 * GU ;
      //this.ctx.stroke();
      this.ctx.fill();

      // Bottom Shoe
      this.ctx.fillStyle = colors.red; 
      this.ctx.fillRect = colors.red;
  
      this.ctx.fillStyle = colors.orange;
      this.ctx.fillRect(0, (skyline - ballRad)*GU, (16-ballRad*0.9)*GU, ballRad*GU);
      this.ctx.strokeStyle = colors.red;
      this.ctx.beginPath();
      this.ctx.ellipse(
        (16 - ballRad*0.9) * GU,
        (skyline - ballRad) * GU,
        ballRad * GU,
        ballRad * GU,
        1, 0, Math.PI * 2);
      this.ctx.lineWidth = 0.5 * GU ;
      //this.ctx.stroke();
      this.ctx.fill();
      this.output.needsUpdate = true;
      this.outputs.render.setValue(this.output);
    }
  }

  global.SToneInc = SToneInc;
})(this);