from django.db import models

class BinVO(models.Model):
    closet_name = models.CharField(max_length=50)
    bin_number = models.PositiveSmallIntegerField(default=1)
    bin_size = models.PositiveSmallIntegerField(default=1)

class Shoe(models.Model):
    manufacturer = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    picture_url = models.URLField(null=True)

    bin = models.ForeignKey(
        BinVO,
        related_name='shoes',
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.model