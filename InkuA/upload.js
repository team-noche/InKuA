
const CLIENT_ID = '14226202057-le0l5607slrgdn4qv0sqe7i6leil7c1b.apps.googleusercontent.com';

const API_KEY = 'AIzaSyDGYxna4qMzONigs7v3DhVWfHb8eXYGLNY';

const FOLDER_ID = '/folders/1DCb0QvaVQ2YZXYuVmJZ_b4NxF8Tp9iur';

const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file && ALLOWED_FILE_TYPES.includes(file.type)) {
        document.getElementById('upload-status').style.display = 'block';
        uploadFileToDrive(file);
    } else {
        alert('Tipo de archivo no permitido. Sube archivos de tipo PNG, JPG, PDF, DOC o DOCX.');
    }
}

function uploadFileToDrive(file) {
    gapi.client.drive.files.create({
        resource: {
            name: file.name,
            parents: [FOLDER_ID]
        },
        media: {
            mimeType: file.type,
            body: file
        }
    }).then(response => {
        console.log(response);
        document.getElementById('upload-status').style.display = 'none';
        document.getElementById('confirmation-message').style.display = 'block';

        const fileId = response.result.id;
        const filePreviewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        document.getElementById('file-preview').src = filePreviewUrl;
    }).catch(error => {
        console.error(error);
        alert('Hubo un error al subir el archivo. Inténtalo de nuevo.');
        document.getElementById('upload-status').style.display = 'none';
    });
}

function uploadFile() {
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', handleFileSelect);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        scope: 'https://www.googleapis.com/auth/drive.file'
    }).then(() => {
        uploadFile();
    });
}

gapi.load('client', initClient);
