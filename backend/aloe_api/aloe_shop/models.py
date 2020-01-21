from django.db import models

# Create your models here
# .
class Ejemplo(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()

    def __str__(self):
        """A string representation of the model."""
        return self.titulo