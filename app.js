$(document).ready(function(){
  $('.loader').hide();
  var mymap = L.map('mapid').setView([51.505, -0.09], 13);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);
  mymap.on('click', function(e) {
    $('.placeholder').hide();
    $('.loader').show();
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    var baseUrl = "https://galvanize-cors-proxy.herokuapp.com/http://mapperdev.tomnod.com/chip_api/chip/lat/" + lat +'/lng/' + lng

    apiCall(baseUrl).then(function(photo){


      if(photo){
        console.log(photo);
        $('body').append(photo);

      } else {
        console.log("Mistake, user!");

      }
    }).then(function(event){
      $('.loader').hide();
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

        });
      }
