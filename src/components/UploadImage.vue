<template id="upload-image">
    <div>
         <v-flex xs6 md2>     
              <label style="float:left" class="subheading image-title">Picture</label><br /><br />
              <input type="file" v-on:change="onUploadImage" id="input">           
            <div class="image-holder">
               <v-layout row wrap >
                    <v-flex xs12 sm6>
                        <img v-bind:src="newUser.picture" id="image" width="100%" height="auto" />
                        <div class="spinner" v-if="loadingImage"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-btn flat v-on:click="removeImage()" id="remove-image">Clear image</v-btn>
                    </v-flex>
                 </v-layout>
              </div>
        </v-flex>
    </div>
</template>
<script>
import firebase from "firebase"

export default {
  name: 'upload-image',
  data() {
    return {
        image: '',
        loadingImage: false,
        newUser: {
            picture: '',
        }
    } 
  },
  methods: {
       onUploadImage (e) {
          this.loadingImage = true;
          let self = this;
          let img = jQuery("#image");
          let title = jQuery(".image-title");
          let input = jQuery("#input");
          let remove = jQuery("#remove-image");
          input.css("display", "none");
          title.css("display", "none");
          let file = e.target.files[0];  
          let metadata = {'contentType': file.type}
          let uploadTask = firebase.storage().ref().child('images/' + file.name)
          .put(file, metadata).then(function(snapshot) {
              console.log(snapshot);
              self.loadingImage = false;
              self.image = snapshot.metadata.name;
              self.newUser.picture = snapshot.downloadURL;
              img.css( "display", "inline-block");
              remove.css("display", "inline-block");
            }).catch(function(error) {
                console.error('Upload failed:', error);
         }); 
      },
      removeImage () {
          let self = this;
          let img = jQuery("#image");
          let input = jQuery("#input");
          let remove = jQuery("#remove-image");
          let title = jQuery(".image-title");
          firebase.storage().ref().child('images/' + this.image).delete().then(function() {
              self.newUser.picture = "";
              img.attr("src", "");
              img.css("display", "none");
              input.css("display", "inline-block");
              input.val("");
              title.css("display", "inline-block");
              remove.css("display", "none");
          }).catch(function(error) {
              console.log(error);
          });
      }
   }
}
</script>
<style>
.image-holder {
  width: 100%;
  height: 100%;
  min-width: 300px;
  margin-bottom: 50%;
}
#remove-image {
  display: none;
  margin-left: 15%;
  margin-top: 50%;
}
#image {
  display: none;
  height: 100%;
  width: 100%;
}
</style>