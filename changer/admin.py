from django.contrib import admin
from changer.models import Company, Device


class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'office_address', 'contact_no')


class DeviceAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone_no', 'date_created')


admin.site.register(Company, CompanyAdmin)
admin.site.register(Device, DeviceAdmin)
