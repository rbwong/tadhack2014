from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.views.generic.edit import FormView, CreateView, UpdateView
from django.core.urlresolvers import reverse_lazy
from django.views.generic import TemplateView, ListView, DetailView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import user_passes_test
from django.views.generic.base import View
from django.http import HttpResponse

from changer.forms import UpdateCompanyForm, CreateDeviceForm
from changer.models import Company, Device

#import requests


class Index(TemplateView):
    template_name = "changer/index.html"


class CreateCompany(CreateView):
    form_class = UpdateCompanyForm
    template_name = 'changer/create_company.html'
    success_url = reverse_lazy('update_company')

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(CreateCompany, self).form_valid(form)

    def form_invalid(self, form):
        return self.render_to_response(self.get_context_data(form=form))

    def dispatch(self, request, *args, **kwargs):
        request.session.set_test_cookie()
        return super(CreateCompany, self).dispatch(request, *args, **kwargs)


class UpdateCompany(UpdateView):
    form_class = UpdateCompanyForm
    template_name = 'changer/update_company.html'
    success_url = reverse_lazy('update_company')

    def get_object(self):
        return get_object_or_404(Company, user=self.request.user)

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(UpdateCompany, self).form_valid(form)

    def form_invalid(self, form):
        return self.render_to_response(self.get_context_data(form=form))

    def dispatch(self, request, *args, **kwargs):
        request.session.set_test_cookie()
        return super(UpdateCompany, self).dispatch(request, *args, **kwargs)


class CreateDevice(CreateView):
    form_class = CreateDeviceForm
    template_name = 'changer/create_device.html'
    success_url = reverse_lazy('index')

    def form_valid(self, form):

        return super(CreateDevice, self).form_valid(form)

    def form_invalid(self, form):
        return self.render_to_response(self.get_context_data(form=form))

    def dispatch(self, request, *args, **kwargs):
        request.session.set_test_cookie()
        return super(CreateDevice, self).dispatch(request, *args, **kwargs)


class Manage(ListView):
    model = Device
    template_name = 'changer/manage.html'

    def get_queryset(self):
        return Device.objects.filter(company=Company.objects.get(user=self.request.user)).order_by('name')

    def get_context_data(self, **kwargs):
        context = super(Manage, self).get_context_data(**kwargs)
        return context


class DeviceView(DetailView):
    model = Device
    template_name = 'changer/device.html'

    def get_object(self):
        return get_object_or_404(Device, pk=self.kwargs['pk'])


