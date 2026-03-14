import uuid

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Payment

class CreatePaymentView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self,request):

        payment = Payment.objects.create(

            user=request.user,
            amount=request.data.get("amount"),
            razorpay_payment_id=str(uuid.uuid4()),
            status="success"
        )

        return Response({
            "message":"Payment successful",
            "payment_id":payment.razorpay_payment_id
        })



