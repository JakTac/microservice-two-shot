from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse

# Create your models here.
class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    import_href = models.CharField(max_length=200, unique=True, null=True)

    


class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture_url = models.URLField(null=True)
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.style
    
    
