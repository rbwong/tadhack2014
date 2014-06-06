from django.db import models
from django.contrib.auth.models import User


class Company(models.Model):
    user = models.OneToOneField(User)
    name = models.CharField(max_length=200)
    office_address = models.CharField(max_length=200)
    contact_no = models.CharField(max_length=200)
    profiledescription = models.TextField(blank=True)

    def __unicode__(self):
        return self.name


class Device(models.Model):
    company = models.OneToOneField(Company)
    name = models.CharField(max_length=50)
    phone_no = models.CharField(max_length=200)
    date_created = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.name
