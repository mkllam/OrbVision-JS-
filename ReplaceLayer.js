// Recursive function to iterate through layers of a psd 
// https://community.adobe.com/t5/photoshop-ecosystem-discussions/photoshop-script-iterating-through-all-layers-and-groups-to-export-tagged-layers-in-javascript/m-p/10853278#M297061
function goThroughLayers(parentLayer){
    for(var i=0;i<parentLayer.layers.length;i++){
        curLayer = parentLayer.layers[i];
        activeDoc.activeLayer = curLayer;
        if(curLayer.typename =='LayerSet'){goThroughLayers (curLayer)}
        else{
            if(curLayer.name==targetLayer){  // Found target layer
                alert(curLayer.kind);
                curLayer = replaceContents(imageFile);
            }//end if
        }//end else
    }//end loop
}//end function

////// replace contents //////  
function replaceContents (newFile) {  
    var idplacedLayerReplaceContents = stringIDToTypeID( "placedLayerReplaceContents" );  
        var desc3 = new ActionDescriptor();  
        var idnull = charIDToTypeID( "null" );  
        desc3.putPath( idnull, new File( newFile ) );  
        var idPgNm = charIDToTypeID( "PgNm" );  
        desc3.putInteger( idPgNm, 1 );  
    executeAction( idplacedLayerReplaceContents, desc3, DialogModes.NO );  
    return app.activeDocument.activeLayer  
};  

// Layer to replace with logo
var targetLayer = 'Your_Design_Here';

// Select Scene
var activeDoc = app.activeDocument;

// Find list of logos
var workingPath  = app.activeDocument.path;
var logoList = Folder(workingPath+'/Logo').getFiles(/.png$/i);
var imageFile = File(logoList[0]);
//test function
goThroughLayers(activeDoc);
