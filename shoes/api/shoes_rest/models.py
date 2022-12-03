from django.db import models

class BinVO(models.Model):
    import_href = models.CharField(max_length=100, unique=True, null=True)
    closet_name = models.CharField(max_length=50)

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