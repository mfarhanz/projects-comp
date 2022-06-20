$(document).ready(function(){
    /**
     * Fills the form with values everytime a valid user is to looked for, otherwise it will clean it. 
     * @param {*} data An object holding a document retrieved from the collection
     */
    function fillFindContainer(data){
        if (data){
            $("#find-name").val(data.name);
            $("#find-watch-time").val(data.watchtime);
            $("#find-stream-time").val(data.streamtime);
            $("#find-max-viewers").val(data.maxviewers);
            $("#find-avg-viewers").val(data.avgviewers);
            $("#find-followers").val(data.followers);
            $("#find-view-count").val(data.viewcount);
            $("#find-is-live").val(data.islive);
            $("#find-playing").val(data.currplaying);  
            $("#find-partnered").val(data.partnered);                                
            $("#find-mature").val(data.mature);                                
            $("#find-lang").val(data.lang);                                                              
        }else{
            $("#find-name").val("");
            $("#find-watch-time").val("");
            $("#find-stream-time").val("");
            $("#find-max-viewers").val("");
            $("#find-avg-viewers").val("");
            $("#find-followers").val("");
            $("#find-view-count").val("");
            $("#find-is-live").val("");
            $("#find-playing").val("");  
            $("#find-partnered").val("");                                
            $("#find-mature").val("");                                
            $("#find-lang").val("");             
        }      
    }
    /**
     * Assembles the streamer object.
     * @returns {Object} An object holding streamer data retrieved from the collection
     */
    function assembleData(){
        let s = {};
        s.name = $("#find-name").val();
        s.watchtime = $("#find-watch-time").val();
        s.streamtime = $("#find-stream-time").val();
        s.maxviewers = $("#find-max-viewers").val();
        return s;
    }
    /**
     * Binds an event to the find button.
     */
    $("#btn-find-streamer").click(function(event){
        event.preventDefault();
        let streamer_name = $("#find-name-search").val();
        $.ajax({
            url: '/streamers/'+streamer_name,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                fillFindContainer(response);              
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
    /**
     * Binds an event to the update button.
     */
    $("#btn-update-streamer").click(function(event){
        event.preventDefault();
        let streamer_name = $("#find-name-search").val();
        let streamer = assembleData();
        $.ajax({
            url: '/streamers/'+streamer_name,
            type: 'PUT',
            data: JSON.stringify(streamer),
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                $("#update-delete-out").text(response);                
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
    /**
     * Binds an event to the delete button
     */
    $("#btn-delete-streamer").click(function(event){
        event.preventDefault();
        let streamer_name = $("#find-name-search").val();
        $.ajax({
            url: '/streamers/'+streamer_name,
            type: 'DELETE',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                $("#update-delete-out").text(response);
                fillFindContainer(null);              
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
});