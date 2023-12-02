const {PythonShell} = require('python-shell')

function capture() {
    let canvas = document.getElementById('canvas');
    let video = document.getElementById('video-self');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    
    canvas.toBlob((blob) => {
        // Convert the blob to base64
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            console.log(base64String);  // You can use this base64 string as needed
            //pass this to python script
            let options = {
                mode: 'text',
                pythonOptions: ['-u'],
                scriptPath: '',
                args: [base64String]
            }
            PythonShell.run('python_ml.py',options,function(err,result){

            })
            //// NEXT CONVERT THE BASE64 TO IMAGE IN PYTHON SCRIPT

            // A PHYTHON 
        };
        // reader.readAsDataURL(blob);
    }, 'image/png');  // Specify the MIME type as needed (e.g., 'image/png' or 'image/jpeg')
}
