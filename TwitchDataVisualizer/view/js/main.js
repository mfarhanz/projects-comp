/**
 * This script will add the main behavior of the tabs whereby, every time a tab is clicked, we identify the one 
 * that was clicked, call show to this one, and hide to the others.
 */
 $(document).ready(function(){
    function changeTabComponents(tab_element_clicked){
        $(".tabcontent").each(function(index){
            let this_id = $(this).attr('id');
            if (this_id.includes(tab_element_clicked.toLowerCase())){
                $("#graph-container").hide()
                $(this).show();
            }else if(tab_element_clicked === "Summary"){
                $(this).hide();
                if ($("#graph-container").css('display') === 'none') {
                    $("#graph-container").css('display','inherit');
                }
            }else{
                $(this).hide();
            }
        });
    }
    $(".tablinks").click(function(){
        changeTabComponents($(this).text());
    });
});
