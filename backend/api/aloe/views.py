# todos/views.py
from rest_framework import generics

from .models import Ejemplo
from .serializers import EjemploSerializer


class ListEjemplo(generics.ListCreateAPIView):
    queryset = Ejemplo.objects.all()
    serializer_class = EjemploSerializer


class DetailEjemplo(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ejemplo.objects.all()
    serializer_class = EjemploSerializer