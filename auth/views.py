from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpResponseRedirect
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.views.generic.edit import FormView, View, CreateView
from django.core.urlresolvers import reverse_lazy
from django.contrib.auth.forms import UserCreationForm
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import user_passes_test

from changer.models import Company


class Register(CreateView):
    form_class = UserCreationForm
    template_name = 'auth/register.html'
    success_url = reverse_lazy('index')

    def form_valid(self, form):
        return super(Register, self).form_valid(form)

    def form_invalid(self, form):
        return self.render_to_response(self.get_context_data(form=form))

    @method_decorator(user_passes_test(lambda u: u.is_superuser))
    def dispatch(self, request, *args, **kwargs):
        request.session.set_test_cookie()
        return super(Register, self).dispatch(request, *args, **kwargs)


class Login(FormView):
    form_class = AuthenticationForm
    template_name = 'auth/login.html'

    def form_valid(self, form):
        redirect_to = reverse_lazy('index')
        auth_login(self.request, form.get_user())
        if self.request.session.test_cookie_worked():
            self.request.session.delete_test_cookie()
        return HttpResponseRedirect(redirect_to)

    def form_invalid(self, form):
        return self.render_to_response(self.get_context_data(form=form))

    def dispatch(self, request, *args, **kwargs):
        request.session.set_test_cookie()
        return super(Login, self).dispatch(request, *args, **kwargs)


class Logout(View):

    def get(self, request, *args, **kwargs):
        auth_logout(request)
        return HttpResponseRedirect('/')
