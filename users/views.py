from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegisterSerializer
from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken
from .login_serializer import LoginSerializer


class RegisterView(APIView):

    def post(self,request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response({
                "message":"User created"
            })

        return Response(serializer.errors)

class LoginView(APIView):

    def post(self,request):

        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = authenticate(
            username=serializer.validated_data["username"],
            password=serializer.validated_data["password"]
        )

        if not user:
            return Response({"error":"Invalid credentials"})

        refresh = RefreshToken.for_user(user)

        return Response({
            "access":str(refresh.access_token),
            "refresh":str(refresh)
        })