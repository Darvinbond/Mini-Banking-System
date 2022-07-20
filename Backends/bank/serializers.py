from .models import Customer, Transaction, Admin
from rest_framework import fields, serializers
from rest_framework.authtoken.models import Token



class AccountNoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('acc_no', 'fname', 'lname', 'id')


class CustomerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class TransactionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'


class AdminSerializers(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'
