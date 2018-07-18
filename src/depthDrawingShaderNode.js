(function(global) {
  class depthDrawingShaderNode extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
         texture: new NIN.TextureInput(),
         depth: new NIN.TextureInput(),
      }
      super(id, options);
    }

    update(frame) {
      this.uniforms.tDiffuse.value = this.inputs.texture.getValue();
      this.uniforms.tDepth.value = this.inputs.depth.getValue();
      this.uniforms.frame.value = frame;
    }
  }

  global.depthDrawingShaderNode = depthDrawingShaderNode;
})(this);
