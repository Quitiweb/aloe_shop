from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


from .models import Producto, CategoryTop
from .serializers import ProductoSerializer, CategorySerializer


class ListProducto(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer



class DetailProducto(generics.RetrieveUpdateDestroyAPIView):
    queryset = CategoryTop.objects.all()
    serializer_class = CategorySerializer


class ListCategoria(generics.ListCreateAPIView):
    queryset = CategoryTop.objects.all()
    serializer_class = ProductoSerializer


class DetailCategoria(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
def is_admin(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)

    if request.user.is_superuser:
        return Response(serializer.data)
    return Response({
        'status': 'Forbidden',
        'message': 'Please authenticate yourself as admin to continue',
        'errors': 'NO_ADMIN'  # for example
    }, status=status.HTTP_400_BAD_REQUEST)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)