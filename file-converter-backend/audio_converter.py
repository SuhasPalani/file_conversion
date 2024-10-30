from pydub import AudioSegment
import os

def convert_audio(input_path, output_format):
    audio = AudioSegment.from_file(input_path)
    filename = os.path.splitext(os.path.basename(input_path))[0]
    output_path = f"uploads/{filename}.{output_format}"
    audio.export(output_path, format=output_format)
    return output_path