(function(global) {
  class depthDrawingBackgroundNode extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput(),
          depth: new NIN.TextureOutput(),
        }
      });

      var light = new THREE.PointLight(0xffffff, 1, 500);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera2 = new THREE.PerspectiveCamera( 70, 16 / 9, 50, 400 );

      this.targetDepthTexture = new THREE.DepthTexture();
      this.renderTarget.depthTexture = this.targetDepthTexture;
      this.renderTarget.depthTexture.type = THREE.UnsignedShortType;

      this.lampModel = new THREE.Object3D();
      var loadObject = function (objPath, material, three_object) {
        var objLoader = new THREE.OBJLoader();
        Loader.loadAjax(objPath, function(text) {
          var object = objLoader.parse(text);
          object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
              child.material = material;
              child.material.side = THREE.DoubleSide;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          three_object.add(object);
        });
      };

      var bestMaterial = new THREE.MeshPhongMaterial({color: 0x4A6B43});

      loadObject('res/landscape.obj', bestMaterial, this.lampModel );
      this.scene.add( this.lampModel );
      this.lampModel.scale.x = 300;
      this.lampModel.scale.y = 600;
      this.lampModel.scale.z = 300;
    }

    update(frame) {
      super.update(frame);

      if (frame < 197) {
        this.camera2.position.x = 150 * Math.sin(frame / 300);
        this.camera2.position.z = 150 * Math.cos(frame / 300);
        this.camera2.position.y = 100;
        this.camera2.lookAt(new THREE.Vector3(0, -40, 0));
      } else if (frame < 411) {
        this.camera2.position.x = 150 * Math.sin(100 - frame / 100);
        this.camera2.position.z = 150 * Math.cos(100 - frame / 100);
        this.camera2.position.y = 100;
        this.camera2.lookAt(new THREE.Vector3(0, -40, 0));
      } else if (frame < 502) {
        this.camera2.position.x = 150 * Math.sin(100 + frame / 100);
        this.camera2.position.z = 150 * Math.cos(100 + frame / 100);
        this.camera2.position.y = 100;
        this.camera2.lookAt(new THREE.Vector3(0, -40, 0));
      } else {
        this.camera2.position.x = 150 * Math.sin(100 - frame / 300);
        this.camera2.position.z = 150 * Math.cos(100 - frame / 300);
        this.camera2.position.y = 200;
        this.camera2.lookAt(new THREE.Vector3(0, -40, 0));
      }
    }

    render(renderer) {
      renderer.render(this.scene, this.camera2, this.renderTarget, true);
      this.outputs.render.setValue(this.renderTarget.texture);
      this.outputs.depth.setValue(this.renderTarget.depthTexture);
    }
  }

  global.depthDrawingBackgroundNode = depthDrawingBackgroundNode;
})(this);
