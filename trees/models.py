from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Tree(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=200)

    species = models.CharField(max_length=100)

    location = models.CharField(max_length=200)

    image = models.ImageField(upload_to="trees/", null=True)

    planted_at = models.DateTimeField(auto_now_add=True)

    carbon_offset = models.FloatField(default=0)

    status = models.CharField(
        max_length=20,
        choices=[
            ("pending","Pending"),
            ("planted","Planted")
        ],
        default="pending"
    )