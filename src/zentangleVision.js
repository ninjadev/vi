(function(global) {
  class zentangleVision extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.cube = new THREE.Mesh(new THREE.BoxGeometry(50, 5, 5),
                                 new THREE.MeshBasicMaterial({ color: 0x444444 }));
      this.scene.add(this.cube);

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera.position.z = 100;

      this.bg = new THREE.Mesh(new THREE.BoxGeometry(221, 124, 0.0001),
                                 new THREE.MeshBasicMaterial({ color: 0x666666 })); // A background of max size ish. Useful to know how large that would be :)
      this.bg.position.z = -49; // just within the cameras view
      this.scene.add(this.bg);

      this.leftw = new THREE.Object3D();
      this.rightw = new THREE.Object3D();
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

      var flat_material_1 = new THREE.MeshBasicMaterial({color: 0x999999});
      var flat_material_2 = new THREE.MeshBasicMaterial({color: 0xEEEEEE});
      var flat_material_3 = new THREE.MeshBasicMaterial({color: 0x555555});
      var flat_material_4 = new THREE.MeshBasicMaterial({color: 0x333333});

      loadObject('res/leftw.obj', flat_material_1, this.leftw );
      loadObject('res/rightw.obj', flat_material_2, this.rightw );

      this.leftw_o = new THREE.Object3D();
      this.rightw_o = new THREE.Object3D();

      this.leftw_o.add(this.leftw);
      this.rightw_o.add(this.rightw);

      this.scene.add(this.leftw_o);
      this.scene.add(this.rightw_o);

      this.leftw_o.rotation.x = -Math.PI / 2;
      this.rightw_o.rotation.x = -Math.PI / 2;

      /*for (var i = 0; i < 10; i++)
      {
        for (var j = 0; j < 10; j++)
        {
          var cube = new THREE.Mesh(new THREE.BoxGeometry(4 + 4 * Math.random(), 4 + 4 * Math.random(), 4 + 4 * Math.random()),
                                     new THREE.MeshBasicMaterial({ color: 0x6F256F }));
          cube.material.color.r = Math.random() * 0.5 + 0.45;
          cube.material.color.g = Math.random() * 0.5 + 0.45;
          cube.material.color.b = Math.random() * 0.5 + 0.45;
          cube.position.x = - 50 + i * 10;
          cube.position.z = - 80 + j * 20;
          cube.position.y = Math.random() * 3 - j * 3 ;
          this.scene.add(cube);
        }
      }*/
    }

    update(frame) {
      super.update(frame);

      if (frame < 732) {
        this.cube.position.x = 10000;        
      } else {
        this.cube.position.x = 10000;
        this.cube.rotation.x = Math.sin(frame / 10);
        this.cube.rotation.y = Math.cos(frame / 10);

        var scale1 = 7;
        this.leftw_o.scale.x = scale1;
        this.leftw_o.scale.y = scale1;
        this.leftw_o.scale.z = scale1;

        var scale2 = 7;
        this.rightw_o.scale.x = scale2;
        this.rightw_o.scale.y = scale2;
        this.rightw_o.scale.z = scale2;

      }

    }
  }

  global.zentangleVision = zentangleVision;
})(this);
