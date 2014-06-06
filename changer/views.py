from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpResponseRedirect
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.views.generic.edit import FormView, CreateView
from django.views.generic import TemplateView


class Index(TemplateView):
    template_name = "changer/index.html"
