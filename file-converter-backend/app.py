from flask import Flask, request, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from audio_converter import convert_audio
from document_converter import convert_document

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_AUDIO_EXTENSIONS = {'mp3', 'wav', 'ogg', 'm4a'}
ALLOWED_DOCUMENT_EXTENSIONS = {'doc', 'docx', 'pdf', 'txt', 'csv'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename, allowed_extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

@app.route('/convert', methods=['POST'])
def convert_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    
    output_format = request.form.get('output_format')
    if not output_format:
        return 'No output format specified', 400

    if file and allowed_file(file.filename, ALLOWED_AUDIO_EXTENSIONS):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        output_path = convert_audio(file_path, output_format)
    elif file and allowed_file(file.filename, ALLOWED_DOCUMENT_EXTENSIONS):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        output_path = convert_document(file_path, output_format)
    else:
        return 'Invalid file type', 400

    return send_file(output_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)