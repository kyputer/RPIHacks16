from django.db import models

# Create your models here.
class Item(models.Model):
    itemno = models.IntegerField(primary_key=True, unique=True)
    itemname = models.CharField(max_length=64, null=True)
    cost = models.FloatField(null=True)
    count = models.PositiveIntegerField(null=False)
