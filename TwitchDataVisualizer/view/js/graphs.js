/**
 * Script that gets all documents from the collection, to get counts for label fields, so the corresponding data
 * can be displayed graphically using Chart.js 
 * 
 */
$(document).ready(function(){
    var watchtimeMarkers = [100];       //labels in millions
    var streamtimeMarkers = [3];        //labels in thousands
    var watchtimeCounts = new Array(21).fill(0);  //initialize counters
    var streamtimeCounts = new Array(21).fill(0);
    var langCounts = new Array(21).fill(0);                           //languages obtained by using mongodb.distinct() manually
    var langMarkers = ["Arabic","Chinese","Czech","English","Finnish","French","German","Greek","Hungarian","Italian",
                        "Japanese","Korean","Other","Polish","Portuguese","Russian","Slovak","Spanish","Swedish","Thai","Turkish"]
    var matureStream = ["True", "False"];
    var matureStreamCounts = [0, 0];
    var colorLabelsLang = ['#1E8449','#FB072C','#DCE0EA','#4B7FF2','#043091','#B3002B','#401721','#007AFF','#435E1D','#A20000',
                            '#FF0000','#FF0045','#6B6B6B','#FF5274','#21D100','#D16E00','#232E5F','#741078','#FCB810','#190841','#CB0000'];
    var colorLabelsMature = ['#81B1CE','#41B4F7'];
    for(let i=1; i<21; i++){ watchtimeMarkers[i] = watchtimeMarkers[i-1] + 310; }       //update label/interval values
    for(let i=1; i<21; i++){ streamtimeMarkers[i] = streamtimeMarkers[i-1] + 25; }
    $("#btn-graphs").click(function(event){
        $.ajax({
            url: '/default_streamers',
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){      //update counts for each array so that they can be passed as data into the charts
                if(langCounts.reduce((partialSum, a) => partialSum + a, 0) < response.length-1) {
                    for(let i = 0; i < response.length; i++) {
                        for(let j = 0; j < watchtimeMarkers.length; j++){
                            if(response[i].watchtime > watchtimeMarkers[j]*(10**6)) { watchtimeCounts[j]++; }
                        }
                        for(let k = 0; k < streamtimeMarkers.length; k++){
                            if(response[i].streamtime > streamtimeMarkers[k]*(10**3)) { streamtimeCounts[k]++; }
                        }
                        for(let l = 0; l < langMarkers.length; l++){
                            if(response[i].lang === langMarkers[l]) { 
                                langCounts[l]++;
                                break;
                            }
                        }
                        for(let m = 0; m < matureStream.length; m++){
                            if(response[i].mature === matureStream[m]) { 
                                matureStreamCounts[m]++;
                                break;
                            }
                        }
                    }
                }
                
            },
            complete: function(data){
                console.log(watchtimeCounts);
                console.log(streamtimeCounts);
                console.log(langCounts);
                console.log(matureStreamCounts);
                var barContext1 = $("#bar-chart-1");                    //displays bar chart showing the counts of streamers
                var barChart1 = new Chart(barContext1, {                //having total watch times on their channel greater than
                    type: 'bar',                                        //the corresponding label(in millions)
                    data: {
                        labels: watchtimeMarkers,
                        datasets: [
                            {
                                label: "Streamers with watchtime in minutes(millions)",
                                backgroundColor: '#2980B9',
                                data: watchtimeCounts,
                                barPercentage: 1.25
                            }
                        ]
                    },
                    options: {    
                        title: {
                            display: true,
                            text: 'Watch times of streamers (millions) in minutes'
                        },
                        maintainAspectRatio: false,
                        responsive: true,
                    }
                });
                var barContext2 = $("#bar-chart-2");                    //displays bar chart showing the counts of streamers
                var barChart2 = new Chart(barContext2, {                //having time streamed on their channel greater than
                    type: 'bar',                                        //the corresponding label(in thousands)
                    data: {
                        labels: streamtimeMarkers,
                        datasets: [
                            {
                                label: "Streamers with time streamed in minutes(thousands)",
                                backgroundColor: '#1ABC9C',
                                data: streamtimeCounts,
                                barPercentage: 1.25
                            }
                        ]
                    },
                    options: {    
                        title: {
                            display: true,
                            text: 'Stream times of streamers (thousands) in minutes'
                        },
                        maintainAspectRatio: false,
                        responsive: true,
                    }
                });
                var contextPie1 = $("#pie-chart-1");                    //displays pie chart showing the proportions of streamers
                var pieChart1 = new Chart(contextPie1, {                //based on their channel's language
                    type: 'pie',
                    data: {
                        labels: langMarkers,
                        datasets: [
                            {
                                label: "Channels with language",
                                backgroundColor: colorLabelsLang,
                                data: langCounts
                            }
                        ]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Proportions of streamers by languages'
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    }
                });
                var contextPie2 = $("#pie-chart-2");                    //displays pie chart showing the proportions of streamers
                var pieChart2 = new Chart(contextPie2, {                //whose channel is marked as mature
                    type: 'pie',
                    data: {
                        labels: matureStream,
                        datasets: [
                            {
                                label: "Mature streaming channels",
                                backgroundColor: colorLabelsMature,
                                data: matureStreamCounts
                            }
                        ]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Proportions of channels marked as mature'
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    }
                });
            },
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    })
});

