
function initializeViz() {
  var placeholderDiv = document.getElementById("tableauViz");
  var url = "https://public.tableau.com/views/td415_checkpoint/Checkpoint?:embed=y&:display_count=yes";
  var options = {
    // width: placeholderDiv.offsetWidth,
    // height: placeholderDiv.offsetHeight,
    hideTabs: true,
    hideToolbar: true,
    onFirstInteractive: function () {
      workbook = viz.getWorkbook();
      activeSheet = workbook.getActiveSheet();
      listenToMarksSelection();
    }
  };
  viz = new tableau.Viz(placeholderDiv, url, options);
}      

window.onload = function() {
	initializeViz();
};

function switchView(sheetName) {
	workbook.activateSheetAsync(sheetName);
	
}

function addValuesToFilter(location) {
	activeSheet = workbook.getActiveSheet();
	try {
	  sheet = activeSheet.getWorksheets().get("Map");
	}
	catch(err)
	{
		console.log(err);
	  	sheet = activeSheet;
	}
	if (location == 'ALL')
	{
		sheet.clearFilterAsync("Country Region");
	}
	else{
		  sheet.applyFilterAsync(
	    "Country Region",
	    location,
	    tableau.FilterUpdateType.REPLACE);
		}

}  

function addValuesToClusterFilter(cluster) {
	activeSheet = workbook.getActiveSheet();
	try {
	  sheet = activeSheet.getWorksheets().get("Discounts by Qty");
	}
	catch(err)
	{
		console.log(err);
	  	sheet = activeSheet;
	}

  	sheet.selectMarksAsync(
    "Clusters",
    cluster,
    tableau.FilterUpdateType.REPLACE);

}  
 
function listenToMarksSelection() {
    viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, onMarksSelection);
}

function onMarksSelection(marksEvent) {
    return marksEvent.getMarksAsync().then(reportSelectedMarks);
}

function reportSelectedMarks(marks) {

    var html = ""; 
    
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();

        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
        	if (pairIndex != 0)
        	{
        		if (pairIndex == 1)
        		{
        			var add_html = " " + (markIndex + 1) + " of " + marks.length;
        		}
        		else {
        			add_html = "";
        		}
	            var pair = pairs[pairIndex];
		        html += pair.fieldName + add_html + ": ";
		        html += "<b>" + pair.formattedValue + "</b><br>";

        	}

        }
        html += "<br>";
    }


    var infoDiv = document.getElementById('markDetails');
    infoDiv.innerHTML = html;
}