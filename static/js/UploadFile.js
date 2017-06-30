/**
 * Created by sndnyang on 2014-9-5.
 */

/* processing array buffers, only required for readAsArrayBuffer */
function fixdata(data) {
  var o = "", l = 0, w = 10240;
  for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
  o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
  return o;
}

function uploadFile(file) {
    var reader = new FileReader();
    var ext = getExtensionFileName(file.name);
    var xls = ['xls', 'xlsx'];

    reader.onload = function (e) {
        $("#type").val(ext);
        if (xls.indexOf(ext) == -1) {
            $("#grade").val(this.result);
        } else {
            $("#type").val(",");
            var data = e.target.result;
            var wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                            type: 'base64'
                        });
            var text = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]);
            $("#grade").val(text);
        }
    }
    if (xls.indexOf(ext) == -1) {
        reader.readAsText(file);
    } else {
        reader.readAsArrayBuffer(file);
    }
}

function uploadFiles(files) {
    if (files.length) 
    {
        //显示
        for (var i = 0; i < files.length; i++) 
        {
            uploadFile(files[i]);
        }
    }
}

function init() {
    var dropbox = document.getElementById('dropbox');
    document.addEventListener("dragenter", function(e){  
        dropbox.style.borderColor = 'gray';  
    }, false);  

    document.addEventListener("dragleave", function(e){  
        dropbox.style.borderColor = 'silver';  
    }, false);  

    dropbox.addEventListener("dragenter", function(e){  
        dropbox.style.borderColor = 'gray';  
        dropbox.style.backgroundColor = 'white';  
    }, false);  

    dropbox.addEventListener("dragleave", function(e){  
        dropbox.style.backgroundColor = 'transparent';  
    }, false);  

    dropbox.addEventListener("dragenter", function(e){  
        e.stopPropagation();  
        e.preventDefault();  
    }, false);  

    dropbox.addEventListener("dragover", function(e){  
        e.stopPropagation();  
        e.preventDefault();  
    }, false);  

    dropbox.addEventListener("drop", function(e){  
        e.stopPropagation();  
        e.preventDefault();  
           
        uploadFiles(e.dataTransfer.files);  
    }, false);  

    $("#type").val(localStorage.separater);
    $("#grade").val(localStorage.grade);
}
