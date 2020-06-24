from django.contrib import admin

# Register your models here.
from .models import Producto, CategoryTop

admin.site.register(Producto)
admin.site.register(CategoryTop)
