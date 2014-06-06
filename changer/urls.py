from django.conf.urls import patterns, include, url
from changer.views import Index


from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$', Index.as_view(),
                           name='index'),
                       )
