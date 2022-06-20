 $(document).ready(function(){
    /**
     * Binds a click event to the LIST tab.
     */
    $("#btn-list-all").click(function(event){
        event.preventDefault();
        $("#list-streamers").empty();
        let tbl = '<table id="table-list"><tr><th>Name</th><th>Hours Watched</th><th>Hours Streamed</th><th>Max Viewers</th>'+
                                            '<th>Daily Views</th><th>Follower Count</th><th>View Count</th><th>Live</th><th>Currently Playing</th>'+
                                            '<th>Partnered</th><th>Mature</th><th>Language</th></tr></table>';
        $("#list-streamers").append(tbl);
        $.ajax({
            url: '/streamers',
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                for(let i = 0; i < response.length; i++) {
                    let obj = response[i];
                    let tbl_line='';
                    if (i%2 ==0){
                        tbl_line = '<tr class="even-row"><td>'  +obj.name+'</td><td>'+obj.watchtime+'</td><td>'+obj.streamtime+'</td><td>'
                                                                +obj.maxviewers+'</td><td>'+obj.avgviewers+'</td><td>'+obj.followers+'</td><td>'
                                                                +obj.viewcount+'</td><td>'+obj.islive+'</td><td>'+obj.currplaying+'</td>'
                                                                +'<td>'+obj.partnered+'</td><td>'+obj.mature+'</td><td>'+obj.lang+'</td><tr/>';
                    }else{
                        tbl_line = '<tr class="odd-row"><td>'   +obj.name+'</td><td>'+obj.watchtime+'</td><td>'+obj.streamtime+'</td><td>'
                                                                +obj.maxviewers+'</td><td>'+obj.avgviewers+'</td><td>'+obj.followers+'</td><td>'
                                                                +obj.viewcount+'</td><td>'+obj.islive+'</td><td>'+obj.currplaying+'</td>'
                                                                +'<td>'+obj.partnered+'</td><td>'+obj.mature+'</td><td>'+obj.lang+'</td><tr/>';
                    }                    
                    $("#table-list").append(tbl_line)
                }
            },
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
    
});  