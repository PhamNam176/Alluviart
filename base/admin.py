from django.contrib import admin
from .models import Product, UserProfile, Review, WishList, Order, OrderItem, ShippingAddress

# Register your models here.
admin.site.register(Product)
admin.site.register(UserProfile)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Review)
admin.site.register(WishList)
admin.site.register(ShippingAddress)