# aloe_shop/serializers.py
from rest_framework import serializers
from .models import Ejemplo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'titulo',
            'descripcion',
        )
        model = Ejemplo
