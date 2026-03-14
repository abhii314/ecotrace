from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Tree
from .serializers import TreeSerializer


class PlantTreeView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self,request):

        serializer = TreeSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response({
                "message":"Tree planted successfully"
            })

        return Response(serializer.errors)


class MyTreesView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self,request):

        trees = Tree.objects.filter(user=request.user)

        serializer = TreeSerializer(trees,many=True)

        return Response(serializer.data)
