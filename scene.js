class Scene {

     static prepShoot = []
     constructor (scene_name, location_id, setting_id){
          this.name = scene_name;
          this.location_id = location_id;
          this.setting_id = setting_id;
          Scene.prepShoot.push(this)
     }

}


