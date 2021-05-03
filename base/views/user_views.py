from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.serializers import  UserSerializer, UserSerializerWithToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Token views
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    #overwrite validate method
    def validate(self, attrs):
        data = super().validate(attrs)
        sereializer= UserSerializerWithToken(self.user).data

        for key, value in sereializer.items():
            data[key]= value

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


#api for all user
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    # serializing users data from django database
    serializer = UserSerializer(users, many = True)
    
    return Response(serializer.data)

#api for user details
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    # serializing user detail from django database
    serializer = UserSerializerWithToken(user, many = False)
    
    return Response(serializer.data)


#API for user update
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUsersProfile(request):
    user = request.user
 
    serializer = UserSerializerWithToken(user, many = False)

    data = request.data
    user.first_name= data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])
    
    user.save()
    
    return Response(serializer.data)


#register user
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            email = data['email'], 
            username = data['email'],
            password = make_password(data['password']),

        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'details': 'User with this email might be created.'}
        return Response(message, status= status.HTTP_400_BAD_REQUEST)