from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def login(request):
    return HttpResponse(request.method)


def logout(request):
    return HttpResponse(request.method)


def index(request):
    return HttpResponse("Hello")


def inventory(request):
    return HttpResponse("Current Inventory View Shows here")


def newEntry(request):
    return HttpResponse("New Entry here")
