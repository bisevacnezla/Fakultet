var zauzeca;
var povrat;

function getZauzeca() {

    $.ajax({
        async: false,
        type: 'GET',
        url: 'http://localhost:8080/rezervacije',
        contentType: 'application/json',
        success: function (data) {
            zauzeca = data;
            
        }
        // error: function(XMLHttpRequest, textStatus, errorThrown) { 
        //     alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        // }    
    });


    return zauzeca;
}

function postZauzece(rezervacija) {

    $.ajax({
        async: false,
        type: 'POST',
        url: 'http://localhost:8080/rezervacije',
        data: JSON.stringify(rezervacija),
        contentType: 'application/json',
        success: function (data) {
            console.log('Post Response: ', JSON.stringify(data, "", 2));
            // loadDoc();
            povrat = data;
        }
    })

    return povrat;
}


function getSlike() {
    //var imagesArray = [];
    $.ajax({
        url: 'http://localhost:8080/slike',
        success: function (data) {
            console.log(data);
            images = data;
        }


    })

    return images;
    
}

function getOsobeProvjeraRezervacije() {
    $.ajax({
        async: false,
        type: 'GET',
        url: 'http://localhost:8080/osobe',
        contentType: 'application/json',
        success: function (data) {
            
           location.reload(); 

        //osobe = data;
        }
    })
        //return osobe;
}

setInterval(getOsobeProvjeraRezervacije, 30000);


function getOsbolje() {

    $.ajax({
        async: false,
        type: 'GET',
        url: 'http://localhost:8080/osoblje',
        contentType: 'application/json',
        success: function (data) {

        //console.log(data)
        $(document).ready(function(){
        
        load_json_data('osoblje');
            function load_json_data(id, parent_id) {
                var html_code = '';
                html_code += '<option value="">Odaberite '+id+'</option>';
                $.each(data, function(key, value){
                    
                html_code += '<option value="'+ value.id + '">'+ value.ime +'</option>';
                
                })
               $('#'+id).html(html_code);

            }

        });
         
       }  
    });

}

getOsbolje();

function getSale() {

    $.ajax({
        async: false,
        type: 'GET',
        url: 'http://localhost:8080/sale',
        contentType: 'application/json',
        success: function (data) {
        $(document).ready(function(){
        
        load_json_data('sala');
        function load_json_data(id, parent_id) {

            var html_code = '';

               html_code += '<option value="">Odaberite '+id+'</option>';
                $.each(data, function(key, value){
                    
                html_code += '<option value="'+ value.id + '">'+ value.naziv +'</option>';
                
                })
               $('#'+id).html(html_code);
            }

        });
         
       }  
    });

}

getSale();


