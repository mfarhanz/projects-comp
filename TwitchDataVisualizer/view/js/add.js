$(document).ready(function(){
    /**
     * Gets all the values in the inputs and creates a valid object to be sent to the server-side.
     * @returns {Object} An object holding user entered streamer data
     */
    function assembleData(){
        let s = {};
        s.name = $("#add-name").val();
        s.watchtime = $("#add-watch-time").val();
        s.streamtime = $("#add-stream-time").val();
        s.maxviewers = $("#add-max-viewers").val();
        return s;
    }
    /**
     * Binds an event to the add button.
     * Assembles a valid object from the form and sends it to the server-side
     * on clicking the Add button.
     */
    $("#add-streamer-btn").click(function(event){
        event.preventDefault();
        let streamer = assembleData();
        $.ajax({
            url: '/streamers',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(streamer),
            success: function(response){
                console.log(JSON.stringify(response));
                $("#add-out").text(response);
            },        
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
});