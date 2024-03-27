// Recursive function to iterate through layers of a psd 
// https://community.adobe.com/t5/photoshop-ecosystem-discussions/photoshop-script-iterating-through-all-layers-and-groups-to-export-tagged-layers-in-javascript/m-p/10853278#M297061
function goThroughLayers(parentLayer){
    for(var i=0;i<parentLayer.layers.length;i++){
        curLayer = parentLayer.layers[i];
        activeDoc.activeLayer = curLayer;
        if(curLayer.typename =='LayerSet'){goThroughLayers (curLayer)}
        else{
            if(curLayer.name==targetLayer){  // Found target layer
                replaceContents(imageFile);
            }//end if
        }//end else
    }//end loop
}//end function

////// replace contents //////  
function replaceContents (newFile) {  
    var idplacedLayerEditContents = stringIDToTypeID( "placedLayerEditContents" );
    var desc3 = new ActionDescriptor(); 
    executeAction( idplacedLayerEditContents, desc3, DialogModes.NO );
    placeFile(imageFile);
    app.activeDocument.artLayers[1].remove();
    app.activeDocument.close(SaveOptions.SAVECHANGES);
    return
};

// https://community.adobe.com/t5/photoshop/photoshop-scripts-for-image-layers-javascript/m-p/9903887
function placeFile(placeFile) {  
    var desc21 = new ActionDescriptor();  
    desc21.putPath( charIDToTypeID('null'), new File(placeFile) );  
    desc21.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );  
    var desc22 = new ActionDescriptor();  
    desc22.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000 );  
    desc22.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000 );  
    desc21.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc22 );  
    executeAction( charIDToTypeID('Plc '), desc21, DialogModes.NO );  
}

// Layer to replace with logo
var targetLayer = 'Design Here';

// Select Scene
var activeDoc = app.activeDocument;

// Find list of logos
var workingPath  = app.activeDocument.path;
var logoList = Folder(workingPath+'/Logo').getFiles(/.png$/i);
var imageFile = new File(logoList[0]);
//test function
if (imageFile.exists) {
    goThroughLayers(activeDoc);
    var basename = 'testingOut';
    activeDoc.saveAs((new File(workingPath+"/Output/"+basename+".jpg")),jpegOptions,true);
}
