from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage,  PageNotAnInteger
from base.models import Product
from base.serializers import ProductSerializer


from rest_framework import status


#API for list of products
@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    page = request.query_params.get('page')

    if query==None:
        query= ''
    products = Product.objects.filter(name__icontains=query) | Product.objects.filter(brand__icontains=query)

    #paginator
    paginator =  Paginator(products, 6)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator(paginator.num_pages)
    
    if page == None:
        page = 1
    
    page = int(page)

    # serializing products data from django database
    serializer = ProductSerializer(products, many = True)
    
    return Response({'products':serializer.data, 'page': page, 'countPages': paginator.num_pages})

#API for a single product
@api_view(['GET'])
def getSingleProduct(request, pk):
    product = Product.objects.get(_id = pk)

    # serializing product data from django database
    serializer = ProductSerializer(product, many = False)

    return Response(serializer.data)