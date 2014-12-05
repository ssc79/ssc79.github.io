// ----------------------------------
// Jquery Function to load external html, i.e., html of maps
// ----------------------------------

$(function(){
  $("#mapSwitzerland").load("switzerland.html"); 
});
      

// ----------------------------------
// Maps API related Functions
// ----------------------------------

function getLocation()
  {
  if (navigator.geolocation)
	{
	navigator.geolocation.getCurrentPosition(showPosition,showError);
	}
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }

function showPosition(position)
  {
  lat=position.coords.latitude;
  lon=position.coords.longitude;
  latlon=new google.maps.LatLng(lat, lon);
  mapholder=document.getElementById('mapholder');
  address=document.getElementById('address');

  var myOptions={
  center:latlon,zoom:13,
  mapTypeId:google.maps.MapTypeId.ROADMAP,
  mapTypeControl:false,
   disableDefaultUI: true,
	  //navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
  };
  var map=new google.maps.Map(mapholder,myOptions);
  var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
	 geocoder = new google.maps.Geocoder();
	 geocoder.geocode({'latLng': latlon}, function(results, status) {
     if (status == google.maps.GeocoderStatus.OK) {
      	if (results[1]) {
     	//address.innerHTML=results[0].formatted_address;
      zip=address.innerHTML=results[0].address_components[6].long_name;
            //content.innerHTML=JSON.stringify(results[0].address_components[6].long_name, null, '\t');;//.address_components[7].types;


   			//var zip = '4103';
//	 		zip = results[0].address_components[8].long_name;
//	 		//$('div#content').text(zip);
//		  	if($.trim(zip) != ''){
//			  	$.post( "ajax/return.php", { zip: zip}, function(data) {
//		 	//$.post('ajax/return.php', 'zip: zip', function(data) {
//			 		$('div#content').text(data)});
//	  			} else {
//        			alert('No results found');
//	  			}
//    		} else {
//      			alert('Geocoder failed due to: ' + status);
	}
	 }});
  }

function showError(error)
  {
  toggle_visibility('error');
  switch(error.code)
	{
	case error.PERMISSION_DENIED:
	  x.innerHTML="User denied the request for Geolocation."
	  break;
	case error.POSITION_UNAVAILABLE:
	  x.innerHTML="Location information is unavailable."
	  break;
	case error.TIMEOUT:
	  x.innerHTML="The request to get user location timed out."
	  break;
	case error.UNKNOWN_ERROR:
	  x.innerHTML="An unknown error occurred."
	  break;
	}
  }


// ----------------------------------
// Graph Functions
// ----------------------------------

function pie_chart(index, json, fields, title, outputid) {
    content=document.getElementById('content');
    data = [];
    for (var i=0 ; i < fields.length ; i++)
                        {
                            data = data.concat([[fields[i],Number(json[fields[i]][index])]]);
                        }

    content.innerHTML = "hallo";
    content.innerHTML = data;
    
    $(content).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 1,//null,
            plotShadow: false
        },
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: title,
            data: data
        }]
    });
}
