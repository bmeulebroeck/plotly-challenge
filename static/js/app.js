//working - retrieves only the id names to populate the dropdown list
function dropDownOptions() {
    var dropdownElement = d3.select("#selDataset");

    d3.json("./samples_v2.json").then((data) => {
        var IDnums = data.names;
        console.log(IDnums);
        
        IDnums.forEach(function(name) {
            dropdownElement.append("option").text(name).property("value");
        });
    });
}

//Got the demo data. Switched from trying to do a table display to a 'p' tag
function getDemoData(IDsel) {
    d3.json("./samples_v2.json").then(function(data) {
        var metaData = data.metadata;
        console.log(metaData);
        var selMetadata = metaData.filter(selection => selection.id.toString() === IDsel)[0];

        var demoTable = d3.select("#sample-metadata");

        demoTable.html("");
        
        Object.entries(selMetadata).forEach(function(data) {
            demoTable.append("p").text(data[0] + ": " + data[1]);
        });
    })
}

function buildPlots(IDsel) {
    d3.json("./samples_v2.json").then(function(data) {
        // Get the data for the selected ID to use on the plots
        var sampleIDdata = data.samples.filter(values => values.id.toString() === IDsel)[0];
        console.log(sampleIDdata);

        ////////////////////////////////////////////////////////////////////////////////////////
        //HBAR CHART FOR TOP TEN OTUS
        //Isolate the top ten OTU values and flip so it displays largest at top
        var topTenOTUvalues = (sampleIDdata.sample_values.slice(0, 10)).reverse();
        //Isolate the top ten OTU IDs for the y-axis labels. Need to use map to get format right
        var topTenOTUlabels = (sampleIDdata.otu_ids.slice(0, 10)).reverse();
        var topTenOTUlabelsMap = topTenOTUlabels.map(id => "OTU "+id);
        //Isolate the OTU names for the hovertext
        var topTenOTUhovertxt = (sampleIDdata.otu_labels.slice(0, 10)).reverse();

        // Log to console to review data
        console.log(topTenOTUvalues);
        console.log(topTenOTUlabelsMap);
        console.log(topTenOTUhovertxt);

        //Set up the trace and define the layout
        var trace1 =  {
            x: topTenOTUvalues,
            y: topTenOTUlabelsMap,
            text: topTenOTUhovertxt,
            type: 'bar',
            orientation: 'h',
        };

        var hbarData = [trace1];

        var hbarLayout = {
            title: "Top 10 OTUs Present",
        }

        //Display the h-bar plot
        Plotly.plot("bar", hbarData, hbarLayout);

        ////////////////////////////////////////////////////////////////////////////////////////
        //BONUS: WASH FREQ GAUGE
        //Get the wash frequency from the metadata
        var metaData = data.metadata;
        var selMetadata = metaData.filter(selection => selection.id.toString() === IDsel)[0];
        console.log(selMetadata);
        var washFreq = selMetadata.wfreq;
        console.log(washFreq);

        //Set up the trace and define the layout
        var gaugeData = [
            {
                domain: {x: [0,1], y: [0,1]},
                value: washFreq,
                title: { text: "Wash Frequency"},
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                        { range: [0, 1], color: "#fc4538"},
                        { range: [1, 2], color: "#fc4538"},
                        { range: [2, 3], color: "#fcb438"},
                        { range: [3, 4], color: "#fcb438"},
                        { range: [4, 5], color: "#fcfc38"},
                        { range: [5, 6], color: "#fcfc38"},
                        { range: [6, 7], color: "#c8fc38"},
                        { range: [7, 8], color: "#c8fc38"},
                        { range: [8, 9], color: "#58fc38"},
                    ],
                },
            }
        ];

        var gaugeLayout = { width: 600, height: 450, margin: {t: 0, b: 0} };

        Plotly.plot("gauge", gaugeData, gaugeLayout);

        ////////////////////////////////////////////////////////////////////////////////////////
        //BUBBLE CHART
        //Get all OTU IDs, sample values, and labels for hovertxt
        var otuIDs = sampleIDdata.otu_ids;
        var sampleValues = sampleIDdata.sample_values;
        var otuLabels = sampleIDdata.otu_labels;

        console.log(otuIDs);
        console.log(sampleValues);
        console.log(otuLabels);

        //Set up the trace and define the layout
        var trace2 = {
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                color: otuIDs,
                size: sampleValues,
            }
        };

        var bubbleData = [trace2];

        var bubbleLayout = {
            title: "OTU Presence in belly button",
            xaxis: {
                title: "OTU ID",
            }
        }

        Plotly.plot("bubble", bubbleData, bubbleLayout);
    });
}

function optionChanged(IDsel) {
    getDemoData(IDsel);
    buildPlots(IDsel);
}

dropDownOptions();