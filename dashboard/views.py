from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from trees.models import Tree
from payments.models import Payment

class DashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self,request):

        trees = Tree.objects.filter(user=request.user)

        payments = Payment.objects.filter(user=request.user)

        carbon = sum(tree.carbon_offset for tree in trees)

        return Response({

            "trees_planted":trees.count(),
            "carbon_offset":carbon,
            "payments":payments.count()

        })


