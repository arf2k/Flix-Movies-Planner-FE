class Scene {

     static prepShoot = []
     initialize({scene_name, location_id, setting_id}){
          this.name = scene_name;
          this.location_id = location_id;
          this.setting_id = setting_id;
     }

}


function addsceneToShoot(jsonScene){
     Scene.prepShoot.push(new Scene(jsonScene));
     return Scene.prepShoot;
}