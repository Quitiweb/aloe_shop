from . import views

from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', views.ListEjemplo.as_view()),
    path('api/<int:pk>/', views.DetailEjemplo.as_view()),
]
