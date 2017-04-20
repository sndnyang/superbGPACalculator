/**
 * Created by 80274869 on 2014-9-5.
 */

function uploadFile(file)
{

    var reader = new FileReader();
    var ext = getExtensionFileName(file.name);

    reader.onload = function () {
        $("#type").val(ext);
        $("#grade").val(this.result);
    }

    reader.readAsText(file);
}

function uploadFiles(files)
{
    if (files.length) 
    {
        //œ‘ æ
        for (var i = 0; i < files.length; i++) 
        {
            uploadFile(files[i]);
        }
    }
}