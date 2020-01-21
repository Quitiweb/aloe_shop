# todos/serializers.py
from rest_framework import serializers
from .models import Ejemplo


class EjemploSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'titulo',
            'descripcion',
        )
        model = Ejemplo