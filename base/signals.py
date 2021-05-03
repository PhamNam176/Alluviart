from django.contrib.auth.models import User
from .models import UserProfile
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver



#sending signal to create User Profile when an user is created
@receiver(post_save, sender=User)
def createUserProfile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


#automatically set user name the same as email
@receiver(pre_save, sender=User)
def updateUsername(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username= user.email