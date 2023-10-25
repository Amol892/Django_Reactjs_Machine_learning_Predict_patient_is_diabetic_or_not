from rest_framework.urls import path 
from .views import *


urlpatterns = [
    
    path('predict/',predict_diabetic)
]
