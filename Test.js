// Recursive function to iterate through layers of a psd 
// https://community.adobe.com/t5/photoshop-ecosystem-discussions/photoshop-script-iterating-through-all-layers-and-groups-to-export-tagged-layers-in-javascript/m-p/10853278#M297061
function goThroughLayers(parentLayer){
    for(var i=0;i<parentLayer.layers.length;i++){
        curLayer = parentLayer.layers[i];
        activeDoc.activeLayer = curLayer;
        if(curLayer.typename =='LayerSet'){goThroughLayers (curLayer)}
        else{
            if(curLayer.name==targetLayer){  // Found target layer
                if(curLayer.name.match (/[e]/ig)){alert('match')}
                //...
                alert(curLayer);
                alert(curLayer.kind);

            }//end if
        }//end else
    }//end loop
}//end function

// Layer to replace with logo
var targetLayer = 'Your_Design_Here';

// Select Scene
var activeDoc = app.activeDocument;

// Find list of logos
var workingPath  = app.activeDocument.path;
var logoList = Folder(workingPath+'/Logo').getFiles(/.png$/i);

//test function
goThroughLayers(activeDoc);
