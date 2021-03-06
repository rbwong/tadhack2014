from django.conf.urls import patterns, include, url
from django.contrib.auth.decorators import login_required
from auth.views import Register, Login, Logout


from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^register/$', login_required(Register.as_view()),
                           name='register'),
                       url(r'^login/$', Login.as_view(), name='login'),
                       url(r'^logout/$', Logout.as_view(), name='logout'),
                       )
