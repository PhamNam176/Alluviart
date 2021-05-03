from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

#Routes API
@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/products/',
        'api/products/create/',

        'api/products/upload/',

        'api/products/<id>/reviews/',

        'api/products/top/',
        'api/product/<id>/',

        'api/products/delete/<id>/',
        'api/products/update/<id>/',
    ]
    return Response(routes)
