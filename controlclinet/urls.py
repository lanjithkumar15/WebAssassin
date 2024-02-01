from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'controlclinet'

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('save/', views.photosave, name='photosave'),
    path('browserdata/',views.browserdata, name='browserdata'),
    path('micfile', views.micfile, name='micfile'),
    path('savetheid',views.savetheid,name='savetheid')
]


