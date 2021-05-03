from django.db import models
from django.contrib.auth.models import User


# user profile one to one field with user 
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_supplier = models.BooleanField(null=True, blank=True, default=False)
    
    #wishlist

    def __str__(self):
        return "Profile " + self.user.username



# product
class Product (models.Model):
    _id = models.AutoField(primary_key=True, editable = False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null = True)
    name= models.CharField(max_length= 255, null=True, blank=True)
    image = models.ImageField(null = True, blank=True)
    description = models.TextField( null=True, blank=True)
    shortText = models.TextField( null=True, blank=True)
    brand = models.CharField(max_length= 255, null=True, blank=True)
    category = models.CharField(max_length= 255, null=True, blank=True)
    price= models.DecimalField( max_digits= 7, decimal_places= 2, null=True, blank=True )
    countInStock = models.IntegerField(null= True, blank=True, default=0)
    rating = models.DecimalField( max_digits= 7, decimal_places= 2, null=True, blank=True)
    numReviews = models.IntegerField(null= True, blank=True, default=0)
    material = models.CharField(max_length= 255, null=True, blank=True)
    color = models.CharField(max_length= 255, null=True, blank=True)
    shippingDays = models.IntegerField(null= True, blank=True, default=1)
    discountInPercentage = models.IntegerField(null= True, blank=True, default=0)


    def __str__(self):
        return self.name


#purchase order
class Order (models.Model):
    id = models.AutoField(primary_key=True, editable = False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null = True)
    paymentMethod= models.CharField(max_length= 255, null=True, blank=True)
    taxPrice= models.DecimalField( max_digits= 7, decimal_places= 2, null=True, blank=True )
    shippingPrice = models.DecimalField( max_digits= 7, decimal_places= 2, null=True, blank=True, default= 0 )
    totalPrice = models.DecimalField( max_digits= 7, decimal_places= 2, null=True, blank=True, default= 0 )
    isPaid = models.BooleanField(null=True, blank=True, default=False)
    paidAt = models.DateTimeField(auto_now_add=False ,null=True, blank=True)
    isDelivered = models.BooleanField(null=True, blank=True, default=False)
    deliveredAt =  models.DateTimeField(auto_now_add=False ,null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True,null=True, blank=True)

    def __str__(self):
        return str(self.id)

#order items
class OrderItem(models.Model):
    id = models.AutoField(primary_key=True, editable = False)
    product= models.ForeignKey(Product, on_delete=models.SET_NULL, null = True)
    name =  models.CharField(max_length= 255, null=True, blank=True)
    order= models.ForeignKey(Order, on_delete=models.SET_NULL, null = True)
    qty = models.IntegerField(null= True, blank=True, default=0)
    price =  models.DecimalField( max_digits= 7, decimal_places= 2, null=True, blank=True, default= 0 )
    discountPrice =  models.DecimalField( max_digits= 7, decimal_places= 2, null=True, blank=True, default= 0 )
    totalPrice =  models.DecimalField( max_digits= 7, decimal_places= 2, null=True, blank=True, default= 0 )
    image = models.CharField(max_length= 255, null=True, blank=True)

    def __str__(self):
        return self.name

#reviews
class Review(models.Model):
    id = models.AutoField(primary_key=True, editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    product= models.ForeignKey(Product, on_delete=models.CASCADE, null = True)
    tittle = models.CharField(max_length= 255, null=True, blank=True)
    comment = models.TextField( null=True, blank=True)
    helpCount = models.IntegerField(null= True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True,null=True, blank=True)

    def __str__(self):
        return str(self.tittle)



#class for wishlist
class WishList (models.Model):
    id = models.AutoField(primary_key=True, editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    product= models.ForeignKey(Product, on_delete=models.CASCADE, null = True)
    createdAt = models.DateTimeField(auto_now_add=True,null=True, blank=True)
    

    def __str__(self):
        return str(self.id)

#class for shipping address
class ShippingAddress(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return str(self.address)