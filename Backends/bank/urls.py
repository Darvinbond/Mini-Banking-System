from django.urls import path
from .views import CustomerView1, Deposit, DeleteTransaction, FreezeAccount

urlpatterns = [
    path('customer', CustomerView1.as_view(), name='customer'),
    path('deposit', Deposit.as_view(), name='deposit'),
    path('delete', DeleteTransaction.as_view(), name='delete'),
    path('freeze', FreezeAccount.as_view(), name='freeze')
]
