from django.db import models


def upload_path(instance, filename):
    return 'images/{filename}'.format(filename=filename)


class ProductModel(models.Model):
    product_name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to=upload_path)

    def __str__(self):
        return self.product_name
