from django.shortcuts import render
from rest_framework import generics

from .models import Ejemplo
from .serializers import TodoSerializer


class ListEjemplo(generics.ListCreateAPIView):
    queryset = Ejemplo.objects.all()
    serializer_class = TodoSerializer


class DetailEjemplo(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ejemplo.objects.all()
    serializer_class = TodoSerializer