from django.db import models
import random
import string

# Create your models here.


def generate_accNo():
    while True:
        account = int(''.join(random.sample((string.digits), 10)))
        if not Customer.objects.filter(acc_no=account).exists():
            return account


def generate_bvn():
    while True:
        bvn = int(''.join(random.sample((string.digits), 10)))
        if not Customer.objects.filter(bvn=bvn).exists():
            return bvn


class Customer(models.Model):
    fname = models.CharField(max_length=30)
    lname = models.CharField(max_length=30)
    oname = models.CharField(max_length=30)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    ophone = models.CharField(max_length=30)
    gender = models.CharField(max_length=1)
    age = models.IntegerField()
    address = models.TextField()
    password = models.TextField()
    passport = models.ImageField(upload_to='static/passport/')
    acc_no = models.CharField(max_length=10, default=generate_accNo)
    bvn = models.CharField(max_length=11, default=generate_bvn)
    status = models.BooleanField(default=True)
    pin = models.CharField(max_length=4)
    balance = models.IntegerField(default=10000)
    restriction = models.IntegerField(default=30000)

    def __str__(self):
        return self.fname + " " + self.lname


class Transaction(models.Model):
    from_acc = models.CharField(max_length=10)
    from_name = models.TextField()
    to_acc = models.CharField(max_length=10)
    to_name = models.TextField()
    to_bank = models.CharField(max_length=50)
    amount = models.IntegerField()
    beneficiary = models.TextField(default="")
    date = models.DateField(auto_now_add=True)
    see = models.IntegerField(default=0)

    def __str__(self):
        return self.from_acc


class Admin(models.Model):
    usname = models.CharField(max_length=100)
    pwd = models.TextField()

    def __str__(self):
        return self.usname
