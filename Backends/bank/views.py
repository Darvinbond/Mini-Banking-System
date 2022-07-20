from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework import viewsets
from django.http import HttpResponse, JsonResponse
from .serializers import CustomerSerializers, AdminSerializers, AccountNoSerializers, TransactionSerializers
from .models import Customer, Admin, Transaction
from django.db.models import F
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.views.decorators.http import require_http_methods
from django.core.serializers import serialize
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.

# @api_view(['POST'])
class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializers
    queryset = Customer.objects.order_by("id").reverse()


class AccountNoView(viewsets.ModelViewSet):
    serializer_class = AccountNoSerializers
    queryset = Customer.objects.only('acc_no', 'fname', 'lname', 'id')


class TransactionView(viewsets.ModelViewSet):
    serializer_class = TransactionSerializers
    queryset = Transaction.objects.order_by("id").reverse()


class AdminView(viewsets.ModelViewSet):
    serializer_class = AdminSerializers
    queryset = Admin.objects.all()


# @require_http_methods(['PUT'])
@csrf_exempt
def credit(request):
    data = JSONParser().parse(request)
    qry = Customer.objects.get(acc_no=data.get("acc"))
    qry.balance += int(data.get("increment"))
    qry.save()

    qry1 = Customer.objects.get(acc_no=data.get("from_acc"))
    qry1.balance -= int(data.get("increment"))
    qry1.save()

    return JsonResponse({"status": "done"}, safe=True, status=200)
    # Customer.objects.filter(id=request.id).update(balance=F('balance') + request.balance)


# wcwc
class CustomerView1(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        print(request.data)
        serializer = CustomerSerializers(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # cus_create = Customer.objects.create(

        # )

    def patch(self, request):
        idd = request.data.get("id")
        print(request.data)
        post_object = Customer.objects.get(id=idd)
        # set partial=True to update a data partially
        serializer = CustomerSerializers(
            post_object, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Deposit(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def patch(self, request):
        idd = request.data.get("id")
        post_object = Customer.objects.get(id=idd)
        # request.data.set({'dep_amt': ['222']})
        data = {
            "id": request.data.get("id"),
            "balance": int(post_object.balance) + int(request.data.get("dep_amt"))
        }
        # set partial=True to update a data partially
        serializer = CustomerSerializers(
            post_object, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteAllTransaction(APIView):

    def post(self, request, *args, **kwargs):
        idd = request.data.get("idd")

        me = Customer.objects.get(id=idd).acc_no

        for obj in Transaction.objects.all():
            if obj.from_acc == me:
                nxt = obj.to_acc
            else:
                nxt = obj.from_acc

            otherPersonID = Customer.objects.get(acc_no=nxt).id

            if(obj.see != 0):
                obj.delete()
                return Response({"status": "success"}, status=status.HTTP_201_CREATED)
            else:
                obj.see = otherPersonID
                obj.save()
                return Response({"status": "success"}, status=status.HTTP_201_CREATED)


class DeleteTransaction(APIView):

    def post(self, request, *args, **kwargs):
        id = request.data.get("id")
        idd = request.data.get("idd")

        me = Customer.objects.get(id=idd).acc_no
        tra = Transaction.objects.get(id=id)

        if tra.from_acc == me:
            nxt = tra.to_acc
        else:
            nxt = tra.from_acc

        otherPersonID = Customer.objects.get(acc_no=nxt).id

        record = Transaction.objects.get(id=id)
        see = record.see
        # record.delete()
        # return Response({"status": "success"}, status=status.HTTP_201_CREATED)

        if(see != 0):
            print("hmm")
            record.delete()
            return Response({"status": "success"}, status=status.HTTP_201_CREATED)
        else:
            record.see = otherPersonID
            record.save()
            return Response({"status": "success"}, status=status.HTTP_201_CREATED)

        # return Response({"status": "success"}, status=status.HTTP_201_CREATED)


class FreezeAccount(APIView):

    def post(self, request):
        idd = request.data.get("id")
        post_object = Customer.objects.get(id=idd)

        data = {
            "id": request.data.get("id"),
            "status": not(post_object.status)
        }

        serializer = CustomerSerializers(
            post_object, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
