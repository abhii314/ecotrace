from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Payment(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE)

    amount = models.IntegerField()

    razorpay_payment_id = models.CharField(max_length=200)

    status = models.CharField(
        max_length=20,
        default="success"
    )

    created_at = models.DateTimeField(auto_now_add=True)