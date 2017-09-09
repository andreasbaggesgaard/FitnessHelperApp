<template id="upload-image">
    <div>
        <div class="col-xs-12 col-sm-4">
            <div class="form-group">
                  <label id="label-picture">Picture</label>
                  <input type="file" v-on:change="onFileChange" id="input">
                </div>
                <br />
                  <img v-bind:src="newItem.image" id="image" width="200" />
                  <div class="loader" id="loader"></div>
              <div v-on:click="removeImage" class="btn btn-default image-button" id="remove-src">Remove image</div>
        </div>
    </div>

</template>
<script>
import * as config from '@/config.js'

export default {
  name: 'upload-image',
  firebase: {
         items: config.itemsRef,
     },
  data() {
    return {
        newItem: {
            image: ''
        }
    } 
  },
  methods: {
       onFileChange(e) {           
          var img = document.getElementById("image");
          var loader = document.getElementById("loader");
          var input = document.getElementById("input");
          var removeSrc = document.getElementById("remove-src");
          var button = document.getElementById("create-item");
          var label = document.getElementById("label-picture");

          loader.style.display = "inline-block";
          input.style.display = "none";
          label.style.display = "none";
          
          var file = e.target.files[0];  
          var metadata = {'contentType': file.type}
          var uploadTask = config.storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
            //console.log('Uploaded', snapshot.totalBytes, 'bytes.');
            //console.log(snapshot.metadata);
            var url = snapshot.downloadURL;
            console.log('url: ' + url)
            img.src = url;

            loader.style.display = "none";
            input.style.display = "inline-block";
            removeSrc.style.display = "inline-block";
            label.style.display = "inline-block";
            img.style.display = "inline-block";
            button.disabled = false;
     
            }).catch(function(error) {
                console.error('Upload failed:', error);
         }); 
      },
      removeImage: function () { 
             var img = document.getElementById("image");
             var removeSrc = document.getElementById("remove-src");    
             var input = document.getElementById("input"); 
             removeSrc.style.display = "none";
             img.style.display = "none";
             input.value = ''; // doesn't work in IE
      }
   }
}
</script>
<style>
     .image-button {
        margin-left: 5%;
    }
    #remove-src {
        display: none;
    }
    #loader {
        display: none;
        margin-right: 35%;
    }
    .loader {
        border: 5px solid #f3f3f3; /* Light grey */
        border-top: 5px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1.5s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>