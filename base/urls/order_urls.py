from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('myorders/', views.getMyOrders, name='myorders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('<str:pk>/',views.getSingleOrder, name ="user-order"), 
    
]