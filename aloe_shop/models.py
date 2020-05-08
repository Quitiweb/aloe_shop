from django.db import models


# Create your models here
# .
class Producto(models.Model):
    id = models.AutoField(primary_key=True)
    sku = models.IntegerField(null=False, default=0)
    name = models.CharField(max_length=200)
    price = models.FloatField(null=False, default=10)
    discount = models.IntegerField(default=0)
    new = models.BooleanField(default=True)
    rating = models.FloatField(default=3.5)
    saleCount = models.IntegerField(default=0)
    category = models.CharField(max_length=200, null=True)
    tag = models.CharField(max_length=200, null=True)
    stock = models.IntegerField(default=0)
    image = models.ImageField(upload_to='myphoto/%Y/%m/%d/', null=True, max_length=255)
    shortDescription = models.CharField(max_length=500, null=True)
    fullDescription = models.CharField(max_length=1500, null=True)

    def __str__(self):
        """A string representation of the model."""
        return self.name
