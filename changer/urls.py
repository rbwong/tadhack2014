from django.conf.urls import patterns, include, url

from changer.views import Index, CreateCompany, UpdateCompany, CreateDevice, Manage, DeviceView,MyView,YourView


from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$', Index.as_view(),
                           name='index'),
                       url(r'^createprofile/$', CreateCompany.as_view(),
                           name='create_company'),
                       url(r'^updateprofile/$', UpdateCompany.as_view(),
                           name='update_company'),
                       url(r'^createdevice/$', CreateDevice.as_view(),
                           name='create_device'),
                       url(r'^manage/$', Manage.as_view(),
                           name='manage'),
                       url(r'^device/(?P<pk>[\w-]+)/$', DeviceView.as_view(),
                           name='device'),
                       url(r'^get/', MyView.as_view(),name='get'),
                       url(r'^send/', YourView.as_view(),name='send'),
                       )
