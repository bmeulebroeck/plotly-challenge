# plotly-challenge

<h2>Belly Button Biodiversity Dashboard</h2>
This project uses a dataset from NC State's Public Science Lab that tested the microbial diversity of 60 belly buttons. They discovered over 2300 species, and 8 of them (which they call 'oligarchs') were present in over 70% of people tested.</p>
<p>app.js is my file that interacts with the dataset (samples_v2.json) to retrieve and display the data for each set in a series of plots detailing: the top 10 operational taxonomic units (OTUs), the reported frequency of belly button scrubs, and a bubble chart showing the amount of each OTU present in a sample.</p>
<p>I initialize the page with a function that populates the drop down list and builds the plots using the first sample in the dataset. I also built functions to fill in the demographic data box and to build the plots themselves using the metadata and sample data from the json.</p>