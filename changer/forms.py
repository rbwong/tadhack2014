from django import forms

from changer.models import Company, Device


class UpdateCompanyForm(forms.ModelForm):
    class Meta:
        model = Company
        fields = ('name', 'office_address', 'contact_no', 'profiledescription')


class CreateDeviceForm(forms.ModelForm):
    company = forms.ModelChoiceField(Company.objects.all())

    class Meta:
        model = Device
        fields = ('company', 'name', 'phone_no')
