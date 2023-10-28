from django.shortcuts import render
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
import json

pathtosave = "/home/lanjithkumar/programming/beefmin/main/mediastorage"
pathtosavefortext = "/home/lanjithkumar/programming/beefmin/main/textfiles"

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

            save_directory = '/home/lanjithkumar/programming/beefmin/main/textfiles'

            filename = os.path.join(save_directory, f'{sanitized_ip_address}.txt')

            os.makedirs(save_directory, exist_ok=True)

            with open(filename, 'w') as file:
                json.dump(data, file, indent=4)
            
            return JsonResponse({'message': 'Data received and saved successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)