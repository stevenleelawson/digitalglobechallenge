$(document).ready(function(){
  var mymap = L.map('mapid').setView([51.505, -0.09], 13);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);
  mymap.on('click', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    console.log(lat, lng);
    var baseUrl = "http://galvanize-cors-proxy.herokuapp.com/http://mapperdev.tomnod.com/chip_api/chip/lat/" + lat +'/lng/' + lng
    console.log(baseUrl);
    apiCall(baseUrl).then(function(photo){


      if(photo){
        console.log(photo);
        $('body').append(photo);

      } else {
        console.log("Mistake, user!");

      }
      })
      });
    });
    function apiCall(baseURL) {



        return new Promise(function(resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
              var img = document.getElementById("picture");
              var r = new FileReader();
              r.onload = function(){
                img.src = r.result;
              };
              console.log(baseURL);
              console.log(this.response);
              r.readAsDataURL(this.response);
            }
          }
          xhr.open('GET', baseURL);
          xhr.responseType = 'blob';
          xhr.send();
          // $.ajax({
          //   url: baseURL,
          //   data: 'payload',
          //   method: 'GET',
          //   success: function(data) {
          //     resolve(data)
          //     console.log("it worked");
          //   },
          //   fail: function(err) {
          //     reject(data)
          //     console.log("error");
          //   }
          // });
        });
      }
