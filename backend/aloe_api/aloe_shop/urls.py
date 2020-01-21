from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListEjemplo.as_view()),
    path('<int:pk>/', views.DetailEjemplo.as_view()),
]