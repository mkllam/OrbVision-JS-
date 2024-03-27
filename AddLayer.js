// Start the script from the first psd doc open in photoshop

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
var psdList = Folder(workingPath).getFiles(/.psd$/i);
var logoList = Folder(workingPath+'/Logo').getFiles(/.png$/i);
var jpegOptions = new JPEGSaveOptions();
jpegOptions.quality = 12;
jpegOptions.embedColorProfile = true;
jpegOptions.matte = MatteType.NONE;
jpegOptions.scans = 3;

//main function
for(var j=0; j<psdList.length;j++){
    for(var i=0; i<logoList.length;i++){
        var imageFile = new File(logoList[i]);
        if (imageFile.exists) {
            goThroughLayers(activeDoc);
            var basename = app.activeDocument.name.split('.')[0]+'NewScene';
            activeDoc.saveAs((new File(workingPath+"/Output/"+basename+i+".jpg")),jpegOptions,true);
        }
    }
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    if(j+1 < psdList.length){
        app.open(new File(psdList[j+1]));
        activeDoc = app.activeDocument;
    }
}
